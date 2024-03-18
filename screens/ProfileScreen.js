import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import UserContext from "../UserContext";
import { getUserAvatarPath } from "../fileUtils";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>{user.name}</Text>
      <Button title='Change name to Anna' onPress={() => setUser({ name: "Anna" })} />
      <Button title='Log out' onPress={() => setUser(null)} />
      <Text>{getUserAvatarPath()}</Text>
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

export default ProfileScreen;
