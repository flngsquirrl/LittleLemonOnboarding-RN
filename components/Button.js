import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colorGuide } from '../styles/styleGuide';

const Button = ({ title, isDestructive = false, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.container,
        isDestructive ? styles.destructive.container : styles.basic.container,
      ]}
      onPress={onPress}>
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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  basic: {
    container: {
      backgroundColor: colorGuide.button.basic.background,
      borderColor: colorGuide.button.basic.borderColor,
    },
    text: {
      color: colorGuide.button.basic.color,
    },
  },
  destructive: {
    container: {
      backgroundColor: colorGuide.button.destructive.background,
      borderColor: colorGuide.button.destructive.borderColor,
    },
    text: {
      fontWeight: 'normal',
      color: colorGuide.button.destructive.color,
    },
  },
});

export default Button;
