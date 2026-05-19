import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const testModel = async (modelName) => {
  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: modelName,
      messages: [{ role: "user", content: "Say test" }]
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    console.log(modelName, "SUCCESS:", response.data.choices[0].message.content);
  } catch (err) {
    console.error(modelName, "FAILED:", err.response?.data || err.message);
  }
};

testModel("google/gemini-2.0-pro-exp-02-05:free");
testModel("google/gemini-2.0-flash-lite-preview-02-05:free");
testModel("meta-llama/llama-3-8b-instruct:free");
