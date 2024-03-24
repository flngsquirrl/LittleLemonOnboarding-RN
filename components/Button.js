import { Text, TouchableOpacity, StyleSheet } from "react-native";
import appStyles from "../styles/styleGuide";

const Button = ({ title, isDestructive = false, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.container,
        isDestructive ? styles.destructive.container : styles.basic.container,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, isDestructive ? styles.destructive.text : styles.basic.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    padding: 10,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  basic: {
    container: {
      backgroundColor: appStyles.button.basic.background,
      borderColor: appStyles.button.basic.borderColor,
    },
    text: {
      color: appStyles.button.basic.color,
    },
  },
  destructive: {
    container: {
      backgroundColor: appStyles.button.destructive.background,
      borderColor: appStyles.button.destructive.borderColor,
    },
    text: {
      fontWeight: "normal",
      color: appStyles.button.destructive.color,
    },
  },
});

export default Button;
