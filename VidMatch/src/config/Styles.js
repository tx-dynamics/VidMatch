import { Dimensions, Platform } from "react-native";
import colors from "./colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default {
  colors,
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,

  text: {
    color: colors.textColor,
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    fontWeight: "400"
  },
  lightTxt: {
    color: colors.black,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
};
