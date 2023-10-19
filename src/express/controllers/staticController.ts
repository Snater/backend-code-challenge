import FileManager from '../../utils/FileManager';
import {Request, Response} from 'express';
import path from 'path';

export function index(_req: Request, res: Response) {
	res.sendFile(path.join(FileManager.PUBLIC_DIR, 'index.html'));
}