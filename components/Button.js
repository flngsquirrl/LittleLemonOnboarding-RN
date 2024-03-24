import { Text, Pressable, StyleSheet } from "react-native";
import appStyles from "../styles/styleGuide";

const Button = ({ title, isDestructive = false, onPress }) => {
  return (
    <Pressable
      style={[
        styles.container,
        isDestructive ? styles.destructive.container : styles.basic.container,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, isDestructive ? styles.destructive.text : styles.basic.text]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    height: 40,
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  basic: {
    container: {
      backgroundColor: appStyles.button.basic.background,
    },
    text: {
      color: appStyles.button.basic.color,
    },
  },
  destructive: {
    container: {
      backgroundColor: appStyles.button.destructive.background,
      borderColor: appStyles.button.destructive.borderColor,
      borderWidth: 1,
    },
    text: {
      fontWeight: "normal",
      color: appStyles.button.destructive.color,
    },
  },
});

export default Button;
