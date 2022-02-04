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
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setUser } from '../../../redux/actions/authAction';


const SignIn = ({ navigation }) => {

    let dispatch = useDispatch();
    const [isEntry, setEntry] = useState(true);

    const updateSecureTextEntry = () => {
        setEntry(!isEntry)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.MainContainer} >
            <View style={styles.DirectionView}>
            <TouchableOpacity 
            style={styles.ImgView}>
                <Apptext style={styles.SignInTxt}>Login</Apptext>
                <Apptext style={styles.line}></Apptext>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate("SignUp")}
            style={[styles.ImgView, {marginHorizontal:wp('5%')}]}>
                <Apptext style={styles.SignUpTxt}>Sign Up</Apptext>
            </TouchableOpacity>
            </View>
            <View style={{marginTop:26}} >
                <Apptext style={styles.WlcmTxt} >Welcome Back to </Apptext>
                <Apptext style={styles.VidTxt} >VidMatch</Apptext>
            </View>
            <View>
            <Apptext style={styles.cntrView} >Login </Apptext>
            </View>
            <View style={{ marginTop: wp('1%') }}>
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
                    rightImgName={isEntry ? require('../../../../assets/eye-off.png') : require('../../../../assets/eye.png')}
                    onPress={updateSecureTextEntry}
                    secureTextEntry={isEntry ? true : false }
                    autoCorrect={false}
                />
            
            </View>
            <View style={styles.lightBoxTxt}>
                <TouchableOpacity>
                    <Apptext style={styles.lightTxt}> Forgot password?</Apptext>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: wp('10%') }}>
                    <FormButton
                        buttonTitle={"Login"}
                        onPress={() => {
                            dispatch(setUser(true))
                            // navigation.navigate("Home")
                        }}
                    /> 
            </View>
            <View style={styles.socialViews} >
                <TouchableOpacity style={styles.socialBox} >
                <Image source={require('../../../../assets/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBox} >
                <Image source={require('../../../../assets/apple.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomLines} >
                <Apptext style={styles.bottomTxt}> Don't have an account? </Apptext>
                <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                >
                    <Apptext style={[styles.bottomTxt,{color: DefaultStyles.colors.black, fontStyle:"italic",  }]}>Signup Here</Apptext>
                </TouchableOpacity>
            </View>
            </View>  
        </ScrollView>
    )
}

export default SignIn;

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
        width:50,
        height:2,
        backgroundColor: DefaultStyles.colors.black,
    },
    WlcmTxt:{
        fontSize:24,
        marginTop:wp('1%'),
        fontFamily:'Poppins-Regular',
        
    },
    VidTxt:{
        fontSize:28,
        fontFamily:'Poppins-Medium',
        marginTop:wp('1%')
    },
    cntrView:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        fontSize:30,
        marginTop: 107
    },
    socialViews:{
        marginTop:wp('8%'),
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
        backgroundColor:"red",
        marginHorizontal:wp('55%')
        // justifyContent: 'flex-end',
    },
    lightTxt:{
        color: DefaultStyles.colors.black,
        fontSize: 13,
        width:wp('55%'),
        fontFamily: "Poppins-Regular",
    },
    bottomLines: {
        alignSelf: 'center',
        marginTop: wp('10%'),
        marginBottom: wp('5%'),
        flexDirection: 'row'
    },
    bottomTxt: {
        fontSize: 14,
        color:DefaultStyles.colors.black,
        fontFamily: "Roboto-Regular",

    },
});