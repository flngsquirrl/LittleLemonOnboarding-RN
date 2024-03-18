import * as FileSystem from "expo-file-system";

function getDocumentsDirectory() {
  return FileSystem.documentDirectory;
}

export function getUserAvatarPath() {
  return getDocumentsDirectory() + "user/avatar";
}
