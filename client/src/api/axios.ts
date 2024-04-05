import axios from 'axios';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';


const baseURL = 'http://localhost:4000';


export default axios.create({
    baseURL,
});


export const axiosAuthInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
// axiosAuthInstance.interceptors.request.use(async req => {
//     console.log(req);
//     return req;
// });
