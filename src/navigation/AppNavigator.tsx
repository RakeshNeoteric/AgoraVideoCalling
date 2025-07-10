import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import IncomingCallScreen from "@/src/screens/IncomingCallScreen";
import OutgoingCallScreen from "@/src/screens/OutgoingCallScreen";
import VideoCallScreen from "@/src/screens/VideoCallScreen";
import { Ionicons } from "@expo/vector-icons";
import ContactsScreen from "../screens/ContactsScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Home") iconName = "ios-home";
          if (route.name === "Contacts") iconName = "ios-people";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
      <Stack.Screen name="OutgoingCall" component={OutgoingCallScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} />
    </Stack.Navigator>
  );
}
