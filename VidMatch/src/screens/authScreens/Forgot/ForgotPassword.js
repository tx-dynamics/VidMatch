import React, { useState, useEffect } from 'react';
import {
    View, TouchableOpacity, ActivityIndicator,
    ToastAndroid, Alert, Image, StyleSheet, ScrollView,
}
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
import { getData } from '../../../firebase/utility';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import Header from '../../../components/Header';
import { passwordReset } from '../../../firebase/utility';


const ForgotPassword = ({ navigation }) => {

    let dispatch = useDispatch();
    const [isEntry, setEntry] = useState(true);

    const updateSecureTextEntry = () => {
        setEntry(!isEntry)
    }

    const [email, setEmail] = useState('');
    const [mailChk, setMailChk] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const [badFormat, setBadFormat] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [noUser, setNoUser] = useState(false);

    const ValidateEmail = (inputText) => {
        console.log(inputText)
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            setBadFormat(false)
            // setMailChk(true)
            return true;
        }
        else if (email === ""){
            setBadFormat(false)
        }
        else {
            setBadFormat(true)
            setMailChk(false)
            return false;
        }
    }

    const checkValues = () => {
        if (email === "") {
            setMailChk(true)
            setBadFormat(false)
        }
        // else if(badFormat === true)
        // {
        //     setMailChk(false)
        //     setBadFormat(true)
        // }
        else {
            console.log("forgot called")
            let success = true;
            setLoading(true)
             passwordReset(email)
                .then(data => {
                    Snackbar.show({
                        text: 'Password Reset Link Sent On Your Email',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: DefaultStyles.colors.secondary
                    });
                    navigation.navigate("Login")
                })
                .catch(function (error) {
                    success = false;
                    console.log(error.code + ':: ' + error.message);
                    if (error.code === 'auth/invalid-email') {
                        setBadFormat(true)
                        setLoading(false)

                    }
                    else {
                        Snackbar.show({
                            text: error.code,
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: DefaultStyles.colors.primary
                        });
                        setLoading(false)

                        // Alert.alert(error.message)
                    }
                });
            return success;

        }

    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{ marginHorizontal: wp('5%'), marginTop: wp('10%') }}
                    source={require('../../../../assets/arrow-back.png')} />
            </TouchableOpacity>
            <View>
                <View style={styles.MainContainer} >
                
                    <View>
                        <Apptext style={styles.cntrView} >Forgot Password </Apptext>
                    </View>
                    <View style={{ marginTop: wp('15%') }}>
                        <FormInput
                            // labelValue={email}
                            placeholderText="Email address"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(txt) => {
                                setEmail(txt)
                                // ValidateEmail(txt)
                                setMailChk(false)
                            }}
                        />
                        {mailChk ? <View>
                            <Apptext style={styles.errorTxt}>
                                Please Must Enter Email Address</Apptext>
                        </View> : null}
                        {duplicateEmail ? <View>
                            <Apptext style={styles.errorTxt}>
                                The email address is already in use by another account.</Apptext>
                        </View> : null}
                        {badFormat ? <View>
                            <Apptext style={styles.errorTxt}>
                                The email address is badly formatted</Apptext>
                        </View> : null}
                        {noUser ? <View>
                            <Apptext style={styles.errorTxt}>

                                There is no user record found with this email
                            </Apptext>
                        </View> : null}
                    </View>

                    <View style={{ marginTop: wp('20%') }}>
                        <FormButton
                            buttonTitle={isLoading ? "Sending ...." : "Send"}
                            onPress={() => {
                                checkValues()
                                ValidateEmail(email)
                            }}
                        />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white,
    },
    MainContainer: {
        marginHorizontal: wp('7%')
    },
    DirectionView: {
        flexDirection: 'row',
    },
    ImgView: {
        // marginHorizontal:wp('7%'),
        marginTop: wp('10%')
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
    line: {
        width: 50,
        height: 2,
        backgroundColor: DefaultStyles.colors.black,
    },
    WlcmTxt: {
        fontSize: 24,
        marginTop: wp('1%'),
        fontFamily: 'Poppins-Regular',

    },
    VidTxt: {
        fontSize: 28,
        fontFamily: 'Poppins-Medium',
        marginTop: wp('1%')
    },
    cntrView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 107
    },
    socialViews: {
        marginTop: wp('8%'),
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    socialBox: {
        width: wp('27%'),
        height: wp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: "lightgray"
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
        backgroundColor: "red",
        marginHorizontal: wp('55%')
        // justifyContent: 'flex-end',
    },
    lightTxt: {
        color: DefaultStyles.colors.black,
        fontSize: 13,
        width: wp('55%'),
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
        color: DefaultStyles.colors.black,
        fontFamily: "Roboto-Regular",

    },
    errorTxt: {
        marginTop: wp(2),
        fontSize: 10,
        marginHorizontal:wp(1),
        color: "red"
    }
});