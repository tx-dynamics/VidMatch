import React, { useState, useRef } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Image, Animated, PanResponder, StatusBar,
  FlatList,
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
import imdb from 'imdb-api'


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Add ',
    backgroundColor: '#09154a',
    bg: '#09154a',
    icon: true,
    color: "white",
    clr: "white"
  },
  {
    id: 'bd73acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Netflix',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"


  },
  {
    id: 'bd7acb4ea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Disney ',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"


  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-553ad53abb28ba',
    name: 'Leopards ',
    backgroundColor: 'white',
    bg: "#e50914",
    icon: false,
    color: "#a2a2a2",
    clr: "white"
  },


];


export default VideoMatch = ({ navigation }) => {
  
  
  const imdb = require('imdb-api')
  imdb.get({name: 'The Toxic Avenger'},{apiKey: '7e730b7', timeout: 30000})
 .then(console.log(JSON.stringify(imdb)))
 .catch(console.log);


  const [isItem, setSelectedItem] = useState([]);
  const useSwiper = useRef(null).current
  const handleOnSwipedLeft = () => useSwiper.swipeLeft()
  const handleOnSwipedTop = () => useSwiper.swipeTop()
  const handleOnSwipedRight = () => useSwiper.swipeRight()


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


  return (
    <View style={styles.container}>
      <Header
        backgroundColor={"white"}
        leftImgName={require('../../../../assets/hamBurger.png')}
        centerImg={require('../../../../assets/headerLogo.png')}
        onPressLeft={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />

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
          cards={photoCards}
          renderCard={card => <Card card={card} />}
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          infinite
          showSecondCard
          animateOverlayLabelsOpacity
          // overlayLabels={{
          //   left: {
          //     title: 'NOPE',
          //     element: <OverlayLabel label="NOPE" color="#E5566D" />,
          //     style: {
          //       wrapper: styles.overlayWrapper,
          //     },
          //   },
          //   right: {
          //     title: 'LIKE',
          //     element: <OverlayLabel label="LIKE" color="#4CCC93" />,
          //     style: {
          //       wrapper: {
          //         ...styles.overlayWrapper,
          //         alignItems: 'flex-start',
          //         marginLeft: 30,
          //       },
          //     },
          //   },
          // }}
        />
      
      </View>
      <View style={{
        // marginTop:wp('110%'),
        marginTop:wp('115%'),
       flexDirection:'row', justifyContent:'space-evenly'}}>
          <TouchableOpacity 
          // onPress={handleOnSwipedLeft}
          style={styles.whiteCrcl}>
            <Image source={require('../../../../assets/cross.png')} />
          </TouchableOpacity>
          <TouchableOpacity 
          // onPress={handleOnSwipedTop}
          style={[styles.whiteCrcl, {marginTop:-25}]}>
            <Image source={require('../../../../assets/Ystar.png')} />
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={handleOnSwipedRight}
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
    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  whiteCrcl:{
    width:52, height:52,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"white",
     borderRadius:40
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