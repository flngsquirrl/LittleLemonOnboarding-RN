import { Text, View, TextInput, StyleSheet } from "react-native";
import appStyles from "../styles/styleGuide";

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
    color: appStyles.labelColors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: appStyles.inputColors.border,
    color: appStyles.inputColors.text,
    borderRadius: 7,
    height: 40,
    padding: 10,
  },
});

export default InfoField;
