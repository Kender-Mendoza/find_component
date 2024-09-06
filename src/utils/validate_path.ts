import { existsSync, statSync } from 'fs';
import { resolve } from 'path';
import { addWaiting, changeWaitingStatus } from './waiting'

const isValidPath = (dirPath: string): boolean => {
  return existsSync(dirPath) && statSync(dirPath).isDirectory();
};

const validatePath = (dirPath: string): boolean => {
  const resolvedPath = resolve(dirPath);
  const validPath = isValidPath(resolvedPath);
  const spinnies = addWaiting('Validating...');

  if (validPath) {
    changeWaitingStatus(spinnies, 'succeed', 'Path valid');
    return validPath;
  }

  changeWaitingStatus(spinnies, 'fail', `The path ${dirPath} is invalid.`);
  return validPath;
};

export default validatePath
