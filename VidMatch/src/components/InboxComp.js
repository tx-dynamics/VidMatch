import React from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Apptext from "./Apptext";
import DefaultStyles from "../config/Styles";

function InboxComp({
    countLabel,
    imgName,
    label,
    msg,
    txtDatee,
    backgroundColor,
    contentColor = DefaultStyles.colors.primary,
    onPress,
    style,
}) {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={styles.inboxMainView}>
            <View style={styles.inboxInnerView}>
                {/* <TouchableOpacity style={DefaultStyles.inboxCount}>
          <Apptext style={{color:DefaultStyles.colors.white}}>{countLabel}</Apptext>

          </TouchableOpacity> */}
                <TouchableOpacity style={{marginLeft:wp('1%')}}>
                    <ImageBackground style={styles.inboxImg} source={imgName}>
                      
                    </ImageBackground>
                </TouchableOpacity>
                <Apptext style={styles.inboxName}>{label}</Apptext>

                <Apptext style={styles.inboxDate}>{txtDatee}</Apptext>
            </View>
            <Apptext style={[styles.inboxTxt]}>{msg}</Apptext>
        </TouchableOpacity>
    );
}


export default InboxComp;

const styles = StyleSheet.create({

 inboxMainView: {
  //  backgroundColor:"red",
    marginTop: wp('4%'),
    alignSelf: 'center',
    width: wp('92%'),
    // height: 70,
  },
  inboxInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: wp('3%')
    
  },
  inboxCount: {
    justifyContent: 'center', alignItems: 'center',
    width: 34, height: 34,
    marginLeft: -17,
    marginTop: -10,
    borderRadius: 20,
    backgroundColor: DefaultStyles.colors.secondary
  },
  inboxImg: {
    width: 50, height: 50,
     borderRadius: 20
  },
  inboxName: {
    fontSize:15,
    width: wp('56%'),
    marginLeft: wp('3%'),
    marginTop: wp('1%')
  },
  inboxDate: {
    width: wp('16%'),
    marginTop: wp('1%'),
    textAlign: 'right'
  },
  inboxTxt: {
    color: DefaultStyles.colors.black, 
    fontSize:11,
    width: 160, alignSelf: 'center',
    marginLeft: -32,
    marginTop: -20,
  }


})
