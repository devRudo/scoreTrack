import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScoreCard as ScoreCardComp } from "../../components/ScoreCard";
import { useLocalSearchParams } from "expo-router";

const ScoreCard = () => {
  const params = useLocalSearchParams();
  const { id } = params;

  return (
    <>
      <View
        style={{
          padding: 15,
          paddingHorizontal: 20,
          gap: 10,
        }}
      >
        <ScoreCardComp studentId={id}></ScoreCardComp>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default ScoreCard;
