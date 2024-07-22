import { Text, View, StatusBar } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigators/RootNavigator'
import { Provider } from 'react-redux';
import store from './src/store';
import { useFonts } from "expo-font";
import fonts from './src/fonts/font';
import { DataProvider } from './src/context/DataContext2';
import { DataProvider1 } from './src/context/DataContext1';
import { AudioProvider } from './src/context/AudioContext';
export default function App() {

  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <Provider store={store}>
      <DataProvider>
        <DataProvider1>

          <AudioProvider>
            <View style={{ flex: 1 }}>
              <RootNavigator />
              <StatusBar style='light' animated={true} blur={true} />
            </View>
          </AudioProvider>
        </DataProvider1>

      </DataProvider>
    </Provider>
  )
}
