const express = require("express");
const ApiProject = require("../models/ApiProject");

const router = express.Router();

router.post("/save", async (req, res) => {
    try {
        const { endpoints } = req.body;
        
        // Create a new project document in MongoDB
        const newProject = new ApiProject({
            name: "Uploaded Swagger API",
            endpoints: endpoints
        });

        await newProject.save();
        
        res.json({ 
            success: true, 
            message: "Project saved to database successfully!", 
            projectId: newProject._id 
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to save project", error: err.message });
    }
});

module.exports = router;