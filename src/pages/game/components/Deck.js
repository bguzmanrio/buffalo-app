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
        <Counter currentCard={this.state.currentIndex} nCards={this.deck.length} isHotRound={this.isHotRound()} />
      </View>
    );
  }
}

export default Deck;
