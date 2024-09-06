import validatePath from './utils/validate_path';
import listComponents from './utils/list_components';
import listFiles from './utils/list_files';
import findComponent from './utils/find_components';

const dirPath = process.argv.slice(2)[0] || '';

if (validatePath(dirPath)) {
  (async (): Promise<void> => {
    const componentClassNames = await listComponents(dirPath);
    const fileList = await listFiles(dirPath);
    const files = await findComponent(componentClassNames, fileList);

    console.log(files);
  })();
}
