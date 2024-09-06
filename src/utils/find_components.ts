import { createReadStream } from "fs";
import readline from 'readline';
import ComponentDataStruct from "../types/component_data_struct";
import { addWaiting, changeWaitingStatus } from './waiting'


const searchComponent = async (componentClass: ComponentDataStruct, filePath: string): Promise<ComponentDataStruct> => {
  const fileStream = createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes(componentClass.name)) {
      componentClass.used = true;
      break;
    }
  };

  return componentClass;
};

const findComponent = async (componentList: ComponentDataStruct[], fileList: string[]): Promise<ComponentDataStruct[]> => {
  const spinnies = addWaiting('Searching Components...');
  let componentsData: ComponentDataStruct[] = [];
  let componentData: ComponentDataStruct = {
    name: '',
    path: ''
  };

  for (const componentClass of componentList) {
    for (const filePath of fileList) {
      if (componentClass.path === filePath) { continue; }

      componentData = await searchComponent(componentClass, filePath);
      if (componentData.used) { break; }
    }

    if (!componentData.used) {
      componentsData.push(componentData);
      continue;
    }
  }

  changeWaitingStatus(spinnies, 'succeed', `Components found ${componentsData.length}`);
  return componentsData;
}

export default findComponent;
