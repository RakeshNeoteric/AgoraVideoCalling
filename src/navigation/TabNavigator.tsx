// TabNavigator.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ContactsScreen from "../screens/ContactsScreen";
import HomeScreen from "../screens/HomeScreen";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Contacts") {
            iconName = "ios-people";
          } else if (route.name === "Explore") {
            iconName = "ios-search";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  );
}
