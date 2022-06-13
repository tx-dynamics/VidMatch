import React, { useEffect } from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../authScreens/Splash/Splash';
import Login from '../authScreens/Login';
import SignUp from "./SignUp";
import SignUpModal from "./SignUp/SignUpModal";
import AskPaymentOption from "../appScreens/PaymentScreens/AskPaymentOption";
import ElsePayment from "../appScreens/PaymentScreens/ElsePayment";
import Payment from "../appScreens/PaymentScreens/Payment";
import Premium from "../appScreens/PaymentScreens/Premium";
import ForgotPassword from "./Forgot/ForgotPassword";
import { setSplash } from "../../redux/actions/authAction";
import {useSelector} from 'react-redux'


const AuthStack = createNativeStackNavigator()

const SplashNavigator = () => {

    const chkSplash = useSelector((state) => state.auth.splash)

    return (
        <AuthStack.Navigator
        initialRouteName= {chkSplash ? "Login" : "Splash"}
        screenOptions = {{
            headerShown: false
        }}>
            <AuthStack.Screen name ="Splash" component={Splash}/>
            <AuthStack.Screen name ="Login" component={Login}/>
            <AuthStack.Screen name ="SignUp" component={SignUp }/>
            <AuthStack.Screen name ="SignUpModal" component={SignUpModal}/>
            <AuthStack.Screen name ="AskPaymentOption" component={AskPaymentOption}/>
            <AuthStack.Screen name ="ElsePayment" component={ElsePayment}/>
            <AuthStack.Screen name ="Payment" component={Payment}/>
            <AuthStack.Screen name ="Premium" component={Premium}/>
            <AuthStack.Screen name ="ForgotPassword" component={ForgotPassword} />

            
        </AuthStack.Navigator>
    )
}

const AuthNavigator = () => {  

         return <SplashNavigator />
     
    
    
}

export default AuthNavigator