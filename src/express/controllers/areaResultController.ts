import Cities from '../../models/Cities';
import FileManager from '../../utils/FileManager';
import ServerError from '../../utils/ServerError';
import {NextFunction, Response} from 'express';
import {ContainerTypes, ValidatedRequest, ValidatedRequestSchema} from 'express-joi-validation';
import fs from 'fs';
import path from 'path';

interface AreaResultsSchema extends ValidatedRequestSchema {
	[ContainerTypes.Params]: {
		guid: string,
	}
}

export function areaResult(
	req: ValidatedRequest<AreaResultsSchema>,
	res: Response,
	next: NextFunction
) {
	const {guid} = req.params;

	try {
		const fileContents = fs.readFileSync(
			path.join(FileManager.AREAS_DIR, guid + '.json'),
			'utf8'
		);

		if (fileContents === '') {
			res.sendStatus(202);
			return;
		}

		res.send(new Cities(JSON.parse(fileContents)).toJSON());

	} catch (_e) {
		next(new ServerError('Error reading aggregated results', 500));
	}
}
