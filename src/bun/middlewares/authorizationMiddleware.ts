export default (req: Request) => {
	const authorization = req.headers.get('authorization');

	if (!authorization) {
		return new Response('No Authentication provided', {status: 401});
	}

	try {
		const secret = authorization.split(' ')[1];

		if (secret !== process.env.SECRET) {
			return new Response('Authentication failed', {status: 401});
		}
	} catch (_e) {
		return new Response('Authentication error', {status: 401});
	}
};
