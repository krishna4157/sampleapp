import api from './api';

api.interceptors.request.use(
  async config => {
    let bodyData = JSON.stringify(config.data);
    let apiBody = await config.data;
    config.data = { ...apiBody, authPayload: bodyData };

    return config;
  },
  error => Promise.reject(error),
);

const logError = error => { };

const exec = async (fn, params) => {
  const res = {
    data: null,
    error: null,
    syserror: null,
  };

  const response = await fn(params).catch(e => {
    logError(e);
    res.error = e;
    res.syserror = e;
  });
  res.data = response;
  return res;
};

const logout = () => exec(() => api.post('/v3/logout'));
const getRestarentsList = params =>
  exec(() => api.post('/interview/public/api/restaurants_list', params));

export default {
  logError,
  logout,
  getRestarentsList,
};
