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

const AddConnect = ({ navigation }) => {

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

    const [isTrue, setTrue] = useState(false);

    return (
        <View style={styles.container}>
            <BackgroundHeader
                backImg={require('../../../../assets/boyBack.jpg')}
                leftImgName={require('../../../../assets/arrow-back.png')}
                onPressLeft={() => navigation.goBack()}
            />
            <View style={styles.whiteView}>
                <TouchableOpacity style={styles.imgBox} >
                    <Image source={require('../../../../assets/alexAdd.png')} />
                    <Apptext style={styles.imgTxt} >Alex Mintz</Apptext>
                </TouchableOpacity>
                {/* <ScrollView> */}
                <View style={styles.twoTxts}>
                    <Apptext style={styles.cncts} >Connects</Apptext>
                    <Apptext style={styles.VLine}></Apptext>
                    <Apptext style={isTrue === false ? [styles.cncts, {color: "lightgray"}] : styles.cncts}>Matches</Apptext>
                </View>
                <View style={styles.twoLowerTxts}>
                    <Apptext style={styles.nmbrTxt} >03</Apptext>
                    <Apptext style={styles.nmbrTxt}>{isTrue ? "07" : "" } </Apptext>
                </View>
              {
              isTrue === false ? (
              <TouchableOpacity onPress={() => setTrue(true)} style={styles.addBtn}>
                <Apptext style={styles.btnTxt}>Add to Your Connection</Apptext>
                </TouchableOpacity>
              ) : null    
            }
                {
                    isTrue ? (
                        <TouchableOpacity 
                        onPress={() => setTrue(false)}
                        style={[styles.addBtn]}>
                        <Image style={{marginHorizontal:wp('2%')}} source={require('../../../../assets/msg.png')} />
                        <Apptext style={styles.btnTxt}>Message</Apptext>
                        </TouchableOpacity>
                    ) : null
                }
              
                <Apptext style={styles.HLine}> </Apptext>
               
            </View>

        </View>
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
    addBtn:{
        flexDirection:'row',
        width:wp('82%'),
        height:wp('16%'),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:DefaultStyles.colors.secondary,
        borderRadius:11,
        alignSelf:'center',
        marginTop:wp('6%'),
        marginBottom:wp('6%')
    },
    btnTxt:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:"white"
    },
    VLine: {
        width: 0.5,
        height: wp('17%'),
        marginTop:wp('1%'),
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