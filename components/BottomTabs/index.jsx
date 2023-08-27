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

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Back"
      component={HomePage}
      options={{
        headerTitle: props => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between', // Distribute items along the line
              flex: 1, // Make sure it takes up the full space available
            }}>
            <Text style={{flex: 1, textAlign: 'left'}}>Pakistan Code</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
                }}
                style={{width: 30, height: 30}}
              />
            </View>

            <View style={{flex: 1, textAlign: 'flex-end'}}>
              <Dropdown navigation={navigation} />
            </View>
          </View>
        ),
      }}
    />
    <HomeStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <HomeStack.Screen
      name="SingleLaw"
      component={SingleLaw}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="SearchResults"
      component={SearchResults}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const AlphaStackScreen = () => (
  <AlphaStack.Navigator>
    <AlphaStack.Screen
      name="Alphabetical Order"
      component={AlphabeticalOrder}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
      }}
    />
    <AlphaStack.Screen
      name="SingleLawAlpha"
      component={SingleLaw}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
      }}
    />
  </AlphaStack.Navigator>
);

const ChronoStackScreen = () => (
  <ChronoStack.Navigator>
    <ChronoStack.Screen
      name="ChronoPage"
      component={ChronoLogicalOrder}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
      }}
    />
    <ChronoStack.Screen
      name="SingleLawChrono"
      component={SingleLaw}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
      }}
    />
  </ChronoStack.Navigator>
);

const CategoryStackScreen = () => (
  <CategoryStack.Navigator>
    <CategoryStack.Screen
      name="CategoryPage"
      component={CategoryPage}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
      }}
    />
    <CategoryStack.Screen
      name="SingleLawCategory"
      component={SingleLaw}
      options={{
        headerTitle: props => (
          <Image
            source={{
              uri: 'https://pakistancode.gov.pk/english/images/pakcodelogo.png',
            }}
            style={{width: 30, height: 30, paddingVertical: 10}}
          />
        ),
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
