import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {ToastAndroid} from 'react-native';


export async function uploadImage(uri) {
  // console.log("Img Recvd", uri)
  // let reference = storage().ref(`/files/${imageName}`);         // 2
  // let task = reference.putFile(uri);               // 3
  // task.then(() => {                                 // 4
  //     console.log('Image uploaded to the bucket!');
  //     ToastAndroid.show("Image Uploaded Successfully", ToastAndroid.LONG);
     
  // }).catch((e) => 
  // {
  //   ToastAndroid.show(e, ToastAndroid.LONG);
  //   console.log('uploading image error => ', e)
  // }
  // );
  

}



export async function saveData(collection, doc, jsonObject) {
  firestore().collection(collection).doc(doc).set(jsonObject, { merge: true })
    .then(function () {
      async () => {
        console.log('Document successfully written!');
        return true;
      };
    })
    .catch(function (error) {
      console.log("received", collection, doc, jsonObject)
      console.error('Error writing document: ', error);

    });
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
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
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function getAllOfCollection(collection) {

  // let data = [];
  let data = "";

  // let querySnapshot = await firestore().collection(collection).get();
  let querySnapshot = await firestore().collection(collection).get();

  // console.log("QuerySnapshot", querySnapshot)
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      // data.push(doc.data());
      data = doc.data()
    } else {
      console.log('No document found!');
    }
  });
  // console.log(data);
  return data;
  // dispatch(setCover(data))
}

export async function getListing(collection, doc1) {
  // console.log(collection, doc1)
  let data = await firestore().collection(collection).doc(doc1).get().then(function (doc) {
    if (doc.exists) {
      return doc.data() ;
    } else {
      return false;
    }
  });
  return data;
}

export async function getFvrtsListing(collection, doc1) {

  console.log(collection, doc1)
  let data = [];
  await firestore().collection(collection).doc(doc1).get().then(function (doc) {
    if (doc.exists) {
     doc.data().media.forEach(function(doc) {
      data.push(doc)
     
      })
    } else {
      return false;
    }
  });
  return data;
}
export async function saveInitialData(collection, userId) {
  await firestore()
     .collection(collection)
     .doc(userId)
     .set({media:[]})
     .then(function() {
       // alert("Data saved succesfuly");
     })
     .catch(function(error) {
       alert(error);
     });
 }
 export async function saveInitialDates(collection, userId) {
  await firestore()
     .collection(collection)
     .doc(userId)
     .set({dates:[]})
     .then(function() {
       // alert("Data saved succesfuly");
     })
     .catch(function(error) {
       alert(error);
     });
 }
export async function getAllOptions(collection) {
  console.log(collection)
  let data = [];
  let querySnapshot = await firestore().collection(collection).get();
    // console.log("QuerySnapshot", querySnapshot)
  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data().pageHeading);
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export async function passwordReset(email) {
  return auth().sendPasswordResetEmail(email);
}

export async function saveFvrtsData(collection, doc, jsonObject, cond) {
  console.log("jsonObject",cond)
  
  if (cond == "update" ) {
    console.log("Update")
    console.log(jsonObject)
    await firestore().collection(collection)
      .doc(doc)
      .set({
        media: jsonObject,
       });
      // .update({
      //  media: firestore.FieldValue.arrayUnion(value),
      // });
  }
  else{
    console.log("Insert")
    firestore().collection(collection).doc(doc).set({media:firestore.FieldValue.arrayUnion(jsonObject)}, { merge: true })
    .then(function () {
      async () => {
        console.log('Document successfully written!');
        return true;
      };
    })
  }
  }

  
export async function addToArray(collection, doc,value) {
  // console.log(collection,doc,array,value)
      await firestore().collection(collection)
      .doc(doc)
      .update({
        media: firestore.FieldValue.arrayUnion(value),
      });
}
export async function removeToArray(collection, doc,value) {
  
  await firestore().collection(collection)
      .doc(doc)
      .update({
        media: firestore.FieldValue.arrayRemove(value),
      });
}
export async function saveFav(collection, doc, jsonObject) {
  await firestore().collection(collection).doc(doc).set({media: jsonObject})
    .then(function () {
      async () => {
      console.log("Document successfully written!");
      return true;
      };
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      return false;
    });
}