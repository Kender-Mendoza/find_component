import { glob } from 'glob';

const pathPrefix = (dirPath: string): string => {
  const keyword = 'components';
  const keywordIndex = dirPath.indexOf(keyword);

  return dirPath.slice(0, keywordIndex);
};

const listFiles = async (dirPath: string): Promise<string[]> => {
  const foldersToIgnore = ['assets/**', 'channels/**', 'javascript/**', 'uploaders/**'];
  const appPath = pathPrefix(dirPath);
  const files = await glob(['**/*.rb', '**/*.erb'], { cwd: appPath, ignore: foldersToIgnore })

  return files;
}

export default listFiles;
