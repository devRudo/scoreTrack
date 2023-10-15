import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScoreCard as ScoreCardView } from "../screens";
import { StatusBar } from "expo-status-bar";

const ScoreCard = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar style="dark" />
        <ScoreCardView />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScoreCard;
