const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const uploadRoute = require("./routes/uploadRoute");
const projectRoute = require("./routes/projectRoute");
const aiRoute = require("./routes/aiRoute");

const app = express();

// ============================================================
// Port: Azure injects WEBSITES_PORT or PORT. Fallback to 8080.
// ============================================================
const PORT = process.env.WEBSITES_PORT || process.env.PORT || 8080;

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
// Health check — MUST be the very first route.
// Returns 200 immediately for Azure warmup probe.
// ============================================================
app.get("/", (req, res) => {
    res.status(200).send("OK");
});

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Register API Routes
app.use("/api", uploadRoute);
app.use("/api/projects", projectRoute);
app.use("/api/ai", aiRoute);

// ============================================================
// Use Node's native http.createServer to guarantee the socket
// binds and responds, bypassing any Express 5 quirks.
// ============================================================
const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server listening on 0.0.0.0:${PORT}`);

    // Connect to MongoDB AFTER the server is accepting requests
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
        mongoose.connect(mongoUri)
            .then(() => console.log("✅ MongoDB Connected Successfully"))
            .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));
    } else {
        console.warn("⚠️ MONGO_URI not set — skipping database connection");
    }
});

server.on("error", (err) => {
    console.error("❌ Server error:", err);
});