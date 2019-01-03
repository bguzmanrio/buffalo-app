import React from 'react';
import { Picker, View } from 'react-native';

import { WHITE, PRIMARY_COLOR } from '../../../style';
import Text from '../../../components/Text';

const RulePicker = props => (
  <View style={{ marginBottom: 16, alignItems: 'center' }}>
    <Text align="center">Selecciona las reglas</Text>
    <View
      style={{
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 4,
        width: '100%'
      }}
    >
      <Picker
        selectedValue={props.config}
        onValueChange={props.handleSelect}
        mode="dropdown"
        style={{color: WHITE }}
        itemStyle={{ fontFamily: 'bree-serif' }}
      >
        {props.configList.map(config => (
          <Picker.Item key={config} label={config} value={config}/>
        ))}
      </Picker>
    </View>
  </View>
);

export default RulePicker;