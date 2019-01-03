import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet
} from 'react-native';

import { getWindowHeight, getWindowWidth } from '../utils/dimensions';
import { DEFAULT_ANIMATION_CONFIGS } from '../constants';

import Rule from './Rule';
import CardBackFace from './CardBackFace';
import CardFace from './CardFace';

const getInitialState = () => {
  const rotationValue = new Animated.Value(0);
  const windowWidth = getWindowWidth();
  const halfWindow = windowWidth / 2;

  return {
    rotation: rotationValue,
    rotationFront: rotationValue.interpolate({
      inputRange: [0, windowWidth],
      outputRange: ['0deg', '180deg']
    }),
    rotationBack: rotationValue.interpolate({
      inputRange: [0, windowWidth],
      outputRange: ['180deg', '360deg']
    }),
    frontOpacity: rotationValue.interpolate({
      inputRange: [-halfWindow, 1 - halfWindow, halfWindow - 1, halfWindow],
      outputRange: [0, 1, 1, 0]
    }),
    backOpacity: rotationValue.interpolate({
      inputRange: [-halfWindow, 1 - halfWindow, halfWindow - 1, halfWindow],
      outputRange: [1, 0, 0, 1]
    })
  };
}

class Card extends Component {
  windowWidth = getWindowWidth();

  state = {
    revealed: false,
    position: new Animated.Value(0),
    ...getInitialState()
  };

  componentWillMount = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderStart: () => {
        this.initialRotation = this.state.rotation.__getValue();
      },
      onPanResponderMove: (evt, gestureState) => {
        if(this.state.revealed) {
          this.setCurrentValueAnimated(gestureState.dx);
        } else {
          this.setCurrentRotation(this.initialRotation + gestureState.dx);
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        if (this.state.revealed) {
          const position = this.state.position.__getValue();

          this.setCurrentValueAnimated(0);
          if (Math.abs(position) >= this.windowWidth*0.4) {
            this.swipeCard();
          }
        } else {
          const rotation = parseInt(this.state.rotationFront.__getValue(), 10);
          if(Math.abs(rotation) >= 90) {
            this.setState({
              revealed: true
            }, () => {
              this.setCurrentRotation(Math.sign(rotation) * this.windowWidth);
            });
          } else {
            this.setCurrentRotation(0);
          }
        }
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });
  };

  swipeCard = () => {
    this.setState({ revealed: false }, () => {
      this.setCurrentRotation(0);
      this.setCurrentValueAnimated(0);
      this.props.onSwipeCard();
    });
  }

  setAnimatedValue = (toValue, animatedValue) => {
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS.spring,
      { toValue }
    );

    Animated.spring(animatedValue, animationConfig).start();
  }

  setCurrentRotation = toValue => {
    this.setAnimatedValue(toValue, this.state.rotation);
  };

  setCurrentValueAnimated = toValue => {
    this.setAnimatedValue(toValue, this.state.position);
  };

  render() {
    return (
      <View
        style={[styles.container, {
          height: getWindowHeight()
        }]}
      >
        <View style={styles.imageContainer} {...this.panResponder.panHandlers}>
          <CardBackFace rotation={this.state.rotationFront} opacity={this.state.frontOpacity} />
          <CardFace
            rotation={this.state.rotationBack}
            position={this.state.position}
            opacity={this.state.backOpacity}
            image={this.props.image}
          />
        </View>
        {this.state.revealed && (
          <Rule rule={this.props.rule} isHotRound={this.props.isHotRound} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  imageContainer: {
    height: '80%'
  }
})

export default Card;
