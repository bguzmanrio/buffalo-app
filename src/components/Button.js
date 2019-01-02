import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const BuffaloButton = props => (
  <TouchableOpacity 
    onPress={props.onPress}
    style={{
      marginBottom: 16,
      borderRadius: 4,
      borderColor: 'black',
      borderWidth: 4
    }}
  >
    <View
      style={{
        backgroundColor: '#f47c48',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderLeftColor: '#FBFAF8',
        borderLeftWidth: 2,
        borderTopColor: '#FBFAF8',
        borderTopWidth: 2
      }}
    >
      <Text
        style={{
          color: '#FBFAF8',
          fontSize: 24
        }}
      >
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default BuffaloButton;