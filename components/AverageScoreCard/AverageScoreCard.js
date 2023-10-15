import React from "react";
// import { Text, View } from "react-native";
// import PropTypes from "prop-types";
import { CardBase } from "../CardBase";
import { CircularProgress } from "../CircularProgress";
import { Text, View } from "react-native";

const AversageScoreCard = () => {
  return (
    <CardBase>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <CircularProgress
          value={30}
          size={100}
          width={10}
          showWithPercentSign={true}
        ></CircularProgress>
        <View
          style={{
            gap: 15,
          }}
        >
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Average Scorecard
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Poor! / Good! / Excellent!
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#999",
            }}
          >
            24 of 80 students passed!
          </Text>
        </View>
      </View>
    </CardBase>
  );
};

export default AversageScoreCard;

AversageScoreCard.propTypes = {};
