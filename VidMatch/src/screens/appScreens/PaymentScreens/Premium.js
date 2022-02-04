import React, { useState, useEffect } from 'react';
import {
    View, TouchableOpacity, ActivityIndicator,
    ToastAndroid, Alert, Image, StyleSheet, ScrollView, FlatList,
}
    from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from '../../../config/Styles';
import Apptext from '../../../components/Apptext';
import Header from '../../../components/Header';
import FormInput from '../../../components/FormInput';
import PremiumComp from '../../../components/PremiumComp';



const Premium = ({ navigation }) => {

    
    const [isItem, setSelectedItem] = useState([]);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Per Month",
            msg: "$9,99",
            chkOffer:false,
            Img: require("../../../../assets/boy1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Per 6 Month',
            msg: "$41,95",
            chkOffer:true,
            offer:"Save ($6,99) 30%",
            Img: require("../../../../assets/boy2.png"),
            dt: "2 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Per 12 Month",
            msg: "$59,88",
            chkOffer:true,
            offer:"Save ($4,99) 50%",
            Img: require("../../../../assets/boy3.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
       
       
    ];

    const addCategories = async (item) => {
        var selectedIdss = [...isItem]
        if (selectedIdss.includes(item.id)) {
            selectedIdss = selectedIdss.filter(id => id !== item.id)
        }
        else {
            selectedIdss=[]
            selectedIdss.push(item.id)
        }
        await setSelectedItem(selectedIdss)
    }

    return (
        <View style={styles.container}>
            <Header
                backgroundColor={"white"}
                height={wp('20%')}
                headerLabel={"Premium"}
                leftImgName={require('../../../../assets/arrow-back.png')}
                onPressLeft={() => navigation.goBack()}

            />
            <ScrollView>
                <View style={{
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    backgroundColor: "#f1edf2"
                }}>
                    <View style={styles.DirectionView}>
                        <Image source={require('../../../../assets/yellowStar.png')} />
                        <Apptext style={styles.topTxt}>Vidmatch Premium</Apptext>
                    </View>
                    <View style={styles.threeLines}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../../../assets/tick.png')} />
                            <Apptext style={styles.linesTxt}>Unlimited likes</Apptext>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: wp('3%') }}>
                            <Image source={require('../../../../assets/tick.png')} />
                            <Apptext style={styles.linesTxt}>Unlimited Connects</Apptext>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: wp('3%') }}>
                            <Image source={require('../../../../assets/tick.png')} />
                            <Apptext style={styles.linesTxt}>Unlimited Groups</Apptext>
                        </View>
                    </View>
                </View>
                <View style={styles.rgn}>
                <Apptext style={styles.rgnTxt}>Your Region</Apptext>
                <View>
                <FormInput
                    // labelValue={email}
                    backgroundColor="white"
                    placeholderText="America"
                    placeholderTextColor='black'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Apptext style={[styles.rgnTxt, {marginTop:14}]}>Select Package</Apptext>
                </View>
                </View>
                <View>
                <FlatList
                        data={DATA}
                        maxHeight={"99%"}
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
                            <PremiumComp
                                labelValue={item.label}
                                priceValue={item.msg}
                                isOffer={item.chkOffer}
                                offerTxt={item.offer}
                                onPress={() => {
                                    addCategories(item)
                                    navigation.navigate("AskPaymentOption")
                                }}
                                myStl={isItem.includes(item.id) ? true : false }
                            />

                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Premium;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white,
    },
    MainContainer: {
        marginHorizontal: wp('7%')
    },
    rgn:{
        marginTop:wp('6%'),
        marginHorizontal:wp('5%')
    },
    rgnTxt:{
        fontSize:14,
        color:DefaultStyles.colors.gray

    },  
    threeLines: {
        marginTop: wp('8%'),
        width: wp('100%'),
        height: wp('30%'),
        marginHorizontal:wp('5%')
    },
    topTxt: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginHorizontal: wp('4%')
    },
    linesTxt: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginHorizontal: wp('4%')
    },
    DirectionView: {
        marginTop: wp('9%'),
        flexDirection: 'row',
        marginHorizontal:wp('5%')

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
        fontSize: 30,
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
        backgroundColor: "#f1edf2"
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
        color: DefaultStyles.colors.black,
        fontFamily: "Roboto-Regular",

    },
});