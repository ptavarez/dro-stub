import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
	console.info('Starting....');
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.info('Connected to Auth Database!');
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		console.info('Auth service is up and running on port 3000!');
	});
};

start();
