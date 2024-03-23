import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import UserContext from "../contexts/UserContext";
import { saveUser } from "../persistence/userStorage";
import InfoField from "../components/InfoField";

const OnboardingScreen = () => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const processUserData = () => {
    const currUser = { firstName: firstName, email: email };
    setUser(currUser);
    saveUser(currUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <InfoField value={firstName} label='First name' onChangeText={setFirstName} />
      <InfoField value={email} label='Email' onChangeText={setEmail} />
      <Button title='Menu' onPress={processUserData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 30,
  },
});

export default OnboardingScreen;
