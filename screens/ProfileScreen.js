import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import ProfileAvatar from "../components/ProfileAvatar";

import UserContext from "../contexts/UserContext";
import ProfileContext from "../contexts/ProfileContext";
import { saveUser, deleteUser } from "../persistence/userStorage";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({ ...user });

  const saveChanges = () => {
    // TODO: save avatar to app documents directory

    const userAvatarPath = profile.avatarPath;

    const updatedUser = { ...profile, avatarPath: userAvatarPath };
    saveUser(updatedUser);
    setUser(updatedUser);
  };

  const processLogout = () => {
    deleteUser();
    setUser(null);
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <ProfileAvatar />
        <View style={styles.infoContainer}>
          <Text style={styles.inputTitle}>First name</Text>
          <TextInput
            style={styles.input}
            value={profile.firstName}
            onChangeText={(value) => setProfile({ ...profile, firstName: value })}
          />
          <Text style={styles.inputTitle}>Last name</Text>
          <TextInput
            style={styles.input}
            value={profile.lastName}
            onChangeText={(value) => setProfile({ ...profile, lastName: value })}
          />
        </View>
        <Button title='Reset changes' onPress={() => setProfile({ ...user })} />
        <Button title='Save changes' onPress={saveChanges} />
        <Button title='Log out' onPress={processLogout} />
      </View>
    </ProfileContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
  infoContainer: {
    padding: 20,
  },
  inputTitle: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
    padding: 10,
  },
});

export default ProfileScreen;
