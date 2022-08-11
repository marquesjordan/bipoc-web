import axios from 'axios';

const URI =
  process.env.NODE_ENV === 'production'
    ? 'https://vast-beach-48711.herokuapp.com'
    : 'http://localhost:5000';

export default axios.create({
  baseURL: URI,
});
