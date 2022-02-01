import React, { useEffect } from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../authScreens/Splash/Splash';
import Login from '../authScreens/Login';

const AuthStack = createNativeStackNavigator()


const SplashNavigator = () => {
    return (
        <AuthStack.Navigator
        screenOptions = {{
            headerShown: false
        }}>
            <AuthStack.Screen name ="Splash" component={Splash}/>
            <AuthStack.Screen name ="Login" component={Login}/>
            
        </AuthStack.Navigator>
    )
}

const AuthNavigator = () => {  

         return <SplashNavigator />
     
    
    
}

export default AuthNavigator