import React from 'react';
import { StatusBar, Button, View, Picker, TextInput, Text } from 'react-native';

import { getConfigList } from '../../storage';

class SelectConfig extends React.Component {
  state = {
    configList: [],
    config: null,
    players: '4'
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
      <View>
        <StatusBar hidden />
        <View>
          <Text>Select rule set</Text>
          <Picker
            selectedValue={this.state.config}
            onValueChange={this.handleSelect}
          >
            {this.state.configList.map(config => (
              <Picker.Item key={config} label={config} value={config}/>
            ))}
          </Picker>
        </View>
        <View>
          <Text>Select nº of players</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={this.handlePlayersSelection}
            value={this.state.players}
            placeholder="Number of players"
            underlineColorAndroid='transparent'
          />
        </View>
        <Button
          title="Start!"
          onPress={this.handleGameNavigation}
          disabled={!this.state.config || !this.state.players}
        />
      </View>
    )
  }
}

export default SelectConfig;
