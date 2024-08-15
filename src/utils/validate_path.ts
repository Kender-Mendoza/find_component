import { existsSync, statSync } from 'fs';
import { resolve } from 'path';
import { addWaiting, changeWaitingStatus } from './waiting'

const isValidPath = (dirPath: string): boolean => {
  return existsSync(dirPath) && statSync(dirPath).isDirectory();
};

const validatePath = (dirPath: string): void => {
  const resolvedPath = resolve(dirPath);
  const spinnies = addWaiting('Validating...');

  if (isValidPath(resolvedPath)) {
    changeWaitingStatus(spinnies, 'succeed', 'Path valid');
    return;
  };

  changeWaitingStatus(spinnies, 'fail', `The path ${dirPath} is invalid.`);
};

export default validatePath
