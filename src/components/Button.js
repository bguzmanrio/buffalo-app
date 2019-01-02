import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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
        backgroundColor: props.disabled ? '#fbd8c9' : '#f47c48',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderLeftColor: '#FBFAF8',
        borderLeftWidth: 2,
        borderTopColor: '#FBFAF8',
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