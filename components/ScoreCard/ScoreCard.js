import React from "react";
// import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { CardBase } from "../CardBase";
import { CircularProgress } from "../CircularProgress";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { studentsData } from "../../data";
import Slider from "@react-native-community/slider";

const ScoreCard = ({ studentId }) => {
  return (
    <CardBase>
      <View
        style={{
          flexDirection: "column",
          // alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor:
                studentsData?.data?.find((std) => std?.id === studentId)
                  .section === "science"
                  ? "#fa661b"
                  : "#fbb03b",
              borderRadius: 50,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, color: "#fff", fontWeight: 400 }}>
              {
                studentsData?.data
                  ?.find((std) => std?.id === studentId)
                  ?.firstName?.split("")?.[0]
              }
            </Text>
          </View>
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {`${
                studentsData?.data?.find((std) => std?.id === studentId)
                  ?.firstName
              } ${
                studentsData?.data?.find((std) => std?.id === studentId)
                  ?.lastName
              }`}
            </Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#999",
              }}
            >
              {`${studentsData?.data
                ?.find((std) => std?.id === studentId)
                ?.section?.split("")?.[0]
                .toUpperCase()}${studentsData?.data
                ?.find((std) => std?.id === studentId)
                ?.section?.split("")
                ?.slice(1)
                ?.join("")}`}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Score:{" "}
          {
            studentsData?.data?.find((std) => std?.id === studentId)
              ?.scoreInPercentage
          }{" "}
          %
        </Text>
        <Slider
          style={{ width: "100%" }}
          value={
            studentsData?.data?.find((std) => std?.id === studentId)
              ?.scoreInPercentage
          }
          minimumValue={0}
          maximumValue={100}
          tapToSeek
          minimumTrackTintColor="#009dff"
          thumbTintColor="#009dff"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Result:
          </Text>
          <Text
            style={{
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            {studentsData?.data?.find((std) => std?.id === studentId)
              ?.scoreInPercentage >= 40
              ? "Pass"
              : "Fail"}
          </Text>
        </View>
      </View>
    </CardBase>
  );
};

export default ScoreCard;

ScoreCard.propTypes = {
  studentId: PropTypes.string,
};
