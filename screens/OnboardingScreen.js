import { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from '../components/Button';
import HeroBlock from '../components/HeroBlock';
import InfoField from '../components/InfoField';
import UserContext from '../contexts/UserContext';
import { saveUser } from '../persistence/userStorage';
import { displayTitle, screenContainer } from '../styles/styleGuide';

const OnboardingScreen = () => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const processUserData = () => {
    const currUser = { firstName, email };
    setUser(currUser);
    saveUser(currUser);
  };

  return (
    <>
      <HeroBlock />
      <View style={screenContainer}>
        <Text style={displayTitle}>Let us get to know you</Text>
        <InfoField value={firstName} label="First name" onChangeText={setFirstName} />
        <InfoField value={email} label="Email" onChangeText={setEmail} />
        <View style={styles.buttonContainer}>
          <Button title="Menu" onPress={processUserData} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
});

export default OnboardingScreen;
