import React from 'react';
import {Image, StatusBar, StyleSheet, View, useColorScheme} from 'react-native';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BottomNavigationAccessoriesShowcase} from './components/BottomTabs';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <View style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <BottomNavigationAccessoriesShowcase />
          </NavigationContainer>
        </ApplicationProvider>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default App;
