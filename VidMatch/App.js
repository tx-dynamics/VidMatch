import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/Main';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {useSelector} from 'react-redux'

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
      {/* <SafeAreaView  style={{ flex: 1,}}> */}
      <Main />
      {/* </SafeAreaView> */}
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
