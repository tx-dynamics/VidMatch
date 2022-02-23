import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../Constants/Colors';
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
    // height: height - 300,
    height: 360,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginTop:-50,
    width:'100%'
  },
  image: {
    borderRadius: 10,
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    left: 10,
    bottom: 20,
  },
  text: {
    // textAlign: 'center',
    fontSize: 24,
    marginHorizontal:8,
    // backgroundColor:"red",
    width:'79%',
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    textShadowColor: Colors.black,
    textShadowRadius: 10,
  },
  Desctext:{
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal:8,
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    textShadowColor: Colors.black,
    textShadowRadius: 10,
  }
})