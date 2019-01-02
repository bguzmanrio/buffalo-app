import { Dimensions } from 'react-native';

export const getWindowHeight = () => Dimensions.get('window').height;
export const getWindowWidth = () => Dimensions.get('window').width;

export default {
  getWindowHeight,
  getWindowWidth
};
