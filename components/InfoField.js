import { Text, View, TextInput, StyleSheet } from 'react-native';

import { input, inputContainer, inputLabel } from '../styles/sharedStyles';

const InfoField = ({ label, value, keyboardType, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType ? keyboardType : 'default'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  input: {
    ...inputContainer,
    ...input,
  },
  label: {
    ...inputLabel,
    marginBottom: 5,
  },
});

export default InfoField;
