import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { fromJS } from 'immutable';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ToastBannerProvider,
  ToastBannerPresenter
} from 'react-native-toast-banner';
import { Notifications } from 'expo';

import { I18n } from 'components';
import { LOAD_LOCAL_STORAGE } from 'redux/constants';
import configureStore from 'redux/store';
import Router from 'router';

import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';

const initialState = fromJS({});
const store = configureStore(initialState);

class App extends Component {
  state = { loaded: false };

  async componentDidMount() {
    // This is the initial work to sync with local storage;
    const allKeys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(allKeys);
    global.localStorage = {};
    allData.forEach(([key, value]) => {
      global.localStorage[key] = JSON.parse(value || '{}').data;
    });
    store.dispatch({
      type: LOAD_LOCAL_STORAGE
    });

    // Custome Font Load
    await Font.loadAsync({
      'Raleway-Black': require('assets/fonts/Raleway-Black.ttf'),
      'Raleway-Bold': require('assets/fonts/Raleway-Bold.ttf'),
      'Raleway-Medium': require('assets/fonts/Raleway-Medium.ttf'),
      'Raleway-Regular': require('assets/fonts/Raleway-Regular.ttf'),
      'Raleway-SemiBold': require('assets/fonts/Raleway-SemiBold.ttf'),
      'Raleway-Thin': require('assets/fonts/Raleway-Thin.ttf'),
      'Raleway-Italic': require('assets/fonts/Raleway-Italic.ttf')
    });

    this.setState({ loaded: true });

    // push notification
    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentWillUnmount() {
    if (this._notificationSubscription) {
      Notifications.removeListener(this._handleNotification);
    }
  }

  _handleNotification = notification => {
    // do whatever you want to do with the notification
    this.setState({ notification });
  };

  render() {
    const { loaded, notification } = this.state;
    console.log('====>push notification', notification);

    if (!loaded) return null;
    return (
      <Provider store={store}>
        <I18n>
          <SafeAreaProvider>
            <ToastBannerProvider>
              <Router />
              <ToastBannerPresenter />
            </ToastBannerProvider>
          </SafeAreaProvider>
        </I18n>
      </Provider>
    );
  }
}

export default App;
