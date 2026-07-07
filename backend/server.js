require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// 1. Import all your routes
const uploadRoute = require("./routes/uploadRoute");
const projectRoute = require("./routes/projectRoute");
const aiRoute = require("./routes/aiRoute");

const app = express();

// --- NEW SECURITY CONFIGURATION ---
// Explicitly allow your frontend URLs to bypass the CORS block
const corsOptions = {
    origin: [
        'http://localhost:5173', // For local development
        'https://testpilot-ui-fudpa7ahfdb7dyd2.southeastasia-01.azurewebsites.net' // Live Azure UI
    ],
    credentials: true, // Required if you ever add cookies/authentication later
};

app.use(cors(corsOptions));
// ----------------------------------

app.use(express.json());

// 2. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
    });

// 3. Register your API Routes
app.use("/api", uploadRoute);           // Handles: POST /api/upload
app.use("/api/projects", projectRoute); // Handles: POST /api/projects/save
app.use("/api/ai", aiRoute);            // Handles: POST /api/ai/generate

// 4. Default Route
app.get("/", (req, res) => {
    res.json({
        message: "TestPilot AI Backend Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});