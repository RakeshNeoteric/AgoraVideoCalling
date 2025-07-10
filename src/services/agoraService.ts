import AgoraUIKit from 'agora-rn-uikit';
import { createAgoraRtcEngine } from 'react-native-agora';

const APP_ID = 'e283ba7f017b4d07a364b623ce1c5798'; // Replace with your Agora App ID

export const rtcEngine = createAgoraRtcEngine();

export function initializeAgora() {
  rtcEngine.initialize({ appId: APP_ID });
}

export function joinChannel(channelName: string, token: string | null = null) {
  rtcEngine.enableVideo();
  rtcEngine.joinChannel(token || '', channelName, 0, { channelProfile: 0 });
}

export function leaveChannel() {
  rtcEngine.leaveChannel();
}
