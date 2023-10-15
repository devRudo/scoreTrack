import React, { useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Home as HomeView } from "../screens";
import { StatusBar } from "expo-status-bar";

// prevent autmatically hide of splash screen : to be hidden after custom font loded
SplashScreen.preventAutoHideAsync();

const Home = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
  });

  //load custom font
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <StatusBar style="dark" />
        <HomeView />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
