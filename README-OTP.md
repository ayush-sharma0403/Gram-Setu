# LPU Food OTP setup

The app now uses `server.js` for login OTP delivery and verification.

## 1. Install Node.js

Install Node.js 18 or newer, then open PowerShell in `c:\html`.

## 2. Configure providers

Copy `.env.example` to `.env` and set `OTP_SECRET`.

For SMS, add Twilio values:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM`

For email, add SendGrid values:

- `SENDGRID_API_KEY`
- `SENDGRID_FROM` (a verified SendGrid sender)

The server refuses to report success when the selected provider is not configured. This prevents the app from claiming that an SMS or email was sent when it was not.

## 3. Start the app

```powershell
cd c:\html
node server.js
```

Open `http://localhost:3000` instead of opening the HTML file directly.

The API provides:

- `POST /api/otp/request`
- `POST /api/otp/verify`

Codes are hashed in memory, expire after five minutes, can be used once, and are rate-limited per destination. For production, move the OTP store to Redis or a database and serve the app over HTTPS.
