import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import DefaultStyles from "../../config/Styles";
import {
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Apptext from "../../components/Apptext";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSplash, setUser, setUserData } from "../../redux/actions/authAction";
import auth from '@react-native-firebase/auth';



function DrawerContent({ navigation, userImg, username, userEmail }) {

    let dispatch = useDispatch()
    const Userdata = useSelector((state) => state.auth.userData)

    return (
        <View style={styles.container} >
            <View style={styles.DirectionView}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.bck}>
                    <Image style={{ tintColor: "white" }} source={require('../../../assets/arrow-back.png')} />
                </TouchableOpacity>
                <View>
                    <Image style={styles.logo} source={require('../../../assets/DrawerLogo.png')} />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("ProfileNavigator", { screen: "Profile" })}
                style={styles.threeItems} >
                <TouchableOpacity>

                    <Image style={styles.golBox} source={Userdata?.thumbnail ? { uri: Userdata.thumbnail }
                        : require('../../../assets/empty-img.jpg')} />
                </TouchableOpacity>
                <View style={{}}>
                    <Apptext style={styles.hanaTxt} >{Userdata.displayName ? Userdata.displayName : "Hanna Spratt"}</Apptext>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("EditProfile")
                    }}
                    style={styles.add} >
                    <Image source={require('../../../assets/pencilUser.png')} />
                </TouchableOpacity>
            </TouchableOpacity>
            <ScrollView style={{ marginTop: wp('12%') }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    style={styles.listView}>
                    <View style={styles.blueBox}>
                        <Image style={{ tintColor: "white", height: 12, width: 12 }} source={require('../../../assets/play.png')} />
                    </View>
                    <Apptext style={styles.innerTxt} > Your Connects</Apptext>
                    <Image style={{ marginTop: wp('1%'), tintColor: DefaultStyles.colors.secondary }} source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("EditProfile")}
                    style={styles.listView}>
                    <View style={styles.blueBox}>
                        <Image style={{ tintColor: "white", height: 12, width: 12 }} source={require('../../../assets/settings.png')} />
                    </View>
                    <Apptext style={styles.innerTxt} > Settings</Apptext>
                    <Image style={{ marginTop: wp('1%'), tintColor: DefaultStyles.colors.secondary }} source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Premium")}
                    style={styles.listView}>
                    <View style={styles.blueBox}>
                        <Image style={{ tintColor: "white", height: 12, width: 15 }} source={require('../../../assets/icon1.png')} />
                    </View>
                    <Apptext style={styles.innerTxt} > Join Premium</Apptext>
                    <Image style={{ marginTop: wp('1%'), tintColor: DefaultStyles.colors.secondary }} source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listView}>
                    <View style={styles.blueBox}>
                        <Image style={{ tintColor: "white", height: 12, width: 12 }} source={require('../../../assets/icon2.png')} />
                    </View>
                    <Apptext style={styles.innerTxt} > Terms Of Use</Apptext>
                    <Image style={{ marginTop: wp('1%'), tintColor: DefaultStyles.colors.secondary }} source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listView}>
                    <View style={styles.blueBox}>
                        <Image style={{ tintColor: "white", height: 12, width: 12 }} source={require('../../../assets/about.png')} />
                    </View>
                    <Apptext style={styles.innerTxt} > About Us</Apptext>
                    <Image style={{ marginTop: wp('1%'), tintColor: DefaultStyles.colors.secondary }} source={require('../../../assets/chevron-right.png')} />
                </TouchableOpacity>

            </ScrollView>

            <TouchableOpacity
                onPress={() => {
                    dispatch(setSplash(true))
                    //   dispatch(setUser(false))
                    auth().signOut()
                        .then(() => {
                            dispatch(setUser(false))
                            console.log("user",)
                        },
                            (error) => {
                                console.alert(error.message);
                            });
                }}
                style={[styles.DirectionView, {
                }]}>
                <TouchableOpacity

                    style={styles.logoutBox}>
                    <Image source={require('../../../assets/logout.png')} />
                </TouchableOpacity>
                <Apptext style={styles.logoutTxt}>Logout</Apptext>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.secondary,
    },
    bck: {
        marginHorizontal: wp('4%'),
        marginTop: wp('10%')
    },
    logo: {
        marginTop: wp('8%'), marginHorizontal: wp('15%'),
    },
    DirectionView: {
        flexDirection: 'row'
    },
    threeItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp('5%'),
        marginTop: wp('17%')
    },
    golBox: {
        width: 52, height: 52,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 40,
    },
    hanaTxt: {
        fontSize: 14,
        color: "white",
        width: wp('37%'),
        marginLeft: wp(3),
        fontFamily: 'Poppins-SemiBold'
    },
    add: {
        width: 22,
        height: 22,
        borderRadius: 4,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    listView: {
        flexDirection: 'row',
        width: wp('68%'),
        height: wp('11%'),
        backgroundColor: "white",
        borderRadius: 8,
        marginHorizontal: wp('5%'),
        marginTop: wp('2%'),
        alignItems: 'center',
    },
    blueBox: {
        height: wp('6%'),
        width: wp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp('2%'),
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 4
    },
    innerTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        marginTop: wp('1%'),
        width: wp('52%'),
        color: DefaultStyles.colors.secondary
    },
    logoutBox: {
        marginHorizontal: wp('7%'),
        marginBottom: wp('5%'),
        backgroundColor: "white",
        height: 28, width: 28,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: DefaultStyles.colors.white,
    }

});

export default DrawerContent;
