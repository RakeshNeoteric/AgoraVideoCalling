import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import VideoCall from "../components/VideoCall";
import { RootStackParamList } from "../navigation/types";

type OutgoingCallScreenRouteProp = RouteProp<
  RootStackParamList,
  "OutgoingCall"
>;
type OutgoingCallScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OutgoingCall"
>;

const OutgoingCallScreen = () => {
  const navigation = useNavigation<OutgoingCallScreenNavigationProp>();
  const route = useRoute<OutgoingCallScreenRouteProp>();
  const { channelName } = route.params;

  return (
    <VideoCall channelName={channelName} onEnd={() => navigation.goBack()} />
  );
};

export default OutgoingCallScreen;
