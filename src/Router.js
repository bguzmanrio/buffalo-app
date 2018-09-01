import React from 'react';
import { StackNavigator } from 'react-navigation';

import Start from './pages/start';
import Configuration from './pages/configuration';
import Game from './pages/game';
import SelectConfig from './pages/selectRules';

export const Navigator = StackNavigator({
  Start: { screen: Start, headerMode: 'screen' },
  Configuration: { screen: Configuration, headerMode: 'screen' },
  SelectConfig: { screen: SelectConfig },
  Game: { screen: Game, headerMode: 'none' }
}, {
  headerMode: 'none' 
});
