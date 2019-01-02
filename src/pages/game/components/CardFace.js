import React from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

const CardFace = props => (
  <Animated.View
    resizeMode="contain"
    style={[
      {
        position: 'absolute',
        backfaceVisibility: 'hidden',
        transform: [
          { perspective: 1000 },
          { rotateY: props.rotation },
          { translateX: props.position }
        ],
        opacity: props.opacity
      }
    ]}
  >
    <Image source={props.image} style={styles.image} />
  </Animated.View>
);

const styles = StyleSheet.create({
  image: {
    maxHeight: '100%'
  }
});


export default CardFace;
