import ServerError from '../../utils/ServerError';
import {NextFunction, Request, Response} from 'express';

export default function authorization(req: Request, _res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		return next(new ServerError('No Authentication provided', 401));
	}

	try {
		const secret = req.headers.authorization.split(' ')[1];

		if (secret === process.env.SECRET) {
			next();
		} else {
			next(new ServerError('Authentication failed', 401));
		}
	} catch (_e) {
		next(new ServerError('Authentication error', 401));
	}
}
