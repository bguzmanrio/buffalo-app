import React from 'react';
import { Text } from 'react-native';

import { WHITE, FONT_M, FONT_S, FONT_XS } from '../style';

const FONT_CORRELATION = {
  'm': {
    fontSize: FONT_M
  },
  's': {
    fontSize: FONT_S,
    lineHeight: FONT_M
  },
  'xs': {
    fontSize: FONT_XS,
    lineHeight: FONT_S
  }
};

const BuffaloText = props => (
  <Text
    {...props}
    style={{
      fontFamily: 'bree-serif',
      color: props.color || WHITE,
      textAlign: props.align || 'left',
      ...FONT_CORRELATION[props.fontSize]
    }}
  />
);

BuffaloText.defaultProps = {
  fontSize: 'm'
};

export default BuffaloText;