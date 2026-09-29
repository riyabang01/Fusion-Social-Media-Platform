import axios from 'axios';
import { BASE_URL } from './config';

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${BASE_URL}/api/refresh_token`, {}, {
          withCredentials: true
        });

        const newAccessToken = res.data.access_token; 
        
        originalRequest.headers['Authorization'] = newAccessToken;
        return API(originalRequest);
        
      } catch (refreshError) {
        if (refreshError.response?.status === 400 || refreshError.response?.status === 401) {
          console.error("Session expired. Forcing logout.");
          localStorage.removeItem('firstLogin');
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const getDataAPI = async (url, token) => {
  return await API.get(url, {
    headers: token ? { Authorization: token } : {},
  });
};

export const postDataAPI = async (url, post, token) => {
  return await API.post(url, post, {
    headers: token ? { Authorization: token } : {},
  });
};

export const putDataAPI = async (url, post, token) => {
  return await API.put(url, post, {
    headers: token ? { Authorization: token } : {},
  });
};

export const patchDataAPI = async (url, post = {}, token) => {
  return await API.patch(url, post, {
    headers: token ? { Authorization: token } : {},
  });
};

export const deleteDataAPI = async (url, token) => {
  return await API.delete(url, {
    headers: token ? { Authorization: token } : {},
  });
};
