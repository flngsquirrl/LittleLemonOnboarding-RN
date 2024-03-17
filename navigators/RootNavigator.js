import * as React from "react";
import { useState, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import MenuScreen from "../screens/MenuScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: read isOnboardingComplete
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='onboarding'
        options={{ title: "Onboarding" }}
        component={OnboardingScreen}
      />
      <Stack.Screen name='menu' options={{ title: "Menu" }} component={MenuScreen} />
      <Stack.Screen name='profile' options={{ title: "Profile" }} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
