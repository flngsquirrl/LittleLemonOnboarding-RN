import * as React from "react";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import MenuScreen from "../screens/MenuScreen";
import ProfileScreen from "../screens/ProfileScreen";

import UserContext from "../contexts/UserContext";
import { readUser } from "../persistence/userStorage";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loadUserData = async () => {
    try {
      const savedUser = await readUser();

      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error("Error loading user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name='onboarding'
            options={{ title: "Onboarding" }}
            component={OnboardingScreen}
          />
        ) : (
          <>
            <Stack.Screen name='menu' options={{ title: "Menu" }} component={MenuScreen} />
            <Stack.Screen name='profile' options={{ title: "Profile" }} component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </UserContext.Provider>
  );
};

export default RootNavigator;
