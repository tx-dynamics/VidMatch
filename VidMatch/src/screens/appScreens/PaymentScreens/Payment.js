import React, { useState, useRef, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image, Modal, Alert,
    StatusBar, SafeAreaView, ScrollView, Dimensions, Pressable, FlatList,
    TextInput, Share, Keyboard, ImageBackground, TouchableOpacity
} from 'react-native'

import InputField from '../../../components/InputField';
import DefaultStyles from "../../../config/Styles";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ResponsiveText from '../../../components/Apptext';
import Header from '../../../components/Header';
import Apptext from '../../../components/Apptext';

const Payment = ({ props, route, navigation }) => {

    const [cardnum, setcardnum] = useState('0000 0000 0000 0000');
    const [nam, setnam] = useState('Thomas Anderson');
    const [isDay, setDay] = useState();
    const [isYear, setYear] = useState();
    const [exp, setexp] = useState('');
    const [cvc, setcvc] = useState('');
    const [promo, setpromo] = useState('');
    const [show, setshow] = useState(false);
    const [isPayment, setPayment] = useState(false);

    const [isVisibe, setVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('+672');
    const [contPicker, setContPicker] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [nameChk, setNameChk] = useState(false);
    const [mailChk, setMailChk] = useState(false);
    const [passChk, setPassChk] = useState(false);
    const [tickChk, setTckChk] = useState(false);
    const [phnNumChk, setPhnChk] = useState(false);

    const [status, setStatus] = useState()
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
               <Header
                backgroundColor={"white"}
                height={wp('20%')}
                headerLabel={"Payments"}
                leftImgName={require('../../../../assets/arrow-back.png')}
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView>
                {!show ?
                    <>
                        <View style={{ paddingHorizontal: wp(4) }}>
                            <ImageBackground
                                style={{
                                    width: 315, height: 185, alignSelf: 'center',
                                    borderColor: cardnum !== '' && nam !== '' && exp !== '' && cvc !== '' ? '#00F462' : 'white',
                                    borderRadius: 14, marginTop: 24
                                }}
                                source={require('../../../../assets/card.png')} resizeMode='cover'  >
                            </ImageBackground>
                     
                              <ResponsiveText
                                style={{
                                    fontSize: 16, marginHorizontal: wp('4%'), marginTop: wp('8%'),
                                    fontFamily:'Poppins-Medium',color:"#3a3c3f"
                                }} 

                            >{"Card number"}</ResponsiveText>
                           
                            <InputField
                                rightIcon={cardnum !== '' ? true : false}
                                borderBottomWidth={cardnum !== '' ? 1 : 0}
                                borderColor={'#25D482'}
                                maxLength={19}
                                keyboardType='fe'
                                // rightIconName={require('../../../../assets/tick.png')}
                                keyboardType=''
                                placeholder={"0000   0000   0000    0000"}
                                placeholderTextColor='#929DA9'
                                
                                placeholderTextColor="lightgray"
                                color='#424D59'
                                fontFamily={'Poppins-Medium'}
                                // value={cardnum}
                                backgroundColor='#eaecee'
                                borderRadius={15}
                                onChangeText={(EmailAdd) => {
                                    setcardnum(EmailAdd
                                        .replace(/\s?/g, '')
                                        .replace(/(\d{4})/g, '$1 ')
                                        .trim())
                                }
                                }
                            />
                                <ResponsiveText
                                style={{
                                    fontSize: 16, marginHorizontal: wp('4%'), marginTop: wp('8%'),
                                    fontFamily:'Poppins-Medium',color:"#3a3c3f"
                                }} 

                            >{"Cardholder name"}</ResponsiveText>

                            <InputField
                                keyboardType="email-address"
                                color='#424D59'
                                fontFamily={'Poppins-Medium'}
                                backgroundColor='#eaecee'
                                placeholder="ex. Jonathan Paul Ive"
                                
                                placeholderTextColor="lightgray"
                                borderBottomWidth={nam !== '' ? 1 : 0}
                                borderColor={'#25D482'}
                                borderRadius={15}
                                // value={nam}
                              
                            />
                            <View style={{flexDirection:'row',}}>
                            <ResponsiveText
                                style={{
                                    fontSize: 16, marginHorizontal: wp('4%'), marginTop: wp('8%'),
                                    fontFamily:'Poppins-Medium',color:"#3a3c3f"
                                }} 

                            >{"Expiry date"}</ResponsiveText>
                               <ResponsiveText
                                style={{
                                    fontSize: 16, marginHorizontal: wp('20%'), marginTop: wp('8%'),
                                    fontFamily:'Poppins-Medium',color:"#3a3c3f"
                                }} 

                            >{"CVV / CVC "}</ResponsiveText>
                            <TouchableOpacity>
                            <Image style={{marginTop: wp('8%'),marginLeft:-50 }} source={require('../../../../assets/Hint.png')} />
                            </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <InputField
                                keyboardType="number"
                                color='#424D59'
                                width={wp('40%')}
                                fontFamily={'Poppins-Medium'}
                                backgroundColor='#eaecee'
                                placeholder="MM / YYYY"
                                placeholderTextColor="lightgray"
                                borderBottomWidth={nam !== '' ? 1 : 0}
                                borderColor={'#25D482'}
                                borderRadius={15}
                                // value={nam}
                              
                            />

                            <InputField
                                keyboardType="number"
                                color='#424D59'
                                width={wp('40%')}
                                fontFamily={'Poppins-Medium'}
                                backgroundColor='#eaecee'
                                placeholder="3-4 digits"
                                placeholderTextColor="lightgray"
                                borderBottomWidth={nam !== '' ? 1 : 0}
                                borderColor={'#25D482'}
                                borderRadius={15}
                                // value={nam}
                              
                            />
                        
                        </View>

                            <Modal
                                visible={isPayment}

                            >
                                <View style={{
                                    flex: 1,
                                    width:wp('100%'),
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.34,
                                    shadowRadius: 6.27,
                                    elevation: 6,
                                    backgroundColor: "gray",
                                }}>
                                    <View
                                        onPress={() => setPayment(false)}
                                        style={{
                                            width: 335,
                                            marginTop: wp('30%'),
                                            height: 260,
                                            borderRadius: 30,
                                            alignSelf: 'center',
                                            backgroundColor: "white"
                                        }}>
                                     
                                        <Image style={{alignSelf:'center', marginTop:wp('12%')}} source={require('../../../../assets/fireworks.png')} />
                                        <Apptext style={{marginTop:30,
                                             alignSelf:'center',color:DefaultStyles.colors.secondary,
                                             fontSize:18,fontFamily:'Poppins-SemiBold'

                                             }}>Congratulations!</Apptext>

                                              <Apptext style={{marginTop:30,
                                             alignSelf:'center',color:DefaultStyles.colors.secondary,
                                             fontSize:18,fontFamily:'Poppins-Regular'

                                             }}>Enjoy Premium Vidmatch</Apptext>
                                    </View>
                                    <TouchableOpacity
                                onPress={() => setPayment(false) }
                                style={[styles.buttonContainer, {marginTop:wp('35%')}]}>
                                {/* <Image style={{marginHorizontal:wp('2%')}} source={require('../../../../assets/Lock.png')} />  */}
                                <Apptext style={styles.buttonText}>{"Go To Home"}</Apptext>
                            </TouchableOpacity>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                onPress={() => setPayment(true) }
                                style={styles.buttonContainer}>
                                <Image style={{marginHorizontal:wp('2%')}} source={require('../../../../assets/Lock.png')} /> 
                                <Apptext style={styles.buttonText}>{"Pay for the Premium"}</Apptext>
                            </TouchableOpacity>
                        </View>
                    </> :
                    <Pressable
                    >
                        {/* <Image source={require('../../../../assets/confirm.png')}
                            style={{ height: hp(100), width: wp(100), }} resizeMode='stretch' /> */}
                    </Pressable>}
            </ScrollView >
        </View>
    )
}
export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white',
    },
    smallfields: {
        width: '100%', marginTop: hp(.5), justifyContent: 'space-between', flexDirection: 'row', height: hp(7)
    },
    boxwraper: {
        backgroundColor: '#F1F1F1', width: '38%', paddingHorizontal: wp(4),
        borderRadius: 7
    },
    ownDiv: {
        flexDirection: "row",
        marginBottom: wp('5%'),
        height: 48,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        backgroundColor: "white",
        shadowRadius: 6.27,
        width: wp('65%'),
        borderRadius: 15,
        elevation: 1,
        marginHorizontal: wp('5%'),
        marginTop: wp('3%')
    },
    boxes1: {
        marginLeft: wp('75%'),
        marginTop: '15%',
        width: wp('20%'),

        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DefaultStyles.colors.secondary,
        borderColor: DefaultStyles.colors.secondary
    },
    boxesTxt: {
        fontFamily: 'Poppins',
        alignSelf: 'center',
        color: DefaultStyles.colors.white,

    },
    buttonContainer: {
        marginBottom: wp('5%'),
        marginTop: wp('17%'),
        width: wp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('15%'),
        backgroundColor: "#25d482",
        borderRadius: 16,
        alignSelf: 'center',
        flexDirection:'row',
        // justifyContent:'space-evenly',
        
    },
    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        marginHorizontal:wp('3%'),
        fontFamily: 'Poppins-SemiBold'
    },
})