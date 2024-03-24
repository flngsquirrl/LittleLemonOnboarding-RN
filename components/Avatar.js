import { View, Image, Text, StyleSheet } from "react-native";
import * as StyleGuide from "../styles/styleGuide";

const Avatar = ({ imagePath, substitutionText }) => {
  return (
    <View style={[styles.container, !imagePath && styles.textContainer]}>
      {imagePath ? (
        <Image style={styles.image} source={{ uri: imagePath }} alt='User avatar' />
      ) : (
        <Text style={styles.text}>{substitutionText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: StyleGuide.infoBox.borderColor,
    borderWidth: 2,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  textContainer: {
    backgroundColor: StyleGuide.infoBox.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: StyleGuide.infoBox.color,
  },
});

export default Avatar;
