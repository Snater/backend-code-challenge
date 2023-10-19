import app from './app';

const server = app.listen(Number(process.env.PORT), process.env.HOSTNAME, () => {
	const address = server.address();

	console.log(`Listening on ${
		typeof address === 'string' ? `pipe ${address}` : address ? `port ${address.port}` : ''
	}`);
});

export default server;