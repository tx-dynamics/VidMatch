import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import Apptext from '../../../components/Apptext';
import DefaultStyles from "../../../config/Styles";
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ChatDetailComp from '../../../components/ChatDetailComp';
import HumanHeader from '../../../components/HumanHeader';


const ChatDetail = ({ navigation }) => {

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


    return (
        <View style={[DefaultStyles.container, { flex: 1, }]}>
                 <HumanHeader
                    leftImgName={require('../../../../assets/arrow-back.png')}
                    centerImg={require('../../../../assets/boy1.png')}
                    headerLabel={"Alex Mintz"}
                    rightImg={require('../../../../assets/videoChat.png')}
                    phoneImg={require('../../../../assets/ChatPhone.png')}
                    menuImg={require('../../../../assets/menu.png')}
                    backgroundColor={"white"}
                    onPressLeft={() => navigation.goBack()}
                />
            <ScrollView>
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
                        onChangeText={(val) => console.log(val)}
                        // value={"input"}
                        placeholder="Type Messages"
                        style={{
                            height:wp('14%'),
                            paddingLeft: wp('5%')
                        }}
                    />
                    <TouchableOpacity style={styles.ChatSndMsgBtn}>
                    <Image source={require('../../../../assets/sendBtn.png')} />
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </View>
        // </View>
    )
}

export default ChatDetail;


const styles = StyleSheet.create({

labelTxt:{

    fontFamily:'Poppins-Medium',
    fontSize: 12,
    marginTop: wp('1%'),
    marginHorizontal:wp('3%')
    },
    PicMainView:{
        marginBottom:wp('2%'),
        marginHorizontal:wp('25%') 
    },
    msgView:{
        width:wp('70%'),
        borderRadius:13,
        backgroundColor:"#2176ff",
        padding:13,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 3,
    },
    msgTxt:{
        fontFamily:'Poppins-Regular',
        fontSize:13,
        color:DefaultStyles.colors.white
    },
    ChatMsgView: {
        flexDirection: 'row',
        height:wp('14%') ,
        marginTop:wp('2%'),
        justifyContent: 'space-between',
        width: wp('90%'),
        alignItems:'center',
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
        marginHorizontal:wp('2%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2176ff'
      },

})