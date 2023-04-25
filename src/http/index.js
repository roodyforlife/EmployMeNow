import axios from 'axios'
import { REACT_API_URL } from '../utils/consts'

const $host = axios.create({
    baseURL: REACT_API_URL
})

const $authhost = axios.create({
    baseURL: REACT_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}

$authhost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authhost
}