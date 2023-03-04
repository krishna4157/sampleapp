/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import MainApp from './MainApp';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MainApp />
      </SafeAreaView>
    </>
  );
}

export default App;
