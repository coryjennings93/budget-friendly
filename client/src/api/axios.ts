import axios from 'axios';

const baseURL = 'http://localhost:4000';

export default axios.create({
    baseURL,
});

export const axiosAuthInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});