# 🌾 GramSetu (ग्रामसेतु)
### Pan-India Rural Lifeline & Utility Intelligence Platform

> **College Hackathon Presentation & Rural Civic-Tech Innovation**  
> Empowering rural communities across India with live GPS water tanker tracking, AI electricity outage forecasts, emergency Jan Aushadhi generic medicine locator, and 2G feature phone offline SMS fallback.

🌐 **Live Web & PWA Install Link:** [https://gram-setu-iota.vercel.app](https://gram-setu-iota.vercel.app)  
📱 **Direct Mobile & Desktop Install:** Visit the link in Google Chrome, Safari, or Edge and click **"Install App"** to add directly to your home screen with zero app store download needed.

---

## 🌟 Core Pillars & Key Features

### 1. 💧 Jal Setu (Water Supply Intelligence)
- **Live GPS Water Tanker Telemetry**: Real-time vehicle speed, remaining capacity gauge (4,200L / 5,000L), route sequence, and arrival confirmations.
- **Turn-by-Turn Walking Directions**: Dynamic walking route milestones guiding residents to the nearest moving tanker or community borehole.
- **Piped Tap Water Schedules**: Monitored pressure valves (2.4 Bar normal) and community well TDS purity meters.

### 2. ⚡ Urja Setu (Electricity & Outage Prediction)
- **AI Load-Shedding Predictor**: 88% probability forecast calculated from 7-day feeder telemetry, regional temperature spikes, and pump loads.
- **3-Phase Voltage Monitoring**: Real-time Phase A, B, and C voltage gauges (228V, 214V, 226V) with transformer load monitoring.
- **Urja Sangam (P2P Community Power Backup)**: Connects families needing emergency power for nebulizers or phone charging with solar-backed neighbors.

### 3. 💊 Swasthya Setu (Emergency Medicine & Jan Aushadhi)
- **Pradhan Mantri Jan Aushadhi Kendra Locator**: Real-time stock availability and price transparency (up to 85% cost savings vs. branded drugs).
- **AI Prescription & Strip Camera Scanner**: Smart OCR viewfinder detects branded medicines and automatically recommends Jan Aushadhi generic substitutes.
- **1-Click Emergency Ambulance & ASHA Connect**: Direct dispatch for 108 ambulances and ASHA healthcare workers.

### 4. 📍 Authentic Indian Location & PIN Code Onboarding
- **Full Pan-India Coverage**: Search by 6-digit postal PIN code (e.g., 261001, 562101, 221002, 413102) with matched postal circles and Gram Panchayats.
- **Accurate Real-Life SMS OTP**: Authentic telecom push notifications (`AD-GRAMST (56070)`) with manual 4-digit code entry and resend timers.

### 5. 📡 Offline-First & Feature Phone Resilience
- **Offline Sync Pipeline**: Actions taken in zero-connectivity zones are stored locally and auto-synced with the Panchayat server when connectivity resumes.
- **5-Word 2G SMS / USSD Engine**: Works on basic feature phones (Nokia 105, JioBharat) with standard SMS commands (e.g., `WATER`, `BIJLI`, `DAWA`).

---

## 🎨 Civic-Tech Indian Earth Palette Design
- **Indigo Deep (`#102133`) & Indigo (`#1C3550`)**: Represents trust, digital infrastructure, and stability.
- **Turmeric (`#E0921E`)**: Energy, solar power, and community vitality.
- **Clay (`#B64C2E`)**: Earth and infrastructure reporting.
- **Leaf (`#2F7A46`)**: Health, agriculture, and Jan Aushadhi medicines.
- **Paper (`#FAF6EC`)**: High-contrast, sunlight-readable paper background.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)
- **Mapping & GIS**: Leaflet.js Interactive Satellite & Sensor Overlays
- **Icons**: Lucide Icons
- **PWA**: Web App Manifest (`manifest.json`) for Google Chrome desktop and mobile install
- **SEO**: Complete `sitemap.xml` and `robots.txt` configuration

---

## 🚀 Running Locally
1. Clone or open the folder:
   ```bash
   git clone https://github.com/rohitkumar9112007/GramSetu.git
   cd GramSetu
   ```
2. Start any local web server:
   ```bash
   python -m http.server 3000
   ```
3. Open `http://localhost:3000` in Google Chrome.

---

## 📜 License
Developed for College Hackathons and Rural Empowerment. Open source for community public benefit.
