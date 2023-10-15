import React from "react";
import { Stack, router } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
            // headerBackTitle: "Scorecard",
            title: "",
            headerLeft: (props) => (
              <Pressable
                onPress={() =>
                  router.canGoBack() ? router.back() : router.replace("/")
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialIcons name="arrow-back" size={24} />
                  <Text style={{ fontSize: 18 }}>Scorecard</Text>
                </View>
              </Pressable>
            ),
          }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default Layout;
