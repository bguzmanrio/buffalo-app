import React from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import BuffaloButton from '../../components/Button';

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
        <Image source={logo}/>
        <View style={styles.buttonContainer}>
          <BuffaloButton text="Navigate" onPress={this.handleNavigation} />
          <BuffaloButton text="Game" onPress={this.handleGameNavigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    backgroundColor: '#31393C'
  },
  buttonContainer: {
    width: '80%'
  }
});

export default Start;
