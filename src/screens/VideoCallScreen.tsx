import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

import VideoCall from "../components/VideoCall";
import { RootStackParamList } from "../navigation/types";

type VideoCallScreenRouteProp = RouteProp<RootStackParamList, "VideoCall">;
type VideoCallScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VideoCall"
>;

const VideoCallScreen = () => {
  const navigation = useNavigation<VideoCallScreenNavigationProp>();
  const route = useRoute<VideoCallScreenRouteProp>();
  const { channelName } = route.params;

  return (
    <VideoCall channelName={channelName} onEnd={() => navigation.goBack()} />
  );
};

export default VideoCallScreen;
