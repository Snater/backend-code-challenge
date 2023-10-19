import FileManager from '../../utils/FileManager';
import {createReadStream} from 'fs';
import {Context} from 'koa';
import path from 'path';

export const index = async(ctx: Context) => {
	ctx.type = 'html';
	ctx.body = createReadStream(path.join(FileManager.PUBLIC_DIR, 'index.html'));
};