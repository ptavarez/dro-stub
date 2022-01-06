import axios from 'axios';

export const buildClient = ({ req }) => {
  // Server side rendering (SSR)
  if (typeof window === 'undefined') {
    const axiosInstance = axios.create({
      baseURL: 'http://www.drostub.co',
      headers: req.headers,
    });

    return axiosInstance;
  } else {
    // client
    return axios.create({
      baseURL: '/',
    });
  }
};
