import { View, Text, Image, StyleSheet } from 'react-native';

import { AppColors } from '../styles/styleGuide';

const introText =
  'We are a family owned Mediterranean restaurant, ' +
  'focused on traditional recipes served with a modern twist.';

const HeroBlock = () => {
  const imageSource = require('../assets/images/hero.jpg');

  return (
    <View style={styles.container}>
      <Text>Little Lemon</Text>
      <Text>Chicago</Text>
      <View style={styles.intro.container}>
        <Text style={styles.intro.text}>{introText}</Text>
        <Image style={styles.intro.image} source={imageSource} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.darkGreen,
    padding: 20,
  },
  intro: {
    container: {
      flexDirection: 'row',
    },
    text: {
      flex: 3,
    },
    image: {
      flex: 2,
      aspectRatio: 1,
      borderRadius: 20,
    },
  },
});

export default HeroBlock;
