import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AuthNavigator from '../screens/authScreens/authNavigator';
import DefaultStyles from "../config/Styles";


const Tab = createBottomTabNavigator();

const StackNavigator = createNativeStackNavigator()

const MainNavigator = () => {

    return <AuthNavigator />
}

export default MainNavigator;

const styles = StyleSheet.create({
    tabBox: {
        height: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('10%'),
        borderRadius: 20,
        backgroundColor: DefaultStyles.colors.primary
    },
    tabBox1: {
        height: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('10%'),
        borderRadius: 20,
        backgroundColor: DefaultStyles.colors.secondary
    }
});