import React, { useState, useEffect } from 'react';
import {
    View, TouchableOpacity, ActivityIndicator,
    ToastAndroid, Alert, Image, StyleSheet, ScrollView, Platform,
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
import GoogleSign from '../../../components/GoogleSign';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setAppleLoginData, setUser, setUserData } from '../../../redux/actions/authAction';
import { getData, saveInitialData, saveInitialChat, saveData } from '../../../firebase/utility';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';



const SignIn = ({ navigation }) => {
    const appleLoginData = useSelector((state) => state.auth.appleLoginData)
    let dispatch = useDispatch();
    const [isEntry, setEntry] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mailChk, setMailChk] = useState(false);
    const [passChk, setPassChk] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const [weakPass, setWeakPass] = useState(false);
    const [badFormat, setBadFormat] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [noUser, setNoUser] = useState(false);

    const AppleAuthentication = async () => {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        console.log("response log =>", appleAuthRequestResponse)
        // var token = jwt_decode(appleAuthRequestResponse?.identityToken);
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned');
        }
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        if (appleCredential?.token === '') {
            console.log("log =>", appleAuthRequestResponse)
            console.log('Failed To Get Token')
        }
        else {
            if (appleAuthRequestResponse?.email == null) {
                var regData = {
                    email: appleLoginData?.email,
                    fullName: appleLoginData?.fullName?.givenName,
                    lastName: appleLoginData?.fullName?.lastName,
                    displayName: appleLoginData?.fullName?.givenName,
                    provider: "Apple",
                    createdAt: new Date().toISOString(),
                    thumbnail: '',
                    uid: appleLoginData?.user,
                    isPaid: false
                };
                const userDatabase = firestore().collection(`Users`).doc(uid);
                userDatabase.set(regData).then(async () => {
                    console.log("in if")
                    dispatch(setUser(true))
                    dispatch(setUserData(regData))
                    console.log(regData, "kkkk")

                    let connections = await getData('Connections', uid);
                    if (typeof connections.media === "undefined") {
                        await saveInitialData('Connections', uid)
                    }
                    else {
                    }

                    let chats = await getData('Chats', uid);
                    if (chats === false) {
                        await saveInitialChat('Chats', uid)
                    }
                    else {
                    }
                    Snackbar.show({
                        text: `Sign in Succesfully`,
                        backgroundColor: DefaultStyles.colors.secondary,
                        duration: Snackbar.LENGTH_LONG,
                    });
                    setLoading(false)
                });

            }
            else {
                dispatch(setAppleLoginData(appleAuthRequestResponse))
                var regData = {
                    email: appleAuthRequestResponse?.email,
                    fullName: appleAuthRequestResponse?.fullName?.givenName,
                    lastName: appleAuthRequestResponse?.fullName?.lastName,
                    displayName: appleAuthRequestResponse?.fullName?.givenName,
                    provider: "Apple",
                    createdAt: new Date().toISOString(),
                    thumbnail: '',
                    uid: appleAuthRequestResponse?.user,
                    isPaid: false
                };
                const userDatabase = firestore().collection(`Users`).doc(uid);
                userDatabase.set(regData).then(async () => {
                    console.log("in if")
                    dispatch(setUser(true))
                    dispatch(setUserData(regData))
                    console.log(regData, "kkkk")

                    let connections = await getData('Connections', uid);
                    if (typeof connections.media === "undefined") {
                        await saveInitialData('Connections', uid)
                    }
                    else {
                    }

                    let chats = await getData('Chats', uid);
                    if (chats === false) {
                        await saveInitialChat('Chats', uid)
                    }
                    else {
                    }
                    Snackbar.show({
                        text: `Sign in Succesfully`,
                        backgroundColor: DefaultStyles.colors.secondary,
                        duration: Snackbar.LENGTH_LONG,
                    });
                    setLoading(false)
                });
            }
        }
        return auth().signInWithCredential(appleCredential);
    }

    // const AppleAuthentication = async() => {
    //     return new Promise(async (resolve, reject) => {
    //       const appleAuthRequestResponse = await appleAuth.performRequest({
    //         nonceEnabled: false,
    //         requestedOperation: appleAuth.Operation.LOGIN,
    //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //       });
    //       console.log('log', appleAuthRequestResponse)
    //       const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    //       if (credentialState === appleAuth.State.AUTHORIZED) {
    //         const {fullName, authorizationCode, email, identityToken} = appleAuthRequestResponse;
    //         // const {email} = jwt_decode(appleAuthRequestResponse.identityToken);
    //         // const {email} = {appleAuthRequestResponse}
    //         const {familyName, givenName} = fullName;


    //         let Details = {
    //             email: email,
    //             fullName: givenName,
    //             lastName:familyName,
    //             displayName:fullName,
    //             uid:identityToken,
    //             isPaid:false,
    //             thumbnail: null,

    //         };
    //         //console.log(Details, "Details")
    //         await saveData('Users', identityToken, Details);



    //       }
    //     });
    //   }


    const checkValues = () => {
        if (email === "" && password === "") {
            setMailChk(true)
            setPassChk(true)
        }
        else if (email === "") {
            setMailChk(true)
            setPassChk(false)
        }
        else if (password === "") {
            setPassChk(true)
            setMailChk(false)
        }

        else {
            console.log("Sign IN Called")
            signIn(email, password)
        }

    }

    const updateSecureTextEntry = () => {
        setEntry(!isEntry)
    }

    const googleLogin = async () => {
        setLoading(true);
        let info = await GoogleSign();
        // const token = await AsyncStorage.getItem('token');
        if (info?.Error) {
            console.log('here', info?.Error);
            Snackbar.show({
                text: info?.Error,
                backgroundColor: DefaultStyles.colors.primary,
                duration: Snackbar.LENGTH_LONG,
            });

        } else {
            const google = auth.GoogleAuthProvider.credential(info.idToken);
            auth().signInWithCredential(google).then((res) => {
                // console.log(res?.additionalUserInfo?.isNewUser);
                // console.log(info.user,"info")
                const uid = auth()?.currentUser?.uid;

                // if (res?.additionalUserInfo?.isNewUser) {
                var regData = {
                    email: info.user?.email,
                    fullName: info.user?.familyName,
                    lastName: info.user?.givenName,
                    displayName: info.user?.name,
                    provider: "google",
                    createdAt: new Date().toISOString(),
                    thumbnail: info?.user?.photo,
                    uid: uid,
                    isPaid: false
                };
                const userDatabase = firestore().collection(`Users`).doc(uid);
                userDatabase.set(regData).then(async () => {
                    console.log("in if")
                    dispatch(setUser(true))
                    dispatch(setUserData(regData))
                    console.log(regData, "kkkk")

                    let connections = await getData('Connections', uid);
                    if (typeof connections.media === "undefined") {
                        // console.log("Undefined")
                        await saveInitialData('Connections', uid)
                    }
                    else {
                        // console.log("Ok to go ")
                    }

                    let chats = await getData('Chats', uid);

                    // console.log("chats", chats)
                    if (chats === false) {
                        // console.log("Chat Undefined")
                        await saveInitialChat('Chats', uid)
                    }
                    else {
                        // console.log("Ok to go Chat ")
                    }

                    Snackbar.show({
                        text: `Sign in Succesfully`,
                        backgroundColor: DefaultStyles.colors.secondary,
                        duration: Snackbar.LENGTH_LONG,
                    });
                    setLoading(false)
                });
                // }

                // setLoading(false);
            })
                .catch((err) => {
                    console.error(err.message)
                    Snackbar.show({
                        text: err.message,
                        backgroundColor: DefaultStyles.colors.primary,
                        duration: Snackbar.LENGTH_LONG,
                    });
                });
            // .catch((err) => console.log(err.message));
        }
        setLoading(false);

    }

    const signIn = async (email, password) => {

        let success = true;
        setLoading(true)
        console.log("LoginValues", email, password)

        await auth().signInWithEmailAndPassword(email, password)
            .then(async user => {
                setMailChk(false)
                setPassChk(false)
                setWeakPass(false)
                setBadFormat(false)
                setDuplicateEmail(false)
                let userinfo = await getData('Users', user.user.uid);
                var user1 = auth().currentUser;
                console.log(user1)
                if (user1.uid) {
                    dispatch(setUser(true))
                    dispatch(setUserData(userinfo))
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

                    Snackbar.show({
                        text: 'Login Successful',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: DefaultStyles.colors.secondary
                    });
                    setLoading(false)

                }
                else {
                    console.log("Error")
                }
                // props.navigation.navigate("SignUp")
            })
            .catch(function (error) {
                success = false;
                setLoading(false)
                console.log(error.code + ':: ' + error.message);
                if (error.code === 'auth/email-already-in-use') {
                    setDuplicateEmail(true)
                }
                else if (error.code === 'auth/user-not-found') {
                    setNoUser(true)
                    setWeakPass(false)
                    setBadFormat(false)

                }
                else if (error.code === 'auth/invalid-email') {
                    setBadFormat(true)
                    setWeakPass(false)
                    setNoUser(false)

                }
                else if (error.code === 'auth/wrong-password') {
                    setWeakPass(true)
                    console.log(error.code)
                    setPassChk(false)
                    setBadFormat(false)
                    setNoUser(false)

                }
                else {
                    Snackbar.show({
                        text: error.code,
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: DefaultStyles.colors.primary
                    });
                    // Alert.alert(error.code)
                }
            });
        return success;
    }

    const ValidateEmail = (inputText) => {
        console.log(inputText)
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            setBadFormat(false)
            return true;
        }
        else if (email === "") {
            setBadFormat(false)
        }
        else {
            setBadFormat(true)
            return false;
        }
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
                        style={[styles.ImgView, { marginHorizontal: wp('5%') }]}>
                        <Apptext style={styles.SignUpTxt}>Sign Up</Apptext>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 26 }} >
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
                        onChangeText={(txt) => {
                            setEmail(txt)
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

                    <FormInput
                        // labelValue={password}
                        placeholderText="Password"
                        autoCapitalize="none"
                        rightImgName={isEntry ? require('../../../../assets/eye-off.png') : require('../../../../assets/eye.png')}
                        onPress={updateSecureTextEntry}
                        secureTextEntry={isEntry ? true : false}
                        autoCorrect={false}
                        onChangeText={(txt) => {
                            setPassword(txt)
                            setPassChk(false)
                        }}
                    />
                    {passChk ? <View >
                        <Apptext style={styles.errorTxt}>
                            Please Must Enter Password</Apptext>
                    </View> : null}
                    {weakPass ? <View>
                        <Apptext style={styles.errorTxt}>
                            The password is weak or the user enter invalid password.
                        </Apptext>
                    </View> : null}
                </View>
                <View style={styles.lightBoxTxt}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ForgotPassword")
                    }}>
                        <Apptext style={styles.lightTxt}> Forgot password?</Apptext>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: wp('10%') }}>
                    <FormButton
                        buttonTitle={isLoading ? "Logging In ...." : "Login"}
                        onPress={() => {
                            checkValues()
                            ValidateEmail(email)

                        }}
                    />
                </View>
                <View style={styles.socialViews} >
                    {
                        Platform.OS === "android" ?
                            <TouchableOpacity
                                onPress={() => { googleLogin() }}
                                style={styles.socialBox} >
                                <Image source={require('../../../../assets/google.png')} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => AppleAuthentication()}
                                style={styles.socialBox} >
                                <Image source={require('../../../../assets/apple.png')} />
                            </TouchableOpacity>
                    }
                </View>
                <View style={styles.bottomLines} >
                    <Apptext style={styles.bottomTxt}> Don't have an account? </Apptext>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Apptext style={[styles.bottomTxt, { color: DefaultStyles.colors.black, fontStyle: "italic", }]}>Signup Here</Apptext>
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
        // marginVertical:wp('3%'),
        marginTop: wp(2),
        fontSize: 10,
        color: "red"
    }
});