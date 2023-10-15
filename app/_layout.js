import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const Layout = () => {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="scorecard"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default Layout;
