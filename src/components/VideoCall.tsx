import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RenderModeType,
  RtcSurfaceView,
} from "react-native-agora";

import { requestCameraAndAudioPermissions } from "../utils/requestCameraAndAudioPermissions";
import { AGORA_APP_ID } from "../constants/Config";

type VideoCallProps = {
  channelName: string;
  onEnd: () => void;
};

const VideoCall: React.FC<VideoCallProps> = ({ channelName, onEnd }) => {
  const [joined, setJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
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
            console.log("✅ Successfully joined the channel:", channelName);
            setJoined(true);
          },
          onUserJoined: (_connection, remoteUid) => {
            console.log("👤 Remote user joined:", remoteUid);
            setRemoteUid(remoteUid);
          },
          onUserOffline: (_connection, remoteUid) => {
            console.log("❌ Remote user left:", remoteUid);
            setRemoteUid(null);
          },
          onError: (err) => {
            console.error("Agora Error:", err);
          },
        });

        engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
        engine.enableVideo();

        console.log("➡️ Attempting to join channel:", channelName);
        engine.joinChannel("", channelName, 0, {});
      } catch (error) {
        console.error("Initialization Error:", error);
       // Alert.alert("Agora Init Error", error?.message || String(error));
      }
    };

    initializeAgora();

    return () => {
      engine.leaveChannel();
      engine.release();
    };
  }, []);

  const endCall = async () => {
    try {
      await engine.leaveChannel();
      setJoined(false);
      onEnd();
    } catch (err) {
      console.error("Leave Channel Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      {joined ? (
        <>
          {/* Local Video */}
          <RtcSurfaceView
            style={styles.video}
            canvas={{
              uid: 0,
              renderMode: RenderModeType.RenderModeHidden,
            }}
          />

          {/* Remote Video */}
          {remoteUid !== null && (
            <RtcSurfaceView
              style={styles.video}
              canvas={{
                uid: remoteUid,
                renderMode: RenderModeType.RenderModeHidden,
              }}
            />
          )}

          <Button title="End Call" onPress={endCall} />
        </>
      ) : (
        <Button title="Connecting..." disabled />
      )}
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "40%",
    marginBottom: 10,
  },
});
