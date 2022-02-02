import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator,
ToastAndroid, Alert, Image, StyleSheet, ScrollView,}
from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from '../../../config/Styles';
import Apptext from '../../../components/Apptext';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';


const SignUp = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.MainContainer} >
            <View style={styles.DirectionView}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Login") }
            style={styles.ImgView}>
                <Apptext style={styles.SignUpTxt}>Login</Apptext>
                
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ImgView, {marginHorizontal:wp('5%')}]}>
                <Apptext style={styles.SignInTxt}>Sign Up</Apptext>
                <Apptext style={styles.line}></Apptext>
            </TouchableOpacity>
            </View>
            <View style={{marginTop:26}} >
                <Apptext style={styles.WlcmTxt} >let's create</Apptext>
                <Apptext style={styles.VidTxt}>your sign in </Apptext>
            </View>
            <View>
            <Apptext style={styles.cntrView} >Sign Up</Apptext>
            </View>
            <View style={{ marginTop: wp('1%') }}>
            <FormInput
                    // labelValue={email}
                    placeholderText="First Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                   <FormInput
                    // labelValue={email}
                    placeholderText="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                 
            <FormInput
                    // labelValue={email}
                    placeholderText="Email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
              
                <FormInput
                    // labelValue={password}
                    placeholderText="Password"
                    autoCapitalize="none"
                    // rightImgName={require('../../../../assets/eye-off.png')}
                    secureTextEntry={true}
                    autoCorrect={false}
                />
            
            </View>
           
            <View style={{ marginTop: wp('9%') }}>
                    <FormButton
                        buttonTitle={"Sign Up"}
                    /> 
            </View>
            <Apptext style={styles.OR} >Or</Apptext>
            <View style={styles.socialViews} >
                <TouchableOpacity style={styles.socialBox} >
                <Image source={require('../../../../assets/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBox} >
                <Image source={require('../../../../assets/apple.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomLines} >
                <Apptext style={styles.bottomTxt}> Already have an account? </Apptext>
                <TouchableOpacity
                onPress={() => navigation.navigate("Login") }
                >
                    <Apptext style={[styles.bottomTxt,{color: DefaultStyles.colors.black,  }]}>Login Here</Apptext>
                </TouchableOpacity>
            </View>
            </View>  
        </ScrollView>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white,
    },
    MainContainer:{
    marginHorizontal:wp('7%')
    },
    DirectionView:{
    flexDirection:'row',
    },
    ImgView: {
        // marginHorizontal:wp('7%'),
        marginTop:wp('10%')
    },
    SignInTxt: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: DefaultStyles.colors.black,
    },
    SignUpTxt: {
        fontFamily: "Poppins-Medium",
        fontSize: 18,
        color: DefaultStyles.colors.black,
    },
    line:{ 
        width:70,
        height:2,
        backgroundColor: DefaultStyles.colors.black,
    },
    WlcmTxt:{
        fontSize:24,
        marginTop:wp('1%'),
        fontFamily:'ABeeZee-Regular',
        
    },
    VidTxt:{
        fontSize:28,
        fontFamily:'ABeeZee-Regular',
        marginTop:wp('1%')
    },
    cntrView:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        fontSize:30,
        marginTop: 35
    },
    socialViews:{
        marginTop: wp('7%'),
        flexDirection:'row',
        justifyContent:'space-around'
    },
    socialBox:{
        width:wp('27%') ,
        height:wp('15%') ,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        backgroundColor:"lightgray"
    },
    OR:{
        fontFamily:'Roboto-Regular',
        alignSelf:'center',
        fontSize:14
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
        marginTop: wp('3%'),
        justifyContent: 'flex-end'
    },
    bottomLines: {
        alignSelf: 'center',
        marginTop: wp('11%'),
        marginBottom: wp('5%'),
        flexDirection: 'row'
    },
    bottomTxt: {
        fontSize: 14,
        fontStyle:"italic",
        color:DefaultStyles.colors.black,
        fontFamily: "Roboto-Regular",

    },
});