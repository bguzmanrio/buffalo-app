import { createAppContainer, createStackNavigator } from 'react-navigation';

import Start from './pages/start';
import HowItWorks from './pages/howItWorks';
import Game from './pages/game';
import SelectConfig from './pages/selectRules';

const Navigator = createStackNavigator({
  Start: { screen: Start, headerMode: 'screen' },
  HowItWorks: { screen: HowItWorks, headerMode: 'screen' },
  SelectConfig: { screen: SelectConfig },
  Game: { screen: Game, headerMode: 'none' }
}, {
  headerMode: 'none' 
});

export const AppContainer = createAppContainer(Navigator);

