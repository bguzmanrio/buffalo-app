import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { Navigator } from './src/Router';
import { initialize as initializeStorage } from './src/storage';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoaded: true
  };

  componentDidMount = async () => {
    try {
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
      <Navigator />
    ) : (
      <Text>Loading...</Text>
    )
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
