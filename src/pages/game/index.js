import React from 'react';
import { StatusBar, Text, View } from 'react-native';

import { getItem } from '../../storage';

import Deck from './components/Deck';

class Game extends React.Component {
  state = {
    rules: null,
    players: 0
  };
  
  componentDidMount = async () => {
    const configName = this.props.navigation.getParam('config');
    const players = this.props.navigation.getParam('players');
    try {
      const ruleSet = await getItem(configName);
      this.setState({ rules: JSON.parse(ruleSet), players });
    } catch (error) {
      console.log(error);
    }    
  }
  
  navigateBack = () => {
    this.props.navigation.replace('Start');
  };

  render() {
    return (
      <View>
        <StatusBar hidden />
        {
          !!this.state.rules && (
            <Deck
              navigateBack={this.navigateBack}
              rules={this.state.rules}
              players={this.state.players}
            />
          )
        }
      </View>
    )
  }
}

export default Game;
