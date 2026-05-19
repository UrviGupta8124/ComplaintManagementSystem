import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const findAndTest = async () => {
  try {
    const res = await axios.get('https://openrouter.ai/api/v1/models');
    const freeModels = res.data.data.filter(m => m.id.includes('free') || (m.pricing && m.pricing.prompt === '0' && m.pricing.completion === '0'));
    
    for (const m of freeModels.slice(0, 5)) {
      try {
        const testRes = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
          model: m.id,
          messages: [{ role: "user", content: "Say ok" }]
        }, {
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        });
        console.log(m.id, "SUCCESS:", testRes.data.choices[0].message.content);
        break; // found one that works!
      } catch (e) {
        console.log(m.id, "FAILED:", e.response?.status, e.response?.data?.error?.message);
      }
    }
  } catch(e) {
    console.error(e);
  }
};
findAndTest();
