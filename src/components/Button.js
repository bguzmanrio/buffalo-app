import React from 'react';
import { Button, StyleSheet } from 'react-native';

const BuffaloButton = props => (
  <Button {...props} style={styles.button} title="title" />
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f47c48',
    color: 'black'
  }
});

export default Button;