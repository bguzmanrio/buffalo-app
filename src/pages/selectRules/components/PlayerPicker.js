import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import Text from '../../../components/Text';

class PlayerPicker extends Component {
  handleAddPlayer = () => {
    this.props.onPlayerSelection(this.props.players + 1);
  };

  handleRemovePlayer = () => {
    this.props.onPlayerSelection(this.props.players - 1);
  }

  render() {
    const disabledRemovePlayer = this.props.players <= 1;

    return (
      <View>
        <Text>Select nº of players</Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.handler, styles.handlerPrev, disabledRemovePlayer && styles.handlerDisabled]}
            disabled={disabledRemovePlayer}
            onPress={this.handleRemovePlayer}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <View style={styles.players}>
            <Text color="black">{this.props.players}</Text>
          </View>
          <TouchableOpacity
            style={[styles.handler, styles.handlerNext]}
            onPress={this.handleAddPlayer}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 4
  },
  handler: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#f47c48',
  },
  handlerDisabled: {
    backgroundColor: '#fbd8c9'
  },
  handlerPrev: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  handlerNext: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  players: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FBFAF8',
    flexGrow: 1,
    alignItems: 'center'
  }
});

export default PlayerPicker;