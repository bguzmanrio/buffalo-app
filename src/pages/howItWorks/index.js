import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../../components/Text';
import Button from '../../components/Button';

import { SECONDARY_COLOR } from '../../style';

const HowItWorks = props => (
  <View style={styles.container}>
    <Text align="center">¿Cómo va la cosa?</Text>
    <View style={styles.introduction}>
      <Text fontSize="s">Esto se trata de beber siguiendo las reglas que cada carta tiene asignadas.</Text>
      <Text fontSize="s">Para comenzar el juego, selecciona el número de jugadores. Esto es importante puesto que cuando queden tantas cartas como jugadores comenzará la "ronda cachonda", lo que significa que las penalizaciones son el doble.</Text>
      <Text fontSize="s">Desliza tu dedo sobre la pantalla para descubrir tu carta. Podrás conocer penalización asociada a cada carta deslizando hacia arriba. Para pasar a la siguiente carta, desliza de nuevo el dedo y echa la carta fuera </Text>
    </View>
    <Button text="Entendido" onPress={() => props.navigation.replace('Start')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    backgroundColor: SECONDARY_COLOR
  },
  introduction: {
    paddingHorizontal: 16
  }
})

export default HowItWorks;
