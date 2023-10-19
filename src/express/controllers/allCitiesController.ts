import FileManager from '../../utils/FileManager';
import {Request, Response} from 'express';
import fs from 'fs';

export async function allCities(_req: Request, res: Response) {
	res.setHeader('content-type', 'application/json');
	fs.createReadStream(FileManager.ADDRESSES_FILE).pipe(res);
}