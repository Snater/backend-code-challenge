import app from './app';
import http from 'http';

const server = http.createServer(app);

server.listen(Number(process.env.PORT), process.env.HOSTNAME);

server.on('listening', () => {
	const address = server.address();

	console.log(`Listening on ${
		typeof address === 'string' ? `pipe ${address}` : address ? `port ${address.port}` : ''
	}`);
});