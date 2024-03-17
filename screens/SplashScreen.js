import { View, StyleSheet } from "react-native";

const SplashScreen = () => {
  return <View style={[styles.container, styles.splashScreen]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashScreen: {
    backgroundColor: "yellow",
  },
});

export default SplashScreen;
