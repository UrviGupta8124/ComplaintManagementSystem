import axios from 'axios';

export const analyzeComplaint = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const prompt = `Analyze the following complaint text and return a JSON object with EXACTLY these fields (and no markdown formatting outside the JSON):
{
  "priority": "Low, Medium, or High priority alert",
  "department": "suggested responsible department",
  "summary": "a brief summary of the issue",
  "autoResponse": "a polite automated response message for the user"
}
Complaint: "${text}"`;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "baidu/cobuddy:free",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const aiContent = response.data.choices[0].message.content;
    
    let result;
    try {
      result = JSON.parse(aiContent.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch (e) {
      console.log("Failed to parse JSON, returning raw text inside summary.");
      result = {
        priority: "Medium",
        department: "General Dept",
        summary: aiContent.substring(0, 500) + "...",
        autoResponse: "Thank you for your complaint. We are reviewing it."
      };
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error?.response?.data || error);
    res.status(500).json({ message: "Failed to analyze complaint", error: error.message });
  }
};
