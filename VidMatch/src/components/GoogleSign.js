import { GoogleSignin } from 'react-native-google-signin';

const GoogleSign = async () => {
    GoogleSignin.configure({
        // scopes: ['email'],
        // webClientId: '805650303290-i4a1etekjp6d67eckj5ncujm6adpn8kd.apps.googleusercontent.com',
        webClientId: '805650303290-3p40tii9uva8csviuut6sid9rii959lm.apps.googleusercontent.com',
        offlineAccess: true,
        
    })
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        if (userInfo !== "") {
            return  userInfo ;
        }
    } catch (error) {
        return { "Error": { error } }
    }
}

export default GoogleSign;