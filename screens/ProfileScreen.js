import { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../components/Button';
import InfoField from '../components/InfoField';
import ProfileAvatar from '../components/ProfileAvatar';
import UserContext from '../contexts/UserContext';
import { saveUserAvatar, deleteUserAvatar } from '../persistence/userFileStorage';
import { saveUser, deleteUser } from '../persistence/userStorage';
import { screenContainer } from '../styles/sharedStyles';
import * as userUtils from '../utils/profileUtils';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({ ...user });

  const isFirstNameValid = userUtils.isFirstNameValid(profile.firstName);
  const isEmailNameValid = userUtils.isEmailValid(profile.email);
  const isDataValid = isFirstNameValid && isEmailNameValid;

  const saveChanges = async () => {
    const unmaskedPhoneNumber = userUtils.unmaskPhoneNumber(profile.phoneNumber);
    let updatedUser = { ...profile, phoneNumber: unmaskedPhoneNumber };
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

  const processLogout = () => {
    deleteUser();
    setUser(null);
  };

  return (
    <View style={screenContainer}>
      <ProfileAvatar profile={profile} onChange={handleAvatarChange} />
      <InfoField
        value={profile.firstName}
        label="First name"
        onChangeText={(value) => setProfile({ ...profile, firstName: value })}
      />
      <InfoField
        value={profile.lastName}
        label="Last name"
        onChangeText={(value) => setProfile({ ...profile, lastName: value })}
      />
      <InfoField
        value={profile.email}
        label="Email"
        onChangeText={(value) => setProfile({ ...profile, email: value })}
        keyboardType="email-address"
      />
      <InfoField
        value={profile.phoneNumber}
        label="Phone number"
        onChangeText={(value) => setProfile({ ...profile, phoneNumber: value })}
        keyboardType="number-pad"
        mask="(999) 999-9999"
      />
      <View style={styles.buttonsContainer}>
        <ButtonWrapper title="Save changes" onPress={saveChanges} enabled={isDataValid} />
        <ButtonWrapper
          title="Reset changes"
          isDestructive="true"
          onPress={() => setProfile({ ...user })}
        />
        <ButtonWrapper title="Log out" isDestructive="true" onPress={processLogout} />
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
  title: {
    fontSize: 30,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
});

export default ProfileScreen;
