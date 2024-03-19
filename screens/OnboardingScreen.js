import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import UserContext from "../contexts/UserContext";

const OnboardingScreen = () => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const processUserData = () => {
    setUser({ firstName: firstName, lastName: lastName });
    // TODO: save user to storage
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
      <Button title='Menu' onPress={processUser} />
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
