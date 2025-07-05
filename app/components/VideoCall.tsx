import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import {
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RtcSurfaceView,
  RenderModeType
} from 'react-native-agora';

import { AGORA_APP_ID, AGORA_CHANNEL_NAME } from '../constants/Config';
import { requestCameraAndAudioPermissions } from '../utils/permissions';

const VideoCall = () => {
  const [joined, setJoined] = useState(false);
  const [engine] = useState<IRtcEngine>(() => createAgoraRtcEngine());

  useEffect(() => {
    const initializeAgora = async () => {
      try {
        await requestCameraAndAudioPermissions();

        engine.initialize({
          appId: AGORA_APP_ID,
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        });

        engine.registerEventHandler({
          onJoinChannelSuccess: () => {
            console.log('Successfully joined the channel');
            setJoined(true);
          },
          onError: (err) => {
            console.error('Agora Error:', err);
          },
        });

        engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
        engine.enableVideo();
      } catch (error) {
        console.error('Initialization Error:', error);
      }
    };

    initializeAgora();

    return () => {
      engine.release();
    };
  }, [engine]);

  const startCall = async () => {
    try {
      engine.joinChannel('', AGORA_CHANNEL_NAME, 0, {});
    } catch (err: any) {
      Alert.alert('Failed to join call', err?.message || JSON.stringify(err));
    }
  };

  const endCall = async () => {
    try {
      engine.leaveChannel();
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
            canvas={{
              uid: 0,
              renderMode: RenderModeType.RenderModeHidden,
            }}
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
