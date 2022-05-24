import {StyleSheet, Text, View} from 'react-native';

import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colorScheme} from '../../globalStyle/colorScheme';
import HeaderChart from '../../components/Header/HeaderChart';
import TextInputArea from '../../components/TextInputArea';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {addToArray, getData} from '../firbase/utility';

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);
  const [friendID, setFriendID] = useState('0f2fertj');
  const [currentUser, SetCurrentUser] = useState('');
  const [isConnected, SetIsConnected] = useState('');

  const uid = 'MwvuOKMcLVTr4aQpljo2rhoApc43';
  const user = auth().currentUser;

  // const getMessages = async () => {
  //   let dat = await firestore()
  //     .collection('chats')
  //     .doc(auth().currentUser.uid)
  //     .onSnapshot(async doc => {
  //       that.setState({messages: doc.data()[this.state.friendID].reverse()});
  //     });
  //   //console.log('OK OK', this.state.messages);
  // };

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  // const onSend = messageArry => {
  //   const msg = messageArry[0];
  //   const mymsg = {
  //     ...msg,
  //     sendBy: auth().currentUser.uid,
  //     sendTo: friendUid,
  //     createdAt: firestore.FieldValue.serverTimestamp(),
  //   };
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
  //   const unsubscribe = firestore()
  //     .collection('chatrooms')
  //     .doc(friendUid)
  //     .add(...mymsg);
  //   // .then(console.log('add'));
  //   return unsubscribe;
  // };
  // const getAllMessages = async () => {
  //   const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
  //   const querySanp = await firestore()
  //     .collection('chatrooms')
  //     .doc(uid)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc')
  //     .get();
  //   const allmsg = querySanp.docs.map(docSanp => {
  //     return {
  //       ...docSanp.data(),
  //       createdAt: docSanp.data().createdAt.toDate(),
  //     };
  //   });
  //   setMessages(allmsg);
  // };

  // useEffect(() => {
  //   getAllMessages;
  // }, []);

  useEffect(() => {
    getMessages();
    // getAllMessages()
    // const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    // const messageRef = firestore()
    //   .collection('chatrooms')
    //   .doc(docid)
    //   .collection('messages')
    //   .orderBy('createdAt', 'desc');
    // const unSubscribe = messageRef.onSnapshot(querySnap => {
    //   const allmsg = querySnap.docs.map(docSanp => {
    //     const data = docSanp.data();
    //     if (data.createdAt) {
    //       return {
    //         ...docSanp.data(),
    //         createdAt: docSanp.data().createdAt.toDate(),
    //       };
    //     } else {
    //       return {
    //         ...docSanp.data(),
    //         createdAt: new Date(),
    //       };
    //     }
    //   });
    //   setMessages(allmsg);
    // });
    // return () => {
    //   unSubscribe();
    // };
  }, []);

  // const onSend = messageArray => {
  //   const msg = messageArray[0];
  //   const mymsg = {
  //     ...msg,
  //     sentBy: user.uid,
  //     sentTo: uid,
  //     createdAt: new Date(),
  //   };
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
  //   const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;

  //   firestore()
  //     .collection('chatrooms')
  //     .doc(docid)
  //     .collection('message')
  //     .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  // };
  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);
  const getMessages = async () => {
    let messages = await getData(
      'chats',
      auth().currentUser.uid,
      'J5YGWtgBWPRwx16KfVoblp6zMM73',
    );
    if (messages) {
      await setMessages(messages);
    } else {
      return 0;
    }

    await firestore()
      .collection('chats')
      .doc(auth().currentUser.uid)
      .onSnapshot(async doc => {
        setMessages(doc.data()['J5YGWtgBWPRwx16KfVoblp6zMM73'].reverse());
      });
    //console.log('OK OK', this.state.messages);
  };

  const onSend = async (messages = []) => {
    const msg = messages[0];

    setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
    // setMessages(previousState =>
    //   GiftedChat.append(previousState.messages, messages),
    // );

    messages[0].createdAt = Date.parse(messages[0].createdAt);
    //messages[0].unssen = true;
    await addToArray(
      'chats',
      auth().currentUser.uid,
      'J5YGWtgBWPRwx16KfVoblp6zMM73',
      messages[0],
    );
    messages[0].user._id = 2;
    await addToArray(
      'chats',
      'J5YGWtgBWPRwx16KfVoblp6zMM73',
      auth().currentUser.uid,
      messages[0],
    );
    messages[0].user._id = 1;
  };

  return (
    <View
      style={{
        backgroundColor: colorScheme.backGroundColor,
        flex: 1,
      }}>
      <HeaderChart
        text="Chat"
        onPress={() => navigation.navigate('ContactUs')}
      />

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: colorScheme.brownColor,
                },
                left: {
                  backgroundColor: '#fff',
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{borderTopWidth: 1.5, borderTopColor: 'green'}}
              textInputStyle={{color: 'black'}}
            />
          );
        }}
      />
      {/* <ChatLeft text="Hello Mam, How are You!" />
        <ChatRight text="I’m fine how about you? What are you doing?" />
        <ChatLeft text="So what’s the plan for today" />
        <View style={{paddingHorizontal: wp(6)}}>
          <View style={styles.ellipseContainer}>
            <Ellipse style="#771414" />
            <Ellipse style="#eeee" />
            <Ellipse style="#771414" />
          </View>
        </View> */}
      {/* <View style={styles.messageTypePostion}>
          <TextInputArea
            source={require('../../assets/icons/cam.png')}
            styleM={{right: wp(2)}}
            style1={{width: 25, height: 25, paddingHorizontal: wp(20)}}
            backGroundColor={{
              backgroundColor: '#fff',
              borderColor: '#fff',
              width: wp(90),
              elevation: 3,
            }}
            arrowsource={require('../../assets/icons/send-message.png')}
            placeholder="Message..."
            placeholderTextColor="#514f4f"
          />
        </View> */}
    </View>
  );
};

const Ellipse = ({style}) => {
  return <View style={[styles.ellipse, {backgroundColor: style}]}></View>;
};

const ChatLeft = ({text}) => {
  return (
    <View style={styles.chatLeftContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.chatText}>{text}</Text>
        <Text style={styles.timeText}>8 min ago</Text>
      </View>
    </View>
  );
};

const ChatRight = ({text}) => {
  return (
    <View style={styles.chatRightContainer}>
      <View style={styles.textContainerRight}>
        <Text style={styles.chatTextRight}>{text}</Text>
        <Text style={styles.timeTextRight}>8 min ago</Text>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chatLeftContainer: {
    paddingHorizontal: hp(3),
    paddingVertical: hp(2.6),
    alignSelf: 'flex-start',
  },
  chatRightContainer: {
    paddingHorizontal: hp(3),
    paddingVertical: hp(2.6),
    alignSelf: 'flex-end',
  },
  textContainer: {
    width: wp(60),
    height: hp(10),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
  },
  textContainerRight: {
    width: wp(60),
    height: hp(12),
    backgroundColor: colorScheme.brownColor,
    borderRadius: 10,
    elevation: 2,
  },
  chatText: {
    paddingHorizontal: wp(3),
    color: '#000',
    paddingVertical: hp(1),
  },
  chatTextRight: {
    paddingHorizontal: wp(3),
    color: '#ffffff',
    paddingVertical: hp(1),
  },
  timeText: {
    color: '#bababa',
    position: 'absolute',
    right: 5,
    bottom: 5,
    fontSize: 12,
  },
  timeTextRight: {
    color: '#ffffff',
    position: 'absolute',
    right: 5,
    bottom: 5,
    fontSize: 12,
  },
  ellipseContainer: {
    width: wp(25),
    height: hp(6),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
    marginVertical: 10,
  },
  ellipse: {
    width: 10,
    height: 10,
    backgroundColor: colorScheme.brownColor,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
  messageTypePostion: {
    // position: 'absolute',

    // bottom: 20,
    // alignSelf: 'flex-start',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginTop: hp(20),
  },
});
