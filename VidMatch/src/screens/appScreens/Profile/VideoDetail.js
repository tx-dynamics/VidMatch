import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, ImageBackground } from 'react-native';
import Apptext from '../../../components/Apptext';
import DefaultStyles from "../../../config/Styles";
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ChatDetailComp from '../../../components/ChatDetailComp';
import Header from '../../../components/Header';


const VideoDetail = ({ navigation }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Alex Mintz",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boy1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },
       

    ];


    return (
        <View style={[DefaultStyles.container, { flex: 1, }]}>
            <Header
            backgroundColor={"white"}
            height={wp('20%')}
            leftImgName={require('../../../../assets/arrow-back.png')}
            centerImg={require('../../../../assets/headerLogo.png')}
            rightImg={require('../../../../assets/play.png')}
            onPressLeft={() => navigation.goBack()}
            onPressRight={() => navigation.navigate("VideoMatch")}
            />
            <ScrollView>
                <TouchableOpacity>
                <ImageBackground 
                style={styles.BoxView} imageStyle={{borderRadius:10}}
                resizeMode='stretch'
                source={require('../../../../assets/Rectangle7.png')} >
                <Image source={require('../../../../assets/PlayIcon.png')} />
                </ImageBackground>
                </TouchableOpacity>
                <View style={styles.DirectionView}>
                    <TouchableOpacity style={styles.threeBoxes}>
                    <Image style={[styles.imgView, {tintColor:"white"}]} source={require('../../../../assets/videoChat.png')} />
                    <Apptext style={styles.BoxesTxt} >Genre</Apptext>
                    <Apptext style={styles.BoxesBlwTxt} >Action</Apptext>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.threeBoxes, {backgroundColor:"#ffc0c0"}]}>
                    <Image style={styles.imgView} source={require('../../../../assets/time.png')} />
                    <Apptext style={[styles.BoxesTxt,{color: "#fe7e7e"}]} >Duration</Apptext>
                    <Apptext style={styles.BoxesBlwTxt} >2h 15m</Apptext>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.threeBoxes, {backgroundColor:"#ffd495"}]}>
                    <Image style={styles.imgView} source={require('../../../../assets/star.png')} />
                    <Apptext style={[styles.BoxesTxt, {color:"#ff9c09"}]} >Rating</Apptext>
                    <Apptext style={styles.BoxesBlwTxt} >8.7 / 10</Apptext>
                    </TouchableOpacity>
                </View>
                <View style={styles.DescTopTxt}>
                    <Apptext style={styles.Txt}>The Avengers</Apptext>
                    <Apptext style={styles.line}></Apptext>
                    <Apptext style={styles.descTxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Pellentesque diam id tincidunt elit tincidunt commodo.
                            Enim at volutpat porttitor aliquam augue amet tortor neque.</Apptext>
                </View>
            </ScrollView>

        </View>    
     
    )
}

export default VideoDetail;


const styles = StyleSheet.create({
    BoxView:{
        width:wp('90%'),
        height:wp('93%'),
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp('7%'),
        borderRadius:10
    },
    DirectionView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginHorizontal:wp('5%'),
        marginTop:wp('8%')
    },
    threeBoxes:{
        width:wp('20%'),
        height:wp('20%'),
        borderRadius:15,
        backgroundColor:"#8da2ff",
        alignItems:'center'
    },
    imgView:{
        marginTop:wp('2%')
    },
    BoxesTxt:{
        fontFamily:'Poppins-Regular',
        fontSize:9,
        marginTop:wp('2%'),
        color:"#5e78eb"
    },
    BoxesBlwTxt:{
        fontFamily:'Poppins-Medium',
        fontSize:12,
        color:"white"
    },
    DescTopTxt:{
        marginTop:wp('6%'),
        marginHorizontal:wp('5%')
    },
    Txt:{
        fontFamily:'Poppins-Medium',
        fontSize:18
    },
    line:{
        width:wp('90%'),
        height:0.5,
        marginTop:19,
        backgroundColor:"lightgray"
    },
    descTxt:{
        fontSize:11,
        fontFamily:'Poppins-Regular',
        marginTop:wp('6%'),
        width:wp('90%'),
        textAlign:'left',
    }

})