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
import { setUser, setUserData } from '../../../redux/actions/authAction';
import { getData, saveData } from '../../../firebase/utility';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import Header from '../../../components/Header';
import ImagePicker from "react-native-image-crop-picker";
import storage from '@react-native-firebase/storage';



const EditProfile = ({ navigation }) => {

    let dispatch = useDispatch();
    const Userdata = useSelector((state) => state.auth.userData)
    //////////////////////////////////////////////////////////////////////
    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [fChk, setFChk] = useState(false);
    const [lChk, setLChk] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isChk, setChk] = useState(false);
    const [profilePath, setProfileUrl] = useState('');


    const checkValues = () => {
        setLoading(true)
        if (fName === "" && lName === "") {
            setFChk(true)
            setLChk(true)
        }
        else if (fName === "") {
            setFChk(true)
        }
        else if (lName === "") {
            setLChk(true)
        }
        else {
            console.log("submit?")
            submitData()
        }
        setLoading(false)
    }

    const submitData = async () => {
        const userinfo = auth().currentUser;
        let Details = {
            email: email ? email : Userdata.email,
            fullName: fName ? fName : Userdata.fullName,
            lastName: lName ? lName : Userdata.lastName,
            displayName: fName + " " + lName,
            uid: userinfo.uid,
            thumbnail: profilePath ? profilePath : null
        };
        console.log(Details)
        await saveData('Users', userinfo.uid, Details)
            .then((val) => {
                Snackbar.show({
                    text: 'Data Saved Successfully',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: DefaultStyles.colors.secondary
                });
                setChk(true)
                navigation.navigate("Home")
            })
    }

    const fetchData = async () => {
        const userinfo = auth().currentUser;
        let res = await getData('Users', userinfo.uid)
        setEmail(res?.email)
        setFName(res?.fullName)
        setLName(res?.lastName)
        setProfileUrl(res?.thumbnail)
        dispatch(setUserData(res))
    }
    useEffect(() => {
        fetchData()
    }, [isChk])

    const handleChoosePhoto = () => {
        const userinfo = auth().currentUser;
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            compressImageQuality: 1,
            cropping: true,
            writeTempFile: true,
        }).then(async (image) => {
            console.log(image)
            try {
                const response = await fetch(image.path);
                const blob = await response.blob();
                const ref = storage().ref(`/files/image/${image.path}`);
                // .child(uuid.v4());
                const task = ref.put(blob);
                return new Promise((resolve, reject) => {

                    setLoading(true)
                    task.on(
                        'state_changed',
                        () => { },
                        err => {
                            reject(err);
                            console.log("Didn't pick")
                        },

                        async () => {
                            const url = await task.snapshot.ref.getDownloadURL();
                            console.log("File available at", url)
                            resolve(url);
                            let Details = {
                                email: email ? email : Userdata.email,
                                fullName: fName ? fName : Userdata.fullName,
                                lastName: lName ? lName : Userdata.lastName,
                                displayName: fName + " " + lName,
                                uid: userinfo.uid,
                                thumbnail: url
                            };
                            await saveData('Users', userinfo.uid, Details);
                            Snackbar.show({
                                text: 'Image Uploaded Successfully',
                                duration: Snackbar.LENGTH_LONG,
                                backgroundColor: DefaultStyles.colors.secondary
                            });
                            setProfileUrl(url ? url : null)
                            fetchData();
                            setLoading(false)

                        },

                    );
                });
            } catch (err) {
                console.log('uploadImage error: ' + err.message);
                Snackbar.show({
                    text: err.message,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: DefaultStyles.colors.primary
                });
            }
        });
    }

    return (
        <View style={styles.container}>
            <Header
                backgroundColor={"white"}
                headerLabel={"Edit Profile"}
                leftImgName={require('../../../../assets/arrow-back.png')}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView >
                <View style={styles.MainContainer}>

                    <TouchableOpacity onPress={() => {
                        handleChoosePhoto()
                    }}>
                        {profilePath ?
                            <Image style={styles.imgCircle} source={{ uri: profilePath }} />
                            :
                            <Image style={styles.imgCircle}
                                source={require('../../../../assets/boyBack.jpg')} />
                        }

                    </TouchableOpacity>
                    {isLoading ? (

                        <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary} />
                    ) : null}

                    <View style={{ marginTop: wp('1%') }}>
                        <FormInput
                            labelValue={email}
                            placeholderText="Email address"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            onChangeText={(txt) => {
                                setEmail(txt)
                            }}
                        />
                        <FormInput
                            labelValue={fName}
                            placeholderText="First Name"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(txt) => {
                                setFName(txt)
                                setFChk(false)
                            }}
                        />

                        {fChk ? <View>
                            <Apptext style={styles.errorTxt}>
                                Please Must Enter First Name
                            </Apptext>
                        </View> : null}

                        <FormInput
                            labelValue={lName}
                            placeholderText="Last Name"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(txt) => {
                                setLName(txt)
                                setLChk(false)

                            }}
                        />
                        {lChk ? <View>
                            <Apptext style={styles.errorTxt}>
                                Please Must Enter Last Name
                            </Apptext>
                        </View> : null}
                    </View>

                    <View style={{ marginTop: wp('10%') }}>
                        <FormButton
                            buttonTitle={isLoading ? "Saving Data ...." : "Save"}
                            onPress={() => {
                                checkValues()
                            }}
                        />
                    </View>

                    <View style={styles.bottomLines} >

                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white,
    },
    MainContainer: {
        marginHorizontal: wp('7%')
    },
    cntrView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: wp('10%')
    },
    bottomLines: {
        marginTop: wp('10%'),
        marginBottom: wp('5%'),
    },
    errorTxt: {
        marginTop: wp(2),
        fontSize: 10,
        color: "red"
    },
    imgCircle: {
        width: wp('40%'),
        height: wp('40%'),
        borderRadius: 50,
        borderWidth: 1,
        borderColor: DefaultStyles.colors.primary,
        alignSelf: 'center',
        marginVertical: wp('5%')
    }
});