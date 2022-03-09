import { Notifications } from 'expo';
import { Alert, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';

export default async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    Alert.alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  if (token && token !== '') {
    AsyncStorage.setItem('pushToken', JSON.stringify({ token }));
    global.localStorage.pushToken = token;
  }
}
