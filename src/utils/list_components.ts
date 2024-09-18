import { glob } from 'glob';
import { ViewComponentData } from '../types/component_data_struct';
import { DIR_PATH } from '../constants/path';

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

const buildComponentClass = async (): Promise<ViewComponentData[]> => {
  const prefix = pathPrefix(DIR_PATH);
  const filePaths = await listFile(DIR_PATH);

  const classComponents =
    filePaths.map((filePath) => {
      return {
        className: convertPathToComponent(`${prefix}${filePath}`),
        path: `${DIR_PATH}/${filePath}`
      };
    });

  return classComponents;
};

const listComponents = async (): Promise<ViewComponentData[]> => {
  return buildComponentClass();
};

export default listComponents;
