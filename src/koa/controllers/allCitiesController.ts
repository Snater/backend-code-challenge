import FileManager from '../../utils/FileManager';
import fs from 'fs';
import {Context} from 'koa';

export const allCities = async(ctx: Context) => {
	ctx.set('content-type', 'application/json');
	ctx.body = fs.createReadStream(FileManager.ADDRESSES_FILE);
};