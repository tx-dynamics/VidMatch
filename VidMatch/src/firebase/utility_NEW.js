// import firebase from 'react-native-firebase';
// import { _storeData } from "../../backend/AsyncFuncs";
import storage from '@react-native-firebase/storage';
let currentUserId = '';
//import firebase from 'firebase';
//import 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import {_storeData} from '../../Backend/AsyncStore/AsyncFunc';
//import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import uuid from 'uuid';
export async function connectFirebase() {
  //   // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyD7TV8g5zs-GTnyG9TsO7naN_sXxDGD5io',
    authDomain: 'react-native-community-tag.firebaseapp.com',
    databaseURL: 'https://react-native-community-tag.firebaseio.com',
    projectId: 'react-native-community-tag',
    storageBucket: 'react-native-community-tag.appspot.com',
    messagingSenderId: '890901296597',
    appId: '1:890901296597:web:a0b995011929c7d925395c',
    measurementId: 'G-15CGYGCB16',
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    console.log('ok ok ');
  }
}
export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .get();

  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function saveDataWithoutDocId(collection, jsonObject) {
  let upload = await firestore()
    .collection(collection)
    .doc()
    .set(jsonObject);
  return upload;
}

export async function saveData(collection, doc, jsonObject) {
  await 
    firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .then(function() {
      async () => {
        console.log('Document successfully written!');
        return true;
      };
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
}

export async function deleteData(collection, doc) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .delete()
    .then(function() {
      async () => {
        console.log('Document successfully deleted');
        return true;
      };
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
} 
export async function upDateData(collection, doc, jsonObject) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .update(jsonObject)
    .then(async () => {
      console.log('Document successfully written!');
      return true;
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
}

export async function saveInitialData(collection, userId) {
 await firestore()
    .collection(collection)
    .doc(userId)
    .set({userdocc: 'Me'})
    .then(function() {
      // alert("Data saved succesfuly");
    })
    .catch(function(error) {
      alert(error);
    });
}
export async function saveInitialCommentsData(collection, userId) {
 await firestore()
    .collection(collection)
    .doc(userId)
    .set({comments: []})
    .then(function() {
      // alert("Data saved succesfuly");
    })
    .catch(function(error) {
      alert(error);
    });
}

//Save coordinates of collector to firestore
export async function saveCoordinates(collection, doc, jsonObject) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set({jsonObject})
    .then(function() {
      console.log('Coordinates saved successfuly');
    })
    .catch({
      function(error) {
        console.log('Failed to save coordinates: ', error);
      },
    });
}

export async function addToArray(collection, doc, array, value) {
  await 
    firestore()
    .collection(collection)
    .doc(doc)
    .update({
      [array]: firestore.FieldValue.arrayUnion(value),
    });
}
export async function deleteArray(collection, doc, array, index) {
  let docRef = await firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firestore.FieldValue.arrayRemove(
        docData.data()[array][index],
      ),
    });
  }
}

export async function updateData(collection, doc, array, value) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .update({
      [array]: value,
    });
}

export async function updatePointsData(collection, doc, value) {
 await firestore()
    .collection(collection)
    .doc(doc)
    .update(value);
}
export async function uploadImage(uri) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref =  storage()
      .ref('profile')
      .child(uuid.v4());
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {},
        err => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  } 
}
export async function uploadProductImage(uri) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage()
      .ref('products')
      .child(uuid.v4());
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {},
        err => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
}

export async function uploadImage1(folder, imageName, imageBase64) {
  var storageRef = firebase.storage().ref();
  var pathRef = storageRef.child(folder + '/' + imageName);
  var metadata = {
    contentType: 'image/jpeg',
  };

  let uploadTask = pathRef.putString(imageBase64, 'base64', metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    async snapshot => {
      var progress = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(2);
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    },
    async error => {
      console.log(error);
    },
    async () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
        console.log('File available at', downloadURL);
        // return downloadURL;
        // var listings = firebase.firestore().collection('users');
        // console.log(listings);
        // let querySnapshot = listings.where('image', '==', 'imageName').get();
        // querySnapshot.forEach(async doc => {
        //   if (doc.exists) {
        //     console.log(doc.data());

        //     console.log(listings);
        //     console.log(doc);
        //     doc.update({image: downloadURL});
        //   } else {
        //     console.log('No document found!');
        // }
        //});
      });
    },
  );
}

export async function downloadImage(folder, imageName) {
  var storageRef = firebase.storage().ref();
  var pathRef = storageRef.child(folder + '/' + imageName);

  let url = await pathRef.getDownloadURL();
  return url;
}

// export async function uploadUserImage(
//   imgUri,
//   //  mime = 'video/mp4',
//   mime = 'image/jpeg',
//   imagePath,
//   name,
//   databaseCollection,
//   docRef,
// ) {
//   const Blob = RNFetchBlob.polyfill.Blob;
//   const fs = RNFetchBlob.fs;

//   //keep reference to original value
//   const originalXMLHttpRequest = window.XMLHttpRequest;
//   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
//   window.Blob = Blob;

//   const uploadUri =
//     Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
//   const imageRef = firebase.storage().ref(imagePath);

//   let readingFile = await fs.readFile(uploadUri, 'base64');
//   let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

//   let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

//   let progress = 0;
//   //Listen for state changes, errors, and completion of the upload.
//   uploadTask.on(
//     firebase.storage.TaskEvent.STATE_CHANGED,
//     snapshot => {
//       console.log('Bytes transferred ' + snapshot.bytesTransferred);
//       console.log('Total bytes ' + snapshot.totalBytes);
//       // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
//       if (progress < 30) progress += 10;
//       else if (progress >= 30) progress += 5;
//       else if (progress >= 85) progress += 1;
//       else if (progress >= 95) progress += 0.1;

//       _storeData(
//         // GlobalConst.STORAGE_KEYS.imageUploadProgress,
//         progress.toString(),
//       );
//       switch (snapshot.state) {
//         case firebase.storage.TaskState.PAUSED:
//           console.log('Upload is paused');
//           break;
//         case firebase.storage.TaskState.RUNNING:
//           console.log('Upload is running');
//           break;
//       }
//     },
//     error => {
//       console.log(error);
//       _storeData('imageUploadProgress', '-1').then(() => {
//         return 0;
//       });
//     },
//     () => {
//       window.XMLHttpRequest = originalXMLHttpRequest;
//       // Upload completed successfully, now we can get the download URL
//       uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
//         await firebase
//           .firestore()
//           .collection(databaseCollection)
//           .doc(docRef)
//           .update({profile_picture: downloadURL})
//           // .then(async()=>)
//           // await saveData(databaseCollection, docRef, {
//           //   profile_picture: downloadURL,
//           // })
//           .then(() => {
//             _storeData('imageUploadProgress', '100');
//           });
//       });
//     },
//   );
// }
