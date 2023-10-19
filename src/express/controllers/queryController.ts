import AddressManager from '../../lib/AddressManager';
import Cities from '../../models/Cities';
import {Response} from 'express';
import {ContainerTypes, ValidatedRequest, ValidatedRequestSchema} from 'express-joi-validation';

interface CitiesByTagSchema extends ValidatedRequestSchema {
	[ContainerTypes.Query]: {
		isActive: string,
		tag: string,
	}
}

export function citiesByTag(req: ValidatedRequest<CitiesByTagSchema>, res: Response) {
	const {isActive, tag} = req.query;
	const addresses = AddressManager.queryAddresses({tags: [tag], isActive: isActive !== 'false'});

	res.send(new Cities(addresses).toJSON());
}