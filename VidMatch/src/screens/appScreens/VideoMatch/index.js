import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Image, Animated, PanResponder, StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
// const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SCREEN_WIDTH = Dimensions.get('window').width;
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from 'react-native-deck-swiper';
import Header from '../../../components/Header';
import { func, string } from 'prop-types'
import Apptext from '../../../components/Apptext';
import Card from '../../../components/Card';
import IconButton from '../../../components/IconButton';
import OverlayLabel from '../../../components/OverlayLabel';
import photoCards from '../../../components/photoCards';
import Snackbar from 'react-native-snackbar';
import { Base } from '../../../Constants/Base';
import DefaultStyles from '../../../config/Styles';
import { setUserData } from '../../../redux/actions/authAction';
import { saveFvrtsData, getListing, getMoviesId } from '../../../firebase/utility';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";


const DATA = [
  // {
  //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //   name: 'Add ',
  //   backgroundColor: '#09154a',
  //   bg: '#09154a',
  //   icon: true,
  //   color: "white",
  //   clr: "white"
  // },
  {
    id: 'bd73acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Netflix',
    slug: 'netflix',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"


  },
  {
    id: 'bd7acb4ea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Prime',
    slug: 'prime',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"


  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-553ad53abb28ba',
    name: 'Disney',
    slug: 'disney',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"
  },
  {
    id: 'bd7ac4bea-c1b1-46c2-aed5-553ad53abb28ba',
    name: 'Starz',
    slug: 'starz',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"
  },
  {
    id: 'bd7acb3ea-c1b1-46c2-aed5-553ad53abb28ba',
    name: 'Mubi',
    slug: 'mubi',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"
  },
  {
    id: 'bd7acb3ea-c1b1-46c2-aed5-53253ad53abb28ba',
    name: 'Paramount',
    slug: 'paramount',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"
  },
  {
    id: 'bd7acb3ea-c1b1-46c2-aed5-5534ad53abb28ba',
    name: 'Showtime',
    slug: 'showtime',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"
  },


];


export default VideoMatch = ({ navigation }) => {

  const useSwiper = useRef();
  const handleOnSwipedLeft = () => useSwiper.current.swipeLeft();
  const handleOnSwipedTop = () => useSwiper.current.swipeTop();
  const handleOnSwipedRight = () => useSwiper.current.swipeRight();
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  const [isItem, setSelectedItem] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isData, setData] = useState([]);
  const [isService, setService] = useState('netflix');
  const [isValue, setValue] = useState('');
  const [isArrays, setArrays] = useState(photoCards);

  // console.log("arrays", isArrays)
  ///////////////////////////////////////////////////////////////////////////////////////
  const addCategories = async (item) => {
    var selectedIdss = [...isItem]
    if (selectedIdss.includes(item.id)) {
      selectedIdss = selectedIdss.filter(id => id !== item.id)
    }
    else {
      selectedIdss = []
      selectedIdss.push(item.id)
    }
    await setSelectedItem(selectedIdss)
  }

  const getMovies = () => {
    setLoading(true)
    console.log(Base.baseURL + '/changes?service=' + isService + Base.params)
    fetch(Base.baseURL + '/changes?service=' + isService + Base.params, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': Base.hostName,
        'X-RapidAPI-Key': Base.hostKey
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        console.log("Data agya", data)
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
    // getMovies()
  }, [isService])

  const addMovie = async (items) => {
    const userInfo = auth().currentUser;
    let Details = {
      movieName: items?.name,
      movieDescription: items?.description,
      movieId: items?.id,
      moviePoster: items?.photo.uri,
      uid: userInfo.uid
    }

    await saveFvrtsData('checkMatch', 'xdi1eAz374DSEhVran9U', Details)
      .then(async user => {
        Snackbar.show({
          text: items.name + " " + "Added Into Favourites",
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: DefaultStyles.colors.secondary
        });
      })
      .catch(function (error) {
        success = false;
        console.log(error)
        Snackbar.show({
          text: error.code,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: DefaultStyles.colors.primary
        });

      });
  }

  const movieLiked = async (items) => {
    const userInfo = auth().currentUser;
 
    let res = await getListing("checkMatch", 'xdi1eAz374DSEhVran9U', )
    // console.log(res.media, "res")
    let exist;
    let indexes;
    if (res.media.length <= 0) {
      console.log("Undefined")
    }
    else {
      
      // const newestData = res?.media?.filter(item => item.movieId !== items.Id && userInfo.uid !== item.uid)
      // console.log(newestData, "newestData")

      res?.media.map((val, index) => {
        // console.log("db values", val.movieId , items.id , val.uid, userInfo.uid)
        if (items.id === val.movieId && userInfo.uid === val.uid ) {
          exist = true;
          indexes = index;
        }
      }
      )
      
    }
    if (exist === true) {
      Snackbar.show({
        text: "You Have Already Liked" + " " + items.name,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: DefaultStyles.colors.secondary
      });
    }
    
    else {
      addMovie(items)
    }
   
  }

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={"white"}
        leftImgName={require('../../../../assets/hamBurger.png')}
        centerImg={require('../../../../assets/headerLogo.png')}
        onPressLeft={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <ScrollView>
        <View style={{ marginTop: wp('5%'), marginHorizontal: wp('4.5%') }}>
          <FlatList
            data={DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => {
              return (
                <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                  No Item Found
                </Apptext>
              );
            }}
            renderItem={({ item, index }) => (
              <View>
                {isItem.includes(item.id) ?

                  <TouchableOpacity
                    onPress={() => {
                      addCategories(item)
                      setService(item.slug)
                    }}
                    style={[styles.Hflat, { backgroundColor: item.bg }]}>
                    <Apptext style={[styles.HflatTxt, { color: item.clr }]}>{item.name}</Apptext>
                    {item.icon === true ?
                      <Image style={{ marginLeft: wp('1%'), tintColor: "white" }}
                        source={require('../../../../assets/plus.png')} />
                      : null}
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => {
                      addCategories(item)
                      setService(item.slug)
                    }}
                    style={[styles.Hflat, { backgroundColor: item.backgroundColor }]}>
                    <Apptext style={[styles.HflatTxt, { color: item.color }]}>{item.name}</Apptext>
                    {item.icon === true ?
                      <Image style={{ marginLeft: wp('1%'), tintColor: "white" }}
                        source={require('../../../../assets/plus.png')} />
                      : null}
                  </TouchableOpacity>
                }
              </View>
            )}
          />
        </View>
        <View>
          <Swiper
            ref={useSwiper}
            animateCardOpacity
            containerStyle={styles.container}
            cards={isArrays}
            renderCard={card =>
              <Card card={card} onPress={setValue(card)} />
              // console.log(card)
            }
            cardIndex={0}
            backgroundColor="white"
            stackSize={1}
            infinite
            // goBackToPreviousCardOnSwipeTop={true}
            // goBackToPreviousCardOnSwipeBottom={true}
            // goBackToPreviousCardOnSwipeLeft={true}
            // goBackToPreviousCardOnSwipeRight={true}
            // onSwiped={(cardIndex) => {console.log("index",cardIndex)}}
            // onSwipedAll={() => {console.log('onSwipedAll')}}
            showSecondCard
            animateOverlayLabelsOpacity

          />

        </View>
        <View style={{
          // marginTop:wp('110%'),
          marginTop: wp('115%'),
          flexDirection: 'row', justifyContent: 'space-evenly'
        }}>
          <TouchableOpacity
            onPress={() => handleOnSwipedLeft()}
            style={styles.whiteCrcl}>
            <Image source={require('../../../../assets/cross.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOnSwipedTop()}
            style={[styles.whiteCrcl, { marginTop: -25 }]}>
            <Image source={require('../../../../assets/Ystar.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              movieLiked(isValue)
              handleOnSwipedRight()
            }}
            style={styles.whiteCrcl}>
            <Image source={require('../../../../assets/thumb.png')} />
          </TouchableOpacity>
        </View>
        <View>


          {/* <IconButton
      name="close"
      onPress={handleOnSwipedLeft}
      color="white"
      backgroundColor="#E5566D"
    />
    <IconButton
      name="star"
      onPress={handleOnSwipedTop}
      color="white"
      backgroundColor="#3CA3FF"
    />
    <IconButton
      name="heart"
      onPress={handleOnSwipedRight}
      color="white"
      backgroundColor="#4CCC93"
    /> */}
        </View>
      </ScrollView>
    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  whiteCrcl: {
    width: 52, height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 40
  },
  Hflat: {
    flexDirection: 'row',
    marginHorizontal: wp('1%'),
    width: wp('25%'),
    height: wp('9%'),
    borderRadius: wp('1%'),
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"#09154a",
    borderColor: "gray"
  },
  HflatTxt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 16,
    color: "gray"

  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: -10
  },
  crossIcon: {
    width: 50, height: 50, borderRadius: 50 / 2,
    alignSelf: 'center',
  },
  crossIconView: {
    width: 70, height: 70, borderRadius: 70 / 2,
    backgroundColor: 'white',
    marginHorizontal: responsiveHeight(4),
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  hearticon: {
    width: 100,
    height: 100,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: responsiveHeight(2.5),
  },
});