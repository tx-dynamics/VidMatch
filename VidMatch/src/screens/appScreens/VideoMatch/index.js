import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Image, Animated, PanResponder, StatusBar,
  Modal,
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
import { saveFvrtsData, getListing, getMoviesId, getData, getMultiMatch } from '../../../firebase/utility';
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
  let chkIndex = "";
  const Userdata = useSelector((state) => state.auth.userData)
  // console.log("userData", Userdata)

  /////////////////////////////////////////////////////////////////////////////////////////
  const [isItem, setSelectedItem] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isData, setData] = useState([]);
  const [isService, setService] = useState('netflix');
  const [isValue, setValue] = useState('');
  const [isArrays, setArrays] = useState(photoCards);
  const [isReferesh, setReferesh] = useState(false);
  const [isPage, setPage] = useState(1);
  const [isVisibe, setVisible] = useState(false)
  const [isFound, setFound] = useState([])


  // console.log("arrays", isValue)
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
    // console.log(Base.apiUrl + '/trending_movies', + isPage)
    let obj = JSON.stringify({
      pageNo: isPage
    })
    // console.log("body => ", obj)
    fetch(Base.apiUrl + '/trending_movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    })
      .then((response) => response.json())
      .then((data) => {
        // setData(data)
        setArrays(data.data.results)
        // console.log("Data agya", data?.data?.results)
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
    getMovies()
  }, [isReferesh])

  const addMovie = async (items) => {
    const userInfo = auth().currentUser;
    let Details = {
      id: items.id,
      adult: items.adult,
      poster_path: items.poster_path,
      title: items.title,
      release_date: items.release_date,
      uid: userInfo.uid
    }
    // console.log("Details Pushing", Details)
    await saveFvrtsData('checkMatch', 'xdi1eAz374DSEhVran9U', Details)
      .then(async user => {
        Snackbar.show({
          text: items.title + " " + "Added Into Favourites",
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

  // const chkExistLiked = async (items) => {
  //   const userInfo = auth().currentUser;
  //   let res = await getListing("checkMatch", 'xdi1eAz374DSEhVran9U',)

  //   const newestData = await res?.media?.filter(item => item.id !== items.id && userInfo.uid === item.uid)

  //   setTimeout(() => {
  //     console.log("Details Receving", newestData)
  //     // setArrays(newestData)
  //   }, 15000);

  // }

  const movieLiked = async (items) => {
    const userInfo = auth().currentUser;
    let res = await getListing("checkMatch", 'xdi1eAz374DSEhVran9U',)

    let matchExist;
    let exist;
    let indexes;
    if (res.media.length <= 0) {
      console.log("Undefined Media")
    }
    else {
      // chkExistLiked(items)
      let details = []
      res?.media?.filter((chkVal) => {
        if (chkVal.id === items.id && userInfo.uid !== chkVal.uid) {
          matchExist = true
          details.push(chkVal.uid)
          // getMatchUser(chkVal.uid)
          // console.log("kl => ",chkVal.uid  )
        }
      })
      // console.log("gg", details)
      getMatchUser(details)

      res?.media.map((val, index) => {
        // console.log("db values", val.movieId , items.id , val.uid, userInfo.uid)
        if (items.id === val.id && userInfo.uid === val.uid) {
          exist = true;
          indexes = index;
        }
      }
      )

    }
    if (matchExist === true) {
      console.log("Match Id Found")
      setVisible(true)
      // setFound(IdFound)
    }

    if (exist === true) {
      Snackbar.show({
        text: "You Have Already Liked" + " " + items.title,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: DefaultStyles.colors.secondary
      });
    }

    else {
      addMovie(items)
    }

  }

  const getMatchUser = async (uid) => {
    console.log("uid",uid)
    let details = [];
    uid.map(async(item) => {
      let dt = await getData('Users', item)
      details.push(dt)
      setFound([...details])
    })
  }

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={"white"}
        leftImgName={require('../../../../assets/hamBurger.png')}
        centerImg={require('../../../../assets/headerLogo.png')}
        onPressLeft={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      {/* ///////////////////////////////////////////MODAL EXISTS HERE////////////////////////////////////////////////////////// */}
      <Modal
        visible={isVisibe}>
        <View style={{
          flex: 1,
          width: wp('100%'),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 6,
          backgroundColor: "#181818",
        }}>
          <View
            style={{
              marginTop: wp('25%'),
            }}>
            <Apptext style={{
              color: "white",
              alignSelf: 'center',
              fontSize: 24,
              fontFamily: 'Poppins-SemiBold'
            }}>Super Match Found!</Apptext>
            <Image style={{ marginTop: 17, alignSelf: 'center', backgroundColor: '#181818' }}
              source={require('../../../../assets/modalStar.png')} />
          </View>
          <FlatList
            data={isFound}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => {
              return (
                <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                  No Item Found
                </Apptext>
              );
            }}

            renderItem={({ item, index }) => (
              <ScrollView>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginHorizontal: wp('5%'),
                  marginTop: wp('8%'),
                  alignItems: 'center',
                  // backgroundColor:"red"

                }}>
                  {
                    Userdata.thumbnail ?
                      <Image style={{
                        width: 80, height: 80,
                        borderRadius: 68
                      }} source={{ uri: Userdata.thumbnail }} />
                      :
                      <Image style={{
                        width: 80, height: 80,
                        borderRadius: 68
                      }} source={require('../../../../assets/blurBoy.png')} />

                  }
                  <Image style={{
                    width: 28, height: 28,
                    tintColor: "white",
                    borderRadius: 68
                  }} source={require('../../../../assets/play.png')} />

                  {
                    item.thumbnail ?
                    <TouchableOpacity onPress={() => navigation.navigate("AddConnect", {items:item})}>
                      <Image style={{
                        width: 80, height: 80,
                        borderRadius: 68
                      }}
                        source={{ uri: item.thumbnail }} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity>
                      <Image style={{
                        width: 80, height: 80,
                        borderRadius: 68
                      }} source={require('../../../../assets/empty-img.jpg')} />
                    </TouchableOpacity>
                  }
                </View>
                {/* ////////////////////////////////////////////// */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: wp('3%')
                }}>
                  <Apptext style={{
                    fontSize: 14,
                    textAlign: 'center',
                    width: wp('30%'),
                    color: "white"
                  }}>{Userdata.displayName}</Apptext>
                  <Apptext style={{ fontSize: 14, color: "white" }}>{item?.displayName}</Apptext>
                </View>

              </ScrollView>
            )}
            ListFooterComponent={item => (
          <View>   
         
          {/* <TouchableOpacity
            onPress={() => {
              console.log("item",item)
              // navigation.navigate("AddConnect", {items:item})
              // setVisible(false)
            }}
            style={{
              flexDirection: 'row',
              width: wp('82%'),
              height: wp('16%'),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#dbf7ff',
              borderRadius: 11,
              alignSelf: 'center',
              marginTop: wp('15%'),
            }}>
            <Image
              style={{ tintColor: DefaultStyles.colors.secondary, marginHorizontal: wp('2%') }}
              source={require('../../../../assets/msg.png')} />
            <Apptext style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: DefaultStyles.colors.secondary
            }}>Send A Message</Apptext>
          </TouchableOpacity>
          */}
          <TouchableOpacity
          style={{ marginTop:wp('15%')}}
          onPress={() => {
            navigation.navigate("VideoMatch")
            setVisible(false)
          }}>
            <Apptext
              style={{
                fontSize: 18, fontFamily: 'Poppins-Medium',
                marginTop: wp('15%'),
                color: "white", alignSelf: 'center'
              }}>Continue</Apptext>
          </TouchableOpacity>
          
          </View>
          )}
          />
        </View>
        
      </Modal>

      {/* ///////////////////////////////////////////MODAL ENDS HERE///////////////////////////////////////////////////////// */}

      <ScrollView>
        <View style={{ marginTop: wp('5%'), marginHorizontal: wp('4.5%') }}>
          {/* <FlatList
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
           */}
        </View>
        <View>
          {
            isLoading ? <ActivityIndicator size={"small"} color={DefaultStyles.colors.primary} style={{ marginTop: wp('50%') }} />
              :
              <Swiper
                ref={useSwiper}
                animateCardOpacity
                containerStyle={styles.container}
                cards={isArrays}
                renderCard={card =>
                  <Card card={card}
                    btnPress={() => navigation.navigate("VideoDetail", {movieId : card.id})}
                    onPress={setValue(card)} />
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
                onSwiped={(cardIndex) => {
                  // console.log("index", cardIndex)
                  chkIndex = cardIndex
                  if (cardIndex === 4) {
                    setPage(isPage + 1)
                    setReferesh(!isReferesh)
                  }
                }}
                // onSwipedAll={() => {console.log('onSwipedAll')}}
                showSecondCard
                animateOverlayLabelsOpacity

              />
          }
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
            onPress={() => {
              handleOnSwipedTop()
            }}
            style={[styles.whiteCrcl, { marginTop: -25 }]}>
            <Image source={require('../../../../assets/Ystar.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              movieLiked(isValue)
              handleOnSwipedRight()
              chkIndex === "4" ? setReferesh(!isReferesh) : null
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