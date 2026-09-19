const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const otpStore = new Map();
const requestLog = new Map();

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length === 10 ? `+91${digits}` : digits.startsWith('91') ? `+${digits}` : '';
}

function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function identity(channel, phone, email) {
  return channel === 'email' ? normalizeEmail(email) : normalizePhone(phone);
}

function hashCode(code) {
  return crypto.createHash('sha256').update(`${code}:${process.env.OTP_SECRET || 'change-me'}`).digest('hex');
}

function canRequest(key) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter(timestamp => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return false;
  recent.push(now);
  requestLog.set(key, recent);
  return true;
}

async function sendSms(to, code) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!accountSid || !authToken || !from) return false;
  const body = new URLSearchParams({
    To: to,
    From: from,
    Body: `${code} is your LPU Food verification code. It expires in 5 minutes.`
  });
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  if (!response.ok) throw new Error(`SMS provider returned ${response.status}`);
  return true;
}

async function sendEmail(to, code) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM;
  if (!apiKey || !from) return false;
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: 'LPU Food' },
      subject: 'Your LPU Food verification code',
      content: [{ type: 'text/plain', value: `${code} is your LPU Food verification code. It expires in 5 minutes.` }]
    })
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  return true;
}

async function requestOtp(payload) {
  const channel = payload.channel === 'email' ? 'email' : 'sms';
  const target = identity(channel, payload.phone, payload.email);
  if (!target) throw new Error(channel === 'email' ? 'Enter a valid email address.' : 'Enter a valid 10-digit mobile number.');
  if (!canRequest(`${channel}:${target}`)) throw new Error('Too many OTP requests. Try again in a few minutes.');

  const code = String(crypto.randomInt(100000, 1000000));
  otpStore.set(`${channel}:${target}`, { codeHash: hashCode(code), expiresAt: Date.now() + OTP_TTL_MS, used: false });
  const sent = channel === 'email' ? await sendEmail(target, code) : await sendSms(target, code);
  if (!sent) {
    throw new Error(channel === 'email'
      ? 'Email delivery is not configured. Add SendGrid credentials in .env.'
      : 'SMS delivery is not configured. Add Twilio credentials in .env.');
  }
  return { channel, target, sent: true };
}

function verifyOtp(payload) {
  const channel = payload.channel === 'email' ? 'email' : 'sms';
  const target = identity(channel, payload.phone, payload.email);
  const entry = otpStore.get(`${channel}:${target}`);
  if (!entry || entry.used || Date.now() > entry.expiresAt || hashCode(String(payload.code || '')) !== entry.codeHash) return false;
  entry.used = true;
  otpStore.delete(`${channel}:${target}`);
  return true;
}

function serveStatic(req, res) {
  const requested = req.url === '/' ? '/lpu-food-website.html' : req.url;
  const filePath = path.normalize(path.join(__dirname, requested));
  if (!filePath.startsWith(__dirname) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return json(res, 404, { error: 'Not found' });
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
  res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }
  if (req.method === 'POST' && ['/api/otp/request', '/api/otp/verify'].includes(req.url)) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        if (req.url.endsWith('/request')) return json(res, 200, await requestOtp(payload));
        return json(res, 200, { verified: verifyOtp(payload) });
      } catch (error) {
        return json(res, 400, { error: error.message || 'OTP request failed.' });
      }
    });
    return;
  }
  if (req.method === 'GET') return serveStatic(req, res);
  return json(res, 405, { error: 'Method not allowed' });
});

server.listen(PORT, () => console.log(`LPU Food server running at http://localhost:${PORT}`));
