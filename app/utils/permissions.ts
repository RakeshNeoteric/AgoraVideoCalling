import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

export const requestCameraAndAudioPermissions = async () => {
  try {
    await requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]);
  } catch (err) {
    console.warn('Permission Error:', err);
  }
};
