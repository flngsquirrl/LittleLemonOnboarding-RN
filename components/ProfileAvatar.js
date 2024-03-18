import { useState, useEffect } from "react";
import { View, Text, Button, Pressable, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import * as UserUtils from "../userUtils";

const ProfileAvatar = ({ data: { firstName, lastName, imagePath } }) => {
  const [avatarPath, setAvatarPath] = useState(imagePath);
  const [initials, setInitials] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarPath(result.assets[0].uri);
    }
  };

  useEffect(() => {
    setInitials(UserUtils.getInitials(firstName, lastName));
  }, []);

  return (
    <>
      <Pressable onPress={pickImage}>
        <View style={[styles.container, !avatarPath && styles.textContainer]}>
          {avatarPath ? (
            <Image style={styles.image} source={{ uri: avatarPath }} alt='Avatar' />
          ) : (
            <Text style={styles.text}>{initials}</Text>
          )}
        </View>
      </Pressable>
      <Button title='Clear avatar' onPress={() => setAvatarPath("")} />
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
