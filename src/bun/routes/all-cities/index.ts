import FileManager from '../../../utils/FileManager';
import {file} from 'bun';

export default () => {
	const bunFile = file(FileManager.ADDRESSES_FILE);
	return new Response(bunFile);
};
