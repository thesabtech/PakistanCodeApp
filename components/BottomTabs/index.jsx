import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import HomePage from '../../pages/HomePage';
import AlphabeticalOrder from '../../pages/AlphabeticalOrderPage';
import ChronoLogicalOrder from '../../pages/ChronologicalOrderPage';
import CategoryPage from '../../pages/CategoryPage';
import SingleLaw from '../SingleLaw';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchResults from '../SearchResults';
import Dropdown from '../Dropdown';
import PrivacyPolicy from '../PrivacyPolicy';

const HomeIcon = props => <Icon {...props} name="home-outline" />;
const AlphaIcon = props => <Icon {...props} name="archive-outline" />;
const ChronoIcon = props => <Icon {...props} name="calendar-outline" />;
const CategoryIcon = props => <Icon {...props} name="copy-outline" />;

const HomeStack = createStackNavigator();
const AlphaStack = createStackNavigator();
const ChronoStack = createStackNavigator();
const CategoryStack = createStackNavigator();

const CommonHeader = ({navigation}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    }}>
    <View style={{flex: 0.4, alignItems: 'flex-start'}}>
      <Text style={{textAlign: 'left'}}></Text>
    </View>
    <View style={{flex: 0.2, alignItems: 'center'}}>
      <Image
        source={require('../../assets/img/pakcodelogo.png')}
        style={{width: 30, height: 30}}
      />
    </View>
    <View style={{flex: 0.4, alignItems: 'flex-end'}}>
      <Dropdown navigation={navigation} />
    </View>
  </View>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Back"
      component={HomePage}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
    <HomeStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <HomeStack.Screen
      name="SingleLaw"
      component={SingleLaw}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
    <HomeStack.Screen
      name="SearchResults"
      component={SearchResults}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
  </HomeStack.Navigator>
);

const AlphaStackScreen = ({navigation}) => (
  <AlphaStack.Navigator>
    <AlphaStack.Screen
      name="Alphabetical Order"
      component={AlphabeticalOrder}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
    <AlphaStack.Screen
      name="SingleLawAlpha"
      component={SingleLaw}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
  </AlphaStack.Navigator>
);

const ChronoStackScreen = ({navigation}) => (
  <ChronoStack.Navigator>
    <ChronoStack.Screen
      name="ChronoPage"
      component={ChronoLogicalOrder}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
    <ChronoStack.Screen
      name="SingleLawChrono"
      component={SingleLaw}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
  </ChronoStack.Navigator>
);

const CategoryStackScreen = ({navigation}) => (
  <CategoryStack.Navigator>
    <CategoryStack.Screen
      name="CategoryPage"
      component={CategoryPage}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
    <CategoryStack.Screen
      name="SingleLawCategory"
      component={SingleLaw}
      options={{
        headerTitle: () => <CommonHeader navigation={navigation} />,
      }}
    />
  </CategoryStack.Navigator>
);

const BottomTab = createBottomTabNavigator();

export const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={styles.bottomNavigation}>
    <BottomNavigationTab icon={HomeIcon} title="HOME" />
    <BottomNavigationTab icon={AlphaIcon} title="ALPHA" />
    <BottomNavigationTab icon={ChronoIcon} title="CHRONO" />
    <BottomNavigationTab icon={CategoryIcon} title="CATEGORY" />
  </BottomNavigation>
);

export const BottomNavigationAccessoriesShowcase = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{headerShown: false}}
    />
    <BottomTab.Screen
      name="Laws in Alphabetical Order"
      component={AlphaStackScreen}
      options={{headerShown: false}}
    />
    <BottomTab.Screen
      name="Laws in Chronological Order"
      component={ChronoStackScreen}
      options={{headerShown: false}}
    />
    <BottomTab.Screen
      name="Category Wise Laws"
      component={CategoryStackScreen}
      options={{headerShown: false}}
    />
  </BottomTab.Navigator>
);

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 1,
  },
});
