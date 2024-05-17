import AddressManager from '../../../lib/AddressManager';
import Distance from '../../../models/Distance';
import type Unit from '../../../models/Unit';

function isValidUnit(unit: string | null): unit is Unit {
	if (unit === null) {
		return false;
	}

	return ['km', 'mi'].includes(unit);
}

export default (req: Request) => {
	const {searchParams} = new URL(req.url);
	const from = searchParams.get('from');
	const to = searchParams.get('to');
	const unit = searchParams.get('unit') ?? 'km';

	if (!from || !to || !isValidUnit(unit)) {
		return new Response('invalid parameters', {status: 400});
	}

	const [addressFrom, addressTo] = AddressManager.findAddresses(from, to);

	if (!addressFrom) {
		return new Response('Unable to find `from` address', {status: 404});
	}

	if (!addressTo) {
		return new Response('Unable to find `to` address', {status: 404});
	}

	return Response.json(new Distance(
		AddressManager.calculateDistance(addressFrom, addressTo, unit),
		unit,
		addressFrom,
		addressTo
	).toJSON());
};
