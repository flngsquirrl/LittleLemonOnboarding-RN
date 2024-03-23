import { Text, Pressable, StyleSheet } from "react-native";
import * as StyleGuide from "../styles/styleGuide";

const Button = ({ title, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.buttonColors.background,
    borderRadius: 7,
    height: 40,
    padding: 10,
  },
  text: {
    textAlign: "center",
    color: StyleGuide.buttonColors.color,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Button;
