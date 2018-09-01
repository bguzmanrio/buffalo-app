import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Easing,
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

class Card extends Component {
  windowWidth = Dimensions.get('window').width;

  state = {
    revealed: false,
    position: new Animated.Value(0)
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
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        this.setCurrentValueAnimated(gestureState.moveX);
        // this.state.position.setValue(gestureState.moveX);
        // this.
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.position.__getValue() >= this.windowWidth*0.4) {
          this.props.onSwipeCard();
        } else {
          this.setCurrentValueAnimated(0);
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
      this.state.position.setValue(0);
      this.setState({ revealed: false });
    }
  }

  setCurrentValueAnimated = toValue => {
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS.spring,
      { toValue }
    );

    Animated.spring(this.state.position, animationConfig).start();
  };

  reveal = () => {
    this.setState({
      revealed: true
    });
  };

  render() {
    // const position = this.state.position.interpolate({
    //   inputRange: [this.windowWidth / 2, this.windowWidth],
    //   outputRange: [0, this.windowWidth / 2]
    // });

    return this.state.revealed ? (
      <View
        style={[styles.container, {
          height: getWindowHeight()
        }]}
      >
        <View style={styles.imageContainer} {...this.panResponder.panHandlers}>
          <Animated.Image
            source={this.props.image}
            resizeMode="contain"
            style={[
              styles.image,
              {
                transform: [
                  { translateX: this.state.position },
                  { translateY: 0 }
                ]
              }
            ]}
          />
        </View>
        <Rule rule={this.props.rule} isHotRound={this.props.isHotRound} />
      </View>
    ) : (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.reveal}>
          <Image style={styles.image} source={backdropImage} />
        </TouchableWithoutFeedback>
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
