import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { listenIncomingCalls } from "../services/callService";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const myUserId = "user2"; // Receiver ID

  useEffect(() => {
    const unsubscribe = listenIncomingCalls(myUserId, (call) => {
      navigation.navigate("IncomingCall", { call });
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Receiver Home Screen (Listening for calls...)</Text>
    </View>
  );
};

export default HomeScreen;
