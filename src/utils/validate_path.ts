import { existsSync, statSync } from 'fs';
import { resolve } from 'path';
import { addWaiting, changeWaitingStatus } from './waiting'

const isValidPath = (dirPath: string): boolean => {
  return existsSync(dirPath) && statSync(dirPath).isDirectory();
};

const validatePath = (dirPath: string): void => {
  const resolvedPath = resolve(dirPath);
  const spinnies = addWaiting('Validating...');

  if (!isValidPath(resolvedPath)) { return; };

  changeWaitingStatus(spinnies, 'test');
  console.log(`The path: ${dirPath} is invalid.`)
  // throw new Error(`The path: ${dirPath} is invalid.`);
};

export default validatePath
