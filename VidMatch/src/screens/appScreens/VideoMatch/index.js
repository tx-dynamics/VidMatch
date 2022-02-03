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

// import { getDistance, getPreciseDistance } from 'geolib';

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
//   renderUsers = () => {
//     return this.state.Users.map((item, i) => {
//       if (i < this.state.currentIndex) {
//         return null
//       }
//       else if (i == this.state.currentIndex) {
//         return (
//           <Animated.View
//             {...this.PanResponder.panHandlers}
//             key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
//             <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
//               <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
//             </Animated.View>
//             <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
//               <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
//             </Animated.View>
//             <ImageBackground
//               style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 40 }}
//               source={{ uri: item.uri }}
//               imageStyle={{ borderRadius: 40 }} >
//               <View style={{
//                 position: "absolute",
//                 bottom: 0,
//                 marginHorizontal: responsiveHeight(2.5),
//                 padding: responsiveHeight(1),
//                 //flexDirection:'row',
//               }}>
//                 <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(4) }}>{item.name}</Text>
//                 <Text style={{ color: 'white', fontWeight: '100', fontSize: responsiveFontSize(2) }}>{item.description}</Text>
//               </View>
//               <TouchableOpacity style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 alignSelf: 'flex-end',
//                 padding: responsiveHeight(5)
//               }}
//                 onPress={() => {
//                   this.props.navigation.navigate("Detail",
//                     { Item: item }
//                   );
//                 }}
//               >
//                 <AntDesign name="infocirlce" size={30} color="white" />
//               </TouchableOpacity>
//             </ImageBackground>
//             <View style={styles.bottomView}>
//               <View style={styles.crossIconView}>
//                 <TouchableOpacity onPress={this.onCloseClick}>
//                   <Image
//                     source={require('../assets/icon/close_24px.png')}
//                     style={styles.crossIcon}></Image>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.crossIconView}>
//                 <TouchableOpacity onPress={this.onHeartClick}>
//                   <Image
//                     source={require('../assets/icon/likeicon.png')}
//                     style={styles.crossIcon}></Image>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Animated.View>
//         )
//       }
//       else {
//         return (
//           <Animated.View
//             key={item.id} style={[{
//               opacity: this.nextCardOpacity,
//               transform: [{ scale: this.nextCardScale }],
//               height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
//             }]}>
//             <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
//               <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
//             </Animated.View>
//             <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
//               <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
//             </Animated.View>
//             <ImageBackground
//               style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 40 }}
//               source={{ uri: item.uri }}
//               //source={item.uri }
//               imageStyle={{ borderRadius: 30 }} >
//               <View style={{
//                 position: "absolute",
//                 bottom: 0,
//                 marginHorizontal: responsiveHeight(2.5),
//                 padding: responsiveHeight(1),
//               }}>
//                 <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(4) }}>{item.name}</Text>
//                 <Text style={{ color: 'white', fontWeight: '100', fontSize: responsiveFontSize(2) }}>{item.description}</Text>
//               </View>
//               <TouchableOpacity style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 alignSelf: 'flex-end',
//                 padding: responsiveHeight(5)
//               }}
//                 onPress={() => {
//                   this.props.navigation.navigate("Detail");
//                 }}
//               >
//                 <AntDesign name="infocirlce" size={30} color="white" />
//               </TouchableOpacity>
//             </ImageBackground>
//             <View style={styles.bottomView}>
//               <View style={styles.crossIconView}>
//                 <Image
//                   source={require('../assets/icon/close_24px.png')}
//                   style={styles.crossIcon}></Image>
//               </View>
//               <View style={styles.crossIconView}>
//                 <Image
//                   source={require('../assets/icon/likeicon.png')}
//                   style={styles.crossIcon}></Image>
//               </View>
//             </View>
//           </Animated.View>
//         )
//       }
//     }).reverse()
//   }
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <StatusBar
//           backgroundColor="#72B1EB"
//           barStyle="light-content"
//           translucent
//         />
//         {this.state.succes ?
//           <ActivityIndicator style={{ marginTop: responsiveHeight(30) }} size={'large'} color={'#00008B'} />
//           : (
//             <>
//               <View style={{}}>
//                 {
//                   this.state.currentIndex >= this.state.length ?
//                     <Text style={{ textAlign: 'center', alignSelf: 'center', marginTop: SCREEN_WIDTH / 2, fontSize: responsiveFontSize(2.5) }}>For More Movies Comeback Later</Text>
//                     :
//                     this.renderUsers()
//                 }
//               </View>
//               <View style={{ height: 60 }}>
//               </View>
//             </>
//           )
//         }
//       </View>
//     );
//   }
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