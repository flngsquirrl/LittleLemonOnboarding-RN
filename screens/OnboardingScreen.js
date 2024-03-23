import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import UserContext from "../contexts/UserContext";
import { saveUser } from "../persistence/userStorage";
import InfoField from "../components/InfoField";

const OnboardingScreen = () => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const processUserData = () => {
    const currUser = { firstName: firstName, lastName: lastName };
    setUser(currUser);
    saveUser(currUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <InfoField value={firstName} label='First name' onChangeText={setFirstName} />
      <InfoField value={lastName} label='Last name' onChangeText={setLastName} />
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
