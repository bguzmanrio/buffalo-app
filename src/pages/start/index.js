import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button, Image } from 'react-native';

const logo = require('../../../assets/logo.png');

class Start extends React.Component {
  handleNavigation = () => {
    this.props.navigation.push('Configuration');
  };

  handleGameNavigation = () => {
    this.props.navigation.push('SelectConfig');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image source={logo} style={styles.logo}/>
        <View style={styles.buttonContainer}>
          <Button title="Navigate" onPress={this.handleNavigation} />
          <Button title="Game" onPress={this.handleGameNavigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%'
  },
  buttonContainer: {
    width: '80%'
  },
  logo: {
  }
});

export default Start;
