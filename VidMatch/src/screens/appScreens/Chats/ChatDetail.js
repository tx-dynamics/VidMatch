import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import Apptext from '../../../components/Apptext';
import DefaultStyles from "../../../config/Styles";
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ChatDetailComp from '../../../components/ChatDetailComp';
import HumanHeader from '../../../components/HumanHeader';
import { getData, addToArrays, upDateData, saveData, saveInitialChat } from '../../../firebase/utility';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';


const ChatDetail = ({ navigation, route }) => {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            count: "+5",
            label: "Alex Mintz",
            msg: "Lorem ipsum",
            Img: require("../../../../assets/boy1.png"),
            dt: "5 minutes ago",
            move: "Detail"
        },


    ];
    ///////////////////////////////////////////////////////////////////////////////////////////

    const items = route.params.items;
    const [messages, setMessages] = useState([]);
    const [isTxt, setTxt] = useState([]);
    console.log("Rcvd", items)
    var userInfo = auth().currentUser;
    console.log("Crnt USer", userInfo.uid)


    const getMessages = async () => {
        let messages = await getData(
            'Chats',
            auth().currentUser.uid,
            items.FrndUid,
        );
        if (messages) {
            await setMessages(messages);
        } else {
            return 0;
        }

        await firestore()
            .collection('Chats')
            .doc(auth().currentUser.uid)
            .onSnapshot(async doc => {
                setMessages(doc.data()[items.FrndUid].reverse());
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
        await addToArrays(
            'Chats',
            auth().currentUser.uid,
            items.FrndUid,
            messages[0],
        );
        messages[0].user._id = 2;
        await addToArrays(
            'Chats',
            items.FrndUid,
            auth().currentUser.uid,
            messages[0],
        );
        messages[0].user._id = 1;
    };

    const chkFrndExist = async() => {
    const userInfo = auth().currentUser;
    let chats = await getData('Chats', items.FrndUid);
    console.log("chats", chats)
    if (chats === false) {
        console.log("Chat Undefined")
        await saveInitialChat('Chats', items.FrndUid)
    }
    else {
        console.log("Ok to go Chat ")
    }
}

    useEffect(() => {
        getMessages()
        chkFrndExist()
    }, []);

    // const getMessages = async () => {
    //     var userInfo = auth().currentUser;
    //     let messages = await getData(
    //         'Chats',
    //         userInfo.uid,
    //         items.uid,
    //     );
    //     if (messages) {
    //         //   await this.setState({ messages: messages });
    //         setMessages(messages)
    //     } else {
    //         return 0;
    //     }
    //     // let that = this;

    //     await firestore()
    //         .collection('Chats')
    //         .doc(userInfo.uid)
    //         .onSnapshot(async doc => {
    //             setMessages(doc.data()[items.uid].reverse())
    //             // that.setState({ messages: doc.data()[this.state.friendID].reverse() });
    //         });
    //     //console.log('OK OK', this.state.messages);
    // };

    // const onSend = async (messages = []) => {
    //     var userInfo = auth().currentUser;

    //     //   this.setState(previousState => ({
    //     //     messages: GiftedChat.append(previousState.messages, messages),
    //     //   }));
    //     messages[0].createdAt = Date.parse(messages[0].createdAt);
    //     //messages[0].unssen = true;
    //     await addToArrays(
    //         'Chats',
    //         userInfo.uid,
    //         items.uid,
    //         messages[0],
    //     );
    //     messages[0].user._id = 2;
    //     await addToArrays(
    //         'Chats',
    //         items.uid,
    //         userInfo.uid,
    //         messages[0],
    //     );
    //     //   await saveData('notifications', items.uid, {
    //     //     createdAt: messages[0].createdAt,
    //     //     text: messages[0].text,
    //     //     _id: messages[0].user._id,
    //     //     senderId: userInfo.uid,
    //     //     reciverId: items.uid
    //     //   })
    //     messages[0].user._id = 1;

    //     await upDateData('Chats', items.uid, {
    //         unseen: true,
    //     });
    //     await addToArrays(
    //         'Chats',
    //         items.uid,
    //         'userids',
    //         userInfo.uid,
    //     );

    //     await addToArrays(
    //         'Users',
    //         userInfo.uid,
    //         'chatted',
    //         items.uid,
    //     );
    //     await addToArrays(
    //         'Users',
    //         items.uid,
    //         'chatted', //array name
    //         userInfo.uid,
    //     );
    // }


    const renderSend = props => {
        return (
          <Send {...props}>
            <View
            style={{
             backgroundColor:DefaultStyles.colors.lightBlue,
             width:40, height:40,borderRadius:10,
            //  marginBottom:3,
             marginHorizontal:5,
             alignItems:'center', justifyContent:'center' }}>
            <Image
              resizeMode="contain"
              style={{
            //   tintColor:DefaultStyles.colors.lightBlue,
              width: wp(15), height: hp(3.7)
            }}
              source={require('../../../../assets/sendBtn.png')}
            />
            </View>
          </Send>
        );
      };


    return (
        <View style={[DefaultStyles.container, { flex: 1, }]}>
            <HumanHeader
                leftImgName={require('../../../../assets/arrow-back.png')}
                centerImg={items.thumbnail ? { uri: items.thumbnail } : require('../../../../assets/empty-img.jpg')}
                headerLabel={items?.displayName.length >= 20 ? items.displayName.substring(0,13) + "..." : items?.displayName }
                rightImg={require('../../../../assets/videoChat.png')}
                phoneImg={require('../../../../assets/ChatPhone.png')}
                menuImg={require('../../../../assets/menu.png')}
                backgroundColor={"white"}
                onPressLeft={() => navigation.goBack()}
            />

            <GiftedChat
                messages={messages}
                alwaysShowSend={true}
                onSend={messages => onSend(messages)}
                renderSend={renderSend}
                user={{
                    _id: 1,
                }}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                    paddingRight:10,
                                    paddingTop:5,
                                    paddingLeft:10,
                                    backgroundColor: DefaultStyles.colors.lightBlue,
                                    marginBottom:20
                                },
                                left: {
                                    backgroundColor: '#fff',
                                    paddingRight:10,
                                    paddingTop:5,
                                    paddingLeft:10,
                                    marginBottom:20
                                },
                            }}
                        />
                    );
                }}
                renderInputToolbar={props => {
                    return (
                        <InputToolbar
                            {...props}
                            containerStyle={{
                            marginLeft:wp('7%'),borderRadius:10,
                            maxWidth:'94%',alignSelf:'center',
                            padding:4, 
                            backgroundColor:'#D8D8D8', }}
                            textInputStyle={{ color: 'black' }}
                        />
                    );
                }}
            />
            <View style={{height:wp('3%')}}>
            </View>
            {/* <ScrollView>
                <GiftedChat
                    messages={messages}
                    isAnimated={true}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                <View style={{ marginTop: wp('25%') }} >
                    <FlatList
                        data={DATA}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={() => {
                            return (
                                <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                                    No Item Found
                                </Apptext>
                            );
                        }}
                        renderItem={({ item, index }) => (
                            <ChatDetailComp
                                label="You"
                                msg={"Hi lucy! how,s your day going"}

                            />

                        )}
                    />
                    <View style={styles.PicMainView}>
                        <View>
                            <Apptext style={styles.labelTxt}>{"Ali Nawaz"}</Apptext>
                        </View>
                        <View style={styles.msgView}>
                            <Apptext style={styles.msgTxt} >Hi lucy! how,s your day going </Apptext>
                        </View>

                    </View>
                    <FlatList
                        data={DATA}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={() => {
                            return (
                                <Apptext style={{ alignSelf: "center", marginTop: 50 }}>
                                    No Item Found
                                </Apptext>
                            );
                        }}
                        renderItem={({ item, index }) => (
                            <ChatDetailComp
                                label="You"
                                msg={"Do you want Startucks?"}
                            />

                        )}
                    />
                    <View style={styles.PicMainView}>
                        <View>
                            <Apptext style={styles.labelTxt}>{"Ali Nawaz"}</Apptext>
                        </View>
                        <View style={styles.msgView}>
                            <Apptext style={styles.msgTxt} >Would be awesome! </Apptext>
                        </View>

                    </View>
                </View>



            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                style={{
                    width: '100%', flexDirection: 'row',
                    borderTopColor: '#F5F5F5', borderTopWidth: 1
                }}>

                <View style={styles.ChatMsgView} >
                    <TextInput
                        onChangeText={(val) => {
                            console.log(val)
                            setTxt(val)
                        }}
                        // value={"input"}
                        placeholder="Type Messages"
                        style={{
                            height: wp('14%'),
                            paddingLeft: wp('5%')
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => { onSend(isTxt) }}
                        style={styles.ChatSndMsgBtn}>
                        <Image source={require('../../../../assets/sendBtn.png')} />
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView> */}
        </View>
        // </View>
    )
}

export default ChatDetail;


const styles = StyleSheet.create({

    labelTxt: {

        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginTop: wp('1%'),
        marginHorizontal: wp('3%')
    },
    PicMainView: {
        marginBottom: wp('2%'),
        marginHorizontal: wp('25%')
    },
    msgView: {
        width: wp('70%'),
        borderRadius: 13,
        backgroundColor: "#2176ff",
        padding: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 3,
    },
    msgTxt: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: DefaultStyles.colors.white
    },
    ChatMsgView: {
        flexDirection: 'row',
        height: wp('14%'),
        marginTop: wp('2%'),
        justifyContent: 'space-between',
        width: wp('90%'),
        alignItems: 'center',
        // position: "absolute",
        // bottom: 0,
        backgroundColor: "#E3E3E3",
        borderRadius: 13,
        marginHorizontal: '5%',
        alignSelf: 'center',
        marginBottom: 10
    },
    ChatSndMsgBtn: {
        width: 40, height: 38,
        borderRadius: 6,
        marginHorizontal: wp('2%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2176ff'
    },

})