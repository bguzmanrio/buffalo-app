import { AsyncStorage } from 'react-native';

import { config as initialConfig } from './initialConfig';

const BASE_KEY = '@buffaloStorage';
const INITIAL_CONFIG = 'BuffaloOriginal';
const CONFIG_LIST = 'configList';
const CONFIG_LIST_SEPARATOR = '/';

const getStorageKey = key => `${BASE_KEY}:${key}`;
const getListKey = () => getStorageKey(CONFIG_LIST);

const saveConfigWithName = (name, nameList, newConfig) =>
  AsyncStorage.multiSet([
    [getListKey(), nameList],
    [getStorageKey(name), JSON.stringify(newConfig)]
  ]);

export const saveConfig = async (name, newConfig) => {
  try {
    const configList = await getItem(CONFIG_LIST) || '';
    const configs = configList.split(CONFIG_LIST_SEPARATOR);
    
    if (configs.length && configs.includes(name)) {
      throw new Error('The name already exists');
    } else {
      await saveConfigWithName(
        name,
        [...configs, name].join(CONFIG_LIST_SEPARATOR),
        newConfig
      );
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const getItem = name => AsyncStorage.getItem(getStorageKey(name));

export const getConfigList = async () => {
  const list = await getItem(CONFIG_LIST);
  return list.split(CONFIG_LIST_SEPARATOR);
};

export const initialize = async () => {
  try {
    await AsyncStorage.clear();
    await saveConfig(INITIAL_CONFIG, initialConfig);
  } catch(err) {
    throw new Error(err);
  }
};

export default {
  saveConfig,
  getItem,
  initialize
};
