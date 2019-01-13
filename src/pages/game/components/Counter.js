import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../style';
import Text from '../../../components/Text';

const Counter = props => (
  <View
    style={[
      styles.counter,
      {
        backgroundColor: props.isHotRound ? PRIMARY_COLOR : SECONDARY_COLOR
      }
    ]}
  >
    <Text>
      {props.currentCard + 1}/{props.nCards}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  counter: {
    borderBottomLeftRadius: 4,
    padding: 4,
    position: 'absolute',
    top: 0,
    right: 0
  }
});

export default Counter;
