import FileManager from '../../utils/FileManager';
import {file} from 'bun';
import path from 'node:path';

export default () => {
	const bunFile = file(path.join(FileManager.PUBLIC_DIR, 'index.html'));

	return new Response(bunFile);
};
