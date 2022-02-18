import React from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Image, Animated, PanResponder, StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

// const DATA = [
//   {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       name: 'Movie1 ',
//       uri: require('../assets/MoviesAppImages/image.png'),
//       description: "Hi! The current Ui looks awsome",
//       detailDescription:"Detail description Hi! The current Ui looks awsome",
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     name: 'Movie2',
//     uri: require('../assets/MoviesAppImages/picture.png'),
//     description: "Hi! The current Ui looks awsome",
//     detailDescription:"Detail description Hi! The current Ui looks awsome",
// },
// {
//   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//   name: 'Movie3',
//   uri: require('../assets/MoviesAppImages/Rectangle.png'),
//   description: "Hi! The current Ui looks awsome",
//   detailDescription:"Detail description Hi! The current Ui looks awsome",
// },
// {
//   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//   name: 'Movie4',
//   uri: require('../assets/MoviesAppImages/imagesmovie.png'),
//   description: "Hi! The current Ui looks awsome",
//   detailDescription:"Detail description Hi! The current Ui looks awsome",
// },
// ];

export default VideoMatch = () => {
 return (
     <View></View>
 );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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