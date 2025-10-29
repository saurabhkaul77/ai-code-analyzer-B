
// const aiService = require("../services/ai.service")


// module.exports.getReview = async(req, res)=>{
//     const code = req.body.code

//     if(!code){
//         res.status(400).send({error: "Prompt is required"})
//     }

//     const response = await aiService(code)

//     res.send(response);
// }const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        console.log('📥 Received request body:', req.body);
        
        const code = req.body.code;

        if (!code) {
            return res.status(400).json({ error: "Code is required" }); // Added return and changed to json
        }

        console.log('🤖 Calling AI service...');
        const response = await aiService(code);
        
        console.log('✅ AI service response received');
        res.json({ success: true, data: response }); // Changed to json

    } catch (error) {
        console.error('❌ Error in getReview:', error);
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
};