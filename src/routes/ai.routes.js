
// const express = require('express');
// const aiController = require("../controllers/ai.controller")

// const router = express.Router();

// router.post("/get-review", aiController.getReview )

// module.exports = router


const { GoogleGenerativeAI } = require('@google/generative-ai'); // or your AI library

const aiService = async (code) => {
    try {
        console.log('🔧 AI Service processing code...');
        
        // Example with Google AI
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `Review this code and provide suggestions:\n\n${code}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const review = response.text();
        
        return review;
        
    } catch (error) {
        console.error('❌ AI Service Error:', error);
        throw new Error('Failed to analyze code: ' + error.message);
    }
};

module.exports = aiService;