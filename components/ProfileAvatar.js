import { Button, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import appStyles from "../styles/styleGuide";

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
      <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
        <Avatar imagePath={profile.avatarPath} substitutionText={initials} />
      </TouchableOpacity>
      <TouchableOpacity style={clearButtonStyles.container} onPress={clearAvatar}>
        <MaterialCommunityIcons name='delete-forever-outline' style={clearButtonStyles.icon} />
        <Text style={clearButtonStyles.text}>Clear</Text>
      </TouchableOpacity>
    </>
  );
};

const clearButtonStyles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    color: appStyles.actionButton.color,
  },
  text: {
    color: appStyles.actionButton.color,
    fontWeight: "bold",
  },
};

export default ProfileAvatar;
