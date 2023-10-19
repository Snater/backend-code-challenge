import authorization from './middlewares/authorizationMiddleware';
import router from './routes';
import Cabin from 'cabin';
import {config} from 'dotenv';
import Koa from 'koa';
import {Signale} from 'signale';

config();
const app = new Koa();
const signale = new Signale();
const cabin = new Cabin({logger: signale});

app.on('error', (error: Error) => signale.error(error.message));

app.use(cabin.middleware);
// Since the provided token is a non-standard JWT, a custom middleware is used to check the token:
app.use(authorization);
app.use(router.middleware());

export default app;