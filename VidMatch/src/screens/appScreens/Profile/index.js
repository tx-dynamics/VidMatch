import React, { useState, useEffect } from 'react';
import {
    View, TouchableOpacity, FlatList, ActivityIndicator,
    TextInput, Alert, Image, StyleSheet, ScrollView,
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
import BackgroundHeader from '../../../components/BackgroundHeader';
import MatchBox from '../../../components/MatchBox';
import {DrawerActions, useNavigation} from '@react-navigation/native'
import { getData } from '../../../firebase/utility';
import auth from '@react-native-firebase/auth';
import { setUserData } from '../../../redux/actions/authAction';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";


const Profile = ({ navigation }) => {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Alex Mintz",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boyBack.jpg"),
            firstImg: require("../../../../assets/blur1.png"),
            scndImg: require("../../../../assets/blur2.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Amelia Tray',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/boyBack.jpg"),
            firstImg: require("../../../../assets/blur1.png"),
            scndImg: require("../../../../assets/blur2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Krysia Eurydyka",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boyBack.jpg"),
            firstImg: require("../../../../assets/blur1.png"),
            scndImg: require("../../../../assets/blur2.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew31-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "jarosław kowalski",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boyBack.jpg"),
            firstImg: require("../../../../assets/blur1.png"),
            scndImg: require("../../../../assets/blur2.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1be4wew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Krysia Eurydyka",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boyBack.jpg"),
            firstImg: require("../../../../assets/blur1.png"),
            scndImg: require("../../../../assets/blur2.png"),
            dt: "3 hours ago",
            move: "Detail"
        },

    ];

    const Userdata = useSelector((state) => state.auth.userData)
    ////////////////////////////////////////////////////////////////////////////////////

    const [connectNumber, setConnectNumber] = useState('');
    const [isLoading, setLoading] = useState(false);

    const chkData = async () => {
        setLoading(true)
        var userInfo = auth().currentUser;
        let res = await getData("Connections", userInfo.uid)        
        setConnectNumber(res?.media?.length)
        setLoading(false)
    }

    useEffect(() => {
        chkData()
    },[])


    return (
        <View style={styles.container}>
            <BackgroundHeader
                backImg={require('../../../../assets/boyBack.jpg')}
                leftImgName={require('../../../../assets/hamBurger.png')}
                rightImg={require('../../../../assets/play.png')}
                onPressLeft={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                onPressRight={() => navigation.navigate("VideoMatch")}

                
            />
            <View style={styles.whiteView}>
                <TouchableOpacity>
                    <Image style={styles.imgBox}
                    source={Userdata?.thumbnail ? { uri : Userdata.thumbnail } :
                    require('../../../../assets/empty-img.jpg')} />
                    <Apptext style={styles.imgTxt} >{Userdata?.displayName ? Userdata?.displayName : "Hanna Spratt"}</Apptext>
                </TouchableOpacity>
                {/* <ScrollView> */}
                <View style={styles.twoTxts}>
                    <Apptext style={styles.cncts} >Connects</Apptext>
                    <Apptext style={styles.VLine}></Apptext>
                    <Apptext style={styles.cncts}>Matches</Apptext>
                </View>
                { isLoading ? 
                <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary} />
                :
                <View style={styles.twoLowerTxts}>
                    <Apptext style={styles.nmbrTxt} >{connectNumber ? connectNumber : "00"}</Apptext>
                    <Apptext style={styles.nmbrTxt}>07</Apptext>
                </View>
                }
                <Apptext style={styles.HLine}> </Apptext>
                <View style={styles.DirectionView}>
                    <TouchableOpacity style={styles.buttonView}>
                        <Image source={require('../../../../assets/Achivement.png')} />
                        <Apptext style={styles.achTxt} >Achievements</Apptext>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonView}>
                        <Image source={require('../../../../assets/Like.png')} />
                        <Apptext style={styles.achTxt} >Your Likes</Apptext>
                    </TouchableOpacity>
                </View>
                <View style={styles.MainContainer}>
                    <Apptext style={styles.rcnt}>Recent Activities</Apptext>
                </View>
                <FlatList
                    data={DATA}
                    numColumns={2}
                    horizontal={false}
                    keyExtractor={(item, index) => index}
                    // maxHeight={'75%'}
                    renderItem={({ item, index }) => (
                        <MatchBox
                            leftTitle={item.label}
                            leftImgName={item.Img}
                            firstImg={item.firstImg}
                            scndImg={item.scndImg}
                            subTxt={item.msg}
                            leftOnPress={() => navigation.navigate("VideoDetail")}
                        />

                    )}
                />
                {/* </ScrollView> */}
            </View>

        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: DefaultStyles.colors.white,
    },
    whiteView: {
        width: wp('100%'),
        height: wp('100%'),
        marginTop: -20,
        backgroundColor: "white",
        borderRadius: 40,
    },
    imgBox: {
        width: 125,
        marginTop: -60,
        height: 125,
        borderWidth: 0.2,
        borderColor: "lightgray",
        borderRadius: 20,
        alignSelf: 'center',
        // backgroundColor:"red"
    },
    imgTxt: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        width:wp('50%'),
        textAlign:'center',
        // backgroundColor:"red",
        marginTop: wp('3%'),
        alignSelf:'center'
    },
    twoTxts: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: wp('5%'),
        marginTop: wp('20%')
    },
    twoLowerTxts: {
        flexDirection: 'row',
        marginTop: -20,
        justifyContent: 'space-around',
    },
    cncts: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: DefaultStyles.colors.gray
    },
    nmbrTxt: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: DefaultStyles.colors.black
    },
    VLine: {
        width: 0.5,
        height: wp('17%'),
        marginTop:wp('1%'),
        backgroundColor: DefaultStyles.colors.gray,
    },
    HLine: {
        alignSelf: 'center',
        marginTop: wp('3%'),
        width: wp('90%'),
        height: 0.5,
        backgroundColor: DefaultStyles.colors.gray,
    },
    DirectionView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: wp('41%'),
        height: wp('13%'),
        borderWidth: 0.5,
        borderRadius: 4,
        marginTop: wp('4%'),
        borderColor: "lightgray",
    },
    achTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,marginTop:wp('1%')
    },
    rcnt: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: DefaultStyles.colors.secondary
    },
    MainContainer: {
        marginHorizontal: wp('5%'),
        marginTop: wp('4%'),
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
        width: 70,
        height: 2,
        backgroundColor: DefaultStyles.colors.black,
    },
    WlcmTxt: {
        fontSize: 24,
        marginTop: wp('1%'),
        fontFamily: 'ABeeZee-Regular',

    },
    VidTxt: {
        fontSize: 28,
        fontFamily: 'ABeeZee-Regular',
        marginTop: wp('1%')
    },
    cntrView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 35
    },
    socialViews: {
        marginTop: wp('7%'),
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
    OR: {
        fontFamily: 'Roboto-Regular',
        alignSelf: 'center',
        fontSize: 14
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
        fontStyle: "italic",
        color: DefaultStyles.colors.black,
        fontFamily: "Roboto-Regular",

    },
});