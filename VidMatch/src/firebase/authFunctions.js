import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import {saveData} from './utility';



// export async function signUp(
//     firstName,
//     email,
//     password,
//     toggleCheckBox,
//     ...props
//   )
  
//   {
//     let success = true;
    
//     await auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(async user => {
//         let Details = {
//           email: email,
//           fullName: firstName,
//           isBlocked: toggleCheckBox,
//         };
//         console.log(
//             email,
//             firstName,
//             toggleCheckBox,
//         )
//         // await saveData('users', user.user.uid, Details);
//         // await saveInitialData('chats', user.user.uid);
//         // var user= auth().currentUser;
//         // user.sendEmailVerification().then(function(){
//         //   Alert.alert("Verification Email is sent.! please verify your email before sign in");
//         // }).catch(function(error){
  
//         // });
//          console.log(user);
//         Alert.alert('Account Created!');
//          props.navigation.navigate("Login")
//       })
//       .catch(function(error) {
//         success = false;
//         console.log(error.code + ':: ' + error.message);
//         Alert.alert(error.code + ':: ' + error.message);
//       });
//     return success;
//   }