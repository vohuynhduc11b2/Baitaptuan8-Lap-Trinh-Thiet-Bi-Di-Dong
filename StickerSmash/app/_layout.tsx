import { Stack } from "expo-router";
import { TaskProvider } from "../context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="Screen02" />
        <Stack.Screen name="Screen03" />
      </Stack>
    </TaskProvider>
  );
}
