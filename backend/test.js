import axios from 'axios';
axios.post('http://127.0.0.1:5005/api/auth/register', {
  name: "Test", email: "test@test.com", password: "password"
}).then(res => console.log(res.data)).catch(err => console.error(err.response?.status, err.response?.data));
