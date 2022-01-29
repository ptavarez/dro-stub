import axios from 'axios';

const SSR_BASE_URL =
	process.env.NODE_ENV === 'development'
		? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
		: 'http://www.drostub.co';

export const buildClient = ({ req }) => {
	// Server side rendering (SSR)
	if (typeof window === 'undefined') {
		console.log(`Server Side Rendering Client in ${process.env.NODE_ENV} mode`);
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
