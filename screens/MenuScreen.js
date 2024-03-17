import { View, Text, Button, StyleSheet } from "react-native";

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
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
