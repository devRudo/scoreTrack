import React from "react";
import { Platform, Text, View } from "react-native";
import PropTypes from "prop-types";
import { Card } from "react-native-paper";

const CardBase = ({ style, children }) => {
  return (
    <View
      style={{
        ...style,
        padding: 20,
        paddingHorizontal: 30,
        backgroundColor: "#f3f3f4",
        shadowColor: Platform.OS === "android" ? "#343a40" : "#c9c9c9",
        elevation: 20,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        borderRadius: 15,
      }}
    >
      {children}
    </View>
  );
};

export default CardBase;

CardBase.propTypes = {};
