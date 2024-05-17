import AddressManager from '../../../lib/AddressManager';
import FileManager from '../../../utils/FileManager';
import fs from 'node:fs';
import path from 'node:path';
import {write} from 'bun';

async function writeFile({distance, from, guid}: {distance: number, from: string, guid: string}) {
	if (!fs.existsSync(FileManager.AREAS_DIR)) {
		fs.mkdirSync(FileManager.AREAS_DIR);
	}

	await write(path.join(FileManager.AREAS_DIR, `${guid}.json`), '');

	const addresses = AddressManager.findAddressesWithinDistance(from, distance);

	await write(path.join(FileManager.AREAS_DIR, `${guid}.json`), JSON.stringify(addresses));
}

export default (req: Request) => {
	const {hostname, port, protocol, searchParams} = new URL(req.url);
	const distance = Number.parseFloat(searchParams.get('distance') ?? '');
	const from = searchParams.get('from');

	// Hard-coding GUID assuming it would be assigned dynamically in deployment:
	const guid = '2152f96f-50c7-4d76-9e18-f7033bd14428';

	if (!from || Number.isNaN(distance)) {
		return new Response('invalid parameters', {status: 400});
	}

	writeFile({distance, from, guid});

	return Response.json(
		{resultsUrl: `${protocol}//${hostname}:${port}/area-result/${guid}`},
		{status: 202}
	);
};

