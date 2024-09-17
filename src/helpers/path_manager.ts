// ? path example: /Users/user_name/workspace/find_component/app/
const appPrefix = (): string => {
  const dirPath = process.argv.slice(2)[0] || '';
  const keyword = 'components';
  const keywordIndex = dirPath.indexOf(keyword);

  return dirPath.slice(0, keywordIndex);
}

export const APP_PREFIX = appPrefix();
