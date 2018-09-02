import React from 'react';
import { StatusBar, Text, View, Button } from 'react-native';

class Start extends React.Component {
  handleConfigNavigation = () => {
    this.props.navigation.push('Configuration');
  };

  handleGameNavigation = () => {
    this.props.navigation.push('SelectConfig');
  };

  render() {
    return (
      <View>
        <StatusBar hidden />
        <Text>This is the main page</Text>
        <Button title="Configuration" onPress={this.handleConfigNavigation} />
        <Button title="Game" onPress={this.handleGameNavigation} />
      </View>
    );
  }
}

export default Start;
