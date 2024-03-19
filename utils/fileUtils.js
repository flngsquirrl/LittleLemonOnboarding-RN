import * as FileSystem from "expo-file-system";

export async function prepareDirectory(directoryPath) {
  const targetDirectory = await FileSystem.getInfoAsync(directoryPath);
  if (!targetDirectory.isDirectory) {
    try {
      await FileSystem.makeDirectoryAsync(directoryPath, {
        intermediates: true,
      });
    } catch (error) {
      console.info("Error while making directory", error);
    }
  }
}
