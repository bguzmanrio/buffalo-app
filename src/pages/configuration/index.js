import React from 'react';
import { StatusBar, Text, View, FlatList, Button } from 'react-native';

import { getUniqueCardsInDeck } from '../../components/Decks/SpanishDeck';

import CardRuleEditor from './components/CardRuleEditor';

const getStateFromCardNames = () =>
  getUniqueCardsInDeck()
  .map((card) => ({
    key: card.number,
    number: card.number,
    name: card.name,
    rules: {
      base: {
        short: '',
        long: ''
      },
      hotRound: {
        short: '',
        long: ''
      }
    }
  }));

class Configuration extends React.Component {
  state = {
    cards: getStateFromCardNames(),
    selectedIndex: -1,
    editing: false
  };

  startEdit = i => () => {
    this.setState({
      editing: true,
      selectedIndex: i
    })
  };

  handleSaveRules = ruleSet => {
    console.log('rules', ruleSet);
  };

  handleCancelEdit = () => {
    this.setState({
      selectedIndex: -1,
      editing: false
    })
  };

  render() {   
    return (
      <View>
        <StatusBar hidden />
        <Text>This is the configuration page</Text>
        <FlatList
          data={this.state.cards}
          renderItem={({ item, index }) => (
            <View>
              <Text>{item.name}</Text>
              <Button
                title={`Add rule to ${item.name}`}
                onPress={this.startEdit(index)}
                />
            </View>
          )}
        />
        <CardRuleEditor
          visible={this.state.editing}
          card={this.state.cards[this.state.selectedIndex]}
          onSaveRules={this.handleSaveRules}
          onCancelEdit={this.handleCancelEdit}
        />
      </View>
    )
  }
}

export default Configuration;
