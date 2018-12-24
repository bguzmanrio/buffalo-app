import { ArrayObservable } from 'rxjs/observable/ArrayObservable';

const images = [
  {
    image: require('../../../assets/images/spanishdeck/espadas/1.jpg'),
    number: 1
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/2.jpg'),
    number: 2
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/3.jpg'),
    number: 3
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/4.jpg'),
    number: 4
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/5.jpg'),
    number: 5
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/6.jpg'),
    number: 6
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/7.jpg'),
    number: 7
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/8.jpg'),
    number: 8
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/9.jpg'),
    number: 9
  },
  {
    image: require('../../../assets/images/spanishdeck/espadas/10.jpg'),
    number: 10
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/1.jpg'),
    number: 1
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/2.jpg'),
    number: 2
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/3.jpg'),
    number: 3
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/4.jpg'),
    number: 4
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/5.jpg'),
    number: 5
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/6.jpg'),
    number: 6
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/7.jpg'),
    number: 7
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/8.jpg'),
    number: 8
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/9.jpg'),
    number: 9
  },
  {
    image: require('../../../assets/images/spanishdeck/bastos/10.jpg'),
    number: 10
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/1.jpg'),
    number: 1
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/2.jpg'),
    number: 2
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/3.jpg'),
    number: 3
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/4.jpg'),
    number: 4
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/5.jpg'),
    number: 5
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/6.jpg'),
    number: 6
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/7.jpg'),
    number: 7
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/8.jpg'),
    number: 8
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/9.jpg'),
    number: 9
  },
  {
    image: require('../../../assets/images/spanishdeck/copas/10.jpg'),
    number: 10
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/1.jpg'),
    number: 1
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/2.jpg'),
    number: 2
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/3.jpg'),
    number: 3
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/4.jpg'),
    number: 4
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/5.jpg'),
    number: 5
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/6.jpg'),
    number: 6
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/7.jpg'),
    number: 7
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/8.jpg'),
    number: 8
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/9.jpg'),
    number: 9
  },
  {
    image: require('../../../assets/images/spanishdeck/oros/10.jpg'),
    number: 10
  },
];

export const getShuffledDeck = () => {
  const arr = [...images];
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
