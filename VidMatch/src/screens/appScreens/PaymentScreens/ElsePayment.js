import React, { useState, useRef, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image,
    StatusBar, SafeAreaView, ScrollView, Dimensions, Pressable, FlatList,
    TextInput, Share, Keyboard, ImageBackground, Modal, TouchableOpacity
} from 'react-native'
import {
    widthPercentageToDP as wpp,
    heightPercentageToDP as hpp,
} from "react-native-responsive-screen";
import InputField from '../../../components/InputField';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { hp, wp } from '../../../Helpers/Responsiveness';
const { width, height } = Dimensions.get('window');
import { fonts } from '../../../Constants/Fonts';
import ResponsiveText from '../../../components/RnText';
import Ionicons from '../../../Constants/FontIcon';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import DefaultStyles from "../../../config/Styles";
import Apptext from '../../../components/Apptext';
import { LinearGradient } from 'react-native-svg';



const ElsePayment = (props) => {

    const [cardnum, setcardnum] = useState('');
    const [nam, setnam] = useState('');
    const [exp, setexp] = useState('');
    const [cvc, setcvc] = useState('');
    const [promo, setpromo] = useState('');
    const [show, setshow] = useState(false);
    const [isPayment, setPayment] = useState(false);


    return (
        <View style={styles.container}>
            <Header
                backgroundColor={"white"}
                height={wp(20)}
                headerLabel={"Payments"}
                leftImgName={require('../../../../assets/arrow-back.png')}
                onPressLeft={() => props.navigation.goBack()}
            />
            <ScrollView>
                {!show ?
                    <>
                        <StatusBar hidden={false} backgroundColor={"#fff"} barStyle={'dark-content'} />

                        <ImageBackground
                            style={{
                                width: 360, height: 220, alignSelf: 'center',
                                borderColor: cardnum !== '' && nam !== '' && exp !== '' && cvc !== '' ? '#00F462' : 'white',
                                borderRadius: 14, marginTop: 24
                            }}
                            source={require('../../../../assets/card.png')} resizeMode='cover'  >
                        </ImageBackground>
                        <View style={{ paddingHorizontal: wp(5.2) }}>
                            {/* <Image source={iconPath.card} style={{height:185,width:wp(90),alignSelf:"center",marginTop:hp(2.5),borderWidth:2,
                borderColor:cardnum!==''&&nam!==''&& exp!==''&&cvc!==''?'#00F462':'white',borderRadius:14}} resizeMode='cover' />
                */}
                            <ResponsiveText size="h6" margin={[hp(3), 0, 0, 0]} fontFamily={fonts.Poppins_Medium} color={'#3A3C3F'}
                                top={hp(.8)}
                            >{"Card number"}
                            </ResponsiveText>
                            <InputField
                                rightIcon={cardnum !== '' ? true : false}
                                borderBottomWidth={cardnum !== '' ? 1 : 0}
                                borderColor={cardnum !== '' ? '#25D482' : 'transparent'}
                                maxLength={19}
                                keyboardType='fe'
                                rightIconName={iconPath.mc}
                                keyboardType=''
                                placeholder={"0000   0000   0000    0000"}
                                placeholderTextColor='#929DA9'
                                color='#424D59'
                                fontFamily={fonts.Poppins_Medium}
                                value={cardnum}
                                backgroundColor='#EAECEE'
                                borderRadius={16}
                                onChangeText={(EmailAdd) => setcardnum(EmailAdd
                                    .replace(/\s?/g, '')
                                    .replace(/(\d{4})/g, '$1 ')
                                    .trim())}
                            />
                            <ResponsiveText size="h6" fontFamily={fonts.Poppins_Medium} color={'#3A3C3F'}
                                top={hp(.8)}
                                margin={[wp(3), 0, 0, 0]}
                            >{"Cardholder name"}</ResponsiveText>

                            <InputField
                                keyboardType="email-address"
                                color='#424D59'
                                fontFamily={fonts.Poppins_Medium}
                                backgroundColor='#EAECEE'
                                borderBottomWidth={nam !== '' ? 1 : 0}
                                borderColor={nam !== '' ? '#25D482' : 'transparent'}
                                borderRadius={16}
                                value={nam}
                                placeholder={"ex. Jonathan Paul Ive"}
                                placeholderTextColor='#929DA9'
                                onChangeText={(EmailAdd) => setnam(EmailAdd)}
                            />
                            <View style={{ marginTop: hp(2), width: '100%', justifyContent: "space-between", flexDirection: "row" }} >
                                <View style={{ width: '38%', marginHorizontal: '3%' }}>

                                    <ResponsiveText size="h6" margin={[wp(0), 0, 0, -7]} fontFamily={fonts.Poppins_Medium} color={'#3A3C3F'} top={hp(.8)}
                                    >{"Expiry date"}
                                    </ResponsiveText>
                                    <InputField
                                        maxLength={7}
                                        keyboardType='fe'
                                        placeholder={"MM   /   YYYY"}
                                        placeholderTextColor='#929DA9'
                                        borderBottomWidth={exp !== '' ? 1 : 0}
                                        borderColor={exp !== '' ? '#25D482' : 'transparent'}
                                        color='#424D59'
                                        width={"115%"}
                                        value={exp}
                                        backgroundColor='#EAECEE'
                                        borderRadius={16}
                                        fontFamily={fonts.Poppins_Medium}
                                        onChangeText={(EmailAdd) => setexp(
                                            EmailAdd.length === 4 && !EmailAdd.includes('/')
                                                ? `${EmailAdd.substring(0, 2)}/${EmailAdd.substring(2, 5)}`
                                                : EmailAdd)}
                                    />
                                </View>
                                <View style={{ width: '38%', marginHorizontal: '4%' }}>
                                    <View style={{
                                        width: '90%', flexDirection: "row",
                                        justifyContent: 'space-between', alignItems: 'center', top: hp(.8)
                                    }}>
                                        <ResponsiveText size="h6" margin={[wp(0), 0, 0, -10]} fontFamily={fonts.Poppins_Medium} color={'#3A3C3F'}
                                        >{"CVV / CVC"}
                                        </ResponsiveText>
                                        <Image source={iconPath.hint} style={{ height: 18, width: 18, right: wp(2) }} resizeMode='contain' />
                                    </View>
                                    <InputField
                                        keyboardType="em"
                                        placeholder={"3-4 digits"}
                                        placeholderTextColor='#929DA9'
                                        value={cvc}
                                        maxLength={4}
                                        backgroundColor='#EAECEE'
                                        borderBottomWidth={cvc !== '' ? 1 : 0}
                                        borderColor={cvc !== '' ? '#25D482' : 'transparent'}
                                        borderRadius={16}
                                        width={"115%"}
                                        fontFamily={fonts.Poppins_Medium}
                                        onChangeText={(EmailAdd) => setcvc(EmailAdd)}
                                    />
                                </View>
                            </View>

                            <Button
                                icon={true}
                                iconName={iconPath.paylock}
                                onPress={() => {
                                    cardnum !== '' && nam !== '' && exp !== '' && cvc !== '' ?
                                        //   setshow(true)
                                        setPayment(true)
                                        :
                                        console.log('no')
                                }}
                                Text={cardnum !== '' && nam !== '' && exp !== '' && cvc !== '' ? 'Pay for the Premium' : 'Pay for the Pro'}
                                marginTop={wp(12)}
                                fontFamily={fonts.Poppins_Bold}
                                marginHorizontal={wp(20)}
                                backgroundColor={cardnum !== '' && nam !== '' && exp !== '' && cvc !== '' ? '#25d482' : '#9DA1B7'}
                                height={hp(9.5)}
                                borderRadius={20}
                                marginBottom={hp(1.5)}

                            />
                        </View>
                    </> :
                    <Pressable onPress={() => props.navigation.navigate('HomeScreen')}>
                        <Image source={iconPath.congo} style={{ height: hp(100), width: wp(100), }} resizeMode='stretch' />
                    </Pressable>}
                <Modal
                    visible={isPayment}>
                    <ScrollView style={{
                        flex: 1,
                        width: wpp('100%'),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,
                        elevation: 6,
                        backgroundColor: "#aeccdb",
                        // backgroundColor: "white"
                        // backgroundGradient: "vertical",
                        // backgroundGradientTop: "#333333",
                        // backgroundGradientBottom: "#666666"
                    }}>
                        <View
                            onPress={() => setPayment(false)}
                            style={{
                                width: 325,
                                marginTop: wpp('30%'),
                                height: 260,
                                borderRadius: 30,
                                alignSelf: 'center',
                                backgroundColor: "white"
                            }}>

                            <Image style={{ alignSelf: 'center', marginTop: wpp('12%') }} 
                            source={require('../../../../assets/fireworks.png')} />
                            <Apptext style={{
                                marginTop: 30,
                                alignSelf: 'center', color: DefaultStyles.colors.secondary,
                                fontSize: 18, fontFamily: 'Poppins-SemiBold'

                            }}>Congratulations!</Apptext>

                            <Apptext style={{
                                marginTop: 30,
                                alignSelf: 'center', color: DefaultStyles.colors.secondary,
                                fontSize: 18, fontFamily: 'Poppins-Regular'

                            }}>Enjoy Premium Vidmatch</Apptext>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                 {setPayment(false)
                                props.navigation.navigate("Home")
                                }}
                            style={[styles.buttonContainer, { marginTop: wpp('60%') }]}>
                            {/* <Image style={{marginHorizontal:wp('2%')}} source={require('../../../../assets/Lock.png')} />  */}
                            <Apptext style={styles.buttonText}>{"Go To Home"}</Apptext>
                        </TouchableOpacity>
                    </ScrollView>
                </Modal>
            </ScrollView >
        </View>
    )
}
export default ElsePayment;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white',
    },
    smallfields: {
        width: '100%', marginTop: hp(.5), justifyContent: 'space-between', flexDirection: 'row', height: hp(7)
    },
    boxwraper: { backgroundColor: '#F1F1F1', width: '38%', paddingHorizontal: wp(4), borderRadius: 7 },
    buttonContainer: {
        marginBottom: wpp('5%'),
        marginTop: wpp('17%'),
        width: wpp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wpp('15%'),
        backgroundColor: "#25d482",
        borderRadius: 16,
        alignSelf: 'center',
        flexDirection:'row',
        
    },
    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        marginHorizontal:wpp('3%'),
        fontFamily: 'Poppins-SemiBold'
    },
})