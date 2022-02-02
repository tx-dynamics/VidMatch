import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Apptext from "./Apptext";
import DefaultStyles from "../config/Styles";

function Header({
  headerLabel,
  backgroundColor,
  leftImgName,
  centerImg,
  isBack = true,
  contentColor = DefaultStyles.colors.secondary,
  onPressLeft,
  onPressRight,
  rightImg,
  style,
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: backgroundColor,
        ...style,
      }}
    >
      {/* <MaterialCommunityIcons
        size={20}
        onPress={onPressLeft}
        name={leftIcon}
        color={contentColor}
      /> */}
      <TouchableOpacity 
      onPress={onPressLeft} 
      style={{width:wp('6%')}}>
      {isBack ? (
        <Image source={leftImgName} />
      ) : null}
      </TouchableOpacity>
      <View>
      <Image source={centerImg} />
      <Apptext style={styles.headerLabel} >{headerLabel}</Apptext>
      </View>
      <TouchableOpacity onPress={onPressRight}>
        <Image source={rightImg} />
      </TouchableOpacity>


    </View>
  );
}
const styles = StyleSheet.create({
 
  container: {
    height: wp("23%"),
    width: wp("100%"),
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: wp('5%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    // borderBottomColor:'lightgray',
    // borderBottomWidth:0.5,
    elevation: 3,
  },
  headerLabel:{
    fontFamily:'Poppins-SemiBold',
    color:DefaultStyles.colors.secondary,
    fontSize:14
  }
});

export default Header;
