import React from "react";
// import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { CardBase } from "../CardBase";
import { CircularProgress } from "../CircularProgress";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const AversageScoreCard = () => {
  const { students } = useSelector((state) => state.students);

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
          value={Math.round(
            (students?.filter((std) => std.scoreInPercentage >= 40)?.length /
              students.length) *
              100
          )}
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
              {Math.round(
                (students?.filter((std) => std.scoreInPercentage >= 40)
                  ?.length /
                  students.length) *
                  100
              ) < 40
                ? "Poor!"
                : Math.round(
                    (students?.filter((std) => std.scoreInPercentage >= 40)
                      ?.length /
                      students.length) *
                      100
                  ) >= 40 &&
                  Math.round(
                    (students?.filter((std) => std.scoreInPercentage >= 40)
                      ?.length /
                      students.length) *
                      100
                  ) <= 80
                ? "Good!"
                : "Excellent!"}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#999",
            }}
          >
            {students?.filter((std) => std.scoreInPercentage >= 40)?.length} of{" "}
            {students.length} students passed!
          </Text>
        </View>
      </View>
    </CardBase>
  );
};

export default AversageScoreCard;

AversageScoreCard.propTypes = {};
