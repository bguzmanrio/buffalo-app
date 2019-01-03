import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import Text from '../../components/Text';
import Button from '../../components/Button';

import { SECONDARY_COLOR } from '../../style';

const HowItWorks = props => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.ruleWrapper}>
      <Text align="center">¿Cómo va la cosa?</Text>
    </View>
    <View style={styles.introduction}>
      <View style={styles.ruleWrapper}>
        <Text fontSize="s">Esto se trata de beber siguiendo las reglas que cada carta tiene asignadas.</Text>
      </View>
      <View style={styles.ruleWrapper}>
        <Text fontSize="s">Para comenzar el juego, selecciona el número de jugadores. Esto es importante puesto que cuando queden tantas cartas como jugadores comenzará la "ronda cachonda", lo que significa que las penalizaciones son el doble.</Text>
      </View>
      <View style={styles.ruleWrapper}>
        <Text fontSize="s">Desliza tu dedo sobre la pantalla para descubrir tu carta. Podrás conocer penalización asociada a cada carta deslizando hacia arriba. Para pasar a la siguiente carta, desliza de nuevo el dedo y echa la carta fuera </Text>
      </View>
      <View style={styles.ruleWrapper}>
        <Text fontSize="s">Se debe beber siempre con la misma mano. Si alguien se equivoca y es descubierto, deberá repetir la penalización mientras que todos le gritan BUFFALO</Text>
      </View>
    </View>
    <Button text="Entendido" onPress={() => props.navigation.replace('Start')} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: SECONDARY_COLOR
  },
  introduction: {
    paddingHorizontal: 16
  },
  ruleWrapper: {
    marginBottom: 16
  }
})

export default HowItWorks;
