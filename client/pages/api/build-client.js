import axios from 'axios';

export const buildClient = ({ req }) => {
  // Server side rendering (SSR)
  if (typeof window === 'undefined') {
    const axiosInstance = axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
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
