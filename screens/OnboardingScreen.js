import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import UserContext from "../contexts/UserContext";
import { saveUser } from "../persistence/userStorage";

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
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder='First name'
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder='Last name'
      />
      <Button title='Menu' onPress={processUserData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
  },
});

export default OnboardingScreen;
