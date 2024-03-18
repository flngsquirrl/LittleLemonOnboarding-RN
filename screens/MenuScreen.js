import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import UserContext from "../contexts/UserContext";

const MenuScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text>{user.firstName}</Text>
      <Text>{user.hasAvatar ? "true" : "false"}</Text>
      <Button title='Profile' onPress={() => navigation.navigate("profile")} />
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

export default MenuScreen;
