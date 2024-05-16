import ServerError from '../../utils/ServerError';
import {Context, Next} from 'koa';

export default async function authorization(ctx: Context, next: Next) {
	if (!ctx.req.headers.authorization) {
		throw new ServerError('No Authentication provided', 401);
	}

	let secret;

	try {
		secret = ctx.req.headers.authorization.split(' ')[1];
	} catch (_e) {
		throw new ServerError('Authentication error', 401);
	}

	if (secret === process.env.SECRET) {
		await next();
	} else {
		throw new ServerError('Authentication failed', 401);
	}
}
