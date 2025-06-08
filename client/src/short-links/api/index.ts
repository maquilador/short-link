import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchLinks = () => axiosInstance.get('/');

export const createLink = (data: {
  originalUrl: string;
  alias?: string;
  expiresAt?: Date;
}) => axiosInstance.post('/shorten', data);

export const deleteLink = (alias: string) =>
  axiosInstance.delete(`/delete/${alias}`);

export const fetchLinkStats = (alias: string) =>
  axiosInstance.get(`/info/${alias}`);
