import authorization from './middlewares/authorizationMiddleware';
import router from './routes';
import ServerError from '../utils/ServerError';
import Cabin from 'cabin';
import {config} from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import signale, {Signale} from 'signale';

config();
const app = express();
const cabin = new Cabin({logger: new Signale()});

app.use(cabin.middleware);
// Since the provided token is a non-standard JWT, a custom middleware is used to check the token:
app.use(authorization);
app.use(router);
app.use((error: Error|ServerError, _req: Request, res: Response, next: NextFunction) => {
	signale.error(error.message);

	if (error instanceof ServerError) {
		return res.status(error.status).send(error.message);
	}

	next(error);
});

export default app;