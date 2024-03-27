import { Text, View, TextInput, StyleSheet } from 'react-native';

import { input } from '../styles/sharedStyles';
import { colorGuide } from '../styles/styleGuide';

const InfoField = ({ label, value, keyboardType, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={input}
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
  label: {
    marginBottom: 5,
    color: colorGuide.label.text,
  },
});

export default InfoField;
