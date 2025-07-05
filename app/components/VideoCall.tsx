import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import RtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcSurfaceView,
  RenderModeType,
  RtcEngineContext,
  createAgoraRtcEngine
} from 'react-native-agora';

import { AGORA_APP_ID, AGORA_CHANNEL_NAME } from '../constants/Config';
import { requestCameraAndAudioPermissions } from '../utils/permissions';

const VideoCall = () => {

  const rtcEngine: IRtcEngine = createAgoraRtcEngine();
  
  const [engine, setEngine] = useState<IRtcEngine | null>(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const initializeAgora = async () => {
      try {
        await requestCameraAndAudioPermissions();

        const rtcEngine = await RtcEngine.create(AGORA_APP_ID);
        await rtcEngine.enableVideo();
        await rtcEngine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
        await rtcEngine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

        rtcEngine.addListener('JoinChannelSuccess', () => {
          console.log('Successfully joined the channel');
          setJoined(true);
        });

        rtcEngine.addListener('Error', (err) => {
          console.error('Agora Error:', err);
        });

        setEngine(rtcEngine);
      } catch (error) {
        console.error('Initialization Error:', error);
      }
    };

    initializeAgora();

    return () => {
      engine?.release(); // Correct method to release engine in v4.x
    };
  }, []);

  const startCall = async () => {
    try {
      await engine?.joinChannel('', AGORA_CHANNEL_NAME, '', 0); // Token must be string (empty for testing)
    } catch (err: any) {
      Alert.alert('Failed to join call', err?.message || JSON.stringify(err));
    }
  };

  const endCall = async () => {
    try {
      await engine?.leaveChannel();
      setJoined(false);
    } catch (err) {
      console.error('Leave Channel Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      {joined ? (
        <>
          <RtcSurfaceView
            style={styles.video}
            uid={0}  // 0 means local user
            renderMode={RenderModeType.RenderModeHidden}
            zOrderMediaOverlay={true}
          />
          <Button title="End Call" onPress={endCall} />
        </>
      ) : (
        <Button title="Start Video Call" onPress={startCall} />
      )}
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  video: { width: '100%', height: '70%' },
});
