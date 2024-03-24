import * as React from "react";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import appStyles from "../styles/styleGuide";

import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import MenuScreen from "../screens/MenuScreen";
import ProfileScreen from "../screens/ProfileScreen";

import UserContext from "../contexts/UserContext";
import { readUser } from "../persistence/userStorage";
import { deleteUser } from "../persistence/userStorage";

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

  const processLogout = () => {
    deleteUser();
    setUser(null);
  };

  const LogoutButton = () => {
    return (
      <TouchableOpacity activeOpacity={0.6} style={logoutStyles.container} onPress={processLogout}>
        <MaterialCommunityIcons name='logout' style={logoutStyles.icon} />
        <Text style={logoutStyles.text}>Log out</Text>
      </TouchableOpacity>
    );
  };

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
            <Stack.Screen
              name='profile'
              options={{
                title: "Profile",
                headerRight: () => <LogoutButton />,
              }}
              component={ProfileScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </UserContext.Provider>
  );
};

const logoutStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    color: appStyles.toolbarButton.color,
  },
  text: {
    fontWeight: "bold",
    color: appStyles.toolbarButton.color,
  },
});

export default RootNavigator;
