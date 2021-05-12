import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ArtworkNavigator from './ArtworkNavigator';
import AccountProfileScreen from '../screens/AccountProfileScreen';

const Tab = createBottomTabNavigator();

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
    /> */}
    <Tab.Screen
      name='My Profile'
      component={AccountProfileScreen}
      options={{
        tabBarIcon: () => <AntDesign name='profile' size={24} color='black' />,
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
