import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import { Colors } from '../Constants/Colors'

import { fonts } from '../Constants/Fonts';
import { wp } from "../Helpers/Responsiveness"

const Button = (props) => {
    return (
        <View>
            <Pressable onPress={props.onPress}
                style={[styles.ButtonStyle, props.style, {
                    borderRadius: props.borderRadius ? props.borderRadius : 10,
                    borderColor: props.borderColor ? props.borderColor : "transparent", borderWidth: 1,
                    marginTop: props.marginTop ? props.marginTop : 0,
                    backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.yellowColor,
                    height: props.height ? props.height : 50,
                    marginBottom: props.marginBottom ? props.marginBottom : 0,
                }]}>
                {props.icon &&
                    // <Zocial name={props.iconName} size={20} color="#fff" style={{marginRight:10}} />
                    <View style={{ marginRight:wp( 5) }}>
                        <Image source={props.iconName} style={{ width:16, height: 21 }} resizeMode={"contain"}></Image>
                    </View>
                }
                <Text style={{
                    color: props.TextColor ? props.TextColor : "#fff",
                    fontWeight: props.fontWeight ? props.fontWeight : "normal", textAlign: "center",
                    fontSize: props.fontSize ? props.fontSize : 16,
                    marginLeft: props.textMarginLeft ? props.textMarginLeft : 0,
                    fontFamily: props.fontFamily ? props.fontFamily : fonts.Poppins_Medium,
                }}>{props.Text}</Text>
            </Pressable>
        </View>
    )
}
export default Button;
const styles = StyleSheet.create({
    ButtonStyle: {
        justifyContent: "center", alignItems: "center", flexDirection: "row"
    }
})

// {
//     marginTop: props.marginTop ? props.marginTop : 0,
//     backgroundColor: props.color ? props.color : Colors.white,
//     props.style
// }