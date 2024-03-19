import AsyncStorage from "@react-native-async-storage/async-storage";

export async function readUser() {
  try {
    const value = await AsyncStorage.getItem("user");
    const user = JSON.parse(value);
    return user;
  } catch (error) {
    console.error("Error reading user from storage", error);
  }
}

export async function saveUser(user) {
  try {
    const value = await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to storage", error);
  }
}

export async function deleteUser() {
  try {
    const value = await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Error removing user from storage", error);
  }
}
