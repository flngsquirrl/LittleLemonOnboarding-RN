import { useContext } from "react";
import { View, Text, Button, Pressable, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import * as UserUtils from "../utils/userUtils";

import ProfileContext from "../contexts/ProfileContext";

const ProfileAvatar = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      updateProfileAvatar(result.assets[0].uri);
    }
  };

  const clearAvatar = () => {
    updateProfileAvatar("");
  };

  const updateProfileAvatar = (newAvatarPath) => {
    setProfile({ ...profile, hasAvatar: !!newAvatarPath, avatarPath: newAvatarPath });
  };

  const initials = UserUtils.getInitials(profile.firstName, profile.lastName);

  return (
    <>
      <Pressable onPress={pickImage}>
        <View style={[styles.container, !profile.avatarPath && styles.textContainer]}>
          {profile.avatarPath ? (
            <Image style={styles.image} source={{ uri: profile.avatarPath }} alt='User avatar' />
          ) : (
            <Text style={styles.text}>{initials}</Text>
          )}
        </View>
      </Pressable>
      <Button title='Clear avatar' onPress={clearAvatar} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  textContainer: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "white",
  },
});

export default ProfileAvatar;
