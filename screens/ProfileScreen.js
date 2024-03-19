import { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import ProfileAvatar from "../components/ProfileAvatar";
import UserContext from "../contexts/UserContext";
import ProfileContext from "../contexts/ProfileContext";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({ ...user });

  const saveChanges = () => {
    // TODO: save avatar to app documents directory
    // TODO: update user avatar path and data in the storage and in memory
    const userAvatarPath = profile.avatarPath;
    setUser({ ...profile, avatarPath: userAvatarPath });
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <ProfileAvatar />
        <Text>{profile.firstName}</Text>
        <Text>{profile.hasAvatar ? "true" : "false"}</Text>
        <Button title='Reset changes' onPress={() => setProfile({ ...user })} />
        <Button title='Save changes' onPress={saveChanges} />
        <Button title='Log out' onPress={() => setUser(null)} />
      </View>
    </ProfileContext.Provider>
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
