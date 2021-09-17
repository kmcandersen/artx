import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BrowseScreen from '../screens/BrowseScreen';
import MapScreen from '../screens/MapScreen';
import { colors } from '../config/theme';

const Tab = createMaterialTopTabNavigator();

const BrowseNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='List'
      tabBarOptions={{
        indicatorStyle: { backgroundColor: colors.secondary },
        activeTintColor: colors.dark,
        inactiveTintColor: colors.medium,
      }}
    >
      <Tab.Screen name='List' component={BrowseScreen} />
      <Tab.Screen name='Map' component={MapScreen} />
    </Tab.Navigator>
  );
};

export default BrowseNavigator;
