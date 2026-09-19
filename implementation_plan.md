# GramSetu 2.5: GPS Navigation, Mobile OTP Login, Notification Center & Medicine Scanner

This implementation plan outlines the upgrades requested to transform GramSetu into a pan-India platform with robust GPS location capabilities, mobile number + OTP verification, onboarding location setup, notification center, and medicine prescription/barcode scanner.

---

## Key Feature Upgrades

### 1. Mobile Number + OTP Login System
- **Login Trigger & Modal**:
  - Unauthenticated or first-time users can log in via their 10-digit Indian mobile number (`+91 XXXXX XXXXX`).
  - **OTP Generation & Verification**: Simulates real-time SMS delivery with a dynamic toast notification (`"GramSetu OTP: 4892. Valid for 10 min."`), OTP timer (60s countdown), and one-click auto-fill for frictionless hackathon demonstration.
  - **Post-Login Location Onboarding Flow**:
    - After verifying OTP, new users complete their profile with granular Pan-India location:
      - State (All 28 States & 8 UTs)
      - District / City
      - Tehsil / Block
      - Village / Gram Panchayat / Ward
    - **One-Tap "Use My GPS Location"**: Uses HTML5 `navigator.geolocation` to get exact coordinates and reverse-geocode to nearest village / district.
    - Persistent Session in `localStorage`: Remembers logged-in user profile, phone number, and location across refreshes, with an "Edit Profile / Switch Village" option.

### 2. Upgraded GPS Location & Navigation Engine
- **Live User GPS Coordinates**: Captures real-time device latitude/longitude (with fallback to village center).
- **Water Supply Tanker GPS Tracking**:
  - Live distance in meters/km from the user's specific location (e.g. `340m away • 4 min walk`).
  - **"Navigate to Tanker"**: In-app mini turn-by-turn route overlay or direct launch to Google Maps navigation (`geo:lat,lng` / `https://maps.google.com/?q=...`).
- **Medicine Store GPS Locator**:
  - Real-time distance calculation for every Jan Aushadhi Kendra, PHC, and private chemist from the user's current GPS location.
  - Sorted by closest distance, with "Get Walking Directions" button and interactive Leaflet map pin focus.

### 3. Real-Time Notification Center (Bell Icon + Badge)
- **Top Bar Notification Bell**: With animated unread count badge (e.g. `3 unread`).
- **Interactive Notification Drawer**:
  - Water Tanker Dispatch Alert (with distance and ETA).
  - Electricity Substation Feeder maintenance schedule notice.
  - Jan Aushadhi Medicine Restock alert (Insulin / ORS stock update).
  - Gram Panchayat village meeting announcement.
  - "Mark All as Read" & direct tap-to-navigate to relevant module.

### 4. Medicine Scanner (Prescription & Strip/Barcode Scanner)
- **Camera Viewfinder & Prescription Upload**:
  - Interactive camera scanner viewfinder in the Medicine tab (`Swasthya Setu`).
  - Supports live device camera stream (`navigator.mediaDevices.getUserMedia`) with fallback demo scanner for desktop/simulators.
  - **AI OCR & Barcode Recognition Simulation**:
    - Scans doctor's prescription or medicine strip (e.g., Paracetamol, Insulin, Metformin, Inhaler).
    - Automatically extracts medicine name, dosage, and finds matching Jan Aushadhi generic alternative.
    - Instantly shows closest store with stock, price comparison (Generic ₹18 vs Brand ₹95), and 1-tap stock reservation.

### 5. Pan-India Nationwide Coverage
- Location selection database expanded beyond Uttar Pradesh to support users from all Indian regions (Maharashtra, Bihar, Karnataka, West Bengal, Rajasthan, Gujarat, Tamil Nadu, Madhya Pradesh, etc.) with smart search and GPS auto-detect.

---

## Proposed File Changes

### [index.html](file:///c:/Users/sonof/OneDrive/Desktop/website/index.html)
- Add Notification Bell Icon with unread badge in the header.
- Add User Profile & Login status button in the header.
- Add OTP Login & Location Setup Modal.
- Add Notification Center Modal/Drawer.
- Add Medicine Scanner Modal with camera viewport and prescription scanning presets.
- Add GPS distance tags to all water tankers and pharmacy cards.

### [style.css](file:///c:/Users/sonof/OneDrive/Desktop/website/style.css)
- Styling for OTP input boxes (digit squares with focus transitions).
- Notification drawer styles (unread highlights, time-ago chips, category icons).
- Camera scanner overlay styles (pulsing laser scan line, targeting reticle, camera feed container).
- Location setup form styles (GPS auto-detect badge, dropdown cascades).

### [app.js](file:///c:/Users/sonof/OneDrive/Desktop/website/app.js)
- User Authentication state machine (`isLoggedIn`, `phone`, `userLocation`, `otp`).
- Geolocation handler using `navigator.geolocation.getCurrentPosition`.
- Haversine distance calculator between user GPS and village utilities (tankers, pharmacies, boreholes).
- Notification center state and unread badge management.
- WebRTC camera scanner integration (`navigator.mediaDevices.getUserMedia`) with simulated AI prescription OCR.
- Expanded nationwide location dictionary.

### [gramsetu_prototype.jsx](file:///c:/Users/sonof/OneDrive/Desktop/website/gramsetu_prototype.jsx)
- Sync React component with OTP login modal, location setup, notification drawer, GPS distances, and prescription scanner.

---

## Verification Plan

### Automated / Browser Verification
1. Start local server and test via HTTP requests and headless Chrome:
   - Verify `index.html`, `style.css`, and `app.js` return 200 OK.
   - Test OTP generation and verification flow.
   - Verify location profile saving and retrieval in `localStorage`.
   - Test GPS geolocation calculation and distance sorting.
   - Test Notification Center unread badge counter and dismissals.
   - Test Medicine Scanner modal and simulated OCR recognition.
2. Update `walkthrough.md` with visual guides and instructions for hackathon judges.
