import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
        <Avatar imagePath={profile.avatarPath} substitutionText={initials} size={120} />
      </TouchableOpacity>
      <TouchableOpacity style={clearButtonStyles.container} onPress={clearAvatar}>
        <MaterialCommunityIcons name='delete-forever-outline' style={clearButtonStyles.icon} />
        <Text style={clearButtonStyles.text}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const clearButtonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    fontSize: 20,
    color: appStyles.actionButton.color,
  },
  text: {
    color: appStyles.actionButton.color,
    fontWeight: "bold",
  },
});

export default ProfileAvatar;
