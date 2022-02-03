import React,{useState, useEffect} from 'react';
import {StyleSheet,Image, Text, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import DefaultStyles from "../../../config/Styles";
import SVGImg from '../../../../assets/loading.svg';

const Splash = ({navigation}) => {

    useEffect(() => { 
        setTimeout(() => {
            navigation.replace("Login")
        }, 2000);
    }, []);

    return (

        <View style ={styles.container}>
            <Image
            source={require('../../../../assets/splahLogo.png')}
            style={styles.splashImage}
            resizeMode={"contain"}/>
            <SVGImg style={{alignSelf:'center'}} width={30} height={30} />
           
        </View>
    )
}

export default Splash;


const styles = StyleSheet.create({
    container :{
        backgroundColor : DefaultStyles.colors.primary ,
        flex:1
    },
    splashImage:{
        flex:1,
        width:200,
        height:200,
        alignSelf:"center"
    }

  });