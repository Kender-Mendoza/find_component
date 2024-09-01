import { glob } from 'glob';
import ComponentDataStruct from '../types/component_data_struct';

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

const buildComponentClass = async (dirPath: string): Promise<ComponentDataStruct[]> => {
  const prefix = pathPrefix(dirPath);
  const filePaths = await listFile(dirPath);

  const classComponents =
    filePaths.map((filePath) => {
      return {
        name: convertPathToComponent(`${prefix}${filePath}`),
        path: `${dirPath}/${filePath}`
      };
    });

  return classComponents;
};

const listComponents = async (dirPath: string): Promise<ComponentDataStruct[]> => {
  return buildComponentClass(dirPath);
};

export default listComponents;
