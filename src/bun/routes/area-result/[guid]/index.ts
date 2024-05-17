import Cities from '../../../../models/Cities';
import FileManager from '../../../../utils/FileManager';
import {file} from 'bun';
import path from 'path';
import type {MatchedRoute} from 'bun';

export default async(_req: Request, match: MatchedRoute) => {
	const guid = match.params.guid;

	if (!guid) {
		return new Response('invalid parameters', {status: 400});
	}

	try {
		const bunFile = file(path.join(FileManager.AREAS_DIR, guid + '.json'));
		const text = await bunFile.text();

		if (text === '') {
			return new Response('', {status: 202});
		}

		const json = await bunFile.json();

		return Response.json(new Cities(json).toJSON());

	} catch (_e) {
		return new Response('Error reading aggregated results', {status: 500});
	}
};
