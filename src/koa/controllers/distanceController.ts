import AddressManager from '../../lib/AddressManager';
import Distance from '../../models/Distance';
import Unit from '../../models/Unit';
import ServerError from '../../utils/ServerError';
import {Context} from 'koa';

interface Params {
	from: string
	to: string
	unit: Unit
}

export const distance = (ctx: Context) => {
	const {from, to, unit} = ctx.query as unknown as Params;
	const [addressFrom, addressTo] = AddressManager.findAddresses(from, to);

	if (!addressFrom) {
		throw new ServerError('Unable to find `from` address', 404);
	}

	if (!addressTo) {
		throw new ServerError('Unable to find `to` address', 404);
	}

	ctx.body = new Distance(
		AddressManager.calculateDistance(addressFrom, addressTo, unit),
		unit,
		addressFrom,
		addressTo
	).toJSON();
};