import { Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';
import { Stack } from "expo-router";

export default function RootLayout() {

  const [loaded] = useFonts({
          Jost_600SemiBold
      })
  
      if (!loaded) return null

  return (
  <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="controller" options={{headerShown: false}} />
    <Stack.Screen name="config" options={{headerShown: false}} />
  </Stack>
  )
}
