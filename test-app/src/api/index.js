import axios from 'axios';

const axiosInst = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com/'
});

export default axiosInst;