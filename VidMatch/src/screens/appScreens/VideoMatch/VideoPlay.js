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
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPlay = ({ navigation, route }) => {

    const movieId = route.params.movieId;
    const poster = route.params.poster;
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isLoading, setLoading] = useState(false)
    const [isData, setData] = useState([]);

    const [playing, setPlaying] = useState(false);

    const onStateChange = (state) => {
        if (state === 'ended') {
            setPlaying(false);
            Snackbar.show({
                text: 'video has finished playing!',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: DefaultStyles.colors.primary
            });
        }
    }

    const togglePlaying = () => {
        setPlaying((prev) => !prev);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////

    const getMovieTrailer = () => {
        setLoading(true)
        // console.log(Base.apiUrl + '/movie_videos', + movieId)
        let obj = JSON.stringify({
            movieId: movieId
        })
        fetch(Base.apiUrl + '/movie_videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: obj
        })
            .then((response) => response.json())
            .then((data) => {
                const VideoData = data?.data?.results.filter((item) => item?.type === "Trailer")
                setData(VideoData[0])
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
        getMovieTrailer()
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
       
                    <View>
                        <View style={styles.DescTopTxt}>
                            <Apptext style={styles.Txt}>{"Official Movie Trailer"}</Apptext>
                        </View>
                        {
                isLoading ? <ActivityIndicator size={"small"} 
                color={DefaultStyles.colors.primary} style={{ marginTop: wp('20%') }} />
                    :
                            
                        <View style={{alignSelf:'center',
                        height:wp('90%'),
                        width:wp('90%')}}>
                        <YoutubePlayer
                            height={500}
                            play={playing}
                            videoId={isData?.key}
                            onChangeState={onStateChange}
                        />
                        </View>
                    }
                        {/* <ImageBackground
                            style={styles.BoxView} imageStyle={{ borderRadius: 7 }}
                            resizeMode='cover'
                            source={
                                poster ? { uri: Base.imgBaseUrl + poster }
                                    : require('../../../../assets/Rectangle7.png')
                            }>
                            
                            <TouchableOpacity onPress={togglePlaying}>
                                <Image source={playing ? require('../../../../assets/pause.png') : require('../../../../assets/PlayIcon.png')}
                                 />
                            </TouchableOpacity>
                        </ImageBackground> */}

                        <View style={styles.DescTopTxt}>
                        </View>

                    </View>

        </View>

    )
}

export default VideoPlay;


const styles = StyleSheet.create({
    BoxView: {
        width: wp('90%'),
        height: wp('100%'),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp('4%'),
        borderRadius: 7
    },
    DirectionView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: wp('12%'),
        marginTop: wp('8%')
    },
    threeBoxes: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: 15,
        backgroundColor: "#8da2ff",
        alignItems: 'center'
    },
    imgView: {
        marginTop: wp('2%')
    },
    BoxesTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 9,
        marginTop: wp('2%'),
        color: "#5e78eb"
    },
    BoxesBlwTxt: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
        color: "white"
    },
    DescTopTxt: {
        marginTop: wp('5%'),
        marginHorizontal: wp('5%')
    },
    Txt: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        alignSelf: 'center'
    },
    line: {
        width: wp('90%'),
        height: 0.5,
        marginTop: 19,
        backgroundColor: "lightgray"
    },
    descTxt: {
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        marginTop: wp('6%'),
        width: wp('90%'),
        textAlign: 'left',
        marginBottom: wp('7%')
    }

})