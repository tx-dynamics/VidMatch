import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";
import Apptext from '../components/Apptext';

const BellComp = ({ labelValue, placeholderText,
    iconType, leftIconType, leftImgName, rightImgName,
    onPress,
    rightIconType, ...rest }) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[styles.inputContainer]} >
            <View style={{ flexDirection: 'row' }}>
               {/* <Image style={styles.imgStl}
                source={leftImgName}
               /> */}
               <View style={styles.txtView}>
                <Apptext style={styles.txtVal}>{labelValue}</Apptext>
                </View>
                <TouchableOpacity>
                <Image
                style={styles.hrtStl}
                source={rightImgName}  />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default BellComp;

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
        // marginHorizontal:wp('3%'),
        width:wp('80%'),
        // backgroundColor:"red"
    },
    txtVal:{
        fontFamily:'Poppins-Regular',
        fontSize:wp('3%'),
        color:DefaultStyles.colors.black
    },
    inputContainer: {
        width: wp('90%'),
        marginBottom:wp('5%'),
        alignSelf: 'center',
        // height:52,
        padding:wp('5%'),
        // paddingLeft:wp('4%'),
        backgroundColor: DefaultStyles.colors.sky,
        borderRadius: 12,
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
