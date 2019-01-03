import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SECONDARY_COLOR } from '../../../style';
import Text from '../../../components/Text';

const Counter = props => (
  <View style={styles.counter}>
    <Text>
      {props.currentCard + 1}/{props.nCards}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  counter: {
    backgroundColor: SECONDARY_COLOR,
    borderBottomLeftRadius: 4,
    padding: 4,
    position: 'absolute',
    top: 0,
    right: 0
  }
});

export default Counter;
