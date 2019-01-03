import React from 'react';
import { Text } from 'react-native';

import { WHITE, FONT_M } from '../style';

const BuffaloText = props => (
  <Text
    {...props}
    style={{
      color: props.color || WHITE,
      fontSize: FONT_M
    }}
  />
);

export default BuffaloText;