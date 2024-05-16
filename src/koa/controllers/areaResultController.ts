import Cities from '../../models/Cities';
import FileManager from '../../utils/FileManager';
import ServerError from '../../utils/ServerError';
import fs from 'fs';
import {Context} from 'koa';
import path from 'path';

interface Params {
	guid: string
}

export const areaResult = (ctx: Context) => {
	const {guid} = ctx.params as unknown as Params;

	try {
		const fileContents = fs.readFileSync(
			path.join(FileManager.AREAS_DIR, guid + '.json'),
			'utf8'
		);

		if (fileContents === '') {
			ctx.status = 202;
			return;
		}

		ctx.body = new Cities(JSON.parse(fileContents)).toJSON();

	} catch (_e) {
		throw new ServerError('Error reading aggregated results', 500);
	}
};
