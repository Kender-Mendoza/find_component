import validatePath from './utils/validate_path';

const dirPath = process.argv.slice(2)[0] || '';

validatePath(dirPath);

console.log(process.argv.slice(2))
