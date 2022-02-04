import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DefaultStyles from "../config/Styles";
import Apptext from './Apptext';

const MatchBox = ({ leftTitle, rightTitle, leftImgName,
    yellowBoxTxt,subTxt,
    firstImg,scndImg,
    rightImgName, leftOnPress, rightOnPress, ...rest }) => {

    return (
        <View style={styles.MainContainer}>
            <TouchableOpacity onPress={leftOnPress} style={styles.SightingContainer} {...rest}>
                <ImageBackground imageStyle={{borderRadius:10}} style={styles.SightingContainer} source={leftImgName}>
                    <View  style={styles.direction}>
                        <Image style={styles.imgBox} source={firstImg} />
                        <Image style={styles.imgBox} source={scndImg} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        </View>

    );
};

export default MatchBox;

const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: 'row',
        marginLeft: wp('4%'),
        marginTop: wp('3%'),
    },
    SightingContainer: {
        width: wp('44%'),
        height: wp('60%'),
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 1,
        borderRadius: 10
    },
    direction:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:wp('40%')
    },
    imgBox:{
        width:43,
        height:43,
        borderRadius:40
    },
    imgContainer: {
        width: wp('40%'),
        height: wp('47%'),
    },
    SightingText: {
        fontFamily: "Poppins-Regular",
        marginHorizontal: wp('2%'),
        fontSize: wp('3%'),
        width: wp('28%'),
        marginTop: wp('38%') ,
        color: DefaultStyles.colors.white,
    },
    SightingText1: {
        fontFamily: "Poppins-Regular",
        marginHorizontal: wp('2%'),
        fontSize: wp('2%'),
        width: wp('50%'),
        marginTop: -5,
        color: DefaultStyles.colors.white,
    },
    grayBox: {
        width: wp('41%'),
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignSelf: 'center',
        height: wp('9.5%'),
        opacity: 0.6,
        backgroundColor: "lightgray",
        marginTop: wp('31.5%')
    },
    pinkBox: {
        width: wp('12%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('4%'),
        marginLeft: wp('2%'),
        marginTop: -2,
        borderRadius: 10,
        backgroundColor: DefaultStyles.colors.secondary
    },
    grayBoxDirection: {
        flexDirection: 'row',
    },
    innerBox:{
        width:wp('11%'),
        marginTop:10,
        marginHorizontal:17,
        height:wp('4%'),
        borderRadius:6,
        backgroundColor:DefaultStyles.colors.yellow,
        alignItems:'center',
        justifyContent:'center'
    },
    innerTxt:{
        fontFamily:'Lato-Regular',
        fontSize:wp('2%'),
        color:DefaultStyles.colors.white
    }
});
