import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseScreen from '../screens/BrowseScreen';
import CreateArtworkScreen from '../screens/CreateArtworkScreen';
import EditArtworkScreen from '../screens/EditArtworkScreen';
import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditUserScreen from '../screens/EditUserScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const ArtworkNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Browse'
      component={BrowseScreen}
      options={{ headerTitle: 'Browse Art & Artists' }}
    />
    <Stack.Screen
      name='ArtworkDetail'
      component={ArtworkDetailScreen}
      options={{ headerTitle: 'Art Deets' }}
    />
    <Stack.Screen
      name='CreateArtwork'
      component={CreateArtworkScreen}
      options={{ headerTitle: 'Add Artwork' }}
    />
    <Stack.Screen
      name='EditArtwork'
      component={EditArtworkScreen}
      options={{ headerTitle: 'Edit Artwork' }}
    />
    <Stack.Screen
      name='UserProfile'
      component={UserProfileScreen}
      options={{ headerTitle: 'User Profile' }}
    />
    <Stack.Screen
      name='EditUser'
      component={EditUserScreen}
      options={{ headerTitle: 'Edit Profile' }}
    />
    <Stack.Screen
      name='Welcome'
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name='Register' component={RegisterScreen} />
  </Stack.Navigator>
);

export default ArtworkNavigator;
