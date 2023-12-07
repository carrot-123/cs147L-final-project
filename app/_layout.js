import { Stack } from "expo-router/stack";
import { IconButton } from "react-native-paper";
import { Pressable, StyleSheet, Text, View, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "black",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        options={() => ({
          title: "What's in this box",
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="EditBox"
        options={() => ({
          title: "Edit self care box",
          animation: "slide_from_bottom",
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="NewBox"
        options={() => ({
          title: "Create a new self care box",
          animation: "slide_from_bottom",
          headerBackTitleVisible: false,
        })}
      />
    </Stack>
  );
}
