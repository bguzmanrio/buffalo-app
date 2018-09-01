import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text, StyleSheet } from 'react-native';

import Card from './Card';
import { getShuffledDeck } from '../../../components/Decks/SpanishDeck';

class Deck extends Component {
  static propTypes = {
    navigateBack: PropTypes.func.isRequired,
    rules: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cards: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
          base: PropTypes.shape({
            short: PropTypes.string.isRequired,
            long: PropTypes.string
          }),
          hotRound: PropTypes.shape({
            short: PropTypes.string.isRequired,
            long: PropTypes.string
          })
        })
      })
    }).isRequired
  }

  deck = getShuffledDeck();
  
  state = {
    currentIndex: 0,
    end: false
  };

  handleSwipe = () => {    
    if (this.state.currentIndex < this.deck.length - 1) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));
    } else {
      this.setState({
        end: true
      });
    }
  };

  isHotRound = () =>
    (this.state.currentIndex + parseInt(this.props.players)) >= this.deck.length;

  renderCounter = () => (
    <Text style={styles.counter}>
      {this.state.currentIndex + 1}/{this.deck.length}
    </Text>
  );

  renderCard = () => {
    const currentCard = this.deck[this.state.currentIndex];    
    const ruleForCurrentCard = this.props.rules.cards[currentCard.number];

    return (
      <View>
        <Card
          isHotRound={this.isHotRound()}
          image={currentCard.image}
          rule={ruleForCurrentCard}
          onSwipeCard={this.handleSwipe}
        />
      </View>
    );
  }

  render() {
    return this.state.end ? (
      <View>
        <Button onPress={this.props.navigateBack} title="The end! Press to go back"/>
      </View>
    ) : (
      <View>
        {this.renderCard()}
        {this.renderCounter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counter: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});

export default Deck;
