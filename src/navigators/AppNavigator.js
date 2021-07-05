import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../config/theme';
import ArtworkNavigator from './ArtworkNavigator';
import ArtistsNavigator from './ArtistsNavigator';

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName='Discover'
    barStyle={{ backgroundColor: colors.primary }}
    shifting
    backBehavior='initialRoute'
  >
    <Tab.Screen
      name='Discover'
      component={ArtworkNavigator}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name='magnify'
            color={colors.white}
            size={24}
          />
        ),
      }}
    />
    <Tab.Screen
      name='Account'
      component={ArtistsNavigator}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name='account'
            size={24}
            color={colors.white}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
