import { glob } from 'glob';
import { APP_PREFIX } from "../helpers/path_manager";

const listFiles = async (): Promise<string[]> => {
  const foldersToIgnore = ['assets/**', 'channels/**', 'javascript/**', 'uploaders/**'];
  const files = await glob(['**/*.rb', '**/*.erb'], { cwd: APP_PREFIX, ignore: foldersToIgnore })

  return files
}

export default listFiles;
