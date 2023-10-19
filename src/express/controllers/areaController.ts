import AddressManager from '../../lib/AddressManager';
import FileManager from '../../utils/FileManager';
import {Response} from 'express';
import {ContainerTypes, ValidatedRequest, ValidatedRequestSchema} from 'express-joi-validation';
import fs from 'fs';
import path from 'path';

interface AreaSchema extends ValidatedRequestSchema {
	[ContainerTypes.Query]: {
		from: string,
		distance: number,
	}
}

export async function area(req: ValidatedRequest<AreaSchema>, res: Response) {
	const {from, distance} = req.query;

	// Hard-coding GUID assuming it would be assigned dynamically in deployment:
	const guid = '2152f96f-50c7-4d76-9e18-f7033bd14428';

	res
		.status(202)
		.send({
			resultsUrl: `${req.protocol}://${process.env.HOSTNAME}:${process.env.PORT}/area-result/${guid}`,
		});

	if (!fs.existsSync(FileManager.AREAS_DIR)) {
		fs.mkdirSync(FileManager.AREAS_DIR);
	}

	fs.writeFileSync(path.join(FileManager.AREAS_DIR, `${guid}.json`), '');

	const addresses = AddressManager.findAddressesWithinDistance(from, distance);

	fs.writeFileSync(
		path.join(FileManager.AREAS_DIR, `${guid}.json`),
		JSON.stringify(addresses),
		{flag: 'w+'}
	);
}