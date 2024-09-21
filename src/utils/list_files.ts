import { glob } from 'glob';
import { DIR_APP_PATH } from '../constants/path';

const listFiles = async (): Promise<string[]> => {
  const foldersToIgnore = ['assets/**', 'channels/**', 'javascript/**', 'uploaders/**'];
  const files = await glob(['**/*.rb', '**/*.erb'], { cwd: DIR_APP_PATH, ignore: foldersToIgnore })

  return files
}

export default listFiles;
