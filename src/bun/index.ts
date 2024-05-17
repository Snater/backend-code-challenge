import app from './app';
import {serve} from 'bun';
import type {ServeOptions} from 'bun';

const options: ServeOptions = {
	port: parseInt(process.env.PORT || '8080'),
	hostname: process.env.HOSTNAME || 'localhost',
	fetch: app,
};

const server = serve(options);

console.log(`Listening on ${server.hostname}:${server.port}`);
