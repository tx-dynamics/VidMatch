import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity,FlatList, ActivityIndicator,
TextInput, Alert, Image, StyleSheet, ScrollView,}
from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from '../../../config/Styles';
import Apptext from '../../../components/Apptext';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import Header from '../../../components/Header';
import InboxComp from '../../../components/InboxComp';

const Chats = ({ navigation }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Alex Mintz",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boy1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Amelia Tray',
            msg: "Will do, super, thank you",
            Img: require("../../../../assets/boy2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Krysia Eurydyka",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boy3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew31-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "jarosław kowalski",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boy1.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1be4wew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Krysia Eurydyka",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boy2.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
       
    ];

    return (
        <View style={styles.container}>
            <Header
            backgroundColor={"white"}
            headerLabel={"Chats"}
            leftImgName={require('../../../../assets/hamBurger.png')}
            rightImg={require('../../../../assets/play.png')}
            />
         <View style={styles.MainContainer}>
         <TouchableOpacity style={styles.searchBar}>
                <Image style={{marginHorizontal:18}} source={require('../../../../assets/search.png')} />
                <TextInput style={{ padding: 19, color: 'grey' }}
                    placeholder='Alex'
                    style={{width:wp('60%')}}
                    onChangeText={(val) => console.log(val)}
                />
                <TouchableOpacity style={styles.blueBox}>
                <Image source={require('../../../../assets/bigAdd.png')} />
                </TouchableOpacity>
            </TouchableOpacity>
           
             <View style={{ marginTop: wp('3%') }} >
                    <FlatList
                        data={DATA}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={() => {
                            return (
                              <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                                No Item Found
                              </Apptext>
                            );
                          }}
                        renderItem={({ item,index }) => (
                            <InboxComp
                                imgName={item.Img}
                                label={item.label}
                                msg={item.msg}
                                onPress={() => navigation.navigate("ChatDetail")}
                                // rightImgName={item.isLike ? require('../../../../assets/redHeart.png') : require('../../../../assets/heart.png')}
                            />

                        )}
                    />

                </View>
         </View>
        </View>
    )
}

export default Chats;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: DefaultStyles.colors.white,
    },
    MainContainer:{
        marginHorizontal:wp('5%'),
        height:wp('100%')
    },
    searchBar: {
        height: 52,
        width: wp('73%') ,
        backgroundColor: "white",
        flexDirection:'row',
        marginTop: wp('6%'),
        borderRadius: 6,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    blueBox:{
        width:wp('14%'),
        alignItems:'center',
        justifyContent:'center',
        height:52,
        borderRadius:6,
        backgroundColor:DefaultStyles.colors.secondary
    },
    topTxtView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:wp('9%')
    },
    topTxt:{
        fontFamily:'poppins-Regular',
        fontSize:12,
        color:DefaultStyles.colors.secondary
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