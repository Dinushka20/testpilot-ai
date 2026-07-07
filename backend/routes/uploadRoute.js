// backend/routes/uploadRoute.js
const express = require("express");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("swagger"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        // Convert the uploaded buffer into a readable string and parse the JSON
        const swagger = JSON.parse(req.file.buffer.toString());
        const paths = swagger.paths || {};
        const endpoints = [];

        // Loop through the paths and HTTP methods to extract them
        Object.keys(paths).forEach((path) => {
            Object.keys(paths[path]).forEach((method) => {
                endpoints.push({
                    method: method.toUpperCase(),
                    path: path
                });
            });
        });

        res.json({
            success: true,
            endpoints
        });
    } catch (err) {
        res.status(400).json({ message: "Invalid Swagger JSON format" });
    }
});

module.exports = router;