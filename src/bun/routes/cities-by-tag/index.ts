import AddressManager from '../../../lib/AddressManager';
import Cities from '../../../models/Cities';

export default (req: Request) => {
	const {searchParams} = new URL(req.url);
	const isActive = searchParams.get('isActive');
	const tag = searchParams.get('tag');

	if (tag === null) {
		return new Response('Tag parameter is required', {status: 400});
	}

	const addresses = AddressManager.queryAddresses({tags: [tag], isActive: isActive !== 'false'});

	return Response.json(new Cities(addresses).toJSON());
};
