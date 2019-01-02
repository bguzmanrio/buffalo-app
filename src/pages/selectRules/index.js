import React from 'react';
import { StatusBar, StyleSheet, View, Picker, TextInput } from 'react-native';

import Button from '../../components/Button';
import Text from '../../components/Text';

import RulePicker from './components/RulePicker';
import PlayerPicker from './components/PlayerPicker';

import { getConfigList } from '../../storage';

class SelectConfig extends React.Component {
  state = {
    configList: [],
    config: null,
    players: 4
  };

  componentDidMount = async () => {
    try {
      const configList = await getConfigList();      
      this.setState({ configList, config: configList[0] });
    } catch (error) {
      throw new Error(error);
    }
  };
  
  handleSelect = config => {
    this.setState({ config });
  };

  handlePlayersSelection = players => {
    this.setState({ players });
  };

  handleGameNavigation = () => {
    if (this.state.config && this.state.players) {
      this.props.navigation.push('Game', {
        config: this.state.config,
        players: this.state.players
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View>
          <RulePicker
            config={this.state.config}
            handleSelect={this.handleSelect}
            configList={this.state.configList}
          />
          <PlayerPicker players={this.state.players} onPlayerSelection={this.handlePlayersSelection} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Start!"
            onPress={this.handleGameNavigation}
            disabled={!this.state.config || !this.state.players}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    backgroundColor: '#31393C'
  },
  buttonContainer: {
    width: '80%'
  }
})

export default SelectConfig;
