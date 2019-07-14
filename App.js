import React from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { AppContainer } from './src/Router';
import { initialize as initializeStorage } from './src/storage';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoaded: false
  };

  componentDidMount = async () => {
    try {
      await Font.loadAsync({
        'bree-serif': require('./assets/fonts/BreeSerif.ttf'),
      }),
      await initializeStorage();
      this.setState({
        isLoaded: true
      });
    } catch(err) {
      console.log('error', err);
    }
  }

  render() {
    return this.state.isLoaded ? (
      <AppContainer urlPrefix="/" />
    ) : null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
