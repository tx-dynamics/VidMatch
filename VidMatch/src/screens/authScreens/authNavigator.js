import React, { useEffect } from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../authScreens/Splash/Splash';
import Login from '../authScreens/Login';
import SignUp from "./SignUp";
import Home from '../appScreens/Home';
import Chats from "../appScreens/Chats";

const AuthStack = createNativeStackNavigator()


const SplashNavigator = () => {
    return (
        <AuthStack.Navigator
        screenOptions = {{
            headerShown: false
        }}>
            <AuthStack.Screen name ="Splash" component={Splash}/>
            <AuthStack.Screen name ="Login" component={Login}/>
            <AuthStack.Screen name ="SignUp" component={SignUp }/>
            <AuthStack.Screen name ="Home" component={Home}/>
            <AuthStack.Screen name ="Chats" component={Chats}/>
            
        </AuthStack.Navigator>
    )
}

const AuthNavigator = () => {  

         return <SplashNavigator />
     
    
    
}

export default AuthNavigator