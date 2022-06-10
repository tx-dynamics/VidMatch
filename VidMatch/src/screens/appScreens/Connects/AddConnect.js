import React, { useState, useEffect } from 'react';
import {
    View, TouchableOpacity, FlatList, ActivityIndicator,
    TextInput, Alert, Image, StyleSheet, ScrollView,
}
    from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from '../../../config/Styles';
import Apptext from '../../../components/Apptext';
import FormButton from '../../../components/FormButton';
import BackgroundHeader from '../../../components/BackgroundHeader';
import MatchBox from '../../../components/MatchBox';
import Snackbar from 'react-native-snackbar';
import { saveData,getListing,saveFav, removeToArray, saveFvrtsData, getData, saveInitialData } from '../../../firebase/utility';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setItemLikes,setReqLists } from '../../../redux/actions/authAction';




const AddConnect = ({ navigation, route }) => {
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
    // console.log("userdt", Userdata.isPaid)

    let dispatch = useDispatch();
    const FavItems = useSelector((state) => state.auth.ItemLikes)
    const reqItems = useSelector((state) => state.auth.ReqLists)


    const isFocused = useIsFocused();
    const { items } = route.params;
    // console.log(items)
    ////////////////////////////////////////////////////////////////////////////

    const [isTrue, setTrue] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isChk, setChk] = useState(false);
    const [isAdded, setAdded] = useState(false);
    const [isReqs, setReqs] = useState(false);
    const [isPaymentStatus, setPaymentStatus] = useState(false);
    const [connectNumber, setConnectNumber] = useState('');



    const addConnection = async () => {
        var userInfo = auth().currentUser;
        let Details = {
            email: items.email,
            fullName: items.fullName,
            lastName: items.lastName,
            displayName: items.displayName,
            FrndUid: items.uid,
            uid: userInfo.uid,
        };

        // let Details1 = {
        //     email: items.email,
        //     fullName: items.fullName,
        //     lastName: items.lastName,
        //     displayName: items.displayName,
        //     FrndUid: userInfo.uid,
        //     uid: items.uid,
        // };

        await saveFvrtsData('RequestList', userInfo.uid, Details)
        await saveFvrtsData('RequestList', items.uid, Details)
            .then(async user => {
                Snackbar.show({
                    text: 'Connection Request Sent',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: DefaultStyles.colors.secondary
                });
                setChk(!isChk)
            })
            .catch(function (error) {
                success = false;
                console.log(error)
                Snackbar.show({
                    text: error.code,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: DefaultStyles.colors.primary
                });

            });
    }

    const addFrnd = async () => {
        var userInfo = auth().currentUser;
        // let userinfo = await getData('Users', addedUser.uid);
        let Details = {
            email: items.email,
            fullName: items.fullName,
            lastName: items.lastName,
            displayName: items.displayName,
            FrndUid: items.uid,
            uid: userInfo.uid,
        };

        let dt = await getData('Users', userInfo.uid)
        // console.log("dt",dt)
        let Details1 = {
            email: dt?.email,
            fullName: dt?.fullName,
            lastName: dt?.lastName,
            displayName: dt?.displayName,
            FrndUid: userInfo?.uid,
            uid: items?.uid,

        };

        await saveFvrtsData('Connections', userInfo.uid, Details)
        await saveFvrtsData('Connections', items.uid, Details1)
            .then(async user => {
                realRemove()
            })
    }
    
    const getFvListing = async() => {
        setLoading(true)
        const userInfo = auth().currentUser;
        console.log("User Id", userInfo.uid)
        console.log("Item Id", items.uid)

        let res = await getListing("RequestList", userInfo.uid)
        let rest = await getListing("RequestList", items.uid)
        dispatch(setItemLikes(res.media))
        dispatch(setReqLists(rest.media))
        if (FavItems === undefined) {
            // console.log("Undefined found")    
            setLoading(false)
            
        }
        else{
            setLoading(false)
            // console.log("FavItems",FavItems, reqItems)        
        }
    }

    const realRemove = async() => {
        const userInfo = auth().currentUser;
        let Details = {
            email: items.email,
            fullName: items.fullName,
            lastName: items.lastName,
            displayName: items.displayName,
            FrndUid: items.uid,
            uid: userInfo.uid,
        };

        let exist ;
        let indexes ;
        if (typeof FavItems === "undefined") {
            // console.log("Undefined")
        }
        else{
            FavItems.map((val, index) => 
            {
                if (items.uid === val.uid) {
                    // console.log("exists")
                    // console.log("index", index)
                    exist = true;
                    indexes = index;
                }     
            })
        }
    if (exist === true) {
        // console.log(indexes)
        FavItems.splice(indexes,1)
        await firestore().collection("RequestList").doc(userInfo.uid).delete().
        then(async() => {
            // console.log("Favitems",FavItems)
            await saveFav("RequestList",userInfo.uid, FavItems)
            setChk(!isChk)
            removeFrnd()
        })
    }
    else{
        // console.log("Else FavItems",FavItems)
        // FavItems.push(Details)
        // await saveFav("RequestList",userInfo.uid, FavItems)
    }
    }


    const removeFrnd = async () => { 
        const userInfo = auth().currentUser;
        let Details = {
            email: items.email,
            fullName: items.fullName,
            lastName: items.lastName,
            displayName: items.displayName,
            FrndUid: items.uid,
            uid: userInfo.uid,
        };

        let exist ;
        let indexes ;
        if (typeof reqItems === "undefined") {
            // console.log("Undefined")
        }
        else{
            reqItems.map((val, index) => 
            {
                if (items.uid === val.uid) {
                    // console.log("exists")
                    // console.log("index", index)
                    exist = true;
                    indexes = index;
                }     
            })
        }
    if (exist === true) {
        // console.log(indexes)
        reqItems.splice(indexes,1)
        await firestore().collection("RequestList").doc(items.uid).delete().
        then(async() => {
            // console.log("Favitems",reqItems)
            await saveFav("RequestList",items.uid, reqItems)
            setChk(!isChk)
            setTrue(false)
            setReqs(false)
        })
    }
    else{
        console.log("Else Reqitems",reqItems)
        // reqItems.push(Details)
        // await saveFav("RequestList",items.uid, reqItems)
    }

        // var userInfo = auth().currentUser;
        // let Details = {
        //     email: items.email,
        //     fullName: items.fullName,
        //     lastName: items.lastName,
        //     displayName: items.displayName,
        //     FrndUid: items.uid,
        //     uid: userInfo.uid,
        // };
        // // console.log("dtls", Details)
        // await firestore().collection('RequestList').doc(items.uid).set({
        //     media: firestore.FieldValue.arrayRemove(Details),
        //   })
        // // .set({media:[]})
        // await firestore().collection('RequestList').doc(userInfo.uid).set({
        //     media: firestore.FieldValue.arrayRemove(Details),
        //   })
        //     .then(async user => {
        //         console.log("Friend Removed As Well")
        //         setTrue(false)
        //         setReqs(false)
        //         Snackbar.show({
        //             text: 'Connection Request Declined',
        //             duration: Snackbar.LENGTH_LONG,
        //             backgroundColor: DefaultStyles.colors.primary
        //         });
        //     })
        //     .catch(function (error) {
        //         success = false;
        //         console.log(error, "Friend Not Added")
        //         Snackbar.show({
        //             text: error.code,
        //             duration: Snackbar.LENGTH_LONG,
        //             backgroundColor: DefaultStyles.colors.secondary
        //         });
        //     });
    }

    const chkData = async () => {
        setLoading(true)
        var userInfo = auth().currentUser;
        let res = await getData("Connections", userInfo.uid)
        if (res?.media?.length === 1 && Userdata.isPaid === false) {
            // console.log("res con",res?.media?.length)
            setPaymentStatus(true)
        }
        let rest = await getData("Connections", items.uid)
        // console.log("Rest", rest?.media)
        setConnectNumber(rest?.media?.length)

        const newData = res?.media?.filter(function (item) {
            const itemData = item.FrndUid;
            const textData = items.uid;
            return itemData.indexOf(textData) > -1;
        });
        if (newData.length > 0) {
            newData?.map((val) => {
                if (val.FrndUid === items.uid) {
                    setAdded(true)
                    setLoading(false)
                    // console.log("Added")
                }
                else {
                    // console.log("Not Add")
                    setAdded(false)
                    setLoading(false)

                }
            })
        }
        else {
            chkFrnd()
            setLoading(false)
        }

        setLoading(false)
    }

    const chkFrnd = async () => {
        setLoading(true)
        var userInfo = auth().currentUser;
        let res = await getData("RequestList", items.uid)
        let rest = await getData("RequestList", userInfo.uid)

        rest?.media?.map((item) => {
            // console.log(rest?.media?.length , Userdata.isPaid , Userdata.uid , item.uid)
        if (rest?.media?.length === 1 && Userdata.isPaid === false && Userdata.uid === item.uid ) {
            setPaymentStatus(true)
        }
        })

        const newestData = rest?.media?.filter(function (item) {
            const itemData = item.FrndUid;
            const textData = items.uid;
            return itemData.indexOf(textData) !== -1;
        });

        // console.log("new Data", newestData)
        const newData = res?.media?.filter(function (item) {
            const itemData = item.FrndUid;
            const textData = items.uid;
            return (itemData, textData);
        });

        if (typeof newestData === "undefined") {
            setLoading(false)
        }
        else {
            newData?.map((val) => {
                console.log("chk =>",  val.FrndUid,items.uid ,val.uid, userInfo.uid)
                if (val.FrndUid === items.uid && val.uid === userInfo.uid) {
                    setTrue(true)
                    setLoading(false)
                    // console.log("in")
                }
                else if (val.FrndUid === items.uid && val.uid !== userInfo.uid) {
                    setTrue(false)
                    setReqs(false)
                    setLoading(false)
                    // console.log("else if")
                }
                else if(val.uid === items.uid && val.FrndUid === userInfo.uid){
                    setReqs(true)
                }
                else {
                    console.log("out", val.uid , items.uid,val.FrndUid, userInfo.uid)
                    setTrue(false)
                    setReqs(false)
                    setLoading(false)
                }
            })

        }

        // setLoading(false)
    }

    const chkReqs = async () => {
        setLoading(true)
        const userInfo = auth().currentUser;
        let connections = await getData('RequestList', items.uid);
        let ScndConnections = await getData('RequestList', userInfo.uid);
        if (connections === false && ScndConnections === false) {
            await saveInitialData('RequestList', items.uid)
            await saveInitialData('RequestList', userInfo.uid)
            setLoading(false)
        }
        else {

            // console.log("Ok to go ")
            setLoading(false)
        }
        // setLoading(false)

    }

    useEffect(() => {
        getFvListing()
        chkReqs()
        chkData()
        // chkFrnd()
    }, [isChk])

    return (
        <View style={styles.container}>
            <BackgroundHeader
                backImg={require('../../../../assets/boyBack.jpg')}
                leftImgName={require('../../../../assets/arrow-back.png')}
                onPressLeft={() => navigation.goBack()}
            />
            <View style={styles.whiteView}>
                <TouchableOpacity  >
                    {
                        items?.thumbnail ?
                            <Image
                                style={styles.imgBox}
                                source={{ uri: items?.thumbnail }}
                            />
                            :
                            <Image
                                style={styles.imgBox}
                                source={require("../../../../assets/empty-img.jpg")}
                            />}
                    <Apptext style={[styles.imgTxt, {width:wp('80%'), textAlign:'center'}]} >{items?.displayName}</Apptext>
                </TouchableOpacity>
                {/* <ScrollView> */}
                <View style={styles.twoTxts}>
                    <Apptext style={styles.cncts} >Connects</Apptext>
                    <Apptext style={styles.VLine}></Apptext>
                    <Apptext
                        style={isTrue === false ? [styles.cncts, { color: "lightgray" }]
                            : styles.cncts}>Matches</Apptext>
                </View>
                <View style={styles.twoLowerTxts}>
                    <Apptext style={styles.nmbrTxt} >{connectNumber ? connectNumber : "00" }</Apptext>
                    <Apptext style={styles.nmbrTxt}>{isTrue ? "00" : ""} </Apptext>
                </View>
                {
                    isLoading ? <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary} />
                        :
                        isTrue ?
                            <TouchableOpacity
                                onPress={() => {

                                }}
                                style={[styles.addBtn, {
                                    width: wp('80%'),
                                    backgroundColor: DefaultStyles.colors.secondary
                                }]}>
                                <Apptext style={styles.btnTxt}>Pending Request ...</Apptext>
                            </TouchableOpacity>
                            : isReqs === false && isTrue === false && isAdded === false ?
                                <TouchableOpacity
                                    onPress={() => {
                                      isPaymentStatus ?
                                      navigation.navigate("Premium")
                                      :
                                      addConnection()
                                    }}
                                    style={isPaymentStatus ? [styles.addBtn,{backgroundColor:DefaultStyles.colors.primary,
                                    
                                    width: wp('90%') }] : [styles.addBtn, { width: wp('90%') }]}>
                                    <Apptext style={styles.btnTxt}>
                                    {isPaymentStatus ? 
                                    "Please Buy Premium Package " : "Add to Your Connection"}</Apptext>
                                </TouchableOpacity>
                                :
                                null
                }

                {
                    isLoading ? <ActivityIndicator size={"small"} color={"transparent"} />
                        :
                        isReqs ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity
                                    onPress={() => addFrnd()}
                                    style={[styles.addBtn, 
                                    { backgroundColor: DefaultStyles.colors.secondary }]}>
                                    <Apptext style={styles.btnTxt}>Accept Request</Apptext>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        realRemove()
                                    }}
                                    style={[styles.addBtn, { backgroundColor: DefaultStyles.colors.primary }]}>
                                    <Apptext style={styles.btnTxt}>Decline Request</Apptext>
                                </TouchableOpacity>
                            </View> : null}

                {isAdded ?
                    <TouchableOpacity
                        style={[styles.addBtn, {
                            width: wp('90%'),
                            backgroundColor: DefaultStyles.colors.secondary
                        }]}>
                        {/* <Image style={{ marginHorizontal: wp('2%') }}
                            source={require('../../../../assets/msg.png')} /> */}
                        <Apptext style={styles.btnTxt}>Connection Added</Apptext>
                    </TouchableOpacity>
                    : null}
                <Apptext style={styles.HLine}> </Apptext>

            </View >

        </View >
    )
}

export default AddConnect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white,
    },
    whiteView: {
        width: wp('100%'),
        height: wp('100%'),
        marginTop: -20,
        backgroundColor: "white",
        borderRadius: 40,
    },
    imgBox: {
        width: 127,
        marginTop: -60,
        height: 127,
        borderWidth: 0.2,
        borderColor: "lightgray",
        borderRadius: 16,
        alignSelf: 'center'
    },
    imgTxt: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginTop: wp('3%'),
        alignSelf: 'center'
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
    addBtn: {
        flexDirection: 'row',
        width: wp('40%'),
        height: wp('16%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DefaultStyles.colors.secondary,
        borderRadius: 11,
        alignSelf: 'center',
        marginTop: wp('6%'),
        marginBottom: wp('6%')
    },
    btnTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: "white"
    },
    VLine: {
        width: 0.5,
        height: wp('17%'),
        marginTop: wp('1%'),
        backgroundColor: DefaultStyles.colors.gray,
    },
    HLine: {
        alignSelf: 'center',
        marginTop: wp('1%'),
        width: wp('90%'),
        height: 1,
        backgroundColor: "lightgray",
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
        fontSize: 14, marginTop: wp('1%')
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