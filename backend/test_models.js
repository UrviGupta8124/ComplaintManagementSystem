import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const testModel = async (modelName) => {
  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: modelName,
      messages: [{ role: "user", content: "Say ok" }]
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    console.log(modelName, "SUCCESS:", response.data.choices[0].message.content);
  } catch (err) {
    console.log(modelName, "FAILED:", err.response?.status, err.response?.data?.error?.message || err.message);
  }
};

testModel("qwen/qwen-2-7b-instruct:free");
testModel("mistralai/mistral-7b-instruct:free");
testModel("meta-llama/llama-3.1-8b-instruct:free");
testModel("deepseek/deepseek-chat:free");
testModel("google/gemini-2.5-flash-free");
testModel("google/gemma-2-9b-it:free");
