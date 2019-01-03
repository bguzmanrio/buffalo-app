import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { PRIMARY_COLOR, PRIMARY_COLOR_DISABLED, WHITE } from '../style';

import Text from './Text';

const BuffaloButton = props => (
  <TouchableOpacity 
    onPress={props.onPress}
    disabled={props.disabled}
    style={{
      marginBottom: 16,
      borderRadius: 4,
      borderColor: 'black',
      borderWidth: 4
    }}
  >
    <View
      style={{
        backgroundColor: props.disabled ? PRIMARY_COLOR_DISABLED : PRIMARY_COLOR,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderLeftColor: WHITE,
        borderLeftWidth: 2,
        borderTopColor: WHITE,
        borderTopWidth: 2
      }}
    >
      <Text>
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default BuffaloButton;