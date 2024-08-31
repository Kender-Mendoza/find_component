import { glob } from 'glob';

const listFile = async (dirPath: string): Promise<string[]> => {
  const files = await glob('**/*.rb', { cwd: dirPath });

  return files;
};

const pathPrefix = (dirPath: string): string => {
  const keyword = 'components';
  const keywordIndex = dirPath.indexOf(keyword) + keyword.length + 1;
  let prefix = dirPath.slice(keywordIndex);

  if (prefix !== '') { prefix = `${prefix}/` };

  return prefix;
};

const convertPathToComponent = (path: string): string => {
  const pathWithoutExt = path.replace('.rb', '');
  const pathParts = pathWithoutExt.split('/');

  const upperCamelCaseParts =
    pathParts.map((part) => {
      return part
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    });

  return upperCamelCaseParts.join('::');
};

const buildComponentClass = async (dirPath: string): Promise<string[]> => {
  const prefix = pathPrefix(dirPath);
  const filePaths = await listFile(dirPath);

  const classComponents =
    filePaths.map((filePath) => {
      return convertPathToComponent(`${prefix}${filePath}`);
    });

  return classComponents;
};

const listComponents = async (dirPath: string): Promise<string[]> => {
  return buildComponentClass(dirPath);
};

export default listComponents;
