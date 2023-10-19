import AddressManager from '../../lib/AddressManager';
import Cities from '../../models/Cities';
import {Context} from 'koa';

interface Params {
	isActive: string
	tag: string
}

export const citiesByTag = async(ctx: Context) => {
	const {isActive, tag} = ctx.query as unknown as Params;
	const addresses = AddressManager.queryAddresses({tags: [tag], isActive: isActive !== 'false'});

	ctx.body = new Cities(addresses).toJSON();
};