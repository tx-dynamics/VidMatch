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
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import { saveData, saveInitialData, saveInitialChat, getData } from '../../../firebase/utility';



const SignUp = ({ navigation }) => {

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fChk, setFChk] = useState(false);
    const [lChk, setLChk] = useState(false);
    const [mailChk, setMailChk] = useState(false);
    const [passChk, setPassChk] = useState(false);
    const [badFormat, setBadFormat] = useState(false);
    const [isLoading, setLoading] = useState(false)


    const checkValues = () => {
        if (email === "" && password === "" && fName === "" && lName === "" ) {
            setMailChk(true)
            setPassChk(true)
            setFChk(true)
            setLChk(true)    
            setBadFormat(false) 
        }
        else if (fName === "") {
            setFName(true)
        }
        else if (lName === "") {
            setLName(true)
        }
        else if (email === "") {
            setMailChk(true)
        }
        else if (password === "") {
            setPassChk(true)
        }

        else if(badFormat === true){
            setBadFormat(true)
        }
        else {
            console.log("Sign Up Called")
            signUp()
        }
    }

    const ValidateEmail = (inputText) => {
        console.log(inputText)
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            setBadFormat(false)
            return true;
        }
        else if (email === ""){
            setBadFormat(false)
        }
        else {
            setBadFormat(true)
            return false;
        }
    }
   
    const signUp = async () => {
            let success = true;
            setLoading(true)
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async user => {
                    let Details = {
                        email: email,
                        fullName: fName,
                        lastName:lName,
                        displayName:fName + " " + lName,
                        uid:user.user.uid
                    };

                    console.log(Details)
                    await saveData('Users', user.user.uid, Details);
                    let connections = await getData('Connections', user.user.uid);
                    if (typeof connections.media === "undefined") {
                        console.log("Undefined")
                        await saveInitialData('Connections', user.user.uid)
                    }
                    else {
                        console.log("Ok to go ")
                    }
                    
                    let chats = await getData('Chats', user.user.uid);
                    
                    console.log("chats", chats)
                    if (chats === false) {
                        console.log("Chat Undefined")
                        await saveInitialChat('Chats', user.user.uid)
                    }
                    else {
                        console.log("Ok to go Chat ")
                    }

                    navigation.navigate("SignUpModal")
                    setLoading(false)

                    Snackbar.show({
                        text: 'Account Created',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor:DefaultStyles.colors.secondary
                      });

                })
                .catch(function (error) {
                    success = false;
                    console.log(error)
                    Snackbar.show({
                        text: error.code,
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor:DefaultStyles.colors.primary
                      });
                    setLoading(false)

                    // Alert.alert(error.code)

                    
                });
            return success;
        
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.MainContainer} >
            <View style={styles.DirectionView}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Login") }
            style={styles.ImgView}>
                <Apptext style={styles.SignUpTxt}>Login</Apptext>
                
            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.ImgView, {marginHorizontal:wp('5%')}]}>
                <Apptext style={styles.SignInTxt}>Sign Up</Apptext>
                <Apptext style={styles.line}></Apptext>
            </TouchableOpacity>
            </View>
            <View style={{marginTop:26}} >
                <Apptext style={styles.WlcmTxt} >let's create</Apptext>
                <Apptext style={styles.WlcmTxt}>your sign in </Apptext>
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
                    onChangeText={(txt) => {
                        setFName(txt)
                        setFChk(false)
                    }}
                />
                {fChk ? <View>
                    <Apptext style={styles.errorTxt}>
                        Please Must Enter First Name</Apptext>
                </View> : null}
                   <FormInput
                    // labelValue={email}
                    placeholderText="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(txt) => {
                        setLName(txt)
                        setLChk(false)
                    }}
                />
                {lChk ? <View>
                    <Apptext style={styles.errorTxt}>
                    
                        Please Must Enter Last Name</Apptext>
                </View> : null}
                 
                <FormInput
                    // labelValue={email}
                    placeholderText="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(txt) => {
                        setEmail(txt)
                        setMailChk(false)
                    }}
                />
                {mailChk ? <View>
                    <Apptext style={styles.errorTxt}>

                        Please Must Enter Email Address</Apptext>
                </View> : null}
                {badFormat ? <View>
                    <Apptext style={styles.errorTxt}>

                        The Email Address is badly formatted</Apptext>
                </View> : null}
                <FormInput
                    // labelValue={password}
                    placeholderText="Password"
                    autoCapitalize="none"
                    // rightImgName={require('../../../../assets/eye-off.png')}
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={(txt) => {
                        setPassword(txt)
                        setPassChk(false)
                    }}
                />
                 {passChk ? <View>
                    <Apptext style={styles.errorTxt}>
                        Please Must Enter Password</Apptext>
                </View> : null}
            
            </View>
           
            <View style={{ marginTop: wp('9%') }}>
                    <FormButton
                        buttonTitle={isLoading ? "Signing Up ...." : "Sign Up"}
                        onPress={() => 
                           { checkValues()
                            ValidateEmail(email)
}
                        }

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
                    <Apptext style={[styles.bottomTxt,{color: DefaultStyles.colors.black,fontStyle:"italic",  }]}>Login Here</Apptext>
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
        fontSize:30,
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
        color:DefaultStyles.colors.black,
        fontFamily: "Roboto-Regular",

    },
    errorTxt:{
        marginTop: wp(2),
        fontSize: 10,
        color: "red"
    }
});