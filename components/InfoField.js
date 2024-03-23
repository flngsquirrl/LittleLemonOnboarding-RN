import { Text, View, TextInput, StyleSheet } from "react-native";

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
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 7,
    height: 40,
    padding: 10,
  },
});

export default InfoField;
