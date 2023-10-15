import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { Card } from "react-native-paper";

const CardBase = ({ children }) => {
  return (
    <Card
      style={{
        padding: 20,
        paddingHorizontal: 30,
        backgroundColor: "#f3f3f4",
      }}
    >
      {children}
    </Card>
  );
};

export default CardBase;

CardBase.propTypes = {};
