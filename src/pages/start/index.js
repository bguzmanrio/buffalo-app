import React from 'react';
import { StatusBar, Text, View, Button } from 'react-native';

class Start extends React.Component {
  handleNavigation = () => {
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
        <Button title="Navigate" onPress={this.handleNavigation} />
        <Button title="Game" onPress={this.handleGameNavigation} />
      </View>
    );
  }
}

export default Start;
