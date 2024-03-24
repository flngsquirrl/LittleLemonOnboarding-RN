import { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import ProfileAvatar from "../components/ProfileAvatar";
import InfoField from "../components/InfoField";
import Button from "../components/Button";

import UserContext from "../contexts/UserContext";
import { saveUser } from "../persistence/userStorage";
import { saveUserAvatar, deleteUserAvatar } from "../persistence/userFileStorage";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({ ...user });

  const saveChanges = async () => {
    let updatedUser = { ...profile };
    if (profile.hasAvatar) {
      const userAvatarPath = await saveUserAvatar(profile.avatarPath);
      updatedUser = { ...updatedUser, avatarPath: userAvatarPath };
    } else {
      deleteUserAvatar();
    }

    saveUser(updatedUser);
    setUser(updatedUser);
  };

  const handleAvatarChange = (newAvatarPath) => {
    setProfile({ ...profile, hasAvatar: !!newAvatarPath, avatarPath: newAvatarPath });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <ProfileAvatar profile={profile} onChange={handleAvatarChange} />
      <View style={styles.infoContainer}>
        <InfoField
          value={profile.firstName}
          label='First name'
          onChangeText={(value) => setProfile({ ...profile, firstName: value })}
        />
        <InfoField
          value={profile.lastName}
          label='Last name'
          onChangeText={(value) => setProfile({ ...profile, lastName: value })}
        />
        <InfoField
          value={profile.email}
          label='Email'
          onChangeText={(value) => setProfile({ ...profile, email: value })}
        />
        <InfoField
          value={profile.phoneNumber}
          label='Phone number'
          onChangeText={(value) => setProfile({ ...profile, phoneNumber: value })}
        />
        <View style={styles.buttonsContainer}>
          <ButtonWrapper title='Save changes' onPress={saveChanges} />
          <ButtonWrapper
            title='Reset changes'
            isDestructive='true'
            onPress={() => setProfile({ ...user })}
          />
        </View>
      </View>
    </View>
  );
};

const ButtonWrapper = (props) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button {...props} />
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
  buttonWrapper: {
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
});

export default ProfileScreen;
