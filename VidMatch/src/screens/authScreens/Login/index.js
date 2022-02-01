import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator,
ToastAndroid, Alert, Image, StyleSheet, ScrollView,}
from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from '../../../config/Styles';


const SignIn = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImgView}>
                {/* <Apptext style={styles.SignInTxt}>Login</Apptext> */}
            </View>

        </ScrollView>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    ImgView: {
        justifyContent: 'center', alignItems: 'center', marginTop: wp('22%')
    },
    SignInTxt: {
        fontFamily: "Poppins-Regular",
        marginTop: wp('10%'),
        fontSize: 24, color: DefaultStyles.colors.primary
    },
    methods: {
        justifyContent: 'center', alignItems: 'center',
        marginTop: wp('10%')
    },
    socialImgs: {
        flexDirection: 'row',
        marginTop: wp('5%'),
        justifyContent: 'space-evenly', marginHorizontal: wp('35%')
    },
    lightBoxTxt: {
        flexDirection: 'row',
        marginHorizontal: hp('3%'),
        marginTop: wp('5%'),
        justifyContent: 'flex-end'
    },
    bottomLines: {
        alignSelf: 'center',
        marginTop: wp('30%'),
        marginBottom: wp('5%'),
        flexDirection: 'row'
    },
    bottomTxt: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",

    },
});