import React from "react";
import { View, StyleSheet,Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultStyles from "../config/Styles";

function TreatHeader({
  leftImg,
  rightIcon,
  label,
  leftIcon,
  isback = true,
  backgroundColor,
  contentColor = DefaultStyles.colors.secondary,
  onPressLeft,
  onPressRight,
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
      <TouchableOpacity onPress={onPressLeft} style={{width:wp('35%')}}>
        {
          isback ? (

            <Image style={{marginTop:wp('3%'), }} source={require('../../assets/back.png') } />
          ) : null
        }
      </TouchableOpacity>
      <View>
      <Image style={{width:87,height:47,}} source={require('../../assets/Logo.png')} />
      </View>
   
    <TouchableOpacity style={styles.rightView} onPress={onPressRight}>
    <Image style={{marginTop:wp('3%')}} source={require('../../assets/settingIcon.png')} />
    </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width:wp('100%'),
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
    // alignSelf:'center',
    flexDirection: "row",
    padding: wp('3%'),
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    borderBottomColor:'lightgray',
    borderBottomWidth:0.5,
    elevation: 3,
  },
  rightView:{
    width:wp('32%'),
    flexDirection:'row',
    justifyContent:'flex-end',
  },
});

export default TreatHeader;
