import React from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

import { getWindowHeight, getWindowWidth } from '../utils/dimensions';

const logo = require('../../../../assets/logo.png');

const CardBackFace = props => (
  <Animated.View
    source={logo}
    style={[
      styles.backface,
      {
        transform: [
          { perspective: 1000 },
          { rotateY: props.rotation }
        ],
        opacity: props.opacity
      }
    ]}
  >
    <Image
      source={logo}
      style={{
        transform: [
          { rotateZ: '90deg' }
        ]
      }}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  backface: {
    flexGrow: 1,
    backgroundColor: 'black',
    width: getWindowWidth(),
    height: getWindowHeight(),
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CardBackFace;