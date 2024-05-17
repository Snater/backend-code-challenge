import {FileSystemRouter} from 'bun';
import {Signale} from 'signale';
import authorizationMiddleware from './middlewares/authorizationMiddleware';

const signale = new Signale();

const router = new FileSystemRouter({
	style: 'nextjs',
	dir: './src/bun/routes',
});

export default async(req: Request) => {
	let res = authorizationMiddleware(req);

	if (res) {
		signale.warn(req.url, res.status);
		return res;
	}

	const match = router.match(req);

	if (match) {
		const route = await import(match.filePath);
		res = route.default(req, match);
	}

	if (!res) {
		res = new Response('not found', {status: 404});
		signale.error(req.url, res.status);
		return res;
	}

	if (res instanceof Promise) {
		res = await res as Response;
	}

	signale.info(req.url, res.status);

	return res;
};
