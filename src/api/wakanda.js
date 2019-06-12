import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  params: {
    api_key: 'b81a990598f52450eb9f9ab81027dc56',
  },
});
