import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, ImageBackground } from 'react-native';
import Apptext from '../../../components/Apptext';
import DefaultStyles from "../../../config/Styles";
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ChatDetailComp from '../../../components/ChatDetailComp';
import Header from '../../../components/Header';
import { Base } from '../../../Constants/Base';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

const VideoDetail = ({ navigation, route }) => {
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
    const movieId = route.params.movieId;
////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isLoading, setLoading] = useState(false)
    const [isData, setData] = useState([]);
    const [isDuration, setDuration] = useState('');
////////////////////////////////////////////////////////////////////////////////////////////////////
const getMovieDetail = () => {
    setLoading(true)
    // console.log(Base.apiUrl + '/movie_details', + movieId)
    let obj = JSON.stringify({
        movieId: movieId
    })
    fetch(Base.apiUrl + '/movie_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data)
        let hours = Math.trunc(data?.data?.runtime/60);
        let minutes = data?.data?.runtime % 60;
        setDuration(hours + "h " + minutes + "m")
        setLoading(false)
      })
      .catch(err => {
        console.error(err);
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: DefaultStyles.colors.primary
        });
        setLoading(false)
      })
  }

  useEffect(() => {
    getMovieDetail()
  }, [])

////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          {
              isLoading ? <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary} style={{marginTop:wp('50%')}} />
              :
            <ScrollView>                
                <ImageBackground 
                style={styles.BoxView} imageStyle={{borderRadius:7}}
                resizeMode='cover'
                source={
                isData?.poster_path ? {uri : Base.imgBaseUrl + isData.poster_path} 
                : require('../../../../assets/Rectangle7.png')
                }>
                <TouchableOpacity
                onPress={() => navigation.navigate("VideoPlay", {movieId: isData.id, poster: isData?.poster_path}) }
                >
                <Image source={require('../../../../assets/PlayIcon.png')} />
                </TouchableOpacity>
                </ImageBackground>
                <View style={styles.DirectionView}>
                    <TouchableOpacity style={styles.threeBoxes}>
                    <Image style={[styles.imgView, {tintColor:"white"}]} source={require('../../../../assets/videoChat.png')} />
                    <Apptext style={styles.BoxesTxt} >Genre</Apptext>
                    <Apptext style={styles.BoxesBlwTxt}>{isData?.genres ? isData.genres[0]?.name  : "Action"}</Apptext>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.threeBoxes, {backgroundColor:"#ffc0c0"}]}>
                    <Image style={styles.imgView} source={require('../../../../assets/time.png')} />
                    <Apptext style={[styles.BoxesTxt,{color: "#fe7e7e"}]} >Duration</Apptext>
                    <Apptext style={styles.BoxesBlwTxt} >{isDuration ? isDuration : "Un-Specified"}</Apptext>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.threeBoxes, {backgroundColor:"#ffd495"}]}>
                    <Image style={styles.imgView} source={require('../../../../assets/star.png')} />
                    <Apptext style={[styles.BoxesTxt, {color:"#ff9c09"}]} >Rating</Apptext>
                    <Apptext style={styles.BoxesBlwTxt}>{isData?.vote_average ? isData.vote_average + "/10" : "Average"}</Apptext>
                    </TouchableOpacity>
                </View>
                <View style={styles.DescTopTxt}>
                    <Apptext style={styles.Txt}>{isData?.title  ? isData.title : "Movie Title"}</Apptext>
                    <Apptext style={styles.line}></Apptext>
                    <Apptext style={styles.descTxt}>{isData?.overview ? isData.overview : null} </Apptext>
                </View>
            </ScrollView>}

        </View>    
     
    )
}

export default VideoDetail;


const styles = StyleSheet.create({
    BoxView:{
        width:wp('90%'),
        height:wp('100%'),
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp('7%'),
        borderRadius:7
    },
    DirectionView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginHorizontal:wp('12%'),
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
        fontSize:11,
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
        marginBottom:wp('7%')
    }

})