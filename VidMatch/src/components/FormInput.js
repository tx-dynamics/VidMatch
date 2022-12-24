import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";

const FormInput = ({ labelValue, placeholderText,
    iconType, leftIconType, leftImgName, rightImgName,
    onPress,
    placeholderTextColor = '#929292',
    borderWidth = borderWidth,
    borderColor = borderColor,
    borderBottomColor = borderBottomColor,
    backgroundColor = DefaultStyles.colors.sky,
    rightIconType, ...rest }) => {
    return (
        <View style={[styles.inputContainer,
        {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderBottomColor: borderBottomColor
        }]}>
            <View style={{ flexDirection: 'row' }}>

                <View style={{ justifyContent: 'center' }} >
                    <Image source={leftImgName} />
                </View>
                <TextInput
                    value={labelValue}
                    style={styles.HumanInput}
                    numberOfLines={1}
                    placeholder={placeholderText}
                    placeholderTextColor={placeholderTextColor}
                    {...rest}
                />
                <TouchableOpacity onPress={onPress}>
                    <Image style={{ width: 14, height: 14, tintColor: "gray", marginTop: wp('2%'), marginHorizontal: wp('5%') }} source={rightImgName} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    HumanInput: {
        //paddingLeft: wp('2%'),
        width: wp('70%'),
        color: DefaultStyles.colors.black

    },
    inputContainer: {
        width: wp('90%'),
        height: wp('15%'),
        marginTop: wp('3%'),
        alignSelf: 'center',
        paddingLeft: wp('3%'),
        //paddingTop: wp('1%'),
        justifyContent: 'center',
        borderRadius: 8,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,

        // elevation: 3,
    },
});
