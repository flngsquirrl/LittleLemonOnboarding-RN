import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import UserContext from "../UserContext";

// test imports
import { MOCK_CURRENT_USER } from "../UserContext";

const OnboardingScreen = () => {
  const { setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <Button title='Menu' onPress={() => setUser(MOCK_CURRENT_USER)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
});

export default OnboardingScreen;
