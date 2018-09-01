import React from 'react';
import { StatusBar, Text, View } from 'react-native';

class Configuration extends React.Component {
  render() {
    return (
      <View>
        <StatusBar hidden />
        <Text>This is the configuration page</Text>
      </View>
    )
  }
}

export default Configuration;
