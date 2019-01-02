import React from 'react';
import { Picker, View } from 'react-native';

import Text from '../../../components/Text';

const RulePicker = props => (
  <View style={{ marginBottom: 16, alignItems: 'center' }}>
    <Text>Select rule set</Text>
    <View style={{ backgroundColor: '#f47c48', borderRadius: 4, borderColor: 'black', borderWidth: 4, width: '100%' }}>
      <Picker
        selectedValue={props.config}
        onValueChange={props.handleSelect}
        mode="dropdown"
        style={{ color: '#FBFAF8' }}
      >
        {props.configList.map(config => (
          <Picker.Item key={config} label={config} value={config}/>
        ))}
      </Picker>
    </View>
  </View>
);

export default RulePicker;