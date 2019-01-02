import React, { Component } from 'react';
import {
  View,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet
} from 'react-native';

import Rule from './Rule';
import {
  RULE_INITIAL_HEIGHT,
  DEFAULT_ANIMATION_CONFIGS
} from '../constants';

const backdropImage = require('../../../../assets/images/spanishdeck/backdrop.jpg');

const getWindowHeight = () => Dimensions.get('window').height;
const getWindowWidth = () => Dimensions.get('window').width;

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
  windowWidth = Dimensions.get('window').width;

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
          if(gestureState.dx > 0) {
            this.setCurrentValueAnimated(gestureState.dx);
          }
        } else {
          this.setCurrentRotation(this.initialRotation + gestureState.dx);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: () => {
        if (this.state.revealed) {
          if (this.state.position.__getValue() >= this.windowWidth*0.4) {
            this.swipeCard();
          } else {
            this.setCurrentValueAnimated(0);
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

        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.image !== this.props.image) {
      
    }
  };

  swipeCard = () => {
    this.setState({ revealed: false }, () => {
      this.setCurrentRotation(0);
      this.setCurrentValueAnimated(0);
      this.props.onSwipeCard();
    });
  }

  setCurrentRotation = toValue => {
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS.spring,
      { toValue }
    );

    Animated.spring(this.state.rotation, animationConfig).start();
  }

  setCurrentValueAnimated = toValue => {
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS.spring,
      { toValue }
    );

    Animated.spring(this.state.position, animationConfig).start();
  };

  render() {
    return (
      <View
        style={[styles.container, {
          height: getWindowHeight()
        }]}
      >
        <View style={styles.imageContainer} {...this.panResponder.panHandlers}>
          <Animated.Image
            source={backdropImage}
            style={[
              {
                backfaceVisibility: 'hidden',
                transform: [
                  { perspective: 1000 },
                  { rotateY: this.state.rotationFront }
                ],
                opacity: this.state.frontOpacity
              }
            ]}
          />
          <Animated.View
            source={this.props.image}
            resizeMode="contain"
            style={[
              {
                position: 'absolute',
                backfaceVisibility: 'hidden',
                transform: [
                  { perspective: 1000 },
                  { rotateY: this.state.rotationBack },
                  { translateX: this.state.position }
                ],
                opacity: this.state.backOpacity
              }
            ]}
          >
            <Image source={this.props.image} style={styles.image} />
          </Animated.View>
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
  image: {
    maxHeight: '100%'
  },
  imageContainer: {
    height: '80%'
  }
})

export default Card;
