
export const DIR_PATH = process.argv.slice(2)[0] || '';
export const DIR_APP_PATH =
  ((): string => {
    const dirPath = DIR_PATH;
    const keyword = 'components';
    const keywordIndex = dirPath.indexOf(keyword);

    // ? path example: /Users/user_name/workspace/find_component/app/
    return dirPath.slice(0, keywordIndex);
  })();
