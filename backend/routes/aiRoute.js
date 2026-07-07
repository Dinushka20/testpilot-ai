// backend/routes/aiRoute.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/generate", async (req, res) => {
    const { method, path } = req.body;

    const prompt = `You are an expert API QA Engineer. Generate 3 realistic test cases for this API endpoint: ${method} ${path}.
    Respond ONLY in valid JSON format like this exact structure, with no markdown, no conversational text, and no backticks:
    [
      {"description": "Test valid request", "expectedStatus": "200"},
      {"description": "Test invalid missing data", "expectedStatus": "400"}
    ]`;

    try {
        // Send the request to Groq's Cloud API instead of localhost
        const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
            model: "llama-3.1-8b-instant", // Groq's LLaMA 3 model ID
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2, // Keep it low for strict JSON output
            stream: false
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        // Extract Groq's response
        let aiText = response.data.choices[0].message.content;
        
        // Clean the string to ensure valid JSON parsing
        let cleanText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
        const testCases = JSON.parse(cleanText);

        res.json({ success: true, testCases });
    } catch (err) {
        console.error("AI Generation Error:", err.response?.data || err.message);
        res.status(500).json({ message: "Failed to generate AI tests via Groq" });
    }
});

module.exports = router;