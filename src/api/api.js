import axios from 'axios';

const BASE_URL = 'https://680743a9e81df7060eb96fec.mockapi.io/';

export const api = axios.create({
  baseURL: BASE_URL,
});
