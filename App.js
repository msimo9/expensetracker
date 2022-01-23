import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainStackNavigator from './navigation/AppNavigation';

import {Provider as StateProvider} from 'react-redux'
import store from './redux/store';

import { AppRegistry, Platform } from 'react-native';

AppRegistry.registerComponent('main', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication('main', { rootTag });
}

export default function App() {
  return(
    <StateProvider store={store}>
      <MainStackNavigator />
    </StateProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
