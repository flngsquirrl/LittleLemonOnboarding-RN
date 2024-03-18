import { useContext } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

import UserContext from "../UserContext";
import { getUserAvatarPath } from "../fileUtils";
import * as UserUtils from "../userUtils";

const ProfileAvatar = () => {
  const { user, setUser } = useContext(UserContext);

  const avatarPath = getUserAvatarPath();

  let avatarSource;
  let initials;
  if (user.hasAvatar) {
    avatarSource = { uri: avatarPath };
  } else {
    initials = UserUtils.getInitials(user.firstName, user.lastName);
  }

  return (
    <>
      <Pressable>
        <View style={[styles.container, !user.hasAvatar && styles.textContainer]}>
          {user.hasAvatar ? (
            <Image style={styles.image} source={avatarSource} alt='Avatar' />
          ) : (
            <Text style={styles.text}>{initials}</Text>
          )}
        </View>
      </Pressable>
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
