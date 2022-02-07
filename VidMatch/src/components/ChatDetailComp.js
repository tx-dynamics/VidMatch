import React from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from "./Apptext";
import DefaultStyles from "../config/Styles";

function ChatDetailComp({
    rightIcon,
    label,
    msg,
    onPressMid,
    midImg,
    leftIcon,
    backgroundColor,
    contentColor = DefaultStyles.colors.primary,
    onPressLeft,
    onPressRight,
    style,
}) {
    return (
        <View
            style={{
                ...styles.PicMainView,
                backgroundColor: backgroundColor,
                ...style,}}>

                <View>
                    <Apptext style={styles.labelTxt }>
                        {label}</Apptext>
                </View>
                <View  style={styles.msgView}>
                    <Apptext style={styles.msgTxt} >{msg} </Apptext>
                </View>
         
        </View>
    );
}

const styles = StyleSheet.create({
    labelTxt:{
    fontFamily:'Poppins-Medium',
    fontSize: 12,
    marginTop: wp('2%'),
    marginHorizontal:wp('3%')
    },
    PicMainView:{
        marginBottom:wp('5%'),
        marginHorizontal:wp('7%')
    
    },
    msgView:{
        width:wp('70%'),
        borderRadius:13,
        backgroundColor:"white",
        padding:15,
        paddingLeft:12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 3,
    },
    msgTxt:{
        fontFamily:'Poppins-Regular',
        fontSize:13,
        color:DefaultStyles.colors.black
    },
      ChatCallingView:{
        width: 35,
        height: 35, 
        borderRadius: 20,
         backgroundColor:DefaultStyles.colors.lightgray,
        justifyContent:'center', alignItems:'center' 
      },
    
      ChatDtlImg: {
        width: 70,
        height: 70, borderRadius: 50
      },
      
    
});

export default ChatDetailComp;
