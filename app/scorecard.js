import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScoreCard as ScoreCardView } from "../screens";

const ScoreCard = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScoreCardView />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScoreCard;
