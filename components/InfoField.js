import { Text, View, TextInput, StyleSheet } from "react-native";
import * as StyleGuide from "../styles/styleGuide";

const InfoField = ({ label, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  label: {
    marginBottom: 5,
    color: StyleGuide.labelColors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: StyleGuide.inputColors.border,
    color: StyleGuide.inputColors.text,
    borderRadius: 7,
    height: 40,
    padding: 10,
  },
});

export default InfoField;
