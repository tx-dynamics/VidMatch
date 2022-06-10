import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "../../../config/Styles";
import Apptext from '../../../components/Apptext';
import Header from '../../../components/Header';
import AskPaymentComp from '../../../components/AskPaymentComp';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMethodName } from '../../../redux/actions/authAction';


const AskPaymentOption = ({ navigation }) => {

    const DATA = [
        // {
        //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        //     label: "Paypal",
        //     chkOffer:false,
        //     Img: require("../../../../assets/paypal.png"),
        // },
        // {
        //     id: 'bd7acbewweea-c1b1-46c2-aed5-3ad53abb28ba',
        //     label: 'ApplePay',            
        //     Img: require("../../../../assets/applePay.png"),
            
        // },
        // {
        //     id: 'bd7acbea-c1bewew1-46c2-aed5-3ad53abb28ba',
        //     label: "GooglePay",
        //     chkOffer:true,
        //     Img: require("../../../../assets/googlePay.png"),
        // },
        {
            id: 'bd7acbea-c1bewe4w1-46c2-aed5-3ad53abb28ba',
            label: "Stripe",
            chkOffer:true,
            Img: require("../../../../assets/stripe.png"),

        },
       
       
    ];
    ///////////////////////////////////////////////////////////////////////////////
    let dispatch = useDispatch()
    ///////////////////////////////////////////////////////////////////////////////
    const user = useSelector((state) => state.auth.user)
    const isPckg = useSelector((state) => state.auth.userPckg)
    // console.log("Rcvd => ", isPckg)
    const [isShow, setShow] = useState(false);
    const [checked, setChecked] = useState('CreditCard');
    const [isItem, setSelectedItem] = useState([]);
    const [isLoading, setLoading] = useState('');
    //////////////////////////////////////////////////////////////////////////////

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
                headerLabel={"Payments"}
                leftImgName={require('../../../../assets/arrow-back.png')}
                onPressLeft={() => navigation.goBack()}
            />
            <View style={styles.rgn}>
                <Apptext style={styles.rgnTxt}>Select Payment Method</Apptext>
            </View>  
            <View style={{marginTop:wp('4%')}}>
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
                            <AskPaymentComp
                                centerImg={item.Img}
                                labelValue={item.label}
                                isOffer={item.chkOffer === false}
                                onPress={() => {
                                    addCategories(item)
                                    {
                                        user ? (navigation.navigate("withoutBottomTabnavigator",
                                        {screen:"ElsePayment"}), dispatch(setMethodName(item.label)))
                                        :
                                        navigation.navigate("ElsePayment")
                                        dispatch(setMethodName(item.label))
                                    }
                                    // navigation.navigate("withoutBottomTabnavigator", {screen:"ElsePayment"})
                                }}
                                myStl={isItem.includes(item.id) ? true : false }
                            />

                        )}
                    />
                </View>

        </View>
    )
}

export default AskPaymentOption;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white
    },
    rgn:{
        marginTop:wp('4%'),
        marginHorizontal:wp('5%')
    },
    rgnTxt:{
        fontSize:14,
        color:DefaultStyles.colors.gray

    },  
  

});