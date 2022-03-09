import axios from 'axios';

import { API } from "../config/config";

const instance = axios.create({
    baseURL: API
});

export default instance;