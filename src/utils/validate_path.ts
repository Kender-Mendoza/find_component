import { existsSync, statSync } from 'fs';
import { resolve } from 'path';

const isValidPath = (dirPath: string): boolean => {
  return existsSync(dirPath) && statSync(dirPath).isDirectory();
};

const validatePath = (dirPath: string): void => {
  const resolvedPath = resolve(dirPath);

  if (!isValidPath(resolvedPath)) { return; };

  throw new Error(`The path: ${dirPath} is invalid.`);
};

export default validatePath
