import * as FileSystem from "expo-file-system";

function getDocumentsDirectory() {
  return FileSystem.documentDirectory;
}

const USER_AVATAR_PATH = "user/avatar";

export function getUserAvatarPath() {
  return getDocumentsDirectory() + USER_AVATAR_PATH;
}
