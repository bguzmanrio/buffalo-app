import React from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';

import { SECONDARY_COLOR } from '../../style';

import Button from '../../components/Button';
import Text from '../../components/Text';

const logo = require('../../../assets/logo.png');

class Start extends React.Component {
  handleHowItWorks = () => {
    this.props.navigation.push('HowItWorks');
  };

  handleGameNavigation = () => {
    this.props.navigation.push('SelectConfig');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.logoContainer}>
          <Image source={logo}/>
          <Text align="center">El juego de cartas para borrachos</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="¿Cómo funciona?" onPress={this.handleHowItWorks} />
          <Button text="Al lío" onPress={this.handleGameNavigation} />
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
    backgroundColor: SECONDARY_COLOR
  },
  logoContainer: {
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 8
  },
  buttonContainer: {
    width: '80%'
  }
});

export default Start;
