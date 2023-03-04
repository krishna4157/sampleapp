import axios from 'axios';

const api = {
  baseURL: 'http://205.134.254.135/~mobile',
  timeout: 10000,
  responseType: 'json',
};

export default axios.create(api);
