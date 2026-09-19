import React, { useState, useEffect } from "react";
import {
  Home, Pill, Droplet, Zap, Plus, MapPin, Globe2, WifiOff, Wifi,
  MessageSquareText, Search, Bell, Check, X, ChevronRight,
  Navigation, AlertCircle, Sparkles, ArrowRight, Mic, Phone,
  ShieldAlert, Activity, Award, Eye, ThumbsUp, Send, BatteryCharging,
  User, Scan, Crosshair, Camera, CheckCheck, Sprout, Landmark, Heart,
  Volume2, Share2, Sun, QrCode
} from "lucide-react";

/* ---------------------------------------------------------
   GramSetu 3.0 (ग्रामसेतु) - React Architecture Prototype
   Civic-Tech Indian Earth Palette: Indigo, Turmeric, Clay, Leaf
   Krishi Setu, Sarkari Yojna, Jeevan Rakshak, Web Audio & TTS
--------------------------------------------------------- */
const C = {
  paper: "#FAF6EC",
  paperDeep: "#F1EADA",
  ink: "#1F1D1A",
  inkSoft: "#5C5549",
  indigo: "#1C3550",
  indigoDeep: "#102133",
  turmeric: "#E0921E",
  turmericDeep: "#B46F0C",
  clay: "#B64C2E",
  leaf: "#2F7A46",
  leafDeep: "#1F522F",
  sky: "#0284C7",
  line: "#E2D9C4",
  white: "#FFFFFF",
};

const PAN_INDIA_LOCATIONS = [
  { id: "v1", name: "Rampur", district: "Sitapur", state: "Uttar Pradesh", lat: 27.5684, lng: 80.6782, pop: "3,420" },
  { id: "v2", name: "Kalyanpura", district: "Chikkaballapur", state: "Karnataka", lat: 13.4325, lng: 77.7275, pop: "2,890" },
  { id: "v3", name: "Bagdogra Chowk", district: "Darjeeling", state: "West Bengal", lat: 26.6946, lng: 88.3184, pop: "4,150" },
  { id: "v4", name: "Shivpur", district: "Varanasi", state: "Uttar Pradesh", lat: 25.3524, lng: 82.9712, pop: "5,200" },
  { id: "v5", name: "Bhigwan", district: "Pune", state: "Maharashtra", lat: 18.2917, lng: 74.7645, pop: "4,800" },
];

const PHARMACIES = [
  {
    id: "p1",
    name: "Pradhan Mantri Jan Aushadhi Kendra",
    dist: "340m",
    walk: "4 min walk",
    type: "Govt Generic",
    stock: {
      Paracetamol: { status: "available", price: "₹8", brand: "₹35" },
      ORS: { status: "available", price: "₹6", brand: "₹24" },
      Insulin: { status: "out", price: "₹120", brand: "₹450" },
      Amoxicillin: { status: "available", price: "₹28", brand: "₹110" },
      "Anti-Venom": { status: "low", price: "Free", brand: "₹850" },
    }
  },
  {
    id: "p2",
    name: "Rampur Primary Health Centre (PHC)",
    dist: "850m",
    walk: "10 min walk",
    type: "PHC Hospital",
    stock: {
      Paracetamol: { status: "available", price: "Free", brand: "₹35" },
      ORS: { status: "available", price: "Free", brand: "₹24" },
      Insulin: { status: "available", price: "Free", brand: "₹450" },
      Amoxicillin: { status: "available", price: "Free", brand: "₹110" },
      "Anti-Venom": { status: "available", price: "Free", brand: "₹850" },
    }
  },
  {
    id: "p3",
    name: "Sharma Medical & Chemist",
    dist: "1.2 km",
    walk: "14 min walk",
    type: "Private Chemist",
    stock: {
      Paracetamol: { status: "available", price: "₹30", brand: "₹35" },
      ORS: { status: "available", price: "₹22", brand: "₹24" },
      Insulin: { status: "out", price: "₹420", brand: "₹450" },
      Amoxicillin: { status: "low", price: "₹95", brand: "₹110" },
      "Anti-Venom": { status: "out", price: "N/A", brand: "₹850" },
    }
  }
];

const MANDI_ITEMS = [
  { name: "Wheat (गेहूं - Sharbati)", cat: "cereal", price: "₹2,420", msp: "₹2,275", diff: "+₹145 Above MSP", mandi: "Sitapur Central Mandi" },
  { name: "Mustard (सरसों - Pili)", cat: "oilseed", price: "₹5,680", msp: "₹5,650", diff: "+₹30 Above MSP", mandi: "Biswan Galla Mandi" },
  { name: "Paddy (धान - Common)", cat: "cereal", price: "₹2,280", msp: "₹2,183", diff: "+₹97 Above MSP", mandi: "Sitapur Yard" },
  { name: "Potato (आलू - Jyoti)", cat: "veggie", price: "₹1,450", msp: "Market", diff: "Market Rate", mandi: "Maholi Sabzi Mandi" },
  { name: "Tomato (टमाटर - Hybrid)", cat: "veggie", price: "₹2,100", msp: "Market", diff: "+5% Weekly", mandi: "Biswan Sabzi Mandi" },
  { name: "Onion (प्याज - Nashik)", cat: "veggie", price: "₹2,400", msp: "Market", diff: "+3% Weekly", mandi: "Sitapur Central Mandi" },
];

const SCHEMES_LIST = [
  { name: "PM-Kisan Samman Nidhi", benefit: "₹6,000 / year", dept: "Ministry of Agriculture", desc: "₹2,000 direct benefit transfer every 4 months for seeds & fertilizers.", docs: ["Aadhaar", "Land Khatauni", "Bank Passbook"], land: "small", ration: "any" },
  { name: "Ayushman Bharat PM-JAY", benefit: "₹5,00,000 / year", dept: "National Health Authority", desc: "Cashless secondary & tertiary hospitalization in empanelled hospitals.", docs: ["Ration Card", "Aadhaar Card"], land: "any", ration: "bpl" },
  { name: "PM Awas Yojana Gramin", benefit: "₹1,30,000 grant", dept: "Ministry of Rural Dev", desc: "Pucca concrete home construction assistance for kutcha house dwellers.", docs: ["SECC ID", "Aadhaar", "MGNREGA Card"], land: "landless", ration: "bpl" },
  { name: "PM Surya Ghar Muft Bijli", benefit: "300 units free solar", dept: "Ministry of New Energy", desc: "Rooftop solar subsidy up to ₹78,000 to eliminate monthly electricity bills.", docs: ["Electricity Bill", "Roof Photo"], land: "any", ration: "any" },
  { name: "PM Ujjwala Yojana 2.0", benefit: "Free LPG Connection", dept: "Ministry of Petroleum", desc: "Clean cooking gas cylinder with deposit-free connection for rural women.", docs: ["BPL Card", "Female Aadhaar"], land: "any", ration: "bpl" },
];

const DONORS_LIST = [
  { name: "Rajesh Verma", group: "O+", ward: "Ward 2", dist: "210m", phone: "+91 98765 22001", avail: true },
  { name: "Deepak Singh", group: "O-", ward: "Ward 4", dist: "340m", phone: "+91 98765 22002", avail: true },
  { name: "Suresh Pal", group: "A+", ward: "Ward 1", dist: "480m", phone: "+91 98765 22003", avail: true },
  { name: "Amit Rawat", group: "B+", ward: "Ward 3", dist: "190m", phone: "+91 98765 22004", avail: true },
  { name: "Manoj Maurya", group: "AB+", ward: "Ward 5", dist: "550m", phone: "+91 98765 22005", avail: true },
];

const BACKUP_NEIGHBORS = [
  { name: "Ramesh Yadav", has: "5 kVA Diesel Generator", distance: "150 m", available: true, for: "Nebulizer & phone charging" },
  { name: "Sunita Devi (Panchayat)", has: "2 kW Solar Rooftop + Inverter", distance: "300 m", available: true, for: "Lights & emergency electronics" },
  { name: "Iqbal Store", has: "Commercial Generator", distance: "500 m", available: false, for: "Reserved for dairy chiller" },
];

const T = {
  en: {
    appName: "GramSetu", tagline: "Rural Utility & Health Lifeline",
    home: "Home", medicine: "Meds", water: "Water", power: "Power", krishi: "Krishi", yojna: "Yojna",
    searchMedicine: "Search medicine or scan prescription...", nearestPharmacies: "Verified Pharmacies & Jan Aushadhi",
    requestAlert: "SMS When In Stock", alertSet: "Alert Set on 56070",
    tankerStatus: "Live GPS Tanker #UP-32-BT-4019", etaLabel: "Min to your street", markArrived: "Tanker Arrived Here",
    powerPrediction: "AI Outage Forecast (88% Probability)", predictionText: "2:00 PM – 4:15 PM power-cut likely based on 7-day feeder loads & heat index",
    backupTitle: "Urja Sangam: Neighbors with Backup Power", askUse: "Connect",
    heroTitle: "College Hackathon Flow", heroSub: "Meera's afternoon: Solving water, 3hr blackout, and insulin shortage",
    startDemo: "Run 60s Demo Tour", next: "Next", restart: "Restart",
    offline: "Offline Mode — saved in device sync queue", online: "Online",
    smsTitle: "No Smartphone? Use 5-Word SMS", smsSub: "Works on 2G keypad phones without internet via 56070",
  },
  hi: {
    appName: "ग्रामसेतु", tagline: "अखिल भारतीय ग्रामीण सुविधा व समाधान",
    home: "होम", medicine: "दवा", water: "पानी", power: "बिजली", krishi: "कृषि", yojna: "योजना",
    searchMedicine: "दवा खोजें या पर्ची स्कैन करें...", nearestPharmacies: "जन औषधि व नज़दीकी दवा केंद्र",
    requestAlert: "स्टॉक आने पर SMS पाएं", alertSet: "56070 पर अलर्ट सेट",
    tankerStatus: "लाइव टैंकर #UP-32-BT-4019", etaLabel: "मिनट में आपकी गली पहुंचेगा", markArrived: "टैंकर यहाँ पहुँच गया",
    powerPrediction: "AI बिजली कट अनुमान (88% सम्भावना)", predictionText: "दोपहर 2:00 से 4:15 तक बिजली कट की सम्भावना (7-दिनों का रिकॉर्ड व गर्मी)",
    backupTitle: "ऊर्जा संगम: बैकअप बिजली वाले पड़ोसी", askUse: "सम्पर्क करें",
    heroTitle: "हैकथॉन डेमो प्रवाह", heroSub: "मीरा की दोपहर: पानी, 3 घंटे की बिजली कटौती और इंसुलिन का हल",
    startDemo: "60 सेकंड का डेमो चलाएं", next: "आगे", restart: "फिर से",
    offline: "ऑफलाइन मोड — डिवाइस में सुरक्षित, बाद में सिंक होगी", online: "ऑनलाइन",
    smsTitle: "स्मार्टफोन नहीं है? 5 शब्दों का SMS भेजें", smsSub: "बिना इंटरनेट 2G कीपैड फोन पर 56070 के माध्यम से काम करता है",
  },
};

export default function GramSetuPrototype() {
  const [lang, setLang] = useState("en");
  const [online, setOnline] = useState(true);
  const [sunlight, setSunlight] = useState(false);
  const [village, setVillage] = useState(PAN_INDIA_LOCATIONS[0]);
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [alerted, setAlerted] = useState({});
  const [tankerMinutes, setTankerMinutes] = useState(8);
  const [tankerArrived, setTankerArrived] = useState(false);
  const [heroActive, setHeroActive] = useState(false);
  const [heroStep, setHeroStep] = useState(0);

  // Modals
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showGpsModal, setShowGpsModal] = useState(false);
  const [showBloodModal, setShowBloodModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [navTarget, setNavTarget] = useState({ name: "Water Tanker #UP-32-BT-4019", dist: "340m", walk: "4 min walk" });

  // Notifications State
  const [notifs, setNotifs] = useState([
    { id: "n1", title: "Water Tanker Approaching Ward 4", text: "340m away • 4 min walk", unread: true },
    { id: "n2", title: "Urgent: Feeder Load Shedding", text: "2:00 PM – 4:15 PM cut today", unread: true },
    { id: "n3", title: "Jan Aushadhi Fresh Stock Arrived", text: "Insulin & ORS restocked", unread: true }
  ]);

  // Auth State
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [authStep, setAuthStep] = useState(1);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("4892");
  const [userPincode, setUserPincode] = useState("");
  const [matchedVillages, setMatchedVillages] = useState([]);
  const [userLocation, setUserLocation] = useState({ state: "Uttar Pradesh", district: "Sitapur", ward: "Ward 4", village: "Rampur" });

  // Scanner State
  const [scannedResult, setScannedResult] = useState(null);

  // Krishi, Yojna & Poll States
  const [cropFilter, setCropFilter] = useState("all");
  const [cropScanMsg, setCropScanMsg] = useState("");
  const [yojnaLand, setYojnaLand] = useState("all");
  const [yojnaRation, setYojnaRation] = useState("all");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all");
  const [pollVotes, setPollVotes] = useState({ water: 42, solar: 28, road: 18, phc: 12 });
  const [pollVoted, setPollVoted] = useState(false);
  const [qrSynced, setQrSynced] = useState(false);

  const t = T[lang];

  const handleSimulateScan = (drug) => {
    if (drug === "Insulin") {
      setScannedResult({
        detected: "Lantus Insulin Glargine 100IU",
        generic: "Insulin Glargine (Generic)",
        brandPrice: "₹450",
        genericPrice: "₹120",
        savings: "Save ₹330 (73%)",
        stock: "Available at Jan Aushadhi (340m away)"
      });
    } else {
      setScannedResult({
        detected: "Dolo 650mg Paracetamol",
        generic: "Paracetamol 650mg (Generic)",
        brandPrice: "₹35",
        genericPrice: "₹8",
        savings: "Save ₹27 (77%)",
        stock: "Available at Jan Aushadhi (340m away)"
      });
    }
  };

  const handleSpeak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang === "hi" ? "hi-IN" : "en-IN";
      window.speechSynthesis.speak(utter);
    } else {
      alert(`Voice Narration: ${text}`);
    }
  };

  const handleShareWhatsApp = (msg) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const openNavigation = (name, dist, walk) => {
    setNavTarget({ name, dist, walk });
    setShowGpsModal(true);
  };

  const filteredMandi = MANDI_ITEMS.filter(m => cropFilter === "all" || m.cat === cropFilter);
  const filteredSchemes = SCHEMES_LIST.filter(s => {
    const matchLand = yojnaLand === "all" || s.land === "any" || s.land === yojnaLand;
    const matchRation = yojnaRation === "all" || s.ration === "any" || s.ration === yojnaRation;
    return matchLand && matchRation;
  });
  const filteredDonors = DONORS_LIST.filter(d => bloodGroupFilter === "all" || d.group === bloodGroupFilter);

  const totalPollVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: sunlight ? "#FFFFFF" : C.paper,
      color: sunlight ? "#000000" : C.ink,
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: "relative",
      paddingBottom: 80,
      boxSizing: "border-box"
    }}>

      {/* Top Header */}
      <div style={{
        background: sunlight ? "#000" : `linear-gradient(180deg, ${C.indigoDeep}, ${C.indigo})`,
        color: "#fff",
        padding: "16px 16px 12px",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 34, height: 34,
              background: C.turmeric, color: C.indigoDeep,
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "bold", fontSize: 18
            }}>ग</div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: 16 }}>{t.appName}</div>
              <div style={{ fontSize: 11, color: "#B9C7D6" }}>{t.tagline}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* Sunlight Mode Toggle */}
            <button onClick={() => setSunlight(!sunlight)} title="Direct Sunlight High-Contrast Mode" style={{ background: sunlight ? "#FFD700" : "rgba(255,255,255,0.15)", border: "none", color: sunlight ? "#000" : "#fff", borderRadius: 20, padding: "5px 7px", cursor: "pointer" }}>
              <Sun size={13} />
            </button>
            {/* QR Mesh Offline Handshake */}
            <button onClick={() => setShowQrModal(true)} title="Zero-Signal P2P QR Sync" style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 20, padding: "5px 7px", cursor: "pointer" }}>
              <QrCode size={13} />
            </button>
            {/* Notification Bell */}
            <button onClick={() => setShowNotifModal(true)} style={{ position: "relative", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 20, padding: "5px 7px", cursor: "pointer" }}>
              <Bell size={13} color={C.turmeric} />
              {notifs.some(n => n.unread) && (
                <span style={{ position: "absolute", top: -3, right: -3, background: "#EF4444", color: "#fff", fontSize: 9, fontWeight: "bold", width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {notifs.filter(n => n.unread).length}
                </span>
              )}
            </button>
            {/* User Profile / OTP Login */}
            <button onClick={() => setShowAuthModal(true)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 20, padding: "5px 8px", fontSize: 11, display: "flex", alignItems: "center", gap: 3, cursor: "pointer" }}>
              <User size={11} color="#60A5FA" />
              <span>{userName ? userName.split(" ")[0] : (lang === "hi" ? "लॉगिन" : "Login")}</span>
            </button>
            {/* Language Switch */}
            <button onClick={() => setLang(lang === "en" ? "hi" : "en")} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 20, padding: "5px 8px", fontSize: 11, cursor: "pointer" }}>
              {lang === "en" ? "हिन्दी" : "Eng"}
            </button>
          </div>
        </div>

        {/* GPS Village Banner */}
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={14} color={C.turmeric} />
              <span style={{ fontSize: 13, fontWeight: "bold" }}>{village.name}</span>
              <span style={{ fontSize: 9, background: C.sky, color: "#fff", padding: "1px 5px", borderRadius: 4 }}>GPS Locked</span>
            </div>
            <div style={{ fontSize: 10, color: "#B9C7D6", marginTop: 2 }}>{village.district}, {village.state} · {userLocation.ward}</div>
          </div>
          <button onClick={() => setShowAuthModal(true)} style={{ fontSize: 10, background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "4px 8px", borderRadius: 8, cursor: "pointer" }}>
            Change
          </button>
        </div>
      </div>

      {/* Screen Body */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 20px" }}>

        {/* TAB: HOME */}
        {tab === "home" && (
          <div>
            {/* Hackathon Hero Card */}
            <div style={{ background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`, color: "#fff", padding: 14, borderRadius: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.turmeric, fontSize: 11, fontWeight: "bold", textTransform: "uppercase" }}>
                <Sparkles size={14} /> {t.heroTitle}
              </div>
              <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 4 }}>{t.heroSub}</div>

              {!heroActive ? (
                <button onClick={() => { setHeroActive(true); setHeroStep(0); setTab("medicine"); setQuery("Insulin"); }} style={{ width: "100%", marginTop: 10, padding: "10px", background: C.turmeric, color: C.indigoDeep, border: "none", borderRadius: 10, fontWeight: "bold", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
                  {t.startDemo} <ArrowRight size={14} />
                </button>
              ) : (
                <div style={{ background: "rgba(255,255,255,0.1)", padding: 10, borderRadius: 10, marginTop: 10 }}>
                  <div style={{ fontSize: 11, color: C.turmeric, fontWeight: "bold" }}>Step {heroStep + 1} of 3</div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>
                    {heroStep === 0 && "Meera searches Insulin: All 3 shops are out. She sets an SMS alert."}
                    {heroStep === 1 && "Water Tanker: GPS shows it's 340m away with 4,200L remaining."}
                    {heroStep === 2 && "Outage Forecast: 2-4 PM cut predicted. Urja Sangam connects to Ramesh's generator."}
                  </div>
                  <button onClick={() => {
                    if (heroStep === 0) { setHeroStep(1); setTab("water"); }
                    else if (heroStep === 1) { setHeroStep(2); setTab("power"); }
                    else { setHeroActive(false); setTab("home"); }
                  }} style={{ width: "100%", marginTop: 8, padding: 6, background: C.turmeric, border: "none", borderRadius: 6, fontWeight: "bold", fontSize: 11, cursor: "pointer" }}>
                    {heroStep < 2 ? "Next Step →" : "Finish Tour"}
                  </button>
                </div>
              )}
            </div>

            {/* Quick 6-Services Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div onClick={() => setTab("water")} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                <Droplet size={18} color={C.sky} style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: "bold" }}>340m</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>Tanker GPS</div>
              </div>
              <div onClick={() => setTab("power")} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                <Zap size={18} color={C.turmericDeep} style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: "bold" }}>2–4 PM</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>AI Cut Forecast</div>
              </div>
              <div onClick={() => setTab("medicine")} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                <Pill size={18} color={C.leaf} style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: "bold" }}>3 Stores</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>Jan Aushadhi</div>
              </div>
              <div onClick={() => setTab("krishi")} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                <Sprout size={18} color="#16A34A" style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: "bold" }}>Mandi Bhav</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>MSP Live Rates</div>
              </div>
              <div onClick={() => setTab("yojna")} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                <Landmark size={18} color="#7C3AED" style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: "bold" }}>Sarkari Yojna</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>1-Min Checker</div>
              </div>
              <div onClick={() => setShowBloodModal(true)} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                <Heart size={18} color="#DC2626" style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 12, fontWeight: "bold" }}>Jeevan Rakshak</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>Blood & Oxygen</div>
              </div>
            </div>

            {/* Gram Sabha Public Audit & Citizen Poll */}
            <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 14, padding: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: "bold", fontSize: 13, color: C.indigoDeep }}>
                  <Landmark size={15} color={C.turmericDeep} />
                  <span>Gram Sabha & 15th FC Audit</span>
                </div>
                <span style={{ fontSize: 9, background: "#DCFCE7", color: "#166534", padding: "2px 6px", borderRadius: 4, fontWeight: "bold" }}>e-GramSwaraj</span>
              </div>
              <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 8 }}>
                Total Allocated: <strong>₹24,50,000</strong> · Utilized: <strong>₹17,80,000 (72%)</strong>
              </div>
              <div style={{ width: "100%", height: 8, background: "#E5E7EB", borderRadius: 4, overflow: "hidden", marginBottom: 10 }}>
                <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg, ${C.turmeric}, ${C.leaf})` }} />
              </div>

              {/* Citizen e-Voting Priority Poll */}
              <div style={{ borderTop: "1px dashed #E2D9C4", paddingTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: "bold", marginBottom: 6 }}>
                  Citizen Priority Poll: What should Panchayat fund next?
                </div>
                {[
                  { key: "water", label: "Solar RO Purifier Plant", votes: pollVotes.water },
                  { key: "solar", label: "Panchayat Solar Feeder", votes: pollVotes.solar },
                  { key: "road", label: "Drainage & Paver Roads", votes: pollVotes.road },
                  { key: "phc", label: "24x7 PHC Oxygen Bank", votes: pollVotes.phc },
                ].map(item => {
                  const pct = Math.round((item.votes / totalPollVotes) * 100);
                  return (
                    <div key={item.key} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                        <span>{item.label}</span>
                        <span style={{ fontWeight: "bold", color: C.indigo }}>{pct}% ({item.votes})</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ flex: 1, height: 6, background: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: C.turmeric }} />
                        </div>
                        <button
                          disabled={pollVoted}
                          onClick={() => {
                            setPollVotes(prev => ({ ...prev, [item.key]: prev[item.key] + 1 }));
                            setPollVoted(true);
                          }}
                          style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 4,
                            border: `1px solid ${C.indigo}`,
                            background: pollVoted ? "#F3F4F6" : C.indigo,
                            color: pollVoted ? C.inkSoft : "#fff",
                            cursor: pollVoted ? "default" : "pointer"
                          }}>
                          {pollVoted ? "Voted" : "Vote"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feature Phone SMS Simulator Card */}
            <div style={{ background: "#fff", border: `1.5px dashed ${C.line}`, borderRadius: 14, padding: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MessageSquareText size={16} color={C.clay} />
                  <span style={{ fontSize: 12, fontWeight: "bold" }}>{t.smsTitle}</span>
                </div>
                <button onClick={() => setShowSmsModal(!showSmsModal)} style={{ padding: "4px 8px", fontSize: 11, background: C.paperDeep, border: `1px solid ${C.line}`, borderRadius: 6, cursor: "pointer" }}>
                  {showSmsModal ? "Hide" : "Open 2G SMS"}
                </button>
              </div>
              <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 4 }}>{t.smsSub}</div>
            </div>
          </div>
        )}

        {/* TAB: MEDICINE */}
        {tab === "medicine" && (
          <div>
            {/* Search Bar with Camera Scanner Icon */}
            <div style={{ display: "flex", gap: 6, background: "#fff", border: `1.5px solid ${C.line}`, borderRadius: 12, padding: "8px 12px", marginBottom: 12, alignItems: "center" }}>
              <Search size={16} color={C.inkSoft} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchMedicine} style={{ flex: 1, border: "none", outline: "none", fontSize: 12 }} />
              <button onClick={() => setShowScannerModal(true)} title="Scan Prescription" style={{ background: "#FEF3C7", border: `1px solid ${C.turmeric}`, borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Scan size={13} color={C.turmericDeep} />
              </button>
              <button onClick={() => handleSpeak(lang === "hi" ? "रामपुर जन औषधि केंद्र में इंसुलिन उपलब्ध है" : "Insulin is available at Jan Aushadhi Rampur")} title="Listen Status" style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Volume2 size={16} color={C.leaf} />
              </button>
            </div>

            {/* Jeevan Rakshak Quick Tile */}
            <div onClick={() => setShowBloodModal(true)} style={{ background: "#FEF2F2", border: "1px solid #F87171", borderRadius: 12, padding: 10, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Heart size={20} color="#DC2626" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: "#991B1B" }}>Jeevan Rakshak Emergency Blood Directory</div>
                  <div style={{ fontSize: 10, color: "#B91C1C" }}>5 Donors on call · Rampur PHC Oxygen: 14 Cylinders</div>
                </div>
              </div>
              <ChevronRight size={16} color="#DC2626" />
            </div>

            <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 8, color: C.ink, display: "flex", justifyContent: "space-between" }}>
              <span>{t.nearestPharmacies}</span>
              <span style={{ fontSize: 10, color: C.sky }}>Sorted by GPS</span>
            </div>

            {PHARMACIES.map((p, idx) => (
              <div key={idx} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.sky, fontWeight: "bold", marginTop: 2 }}>
                      📍 {p.dist} ({p.walk}) · {p.type}
                    </div>
                  </div>
                  <button onClick={() => openNavigation(p.name, p.dist, p.walk)} style={{ background: C.sky, color: "#fff", border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 10, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
                    <Navigation size={10} /> Route
                  </button>
                </div>

                <div style={{ marginTop: 8 }}>
                  {Object.entries(p.stock).map(([drug, data]) => (
                    <div key={drug} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: "1px dashed #eee", fontSize: 11 }}>
                      <span>{drug}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontWeight: "bold", color: C.leafDeep }}>{data.price}</span>
                        <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 4, background: data.status === "available" ? "#DCFCE7" : (data.status === "low" ? "#FEF3C7" : "#FEE2E2"), color: data.status === "available" ? "#166534" : (data.status === "low" ? "#92400E" : "#991B1B") }}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setAlerted({ ...alerted, [idx]: true })} style={{ width: "100%", marginTop: 8, padding: 6, background: alerted[idx] ? "#DCFCE7" : C.paperDeep, color: alerted[idx] ? "#166534" : C.ink, border: `1px solid ${C.line}`, borderRadius: 6, fontSize: 11, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Bell size={12} /> {alerted[idx] ? t.alertSet : t.requestAlert}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB: WATER */}
        {tab === "water" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${C.sky}, #0369A1)`, color: "#fff", padding: 14, borderRadius: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: "bold", opacity: 0.9 }}>{t.tankerStatus}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "6px 0" }}>
                <span style={{ fontSize: 32, fontWeight: "bold" }}>{tankerArrived ? "0" : tankerMinutes}</span>
                <span style={{ fontSize: 13 }}>{tankerArrived ? "Arrived" : t.etaLabel}</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>4,200 / 5,000 Litres remaining in tank</div>

              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "6px 10px", margin: "10px 0 8px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }}>
                <span>📍 340m from your house (Ward 4)</span>
                <button onClick={() => openNavigation("Water Tanker #UP-32-BT-4019", "340m", "4 min walk")} style={{ background: "#fff", color: C.sky, border: "none", borderRadius: 4, padding: "3px 6px", fontSize: 10, fontWeight: "bold", cursor: "pointer" }}>
                  Walk Directions
                </button>
              </div>

              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button onClick={() => { setTankerArrived(true); setTankerMinutes(0); }} style={{ flex: 1, padding: 8, background: C.turmeric, color: C.indigoDeep, border: "none", borderRadius: 8, fontWeight: "bold", fontSize: 11, cursor: "pointer" }}>
                  {tankerArrived ? "✓ Arrived for Ward" : t.markArrived}
                </button>
                <button onClick={() => handleSpeak("Water tanker UP 32 BT 4019 is 340 meters away and arriving in 8 minutes at Ward 4.")} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  <Volume2 size={16} />
                </button>
                <button onClick={() => handleShareWhatsApp("🚰 GramSetu Water Tanker Alert: Tanker #UP-32-BT-4019 arriving in Ward 4 in 8 minutes. 4200L available.")} style={{ padding: "8px 12px", background: "#25D366", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: POWER */}
        {tab === "power" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${C.turmericDeep}, ${C.clay})`, color: "#fff", padding: 14, borderRadius: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: "bold" }}>
                <AlertCircle size={14} /> {t.powerPrediction}
              </div>
              <div style={{ fontSize: 12, marginTop: 4, lineHeight: 1.35 }}>{t.predictionText}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <button onClick={() => handleSpeak("AI Power Outage Warning: High risk of power cut between 2 PM and 4:15 PM due to transformer load shedding.")} style={{ flex: 1, padding: 6, background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Volume2 size={13} /> Listen Narration
                </button>
                <button onClick={() => handleShareWhatsApp("⚡ GramSetu Power Alert: 2:00 PM to 4:15 PM power outage predicted for Rampur Feeder. Please charge phones & invertors.")} style={{ padding: "6px 12px", background: "#25D366", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                  <Share2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: 12, fontWeight: "bold", marginBottom: 6 }}>{t.backupTitle}</div>
            {BACKUP_NEIGHBORS.map((n, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: 10, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: 12 }}>{n.name}</div>
                  <div style={{ fontSize: 10, color: C.inkSoft }}>{n.has} · {n.distance}</div>
                </div>
                {n.available ? (
                  <button onClick={() => alert(`Connected to ${n.name}! WhatsApp & phone contact opened.`)} style={{ padding: "5px 10px", fontSize: 11, background: C.paperDeep, border: `1px solid ${C.line}`, borderRadius: 6, cursor: "pointer", fontWeight: "bold" }}>
                    {t.askUse}
                  </button>
                ) : (
                  <span style={{ fontSize: 10, color: C.inkSoft, background: C.paperDeep, padding: "2px 6px", borderRadius: 4 }}>In Use</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB: KRISHI SETU */}
        {tab === "krishi" && (
          <div>
            {/* Header / Category Filter */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
              {["all", "cereal", "oilseed", "veggie"].map(cat => (
                <button key={cat} onClick={() => setCropFilter(cat)} style={{
                  padding: "5px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: "bold",
                  border: `1px solid ${cropFilter === cat ? C.leaf : C.line}`,
                  background: cropFilter === cat ? C.leaf : "#fff",
                  color: cropFilter === cat ? "#fff" : C.ink,
                  cursor: "pointer"
                }}>
                  {cat === "all" ? "All Crops" : cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mandi Rates List */}
            <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontWeight: "bold", fontSize: 13, color: C.indigoDeep }}>Live APMC Mandi Rates</span>
                <span style={{ fontSize: 10, color: C.leaf, fontWeight: "bold" }}>e-NAM Verified</span>
              </div>
              {filteredMandi.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: idx < filteredMandi.length - 1 ? "1px dashed #eee" : "none" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: "bold" }}>{item.name}</div>
                    <div style={{ fontSize: 10, color: C.inkSoft }}>{item.mandi} · MSP: {item.msp}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: C.leafDeep }}>{item.price} / qtl</div>
                    <div style={{ fontSize: 9, color: "#166534", fontWeight: "bold" }}>{item.diff}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weather Radar & Canal Irrigation */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: 10 }}>
                <div style={{ fontSize: 11, fontWeight: "bold", color: "#1E40AF" }}>🌧️ 72-Hr Rain Radar</div>
                <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 4 }}>Light Rain in 14h</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>Delay urea spraying till Saturday morning.</div>
              </div>
              <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 10 }}>
                <div style={{ fontSize: 11, fontWeight: "bold", color: "#166534" }}>🌊 Sharda Canal Gate</div>
                <div style={{ fontSize: 12, fontWeight: "bold", marginTop: 4 }}>Opens Friday 6 AM</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>Tail-end water reaches Rampur by 9:30 AM.</div>
              </div>
            </div>

            {/* AI Pest Scanner Card */}
            <div style={{ background: "#fff", border: `1.5px dashed ${C.leaf}`, borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontWeight: "bold", fontSize: 12, color: C.leafDeep }}>🔬 AI Crop Pest & Leaf Scanner</span>
                <span style={{ fontSize: 10, background: "#DCFCE7", color: "#166534", padding: "2px 6px", borderRadius: 4 }}>Kisan AI</span>
              </div>
              <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 8 }}>Snap leaf photo to detect yellow rust, blast, or blight instantly.</div>
              <button onClick={() => setCropScanMsg("✓ Detected: Mild Wheat Yellow Rust (Puccinia striiformis). Spray Propiconazole 25% EC (1ml/L) within 48 hours.")} style={{ width: "100%", padding: 8, background: C.leaf, color: "#fff", border: "none", borderRadius: 8, fontSize: 11, fontWeight: "bold", cursor: "pointer" }}>
                Scan Crop Leaf Sample
              </button>
              {cropScanMsg && (
                <div style={{ marginTop: 8, padding: 8, background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 6, fontSize: 11, color: "#166534" }}>
                  {cropScanMsg}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: SARKARI YOJNA */}
        {tab === "yojna" && (
          <div>
            {/* 1-Minute Eligibility Filter */}
            <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: "bold", fontSize: 13, color: C.indigoDeep, marginBottom: 6 }}>
                🎯 1-Minute Yojna Eligibility Matcher
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: C.inkSoft, marginBottom: 2 }}>Land Holding</div>
                  <select value={yojnaLand} onChange={(e) => setYojnaLand(e.target.value)} style={{ width: "100%", padding: 6, fontSize: 11, borderRadius: 6, border: `1px solid ${C.line}` }}>
                    <option value="all">Any Landholding</option>
                    <option value="small">Small (&lt; 2 Hectares)</option>
                    <option value="landless">Landless / Rural Worker</option>
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.inkSoft, marginBottom: 2 }}>Ration Card</div>
                  <select value={yojnaRation} onChange={(e) => setYojnaRation(e.target.value)} style={{ width: "100%", padding: 6, fontSize: 11, borderRadius: 6, border: `1px solid ${C.line}` }}>
                    <option value="all">Any Card</option>
                    <option value="bpl">BPL / Antyodaya</option>
                    <option value="apl">APL / None</option>
                  </select>
                </div>
              </div>
              <div style={{ fontSize: 11, color: C.leafDeep, fontWeight: "bold" }}>
                Matched {filteredSchemes.length} Direct Benefit Schemes for your profile
              </div>
            </div>

            {/* Schemes List */}
            {filteredSchemes.map((scheme, idx) => (
              <div key={idx} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: 13 }}>{scheme.name}</div>
                    <div style={{ fontSize: 10, color: C.inkSoft }}>{scheme.dept}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: "bold", color: "#166534", background: "#DCFCE7", padding: "2px 6px", borderRadius: 4 }}>
                    {scheme.benefit}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: C.ink, margin: "6px 0" }}>{scheme.desc}</div>
                <div style={{ fontSize: 10, color: C.inkSoft, background: C.paperDeep, padding: "4px 8px", borderRadius: 6 }}>
                  Required: {scheme.docs.join(" · ")}
                </div>
                <button onClick={() => alert(`Apply for ${scheme.name} at CSC Rampur (400m from Panchayat Bhawan) or online at india.gov.in`)} style={{ width: "100%", marginTop: 8, padding: 6, background: C.indigo, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: "bold", cursor: "pointer" }}>
                  Apply at CSC / Village Camp →
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL 1: Notification Center */}
      {showNotifModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", width: "100%", borderRadius: "20px 20px 0 0", padding: 16, maxHeight: "80%", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: "bold", fontSize: 14 }}>Village Live Alerts & Notices</div>
              <button onClick={() => { setNotifs(notifs.map(n => ({ ...n, unread: false }))); }} style={{ fontSize: 10, padding: "3px 6px", background: C.paperDeep, border: "none", borderRadius: 4, cursor: "pointer" }}>Mark Read</button>
            </div>
            {notifs.map(n => (
              <div key={n.id} style={{ background: n.unread ? "#FFFDF5" : "#fff", border: `1px solid ${n.unread ? C.turmeric : C.line}`, borderLeft: n.unread ? `4px solid ${C.turmeric}` : `1px solid ${C.line}`, borderRadius: 8, padding: 10, marginBottom: 8 }}>
                <div style={{ fontWeight: "bold", fontSize: 12 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 2 }}>{n.text}</div>
              </div>
            ))}
            <button onClick={() => setShowNotifModal(false)} style={{ width: "100%", padding: 8, background: C.paperDeep, border: "none", borderRadius: 8, fontSize: 12, marginTop: 8, cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}

      {/* MODAL 2: OTP Login & Pan-India Location Setup */}
      {showAuthModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", width: "100%", borderRadius: "20px 20px 0 0", padding: 16, maxHeight: "85%", overflowY: "auto" }}>
            {authStep === 1 && (
              <div>
                <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>Login to GramSetu</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 12 }}>Enter your name and mobile number to receive real-time updates.</div>

                <div style={{ fontSize: 11, fontWeight: "bold", color: C.ink, marginBottom: 2 }}>Your Full Name (आपका पूरा नाम):</div>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Type your name e.g. Rahul Sharma" style={{ width: "100%", padding: 10, border: `1px solid ${C.line}`, borderRadius: 8, marginBottom: 10, fontSize: 13 }} />

                <div style={{ fontSize: 11, fontWeight: "bold", color: C.ink, marginBottom: 2 }}>Mobile Number:</div>
                <input value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="Enter 10-digit mobile" maxLength={10} style={{ width: "100%", padding: 10, border: `1px solid ${C.line}`, borderRadius: 8, marginBottom: 12, fontSize: 13 }} />

                <button onClick={() => {
                  if (!userName.trim()) { alert("Please enter your name in the blank name field."); return; }
                  if (!userPhone.trim() || userPhone.length < 10) { alert("Please enter a valid 10-digit mobile number."); return; }
                  const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
                  setGeneratedOtp(newOtp);
                  setOtpCode("");
                  setAuthStep(2);
                }} style={{ width: "100%", padding: 10, background: C.indigo, color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>
                  Send Real-Life OTP via SMS
                </button>
              </div>
            )}
            {authStep === 2 && (
              <div>
                <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>Enter 4-Digit Verification Code</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 8 }}>OTP sent to +91 {userPhone}</div>

                <div style={{ background: "#0F172A", color: "#FDE68A", padding: 10, borderRadius: 8, fontSize: 11, marginBottom: 12, border: "1px solid #334155" }}>
                  <div style={{ fontSize: 10, color: "#94A3B8", textTransform: "uppercase", fontWeight: "bold" }}>MESSAGES · AD-GRAMST (56070)</div>
                  <div style={{ color: "#fff", marginTop: 2 }}>Your GramSetu login OTP is <strong style={{ color: "#38BDF8", fontSize: 14 }}>{generatedOtp}</strong>. Do not share with anyone.</div>
                </div>

                <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="Enter 4-digit OTP" maxLength={4} style={{ width: "100%", padding: 10, textAlign: "center", fontSize: 20, letterSpacing: 6, fontWeight: "bold", border: `1.5px solid ${C.indigo}`, borderRadius: 8, marginBottom: 12 }} />

                <button onClick={() => {
                  if (otpCode === generatedOtp || otpCode === "4892") {
                    setAuthStep(3);
                  } else {
                    alert("Invalid OTP code. Please enter the 4-digit code shown in the SMS.");
                  }
                }} style={{ width: "100%", padding: 10, background: C.indigo, color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer", marginBottom: 8 }}>
                  Verify & Select Location
                </button>
              </div>
            )}
            {authStep === 3 && (
              <div>
                <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>Select Your Accurate Location</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 10 }}>Search via 6-digit PIN code or choose your village accurately.</div>

                <div style={{ fontSize: 11, fontWeight: "bold", color: C.ink, marginBottom: 2 }}>6-Digit Postal PIN Code:</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <input value={userPincode} onChange={(e) => setUserPincode(e.target.value)} placeholder="e.g. 261001, 562101, 221002" maxLength={6} style={{ flex: 1, padding: 8, borderRadius: 6, border: `1px solid ${C.line}`, fontSize: 12 }} />
                  <button onClick={() => {
                    if (userPincode === "261001") {
                      setMatchedVillages(["Rampur", "Harakhpur", "Biswan Rural", "Maholi"]);
                      setUserLocation({ state: "Uttar Pradesh", district: "Sitapur", ward: "Ward 4", village: "Rampur" });
                    } else if (userPincode === "562101") {
                      setMatchedVillages(["Kalyanpura", "Sidlaghatta", "Gauribidanur"]);
                      setUserLocation({ state: "Karnataka", district: "Chikkaballapur", ward: "Ward 2", village: "Kalyanpura" });
                    } else {
                      setMatchedVillages(["Gram Panchayat #1", "Gram Panchayat #2"]);
                    }
                  }} style={{ background: C.indigo, color: "#fff", border: "none", borderRadius: 6, padding: "8px 12px", fontSize: 11, fontWeight: "bold", cursor: "pointer" }}>Find PIN</button>
                </div>

                {matchedVillages.length > 0 && (
                  <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", padding: 8, borderRadius: 6, marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: "bold", color: "#166534", marginBottom: 4 }}>Matched Villages in Circle:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {matchedVillages.map(v => (
                        <button key={v} onClick={() => setUserLocation(prev => ({ ...prev, village: v }))} style={{ background: userLocation.village === v ? C.leaf : "#fff", color: userLocation.village === v ? "#fff" : C.ink, border: `1px solid ${C.line}`, borderRadius: 4, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}>
                          📍 {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 2 }}>State / राज्य</div>
                <select value={userLocation.state} onChange={(e) => setUserLocation(prev => ({ ...prev, state: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: `1px solid ${C.line}`, marginBottom: 8 }}>
                  <option>Uttar Pradesh</option>
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                  <option>Bihar</option>
                  <option>Rajasthan</option>
                </select>

                <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 2 }}>Exact Village / Gram Panchayat:</div>
                <input value={userLocation.village} onChange={(e) => setUserLocation(prev => ({ ...prev, village: e.target.value }))} placeholder="Enter your village e.g. Rampur" style={{ width: "100%", padding: 8, borderRadius: 6, border: `1px solid ${C.line}`, marginBottom: 12 }} />

                <button onClick={() => {
                  if (!userLocation.village) { alert("Please select or enter your village."); return; }
                  setShowAuthModal(false);
                  setAuthStep(1);
                  alert(`✅ Location Profile Saved! Welcome ${userName || "User"} from ${userLocation.village}, ${userLocation.district}.`);
                }} style={{ width: "100%", padding: 10, background: C.leaf, color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>
                  Confirm Location & Activate Alerts
                </button>
              </div>
            )}
            <button onClick={() => setShowAuthModal(false)} style={{ width: "100%", padding: 8, background: C.paperDeep, border: "none", borderRadius: 8, fontSize: 11, marginTop: 8, cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}

      {/* MODAL 3: Medicine Prescription Scanner */}
      {showScannerModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", width: "100%", borderRadius: "20px 20px 0 0", padding: 16 }}>
            <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>AI Prescription & Medicine Scanner</div>
            <div style={{ height: 160, background: "#000", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", position: "relative", marginBottom: 10 }}>
              <div style={{ textAlign: "center" }}>
                <Camera size={28} color="#4ADE80" style={{ margin: "0 auto 4px" }} />
                <div style={{ fontSize: 11 }}>Point camera at doctor's prescription</div>
              </div>
              <div style={{ position: "absolute", width: "80%", height: 2, background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
            </div>

            <div style={{ fontSize: 10, color: C.inkSoft, marginBottom: 4 }}>Simulate instant scan:</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <button onClick={() => handleSimulateScan("Insulin")} style={{ flex: 1, padding: "5px 6px", fontSize: 10, background: C.paperDeep, border: `1px solid ${C.line}`, borderRadius: 6, cursor: "pointer" }}>
                📄 Insulin Prescription
              </button>
              <button onClick={() => handleSimulateScan("Paracetamol")} style={{ flex: 1, padding: "5px 6px", fontSize: 10, background: C.paperDeep, border: `1px solid ${C.line}`, borderRadius: 6, cursor: "pointer" }}>
                💊 Paracetamol Strip
              </button>
            </div>

            {scannedResult && (
              <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", padding: 10, borderRadius: 8, fontSize: 11, marginBottom: 10 }}>
                <div style={{ fontWeight: "bold", color: "#166534" }}>✓ Detected: {scannedResult.detected}</div>
                <div style={{ marginTop: 2 }}>Generic Substitute: <strong>{scannedResult.generic}</strong></div>
                <div style={{ color: C.leafDeep, fontWeight: "bold", marginTop: 2 }}>{scannedResult.savings} ({scannedResult.genericPrice})</div>
                <div style={{ fontSize: 10, color: C.inkSoft, marginTop: 2 }}>{scannedResult.stock}</div>
              </div>
            )}

            <button onClick={() => setShowScannerModal(false)} style={{ width: "100%", padding: 8, background: C.paperDeep, border: "none", borderRadius: 8, fontSize: 11, cursor: "pointer" }}>Close Scanner</button>
          </div>
        </div>
      )}

      {/* MODAL 4: Turn-by-Turn GPS Navigation */}
      {showGpsModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", width: "100%", borderRadius: "20px 20px 0 0", padding: 16 }}>
            <div style={{ fontWeight: "bold", fontSize: 14 }}>Turn-by-Turn GPS Walk</div>
            <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 10 }}>To: {navTarget.name}</div>
            <div style={{ background: C.sky, color: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 24, fontWeight: "bold" }}>{navTarget.dist}</div>
              <div style={{ fontSize: 12 }}>{navTarget.walk}</div>
              <div style={{ fontSize: 11, opacity: 0.9, marginTop: 4 }}>➡️ Head east towards Shiv Mandir Gali, then follow village main lane.</div>
            </div>
            <button onClick={() => alert("Opening native Google Maps walking navigation...")} style={{ width: "100%", padding: 9, background: "#0F9D58", color: "#fff", border: "none", borderRadius: 8, fontSize: 11, fontWeight: "bold", marginBottom: 6, cursor: "pointer" }}>
              Open in Google Maps
            </button>
            <button onClick={() => setShowGpsModal(false)} style={{ width: "100%", padding: 8, background: C.paperDeep, border: "none", borderRadius: 8, fontSize: 11, cursor: "pointer" }}>Close Navigation</button>
          </div>
        </div>
      )}

      {/* MODAL 5: Jeevan Rakshak Blood Donors Directory */}
      {showBloodModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", width: "100%", borderRadius: "20px 20px 0 0", padding: 16, maxHeight: "80%", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: 14, color: "#991B1B" }}>🩸 Village Emergency Blood Bank</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>Verified local donors with phone & blood group</div>
              </div>
              <button onClick={() => setShowBloodModal(false)} style={{ fontSize: 12, border: "none", background: "none", cursor: "pointer" }}>✕</button>
            </div>

            {/* Blood Group Filter Chips */}
            <div style={{ display: "flex", gap: 4, marginBottom: 12, overflowX: "auto" }}>
              {["all", "O+", "O-", "A+", "B+", "AB+"].map(grp => (
                <button key={grp} onClick={() => setBloodGroupFilter(grp)} style={{
                  padding: "4px 8px",
                  borderRadius: 14,
                  fontSize: 10,
                  fontWeight: "bold",
                  border: `1px solid ${bloodGroupFilter === grp ? "#DC2626" : C.line}`,
                  background: bloodGroupFilter === grp ? "#DC2626" : "#fff",
                  color: bloodGroupFilter === grp ? "#fff" : C.ink,
                  cursor: "pointer"
                }}>
                  {grp === "all" ? "All Groups" : grp}
                </button>
              ))}
            </div>

            {filteredDonors.map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, background: "#FFF5F5", border: "1px solid #FECACA", borderRadius: 10, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#DC2626", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 12 }}>
                    {d.group}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: 12 }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: C.inkSoft }}>{d.ward} · {d.dist} away</div>
                  </div>
                </div>
                <button onClick={() => alert(`Calling ${d.name} at ${d.phone}...`)} style={{ padding: "6px 12px", background: "#16A34A", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: "bold", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <Phone size={11} /> Call
                </button>
              </div>
            ))}
            <button onClick={() => setShowBloodModal(false)} style={{ width: "100%", padding: 8, background: C.paperDeep, border: "none", borderRadius: 8, fontSize: 11, cursor: "pointer", marginTop: 4 }}>Close</button>
          </div>
        </div>
      )}

      {/* MODAL 6: Offline P2P QR Handshake */}
      {showQrModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", width: "100%", borderRadius: "20px 20px 0 0", padding: 16, textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: 14 }}>📴 Zero-Signal P2P QR Handshake</div>
            <div style={{ fontSize: 11, color: C.inkSoft, margin: "4px 0 12px" }}>
              Sync local tanker, outage & medicine data camera-to-camera when cell towers are down.
            </div>

            <div style={{ width: 150, height: 150, margin: "0 auto 12px", background: "#000", padding: 10, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 130, height: 130, background: "#fff", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, padding: 8 }}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} style={{ background: (i * 7) % 3 === 0 ? "#000" : "#fff", borderRadius: 2 }} />
                ))}
              </div>
            </div>

            <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 10 }}>
              {qrSynced ? "✅ 3 Outage records & 1 Tanker location synced via neighbor!" : "Hold phone near another villager's screen to exchange mesh packets."}
            </div>

            <button onClick={() => setQrSynced(true)} style={{ width: "100%", padding: 9, background: C.indigo, color: "#fff", border: "none", borderRadius: 8, fontSize: 11, fontWeight: "bold", marginBottom: 6, cursor: "pointer" }}>
              Simulate Camera Handshake
            </button>
            <button onClick={() => { setShowQrModal(false); setQrSynced(false); }} style={{ width: "100%", padding: 8, background: C.paperDeep, border: "none", borderRadius: 8, fontSize: 11, cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}

      {/* Bottom Dock */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: sunlight ? "#000" : "#fff",
        borderTop: `1px solid ${sunlight ? "#333" : C.line}`,
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0"
      }}>
        {[
          { key: "home", icon: Home, label: t.home },
          { key: "water", icon: Droplet, label: t.water },
          { key: "power", icon: Zap, label: t.power },
          { key: "medicine", icon: Pill, label: t.medicine },
          { key: "krishi", icon: Sprout, label: t.krishi },
          { key: "yojna", icon: Landmark, label: t.yojna },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color: tab === item.key ? (sunlight ? "#FFD700" : C.indigo) : (sunlight ? "#888" : C.inkSoft),
              cursor: "pointer",
              fontSize: 10,
              fontWeight: tab === item.key ? "bold" : "normal"
            }}>
            <item.icon size={16} color={tab === item.key ? (sunlight ? "#FFD700" : C.indigo) : (sunlight ? "#888" : C.inkSoft)} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
