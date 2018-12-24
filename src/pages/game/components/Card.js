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

const backdropImage = require('../../../../assets/images/spanishdeck/backdrop.jpg');

const DEFAULT_ANIMATION_CONFIGS = {
  spring : {
    friction : 7,
    tension  : 100
  }
};

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
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderStart: () => {
        this.initialRotation = this.state.rotation.__getValue();
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if(this.state.revealed) {
          if(gestureState.dx > 0) {
            this.setCurrentValueAnimated(gestureState.dx);
          }
        } else {
          this.setCurrentRotation(this.initialRotation + gestureState.dx);
        }
        // this.state.position.setValue(gestureState.moveX);
        // this.
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
      onPanResponderTerminate: (evt, gestureState) => {
        // this.setCurrentValueAnimated(this.windowWidth / 2);
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
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
            <Rule rule={this.props.rule} isHotRound={this.props.isHotRound} />
          </Animated.View>
        </View>
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
