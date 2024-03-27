import { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from '../components/Button';
import HeroBlock from '../components/HeroBlock';
import InfoField from '../components/InfoField';
import UserContext from '../contexts/UserContext';
import { saveUser } from '../persistence/userStorage';
import { displayTitle, screenContainer } from '../styles/styleGuide';
import * as UserUtils from '../utils/profileUtils';

const OnboardingScreen = () => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const processUserData = () => {
    const currUser = { firstName, email };
    setUser(currUser);
    saveUser(currUser);
  };

  const isFirstNameValid = UserUtils.isFirstNameValid(firstName);
  const isEmailValid = UserUtils.isEmailValid(email);
  const isDataValid = isFirstNameValid && isEmailValid;
  console.log(isDataValid);

  return (
    <>
      <HeroBlock />
      <View style={screenContainer}>
        <Text style={displayTitle}>Let us get to know you</Text>
        <InfoField
          value={firstName}
          label="First name*"
          valid={isFirstNameValid}
          onChangeText={setFirstName}
        />
        <InfoField
          value={email}
          label="Email*"
          valid={isEmailValid}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <View style={styles.buttonContainer}>
          <Button title="Menu" enabled={isDataValid} onPress={processUserData} />
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
