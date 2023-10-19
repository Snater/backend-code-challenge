import AddressManager from '../../lib/AddressManager';
import FileManager from '../../utils/FileManager';
import fs from 'fs';
import {Context} from 'koa';
import path from 'path';

interface Params {
	from: string
	distance: number
}

export const area = async(ctx: Context) => {
	const {from, distance} = ctx.query as unknown as Params;

	// Hard-coding GUID assuming it would be assigned dynamically in deployment:
	const guid = '2152f96f-50c7-4d76-9e18-f7033bd14428';

	ctx.status = 202;
	ctx.body = {
		resultsUrl: `${ctx.protocol}://${process.env.HOSTNAME}:${process.env.PORT}/area-result/${guid}`,
	};

	if (!fs.existsSync(FileManager.AREAS_DIR)) {
		fs.mkdirSync(FileManager.AREAS_DIR);
	}

	fs.writeFileSync(path.join(FileManager.AREAS_DIR, `${guid}.json`), '');

	aggregateAddresses(from, distance, guid);
};

async function aggregateAddresses(from: string, distance: number, guid: string) {
	const addresses = AddressManager.findAddressesWithinDistance(from, distance);

	fs.writeFileSync(
		path.join(FileManager.AREAS_DIR, `${guid}.json`),
		JSON.stringify(addresses),
		{flag: 'w+'}
	);
}