import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";
import Apptext from '../components/Apptext';

const PremiumComp = ({ labelValue, placeholderText,
    iconType, leftIconType, leftImgName, rightImgName,
    onPress,priceValue,offerTxt,isOffer = false, myStl,
    rightIconType, ...rest }) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[myStl ? styles.inputContainer1 : styles.inputContainer]} >
            <View style={{ flexDirection: 'row' }}>
           
               <View style={styles.txtView}>
                <Apptext style={styles.txtVal}>{labelValue}</Apptext>
                </View>
                <View>
                <Apptext style={styles.priceTxt}>{priceValue}</Apptext>
                {isOffer ? (
                <Apptext style={styles.ofrTxt} >{offerTxt} </Apptext>
                ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PremiumComp;

const styles = StyleSheet.create({
    HumanInput: {
        paddingLeft: wp('2%'),
        width: wp('70%'),
    
    },
    imgStl:{
        width:57,
        height:57,
        borderRadius:43,
    },
    txtView:{
        justifyContent:'center',
        width:wp('55%'),
    },
    txtVal:{
        fontFamily:'Poppins-Regular',
        fontSize:wp('4%'),
        color:DefaultStyles.colors.black
    },
    priceTxt:{
        width:wp('25%'),
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color:DefaultStyles.colors.secondary,
        textAlign:'right',
        marginHorizontal:wp('1%')
    },
    ofrTxt:{
        fontSize:12,
        color:DefaultStyles.colors.secondary,
        fontFamily:"Poppins-Regular"
    },
    inputContainer: {
        width: wp('92%'),
        marginBottom:wp('3%'),
        alignSelf: 'center',
        height:wp('19%'),
        justifyContent:'center',
        paddingLeft:wp('5%'),
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        borderBottomColor: "white",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        
        // elevation: 3,
    },
    inputContainer1: {
        width: wp('92%'),
        marginBottom:wp('3%'),
        alignSelf: 'center',
        height:wp('19%'),
        padding:wp('5%'),
        // paddingLeft:wp('4%'),
        backgroundColor: DefaultStyles.colors.sky,
        borderRadius: 6,
        borderBottomColor: "white",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        
        // elevation: 3,
    },
    hrtStl:{
        width:22,
        height:20
    }
});
