import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, TextInput } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
// import { wp,hp } from "../Helpers/Responsiveness"
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { fonts } from "../Constants/Fonts";
import DefaultStyles from "../config/Styles";

// import { Colors } from "../Constants/Colors";

const InputField = ({width = wp('89%'), ...props}) => {
    return (
        <View style={[styles.textInputStyle, props.shadow ? null : null, {
            width:width,
            alignSelf:'center',
            marginTop: props.marginTopp ? props.marginTopp : wp(1.5),
            borderRadius: props.borderRadius ? props.borderRadius : 4,
            backgroundColor: props.backgroundColor
                ? props.backgroundColor
                : DefaultStyles.colors.primary,
                alignItems:"center",
            borderWidth:props.borderWidth?props.borderWidth:0,
            borderColor:props.borderColor?props.borderColor:'transparent',
            height: props.height ? props.height : 50,
            borderBottomWidth:props.borderBottomWidth?props.borderBottomWidth:0
        }]}>

            {props.leftIcon &&
                <Image source={props.leftIconName} style={{ width: wp(5), height: wp(5), marginLeft: wp(3) }} resizeMode={"contain"}></Image>
            }

            <TextInput
                {...props}
                // style={{fontFamily: fonts.LatoBold}}
                placeholder={props.placeholder}
                value={props.value}
                // caretHidden={true}
                keyboardType={props.keyboardType==='email-address'?'email-address':'number-pad'}
                placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : "#00000099"}
                editable={props.editable?false:true}
                maxLength={props.maxLength?props.maxLength:30}
                // onChangeText={text => onChangeText(text)}
                style={{
                    flex: 1,
                    //  height: props.height ? props.height : 50,
                    // borderRadius: props.borderRadius ? props.borderRadius : 10,
                    
                    paddingLeft: props.paddingLeft ? props.paddingLeft : 14,
                    backgroundColor: props.backgroundColor ? props.backgroundColor : DefaultStyles.colors.primary,
                    fontFamily: props.fontFamily ? props.fontFamily : 'Poppins-Regular',
                    fontSize: props.fontSize ? props.fontSize : 14,
                    color: props.color ? props.color : "#000", 
                    borderWidth:0,
                    fontWeight:props.fontWeight?props.fontWeight:'400',
                    //  paddingTop:15
                }}
            />
              {props.rightIcon &&
                <Image source={props.rightIconName} style={{ width: wp(5), height: wp(5), marginRight: wp(3) }} resizeMode={"contain"}></Image>
            }
            {props.secureText &&
                <TouchableOpacity style={{ paddingRight: wp(1.8), }} onPress={props.onPress}>
                    {/* <Image source={require("../Assets/Images/passwordHide.png")} style={{ width: wp(5), height: wp(5) }} resizeMode={"contain"}></Image> */}
                    <Ionicons
                        size={wp(6)}
                        color={props.iconColor ? props.iconColor: "#00000099" }
                        name={props.iconName ? props.iconName :
                            props.secureTextEntry ? 'md-eye-off-outline' : 'md-eye-outline'}
                    />
                    {/* <Text style={{color: th}}>BNB</Text> */}
                </TouchableOpacity>
            }
            {props.RightText &&
                <Text style={{
                    color: props.textColor, marginRight: wp(3),
                    fontFamily: 'Lato-Regular'
                }}>{props.RightTextTitle}</Text>
            }

        </View>

    )
}
export default InputField;
const styles = StyleSheet.create({
    textInputStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        marginHorizontal:wp('4%')
    
    },
    boxWithShadow: {
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
        // elevation: 5,
        backgroundColor:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 3,
    },
});
