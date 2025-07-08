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

import { AGORA_APP_ID } from '../constants/Config';
import { requestCameraAndAudioPermissions } from '../utils/permissions';

type VideoCallProps = {
  channelName: string;
  onEnd: () => void;
  
};

const VideoCall: React.FC<VideoCallProps> = ({ channelName, onEnd }) => {
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
            console.log('✅ Successfully joined the channel:', channelName);
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
    console.log('➡️ Attempting to join channel:', channelName);
    try {
      // ✅ FIX: Use `null` for token instead of empty string ''
      engine.joinChannel('', channelName, 0, {});
    } catch (err: any) {
      Alert.alert('Failed to join call', err?.message || JSON.stringify(err));
    }
  };

  const endCall = async () => {
    try {
      engine.leaveChannel();
      setJoined(false);
      onEnd();
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
