import React, { useState, useEffect } from 'react';
import {
    View, TouchableOpacity, ActivityIndicator, TextInput,
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
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../../appScreens/PaymentScreens/types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {setPckg } from '../../../redux/actions/authAction';
import { saveData,getListing, } from '../../../firebase/utility';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import { useIsFocused } from '@react-navigation/native';    
import moment from 'moment';


const Premium = ({ navigation }) => {
    let dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const isFocused = useIsFocused();
    const Userdata = useSelector((state) => state.auth.userData)

    /////////////////////////////////////////////////////////////////////////
    const [isItem, setSelectedItem] = useState([]);
    const [withFlag, setWithFlag] = useState('')
    const [countryCode, setCountryCode] = useState('US')
    const [country, setCountry] = useState("America")
    const [isVisibe, setVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isChkPlan, setChkPlan] = useState('');
    const [isMDays,setMDays] = useState('');
    const [isYDays,setYDays] = useState('');
    const [isHYDays,setHYDays] = useState('');


    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Per Month",
            msg: "9.99",
            showDate: isMDays + " Days Left",
            chkOffer: isMDays !=='' && isChkPlan === "Per Month" ? true : false,
            dt: "5 minutes ago",
            move: "Detail",
            clr:isChkPlan === "Per Month" ? true : false
        },
        {
            id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "",
            label: 'Per 6 month',
            msg: "41.95",
            chkOffer: true,
            showDate: isChkPlan === 'Per 6 month' ? isHYDays + " Days Left" : "Save ($6,99) 30%",
            // offer: '',
            dt: "2 hours ago",
            move: "Detail",
            clr:isChkPlan === 'Per 6 month' ? true : false

        },
        {
            id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Per 12 month",
            msg: "59.88",
            chkOffer: true,
            showDate: isChkPlan === "Per 12 month" ? isYDays + " Days Left" : "Save ($4,99) 50%",
            // offer: "Save ($4,99) 50%",
            dt: "3 hours ago",
            move: "Detail",
            clr:isChkPlan === "Per 12 month" ? true : false

        },


    ];

    // console.log(isChkPlan, "plan")
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country.name)
        setWithFlag(country.flag)
    }

    const addCategories = async (item) => {
        var selectedIdss = [...isItem]
        if (selectedIdss.includes(item.id)) {
            selectedIdss = selectedIdss.filter(id => id !== item.id)
        }
        else {
            selectedIdss = []
            selectedIdss.push(item.id)
        }
        await setSelectedItem(selectedIdss)
    }

    const getData = async() => {
    setLoading(true)
    const userInfo = auth().currentUser;
    let res = await getListing("paidUsers", userInfo.uid)
    if (res === false) {
        console.log("No Paid User")
        setLoading(false)
    }
    else{
        // console.log("res", res)
        const cnvrtDate = new Date();
        let a = new Date(res?.PlanDate);
        let b = moment(cnvrtDate);
        let aa = moment(a)
        let finalY = aa.diff(b, 'days')
        console.log("finalY", finalY, cnvrtDate, aa)
        let YearDays = 365
        let calY = YearDays - finalY
        console.log("Cal Y => ", calY)
        setYDays(calY)
        let finalM = aa.diff(b, 'days')
        let MonthDays = 30
        let calM = MonthDays - finalM
        console.log("Cal M => ", calM)
        setMDays(calM)
        let finalHY = aa.diff(b, 'days')
        let HalfYearDays = 182
        let calHY = HalfYearDays - finalHY
        console.log("Cal Half Year => ", calHY)
        setHYDays(calHY)
        setChkPlan(res.packageDetail)
        setLoading(false)
    }}

    

    useEffect(() => {
        getData()
    },[isFocused])

  

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
                    backgroundColor: "#f1edf2",
                    height: wp('65%')
                }}>
                    <View style={styles.DirectionView}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../assets/yellowStar.png')} />
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
                    {/* <View style={{ flexDirection: 'row', marginTop: wp('4%'), }}>
                    <Apptext style={styles.rgnTxt}>Your Region</Apptext>
                        <TouchableOpacity onPress={() => setVisible(true)} style={styles.inputContainer}>
                            <CountryPicker
                                {...{
                                    countryCode,
                                    onSelect,
                                }}
                                visible={isVisibe}
                            />
                            <TextInput
                                // value={labelValue}
                                numberOfLines={1}
                                placeholder={country}
                                placeholderTextColor={"black"}
                            />

                        </TouchableOpacity>
                    </View> */}
                    {/* <TouchableOpacity style={{flexDirection:'row' }} onPress={() => setVisible(true)} >
                        <CountryPicker
                            {...{
                                countryCode,
                                onSelect,
                            }}
                            visible={isVisibe}
                        />                        
                        <FormInput
                            // labelValue={email}
                            // leftImgName={require('../../../../assets/google.png')}
                            leftImgName={withFlag}
                            backgroundColor="white"
                            placeholderText=" America"
                            placeholderTextColor='black'
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            borderColor={"lightgray"}
                            borderWidth={0.5}
                        />
                    </TouchableOpacity>
                   */}
                    <Apptext style={[styles.rgnTxt, { marginTop: 14 }]}>Select Package</Apptext>

                </View>
            
                <View style={{marginTop:wp('4%')}}>
                  {isLoading ? <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary} />
                  :
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
                        renderItem={({ item, index }) => (
                            <PremiumComp
                                labelValue={item.label}
                                priceValue={item.msg}
                                isOffer={item.chkOffer}
                                offerTxt={item.showDate}
                                onPress={() => {
                                    addCategories(item)
                                    {
                                    user ? (navigation.navigate("withoutBottomTabnavigator",
                                    {screen:"AskPaymentOption"}) ,dispatch(setPckg(item)))
                                    :
                                    navigation.navigate("AskPaymentOption")
                                    dispatch(setPckg(item))
                                    
                                 
                                }
                                }}
                                // myStl={isItem.includes(item.id) ? true : false}
                                myStl={item.clr}
                            />

                        )}
                    />}
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
    rgn: {
        marginTop: wp('6%'),
        marginHorizontal: wp('5%')
    },
    rgnTxt: {
        fontSize: 14,
        color: DefaultStyles.colors.gray

    },
    threeLines: {
        marginTop: wp('8%'),
        width: wp('100%'),
        height: wp('30%'),
        marginHorizontal: wp('5%')
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
        alignItems: 'center',
        marginHorizontal: wp('5%')

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
    inputContainer: {
        flexDirection: 'row',
        width: wp('92%'),
        // backgroundColor: "green",
        borderRadius: 5,
        height: wp('15%'),
        marginTop: wp('3%'),
        borderWidth: 0.4,
        alignSelf: 'center',
        borderColor: "white",
        borderRightColor: "white",
        borderLeftColor: "white",
        borderTopColor: "white",
        alignItems:'center',
        paddingLeft:wp('3%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 1,
    },
  
});