import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";
import Apptext from '../components/Apptext';

const FvrtComp = ({ labelValue, placeholderText,
    iconType, leftIconType, leftImgName, rightImgName,
    onPress,borderRadius= 6,rightOnPress,
    rightIconType, ...rest }) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[styles.inputContainer, {borderRadius:borderRadius}]} >
            <View style={{ flexDirection: 'row',alignItems:'center' }}>
               <Image style={styles.imgStl}
                source={leftImgName}
               />
               <View style={styles.txtView}>
                <Apptext style={styles.txtVal}>{labelValue}</Apptext>
                </View>
                <TouchableOpacity onPress={rightOnPress} >
                <Image
                style={styles.hrtStl}
                source={rightImgName}  />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default FvrtComp;

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
        marginHorizontal:wp('3%'),
        width:wp('50%'),
    },
    txtVal:{
        fontFamily:'poppins-Regular',
        fontSize:wp('4%')
    },
    inputContainer: {
        width: wp('88%'),
        marginBottom:wp('3%'),
        alignSelf: 'center',
        // height:75,
        padding:wp('2%'),
        paddingLeft:wp('4%'),
        backgroundColor: DefaultStyles.colors.grash,
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
        width:25,
        height:25,
        marginRight:wp('10%')
    }
});
