import { View, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/little-lemon-logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
