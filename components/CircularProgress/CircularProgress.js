import React from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import PropTypes from "prop-types";

const CircularProgress = ({
  value,
  size = 120,
  width = 10,
  showWithPercentSign,
}) => {
  return (
    <View
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={value}
        tintColor={
          value < 40
            ? "#ff575c"
            : value >= 40 && value <= 80
            ? "#009dff"
            : "#20a120"
        }
        backgroundColor="#d3d3d3"
        lineCap="round"
        rotation={0}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          // backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <Text
          style={{
            fontSize: size / 5,
            fontWeight: 900,
          }}
        >
          {value}
          {showWithPercentSign ? "%" : ""}
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;

CircularProgress.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number,
  width: PropTypes.number,
  showWithPercentSign: PropTypes.bool,
};
