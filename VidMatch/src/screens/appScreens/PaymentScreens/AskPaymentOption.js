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


const AskPaymentOption = ({ navigation }) => {

    const [isShow, setShow] = useState(false);
    const [checked, setChecked] = useState('CreditCard');

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Paypal",
            msg: "$9,99",
            chkOffer:false,
            Img: require("../../../../assets/paypal.png"),
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
            Img: require("../../../../assets/applePay.png"),
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
            Img: require("../../../../assets/googlePay.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
        {
            id: 'bd7acbea-c1bewe4w1-46c2-aed5-3ad53abb28ba',
            count: "+3",
            label: "Per 12 Month",
            msg: "$59,88",
            chkOffer:true,
            offer:"Save ($4,99) 50%",
            Img: require("../../../../assets/stripe.png"),
            dt: "3 hours ago",
            move: "Detail"
        },
       
       
    ];

    const [isItem, setSelectedItem] = useState([]);

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
                                    navigation.navigate("Payment")
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