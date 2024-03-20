import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ITEM_NAME = "user";

export async function readUser() {
  try {
    const value = await AsyncStorage.getItem(USER_ITEM_NAME);
    const user = JSON.parse(value);
    return user;
  } catch (error) {
    console.error("Error reading user from storage", error);
  }
}

export async function saveUser(user) {
  try {
    const value = await AsyncStorage.setItem(USER_ITEM_NAME, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to storage", error);
  }
}

export async function deleteUser() {
  try {
    const value = await AsyncStorage.removeItem(USER_ITEM_NAME);
  } catch (error) {
    console.error("Error removing user from storage", error);
  }
}
