import * as FileSystem from "expo-file-system";
import { prepareDirectory } from "../utils/fileUtils";

const USER_PATH_REL = "user/";
const USER_AVATAR_PATH_REL = USER_PATH_REL + "avatar.jpg";
const USER_PATH = FileSystem.documentDirectory + USER_PATH_REL;
const USER_AVATAR_PATH = FileSystem.documentDirectory + USER_AVATAR_PATH_REL;

async function prepareUserDirectory() {
  await prepareDirectory(USER_PATH);
}

export async function saveUserAvatar(fromUrl) {
  await prepareUserDirectory();

  if (fromUrl !== USER_AVATAR_PATH) {
    try {
      await FileSystem.copyAsync({
        from: fromUrl,
        to: USER_AVATAR_PATH,
      });
    } catch (error) {
      console.info("Error while saving user avatar", error);
    }
  }

  return USER_AVATAR_PATH;
}

export async function deleteUserAvatar() {
  const avatarFile = await FileSystem.getInfoAsync(USER_AVATAR_PATH);
  if (avatarFile.exists) {
    try {
      await FileSystem.deleteAsync(USER_AVATAR_PATH);
    } catch (error) {
      console.info("Error while deleting user avatar", error);
    }
  }
}
