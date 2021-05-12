import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import ArtworkNavigator from './ArtworkNavigator';

const Tab = createBottomTabNavigator();

// const TAB_ICON = {
//   Restaurants: "md-restaurant",
//   Map: "md-map",
//   Settings: "md-settings",
// };

// const createScreenOptions = ({ route }) => {
//   const iconName = TAB_ICON[route.name];
//   return {
//     tabBarIcon: ({ size, color }) => (
//       <Ionicons name={iconName} size={size} color={color} />
//     ),
//   };
// };

const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name='Artwork'
      component={ArtworkNavigator}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons name='image-frame' color='black' size={24} />
        ),
      }}
    />
    {/* <Tab.Screen
      name='Artists'
      options={{
        tabBarIcon: () => <Ionicons name='md-people' size={24} color='black' />,
      }}
    />
    <Tab.Screen
      name='My Profile'
      options={{
        tabBarIcon: () => <AntDesign name='profile' size={24} color='black' />,
      }}
    /> */}
  </Tab.Navigator>
);

export default AppNavigator;
