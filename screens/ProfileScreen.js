import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import ProfileAvatar from "../components/ProfileAvatar";
import UserContext from "../UserContext";

// test imports
import { switchUser, MOCK_CURRENT_USER } from "../UserContext";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <ProfileAvatar data={{ ...user, imagePath: "" }} />
      <Text>{user.firstName}</Text>
      <Button
        title='Switch user'
        onPress={() => {
          switchUser();
          setUser(MOCK_CURRENT_USER);
        }}
      />
      <Button title='Log out' onPress={() => setUser(null)} />
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
