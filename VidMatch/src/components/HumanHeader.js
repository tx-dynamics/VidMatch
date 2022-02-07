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

function HumanHeader({
  headerLabel,
  backgroundColor,
  leftImgName,
  centerImg,
  phoneImg,
  menuImg,
  onPressPhone,
  onPressMenu,
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
      <TouchableOpacity 
      onPress={onPressLeft} 
      style={{width:wp('6%')}}>
      {isBack ? (
        <Image source={leftImgName} />
      ) : null}
      </TouchableOpacity>
      <View style={styles.imgView} >
      <Image style={{width:48, height:48}} source={centerImg} />
      <Apptext style={styles.headerLabel} >{headerLabel}</Apptext>
      </View>
      <TouchableOpacity style={styles.space} onPress={onPressRight}>
        <Image style={{tintColor:"#3F3F3F", marginTop:wp('2%')}} source={rightImg} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.space} onPress={onPressPhone}>
        <Image source={phoneImg} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.space} onPress={onPressMenu}>
        <Image source={menuImg} />
      </TouchableOpacity>


    </View>
  );
}
const styles = StyleSheet.create({
 
  container: {
    height: wp("20%"),
    width: wp("100%"),
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
    alignItems: "center",
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
  imgView:{
    flexDirection:'row',
    alignItems:'center',
    height:wp('20%'),
    // backgroundColor:"red",
    padding:wp('5%'),paddingTop:wp('6%')
  },
  headerLabel:{
    fontFamily:'Poppins-SemiBold',
    color:DefaultStyles.colors.secondary,
    fontSize:14,
    marginHorizontal:wp('3%'),
    width:wp('32%'),
    // backgroundColor:"green"
  },
  space:{
      marginHorizontal:wp('2%')
  }
});

export default HumanHeader;
