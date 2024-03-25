import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import UserContext from '../contexts/UserContext';
import { readUser, deleteUser } from '../persistence/userStorage';
import MenuScreen from '../screens/MenuScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { iconTextButtonStyles } from '../styles/styleGuide';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const onReady = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    loadUserData();
  }, []);

  if (isLoading) {
    return null;
  }

  const loadUserData = async () => {
    try {
      const savedUser = await readUser();

      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Error loading user', error);
    } finally {
      setLoading(false);
    }
  };

  const processLogout = () => {
    deleteUser();
    setUser(null);
  };

  const LogoutButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={iconTextButtonStyles.container}
        onPress={processLogout}>
        <MaterialCommunityIcons name="logout" style={iconTextButtonStyles.icon} />
        <Text style={iconTextButtonStyles.text}>Log out</Text>
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer onReady={onReady}>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator>
          {!user ? (
            <Stack.Screen
              name="onboarding"
              options={{ title: 'Onboarding' }}
              component={OnboardingScreen}
            />
          ) : (
            <>
              <Stack.Screen name="menu" options={{ title: 'Menu' }} component={MenuScreen} />
              <Stack.Screen
                name="profile"
                options={{
                  title: 'Profile',
                  headerRight: () => <LogoutButton />,
                }}
                component={ProfileScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default RootNavigator;
