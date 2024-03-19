import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import ProfileAvatar from "../components/ProfileAvatar";
import UserContext from "../contexts/UserContext";
import ProfileContext from "../contexts/ProfileContext";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({ ...user });

  const saveChanges = () => {
    // TODO: save avatar to app documents directory

    const userAvatarPath = profile.avatarPath;
    setUser({ ...profile, avatarPath: userAvatarPath });
    // TODO: update user data in the storage
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <ProfileAvatar />
        <View style={styles.infoContainer}>
          <Text>First name</Text>
          <TextInput
            style={styles.input}
            value={profile.firstName}
            onChangeText={(value) => setProfile({ ...profile, firstName: value })}
          />
          <Text>Last name</Text>
          <TextInput
            style={styles.input}
            value={profile.lastName}
            onChangeText={(value) => setProfile({ ...profile, lastName: value })}
          />
        </View>
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
  },
  title: {
    fontSize: 30,
  },
  infoContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
    marginVertical: 10,
    padding: 10,
  },
});

export default ProfileScreen;
