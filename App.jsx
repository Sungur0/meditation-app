import { Text, View, StatusBar } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigators/RootNavigator'
import { Provider } from 'react-redux';
import store from './src/store';
import { useFonts } from "expo-font";
import fonts from './src/fonts/font';
import { DataProvider } from './src/context/DataContext';
import { AudioProvider } from './src/context/AudioContext';
export default function App() {

  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <Provider store={store}>
      <DataProvider>
        <AudioProvider>
          <View style={{ flex: 1 }}>
            <RootNavigator />
            <StatusBar style='light' animated={true} blur={true} />
          </View>
        </AudioProvider>
      </DataProvider>
    </Provider>
  )
}
