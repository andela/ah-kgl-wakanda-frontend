import axios from 'axios';

const token = localStorage.getItem('token_ah_wakanda') || null;
export default axios.create({
  // baseURL: 'https://ah-kgl-wakanda-staging.herokuapp.com/api',
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: token,
    'Content-Type': 'application/json',
  },
});
