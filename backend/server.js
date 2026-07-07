const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// 1. Import all your routes
const uploadRoute = require("./routes/uploadRoute");
const projectRoute = require("./routes/projectRoute");
const aiRoute = require("./routes/aiRoute");

const app = express();

// ============================================================
// CRITICAL: Use a hardcoded port. No env var ambiguity.
// Azure App Service default for custom containers is 8080.
// ============================================================
const PORT = 8080;

// Log all incoming requests (debug: see if Azure probe reaches us)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://testpilot-ui-fudpa7ahfdb7dyd2.southeastasia-01.azurewebsites.net'
    ],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// ============================================================
// CRITICAL: Register the health/root route BEFORE anything else.
// Azure's warmup probe hits "/" — this MUST respond immediately.
// ============================================================
app.get("/", (req, res) => {
    res.status(200).json({ message: "TestPilot AI Backend Running 🚀" });
});

// Register API Routes
app.use("/api", uploadRoute);
app.use("/api/projects", projectRoute);
app.use("/api/ai", aiRoute);

// ============================================================
// CRITICAL: Start listening IMMEDIATELY, BEFORE MongoDB.
// Azure's warmup probe must get a 200 response ASAP.
// MongoDB connection happens in the background afterward.
// ============================================================
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server listening on 0.0.0.0:${PORT}`);

    // Connect to MongoDB AFTER the server is already accepting requests
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("✅ MongoDB Connected Successfully");
        })
        .catch((err) => {
            console.error("❌ MongoDB Connection Error:", err);
        });
});

server.on("error", (err) => {
    console.error("❌ Server error:", err);
});