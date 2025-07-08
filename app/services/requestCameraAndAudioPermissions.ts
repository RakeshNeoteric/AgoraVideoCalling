import { PermissionsAndroid, Platform } from 'react-native';

export async function requestCameraAndAudioPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('Permission Result:', granted);

      if (
        granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        throw new Error('Required permissions not granted');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
