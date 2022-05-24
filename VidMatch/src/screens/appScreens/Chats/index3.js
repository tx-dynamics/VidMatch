import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
//import AsyncStorage from '@react-native-community/async-storage';
import {
  getData,
  addToArray,
  saveData,
  getAllOfCollection,
  upDateData,
  deleteArray,
} from '../../components/AccountSetting/utility';
import NetInfo from "@react-native-community/netinfo";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';
export default class ChatDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // Create and Reset initial State Longitude (lng) and Latitude (lat)
    this.state = {
      data: null,
      friendID: this.props.navigation.state.params.id,
      friendName: 'Product Owner',
      current_user: '',
      messages: [],
      isConnected: '',
    };
  }
  CheckConnectivity = async () => {
    const unsubscribe = NetInfo.addEventListener(internet => {
      this.setState({
        isConnected: internet.isInternetReachable
      })
      console.log("isInternetReachable", internet.isInternetReachable);

    });
  };
  componentDidMount = async () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    await this.CheckConnectivity()
    const { navigation } = this.props;

    let userId = await AsyncStorage.getItem('Token');

    await this.setState({
      current_user: userId,
    });
    await this.getMessages();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      this._handleStateChange();
    });


    let unseenCheck = await getData('chats', this.state.current_user);
    if (unseenCheck.unseen) {
      console.log('OK i m in ');
      await upDateData('chats', this.state.current_user, {
        unseen: false,
      });

    }
    if (unseenCheck.userids) {
      await deleteArray('chats', this.state.current_user, 'userids', 0);
    }
  
  };

  componentWillMount = async () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };
  handleBackButtonClick() {
    //this.props.navigation.navigate('Chat');
    this.props.navigation.pop();
    return true;
  }
  getMessages = async () => {
    let messages = await getData(
      'chats',
      this.state.current_user,
      this.state.friendID,
    );

    if (messages) {
      await this.setState({ messages: messages });
    } else {
      return 0;
    }
    let that = this;

    await firestore()
      .collection('chats')
      .doc(this.state.current_user)
      .onSnapshot(async doc => {
        that.setState({ messages: doc.data()[this.state.friendID].reverse() });
      });
    //console.log('OK OK', this.state.messages);
  };
  async onSend(messages = []) {
    if (this.state.isConnected) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      messages[0].createdAt = Date.parse(messages[0].createdAt);
      //messages[0].unssen = true;
      await addToArray(
        'chats',
        this.state.current_user,
        this.state.friendID,
        messages[0],
      );
      messages[0].user._id = 2;
      await addToArray(
        'chats',
        this.state.friendID,
        this.state.current_user,
        messages[0],
      );
      await saveData('notifications', this.state.friendID, {
        createdAt: messages[0].createdAt,
        text: messages[0].text,
        _id: messages[0].user._id,
        senderId: this.state.current_user,
        reciverId: this.state.friendID
      })
      messages[0].user._id = 1;

      await upDateData('chats', this.state.friendID, {
        unseen: true,
      });
      await addToArray(
        'chats',
        this.state.friendID,
        'userids',
        this.state.current_user,
      );

      await addToArray(
        'users',
        this.state.current_user,
        'chatted',
        this.state.friendID,
      );
      await addToArray(
        'users',
        this.state.friendID,
        'chatted',
        this.state.current_user,
      );
    }
    else {
      ToastAndroid.show("To send a message please connected to internet", ToastAndroid.SHORT);

    }
  }

  render() {
    //console.log('this', this.state.current_user, this.state.friendID);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.welcome}>{this.state.friendName}</Text>
        <FA
          name="chevron-left"
          size={26}
          color={'#32cd32'}
          onPress={() => this.props.navigation.pop()}
          style={styles.menu}
        />
        {/* <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/85.jpg'}}
          style={styles.menu1}
        /> */}
        <GiftedChat
          messages={this.state.messages}
          isAnimated={true}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: 10,
    marginLeft: '85%',
    position: 'absolute',
  },
  menu: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: '4%',
    position: 'absolute',
  },
});
