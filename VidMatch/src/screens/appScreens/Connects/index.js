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
import FvrtComp from '../../../components/FvrtComp';
import { getAllOfCollection,getData, getAllOptions,getListing, saveFvrtsData } from '../../../firebase/utility';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';


const Connects = ({ navigation, route }) => {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [filteredData, setfilteredData] = useState([]);
    const [search, setsearch] = useState('');
    const [isShow, setShow] = useState(false)
    const [isIcon, setIcon] = useState(false)

    const chkData = async () => {
        setLoading(true)
        var userInfo = auth().currentUser;
        let res = await getAllOptions("Users")
        const newData = res.filter(function (item) {
            const itemData = item.uid;
            const textData = userInfo.uid;
            return itemData.indexOf(textData) <= -1;
        });
        setData(newData)
        setLoading(false)
    }
    
    useEffect(() => {
        chkData()
    },[])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = data.filter(function (item) {
                const itemData = item.displayName ? item.displayName.toUpperCase() : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            setsearch(text);
        } else {
            chkData()
            setData(data);
            setsearch(text);
        }
    };

    const addConnection = async (items) => {
        console.log("item in AddCon =>", items)
        var userInfo = auth().currentUser;
        let Details = {
            email: items.email,
            fullName: items.fullName,
            lastName: items.lastName,
            displayName: items.displayName,
            FrndUid: items.uid,
            uid: userInfo.uid,
        };
        
        let dt = await getData('Users', userInfo.uid)
        let Details1 = {
            email: dt?.email,
            fullName: dt?.fullName,
            lastName: dt?.lastName,
            displayName: dt?.displayName,
            FrndUid: userInfo?.uid,
            uid: items?.uid,

        };

        await saveFvrtsData('RequestList', userInfo.uid, Details)
        await saveFvrtsData('RequestList', items.uid, Details)
            .then(async user => {
                Snackbar.show({
                    text: 'Connection Request Sent',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: DefaultStyles.colors.secondary
                });
                setIcon(true)
                // setChk(!isChk)
            })
            .catch(function (error) {
                success = false;
                Snackbar.show({
                    text: error.code,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: DefaultStyles.colors.primary
                });

            });
    }

    return (
        <View style={styles.container}>
            <Header
            backgroundColor={"white"}
            headerLabel={"Connects"}
            leftImgName={require('../../../../assets/arrow-back.png')}
            rightImg={require('../../../../assets/play.png')}
            onPressLeft={() => navigation.goBack()}
            onPressRight={() => navigation.navigate("VideoMatch")}
            />
         <View style={styles.MainContainer}>
         <TouchableOpacity style={styles.searchBar}>
                <Image style={{marginHorizontal:18}} source={require('../../../../assets/search.png')} />
                <TextInput style={{width:wp('70%'), padding: 10, color: 'black' }}
                    placeholder='Alex'
                    onChangeText={(val) => 
                    {searchFilterFunction(val)
                    // setShow(true)
                }
                }    
                />
            </TouchableOpacity>
           
            <View style={{height:wp(120), marginTop: wp('6%') }} >
            {isLoading ?  
                   <ActivityIndicator size={"large"} color={DefaultStyles.colors.primary} />
                   : 
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item?.uid}
                        // style={{maxHeight:'100%'}}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => {
                            return (
                              <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                                No Item Found
                              </Apptext>
                            );
                          }}
                        renderItem={({ item,index }) => (
                            <FvrtComp
                                leftImgName={item.thumbnail ? {uri : item?.thumbnail}
                                 : require("../../../../assets/empty-img.jpg")}
                                borderRadius={9}
                                labelValue={item?.displayName}
                                rightImgName={isIcon ? require("../../../../assets/personAdded.png") : require("../../../../assets/blueAdd.png")}
                                rightOnPress={() => 
                                    navigation.navigate("AddConnect", {items:item})
                                    // addConnection(item)
                                }
                                onPress={() => navigation.navigate("AddConnect", {items:item})}
                                />

                        )}
                    />
            }
                </View>
         </View>
        </View>
    )
}

export default Connects;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white,
    },
    MainContainer:{
        marginHorizontal:wp('5%'),
        height:wp('100%')
    },
    searchBar: {
        height: 57,
        width: wp('89%') ,
        // backgroundColor: "red",
        flexDirection:'row',
        alignSelf:'center',
        marginTop: wp('6%'),
        borderRadius: 9,
        alignItems:'center',
        borderWidth:0.5,
        borderColor:"gray"
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        
        // elevation: 3,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.15,
        // shadowRadius: 1.84,
        // elevation: 2,
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