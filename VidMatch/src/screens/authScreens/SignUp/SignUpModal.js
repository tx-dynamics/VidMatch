import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator,
ToastAndroid, Alert, Image, StyleSheet, ScrollView,}
from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from '../../../config/Styles';
import Apptext from '../../../components/Apptext';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from "react-redux";
import { setUser, setUserData } from '../../../redux/actions/authAction';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';


const SignUpModal = ({ navigation, route }) => {
    let dispatch = useDispatch();

    const items = route.params.items;
    console.log("rcvd on modal", items)
    //////////////////////////////////////////////////////////////////////////////////
    const chkUser = () => {
        var user1 = auth().currentUser;
        console.log(user1)
        if (user1.uid) {
            dispatch(setUser(true))
            dispatch(setUserData(items))
            Snackbar.show({
                text: 'Login Successful',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor:DefaultStyles.colors.secondary
              });
        }
    } 

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#fc6e02','#fd0833','#fb015c','#fd0833', '#fe8c6a']}>
            <View>
                <Image style={{ alignSelf:'center'}} source={require('../../../../assets/ModalLogo.png')} />
            </View>
            <View style={{
            width:wp('90%'), height:wp('83%'), 
            // backgroundColor:"lightgray", 
            borderWidth:0.5,
            borderColor:"white",
            borderRadius:16, 
            alignSelf:'center'
            }} >

             <View style={styles.DirectionView}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../assets/yellowStar.png')} />
                        <Apptext style={styles.topTxt}>Try Premium</Apptext>
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
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("Premium") }
                    style={styles.btn}>
                        <Apptext style={styles.btnTxt}>Start Now</Apptext>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={() => 
                    chkUser()
                }
                style={[styles.btn, {
                    borderColor:"transparent",
                    width:wp('90%'),
                    marginBottom:'10%',
                    backgroundColor:DefaultStyles.colors.secondary,
                     marginTop:161}]}>
                    <Apptext style={[styles.btnTxt, {fontSize:14, lineHeight:21}]}>Use it for Free</Apptext>
                    </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    )
}

export default SignUpModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultStyles.colors.white,
    },
    DirectionView: {
        marginTop: wp('9%'),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: wp('5%')

    },
    threeLines: {
        marginTop: wp('7%'),
        width: wp('100%'),
        height: wp('30%'),
        marginHorizontal: wp('5%')
    },
    topTxt: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginHorizontal: wp('4%'),
        color:"white"
    },
    linesTxt: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginHorizontal: wp('4%'),
        color:"white"
    },
    btn:{
        marginTop:wp('5%'),
        borderWidth:2,
        borderColor:"white",
        width:290,
        height:58,
        borderRadius:8,
        alignSelf :'center',
        alignItems:'center',
        justifyContent:'center'
    },
    btnTxt:{
        fontSize:18,
        fontFamily:'Poppins-SemiBold',
        color:"white",
        lineHeight: 27
    }
});