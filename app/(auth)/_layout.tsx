import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {router} from "expo-router"
import {Button} from "react-native"
SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  const [fontsLoaded, error] = useFonts({
    "Space-Mono": require("../../assets/fonts/SpaceMono-Regular.ttf"),
    "Space-Mono-Bold": require("../../assets/fonts/SpaceMono-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
