import AddressManager from '../../lib/AddressManager';
import Distance from '../../models/Distance';
import Unit from '../../models/Unit';
import ServerError from '../../utils/ServerError';
import {NextFunction, Response} from 'express';
import {ContainerTypes, ValidatedRequest, ValidatedRequestSchema} from 'express-joi-validation';

interface DistanceSchema extends ValidatedRequestSchema {
	[ContainerTypes.Query]: {
		from: string,
		to: string,
		unit: Unit,
	}
}

export function distance(req: ValidatedRequest<DistanceSchema>, res: Response, next: NextFunction) {
	const {from, to, unit} = req.query;
	const [addressFrom, addressTo] = AddressManager.findAddresses(from, to);

	if (!addressFrom) {
		return next(new ServerError('Unable to find `from` address', 404));
	}

	if (!addressTo) {
		return next(new ServerError('Unable to find `to` address', 404));
	}

	res.send(new Distance(
		AddressManager.calculateDistance(addressFrom, addressTo, unit),
		unit,
		addressFrom,
		addressTo
	).toJSON());
}