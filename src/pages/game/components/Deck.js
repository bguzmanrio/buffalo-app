import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';

import { getShuffledDeck } from '../../../components/Decks/SpanishDeck';

import Card from './Card';
import Counter from './Counter';

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
    currentIndex: 0
  };

  handleSwipe = () => {    
    if (this.state.currentIndex < this.deck.length - 1) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));
    } else {
      this.props.navigateBack();
    }
  };

  isHotRound = () =>
    (this.state.currentIndex + parseInt(this.props.players)) >= this.deck.length;

  render() {
    const currentCard = this.deck[this.state.currentIndex];    
    const ruleForCurrentCard = this.props.rules.cards[currentCard.number];
    const isHotRound = this.isHotRound();

    return (
      <View>
        <Card
          isHotRound={isHotRound}
          image={currentCard.image}
          rule={ruleForCurrentCard}
          onSwipeCard={this.handleSwipe}
        />
        <Counter currentCard={this.state.currentIndex} nCards={this.deck.length} isHotRound={isHotRound} />
      </View>
    );
  }
}

export default Deck;
