import validatePath from './utils/validate_path';
import listComponents from './utils/list_components';
import listFiles from './utils/list_files';
import findComponent from './utils/find_components';
import { DIR_PATH } from './constants/path';

if (validatePath(DIR_PATH)) {
  (async (): Promise<void> => {
    const componentClassNames = await listComponents();
    const fileList = await listFiles();
    const files = await findComponent(componentClassNames, fileList);

    console.log(files);
  })();
}
