import axios from 'axios';

const SSR_BASE_URL = process.env.NODE_ENV
	? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
	: 'http://www.drostub.co';

export const buildClient = ({ req }) => {
	// Server side rendering (SSR)
	if (typeof window === 'undefined') {
		const axiosInstance = axios.create({
			baseURL: SSR_BASE_URL,
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
