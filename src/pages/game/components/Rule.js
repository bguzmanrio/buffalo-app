import React from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  View
} from 'react-native';

import Text from '../../../components/Text';

import { getWindowHeight } from '../utils/dimensions';
import {
  RULE_INITIAL_HEIGHT,
  DEFAULT_ANIMATION_CONFIGS
} from '../constants';

class Rule extends React.Component {
  windowHeight = getWindowHeight();
  height = new Animated.Value(RULE_INITIAL_HEIGHT);
  bgOpacity = this.height.interpolate({
    inputRange: [0, this.windowHeight/3],
    outputRange: ['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 1)']
  });

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
        this.initialHeight = Math.max(this.height.__getValue(), RULE_INITIAL_HEIGHT);
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        this.setCurrentValueAnimated(this.initialHeight - gestureState.dy);
        // this.state.position.setValue(gestureState.moveX);
        // this.
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.setCurrentValueAnimated(RULE_INITIAL_HEIGHT);
        // if (this.height.__getValue() >= 200) {
        //   this.props.onSwipeCard();
        // } else {
        // }
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

  setCurrentValueAnimated = toValue => {
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS.spring,
      { toValue }
    );

    Animated.spring(this.height, animationConfig).start();
  };

  handleDisplay = () => {
    this.setCurrentValueAnimated(this.windowHeight / 2);
  }

  render() {
    const { isHotRound, rule } = this.props;
    const hotRoundStyles = isHotRound ? styles.ruleHotRound : null;
    const ruleToDisplay = isHotRound ? rule.hotRound : rule.base;    

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.ruleContainer,
          hotRoundStyles,
          {
            height: this.height,
            backgroundColor: this.bgOpacity
          }
        ]}
      > 
        <View style={styles.dragger}/>
        <View style={styles.rule}>
          <Text fontSize="s" color="black" fontWeight="bold">
            {ruleToDisplay.short}
          </Text>
        </View>
        <View style={styles.longRule}>
          <Text fontSize="xs" color="black" fontWeight="bold">
            {ruleToDisplay.long}
          </Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  ruleContainer: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderColor: 'black',
    borderTopWidth: 4,
    paddingHorizontal: 8,
  },
  ruleHotRound: {
    backgroundColor: 'green',
  },
  rule: {
    paddingVertical: 8
  },
  longRule: {
    alignItems: 'center'
  },
  dragger: {
    width: '20%',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 2
  }
});

export default Rule;