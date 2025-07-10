import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, View } from "react-native";

import { AGORA_CHANNEL_NAME } from "../constants/Config";
import { RootStackParamList } from "../navigation/types";
import { requestCall } from "../services/callService";

type ContactsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Contacts"
>;

const ContactsScreen = () => {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const myUserId = "user1";
  const receiverId = "user2";

  const handleCall = async () => {
    await requestCall(myUserId, receiverId, AGORA_CHANNEL_NAME);
    navigation.navigate("OutgoingCall", { channelName: AGORA_CHANNEL_NAME });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Call User 2" onPress={handleCall} />
    </View>
  );
};

export default ContactsScreen;
