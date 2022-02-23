import React from 'react'
import { View, Text, Image,ImageBackground, ImageSourcePropType, TouchableOpacity } from 'react-native'
import { shape, string, number } from 'prop-types'
import styles from './Card.styles';

const Card = ({ card }) => (
  <View
    activeOpacity={1}
    style={styles.card}
  >
    
    <ImageBackground
      style={styles.image}
      // source={card.photo}
      source={card.photo}
      imageStyle={{borderRadius:10}}
      resizeMode="cover"
    >
      <View style={{flexDirection:'row', justifyContent:'flex-end', marginHorizontal:'3%'}}>
      <TouchableOpacity style={{
        width:61,
      height:26,
      // padding:5, 
      backgroundColor:"#110808",
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      // justifyContent:'space-evenly',
       borderWidth:0.5, borderColor:"white",marginTop:13,alignItems:'center',
       borderRadius:42}}>
         <Image style={{width:10, height:10}} source={require('../../assets/figmaEye.png')} />

      
         <Text style={{fontSize:9,marginLeft:'5%', fontFamily:'Poppins-Regular', color:"white"}}>Seen it</Text>

      </TouchableOpacity>
      </View>
    </ImageBackground>
    <View style={styles.photoDescriptionContainer}>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.text}>
        {`${card.name}`}
      </Text>
      <Image style={{width:32, height:32}} source={require('../../assets/PlayIcon.png')} />
      </View>
      <Text style={styles.Desctext}>
        {`${card.description}`}
      </Text>
    </View>
  </View>
)

Card.propTypes = { 
  card: shape({
    photo: ImageSourcePropType,
    name: string,
    age: number,
  }).isRequired,
}
export default Card