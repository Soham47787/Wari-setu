import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent in-memory + file-backed storage for live temple operational status
const STATE_FILE_PATH = path.join(process.cwd(), "temple_live_state.json");

const defaultTempleState = {
  lastUpdated: {
    mr: "आत्ताच थेट अपडेट केलेले (Live)",
    hi: "अभी लाइव अपडेट किया गया",
    en: "Live Synchronized Feed"
  },
  templeStatus: "Open", // 'Open' | 'Closed' | 'Aarti' | 'SpecialDarshan' | 'Cleaning'
  templeStatusText: {
    mr: "श्री विठ्ठल रुक्मिणी मुख्य मंदिर सुरू आहे (दर्शन खुले)",
    hi: "श्री विट्ठल रुक्मिणी मुख्य मंदिर खुला है (दर्शन चालू)",
    en: "Shri Vitthal Rukmini Main Temple is OPEN for Darshan"
  },
  darshanDate: "२९ ऑगस्ट २०२६ (आषाढी एकादशी सोहळा)",
  templeHours: "सकाळी ०४:०० ते रात्री ११:३०",
  crowdLevel: "High",
  mukhDarshanWaitMins: 40,
  charanSparshWaitHours: 4.5,
  queueLengthMeters: 1800,
  nextAartiName: {
    mr: "धूपारती (सायंकाळी)",
    hi: "धूपारती (संध्याकालीन)",
    en: "Dhoop Aarti (Evening)"
  },
  nextAartiTime: "०७:०० PM",
  vipQueueStatus: "Open",
  seniorCitizenQueueStatus: "Priority Line Active",
  palkhiStageLocation: {
    mr: "वाखरी मुक्काम (पंढरपूरजवळ ५ किमी)",
    hi: "वाखरी विश्राम (पंढरपुर निकट 5 किमी)",
    en: "Wakhari Halt (5 km to Pandharpur)"
  },
  activeGates: [
    { mr: "गेट १ (महाद्वार घाट - सामान्य रांग)", hi: "गेट 1 (महाद्वार घाट - सामान्य कतार)", en: "Gate 1 (Mahadwar Ghat - General Queue)", status: "open" },
    { mr: "गेट २ (पश्चिम दर्शन मंडप)", hi: "गेट 2 (पश्चिम दर्शन मंडप)", en: "Gate 2 (West Darshan Pavilion)", status: "open" },
    { mr: "गेट ३ (दक्षिण व्हीआयपी व वृद्ध प्रवेशद्वार)", hi: "गेट 3 (दक्षिण वीआईपी व वरिष्ठ नागरिक)", en: "Gate 3 (South VIP & Seniors Entry)", status: "open" },
    { mr: "गेट ४ (नामदेव पायरी मार्ग)", hi: "गेट 4 (नामदेव पायरी मार्ग)", en: "Gate 4 (Namdev Steps Route)", status: "open" }
  ],
  noticeMessage: {
    mr: "श्री विठ्ठल रुक्मिणी गाभारा दर्शनासाठी मुख दर्शन रांग महाद्वार घाट येथून संथ गतीने सुरू आहे. ज्येष्ठ नागरिकांनी रांगेत मोफत ओआरएस व जलसेवेचा लाभ घ्यावा.",
    hi: "श्री विट्ठल मंदिर परिसर में मुख दर्शन पंक्ति सुचारू रूप से चल रही है। वरिष्ठ नागरिक कतार में निःशुल्क ओआरएस व जल सेवा का लाभ लें।",
    en: "Mukh Darshan queue is moving steadily from Mahadwar Ghat. Free ORS and drinking water counters are available for senior pilgrims along the route."
  },
  emergencyBroadcastNotice: "🚩 श्री विठ्ठल रुक्मिणी मंदिर पंढरपूर: आज मुख्य महापूजा वेळेत संपन्न झाली असून भाविकांसाठी दर्शन सुरळीत चालू आहे. गर्दीच्या ठिकाणी सेवेकऱ्यांच्या सूचनांचे पालन करावे."
};

// Load saved state if exists
let currentTempleState = defaultTempleState;
try {
  if (fs.existsSync(STATE_FILE_PATH)) {
    const fileContent = fs.readFileSync(STATE_FILE_PATH, "utf-8");
    currentTempleState = { ...defaultTempleState, ...JSON.parse(fileContent) };
  }
} catch (e) {
  console.error("Error reading saved temple state:", e);
}

function saveStateToDisk() {
  try {
    fs.writeFileSync(STATE_FILE_PATH, JSON.stringify(currentTempleState, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving temple state to disk:", e);
  }
}

// 1. Health API Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. Fetch Live Temple Status
app.get("/api/temple-status", (_req, res) => {
  res.json(currentTempleState);
});

// 3. Update Temple Status (Admin)
app.post("/api/temple-status", (req, res) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== "object") {
      return res.status(400).json({ error: "Invalid updates body" });
    }

    currentTempleState = {
      ...currentTempleState,
      ...updates,
      lastUpdated: {
        mr: `आत्ताच थेट अपडेट केलेले (${new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' })})`,
        hi: `अभी लाइव अपडेट किया गया (${new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })})`,
        en: `Just Updated (${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})`
      }
    };

    saveStateToDisk();
    res.json({ success: true, status: currentTempleState });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update temple state" });
  }
});

// 4. Admin Auth API
app.post("/api/admin/auth", (req, res) => {
  const { username, password } = req.body;
  if (username === "Soham@2006" && password === "25042006") {
    return res.json({
      success: true,
      user: {
        id: "admin_soham_2006",
        name: "सोहम सर (Chief Temple Admin)",
        phone: "9822000001",
        city: "पंढरपूर (Pandharpur HQ)",
        gender: "male",
        role: "admin",
        bloodGroup: "O+",
        emergencyContactName: "मंदिर नियंत्रण कक्ष",
        emergencyContactPhone: "02186-224466",
        district: "सोलापूर",
        dindiName: "श्री विठ्ठल रुक्मिणी मंदिर समिती पंढरपूर",
        isLoggedIn: true,
        isAdmin: true,
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      }
    });
  }
  return res.status(401).json({ success: false, message: "Invalid admin credentials" });
});

// Vite middleware for development & SPA static fallback for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WariSeva server listening on http://localhost:${PORT}`);
  });
}

startServer();
