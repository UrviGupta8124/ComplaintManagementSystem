import axios from 'axios';
axios.get('https://openrouter.ai/api/v1/models').then(res => {
  const freeModels = res.data.data.filter(m => m.id.includes('free') && m.id.includes('google'));
  console.log("Free google models:", freeModels.map(m => m.id));
}).catch(console.error);
