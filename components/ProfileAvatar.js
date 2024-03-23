import { Button, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

import * as ProfileUtils from "../utils/profileUtils";
import Avatar from "./Avatar";

const ProfileAvatar = ({ profile, onChange }) => {
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
    onChange(newAvatarPath);
  };

  const initials = ProfileUtils.getInitials(profile.firstName, profile.lastName);

  return (
    <>
      <Pressable onPress={pickImage}>
        <Avatar imagePath={profile.avatarPath} substitutionText={initials} />
      </Pressable>
      <Button title='Clear avatar' onPress={clearAvatar} />
    </>
  );
};

export default ProfileAvatar;
