import { createReadStream } from 'fs';
import readline from 'readline';
import { ViewComponentData } from '../types/component_data_struct';
import { addWaiting, changeWaitingStatus } from '../helpers/waiting';
import { DIR_APP_PATH } from '../constants/path';

const createFileStream = (filePath: string): readline.Interface => {
  const fileStream = createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  return rl;
}

const searchComponent = async (className: string, filePath: string): Promise<boolean> => {
  const rl = createFileStream(filePath);

  for await (const line of rl) {
    if (line.includes(className)) { return true; }
  };

  return false;
};

const findComponent = async (componentList: ViewComponentData[], fileList: string[]): Promise<ViewComponentData[]> => {
  const spinnies = addWaiting('Searching Components...');
  const componentsData: ViewComponentData[] = [];
  let isUsed = false;

  for (const componentClass of componentList) {
    for (const filePath of fileList) {
      const absolutePath = `${DIR_APP_PATH}${filePath}`

      if (componentClass.path === absolutePath) { continue; }

      isUsed = await searchComponent(componentClass.className, absolutePath);

      if (isUsed) { break; }
    }

    if (!isUsed) {
      componentsData.push(componentClass);
      continue;
    }
  }

  changeWaitingStatus(spinnies, 'succeed', `Components found ${componentsData.length}`);

  return componentsData;
}

export default findComponent;
