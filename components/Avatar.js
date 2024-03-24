import { View, Image, Text, StyleSheet } from "react-native";
import appStyles from "../styles/styleGuide";

const Avatar = ({ imagePath, substitutionText, size }) => {
  const calculatedStyles = StyleSheet.create({
    circle: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    text: {
      fontSize: size / 4,
    },
  });

  return (
    <View style={[styles.container, calculatedStyles.circle, !imagePath && styles.textContainer]}>
      {imagePath ? (
        <Image style={styles.image} source={{ uri: imagePath }} alt='User avatar' />
      ) : (
        <Text style={[styles.text, calculatedStyles.text]}>{substitutionText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: appStyles.infoBox.borderColor,
    borderWidth: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  textContainer: {
    backgroundColor: appStyles.infoBox.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: appStyles.infoBox.color,
  },
});

export default Avatar;
