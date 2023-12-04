import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        options={{
          title: "Box details",
        }}
      />
    </Stack>
  );
}
