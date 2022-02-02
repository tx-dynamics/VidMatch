import React from "react";
import { Text } from "react-native";
import DefaultStyles from "../config/Styles";

function Apptext({ children, style, ...otherprops }) {
  return (
    <Text style={[DefaultStyles.text, style]} {...otherprops}>
      {children}
    </Text>
  );
}

export default Apptext;
