// app/utils/permissions.ts
import { PermissionsAndroid, Platform } from "react-native";

export async function requestPermissions() {
  if (Platform.OS === "android") {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  }
}
