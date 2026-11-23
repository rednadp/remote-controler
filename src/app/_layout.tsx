import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="controller" options={{headerShown: false}} />
    <Stack.Screen name="config" options={{headerShown: true}} />
  </Stack>
  )
}
