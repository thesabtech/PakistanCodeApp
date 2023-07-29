import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationProps,
  BottomNavigationTab,
  Icon,
  IconElement,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../../pages/HomePage';
import AlphabeticalOrder from '../../pages/AlphabeticalOrderPage';
import ChronoLogicalOrder from '../../pages/ChronologicalOrderPage';
import CategoryPage from '../../pages/CategoryPage';

const HomeIcon = props => <Icon {...props} name="home-outline" />;
const AlphaIcon = props => <Icon {...props} name="archive-outline" />;
const ChronoIcon = props => <Icon {...props} name="calendar-outline" />;
const CategoryIcon = props => <Icon {...props} name="copy-outline" />;

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
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
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomePage} />
    <Screen name="Alpha" component={AlphabeticalOrder} />
    <Screen name="Chrono" component={ChronoLogicalOrder} />
    <Screen name="Category" component={CategoryPage} />
  </Navigator>
);

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 1,
  },
});
