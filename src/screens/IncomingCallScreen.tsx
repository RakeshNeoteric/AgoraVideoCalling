import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { updateCallStatus } from "../services/callService";

type IncomingCallScreenRouteProp = RouteProp<
  RootStackParamList,
  "IncomingCall"
>;
type IncomingCallScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "IncomingCall"
>;

const IncomingCallScreen = () => {
  const navigation = useNavigation<IncomingCallScreenNavigationProp>();
  const route = useRoute<IncomingCallScreenRouteProp>();
  const { call } = route.params;

  const acceptCall = async () => {
    await updateCallStatus(call.id, "ACCEPTED");
    navigation.navigate("VideoCall", { channelName: call.channelName });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Incoming Call from {call.callerId}</Text>
      <Button title="Accept" onPress={acceptCall} />
    </View>
  );
};

export default IncomingCallScreen;
