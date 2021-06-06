import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfileScreen from '../screens/UserProfileScreen';
import EditUserScreen from '../screens/EditUserScreen';
import CreateArtworkScreen from '../screens/CreateArtworkScreen';
// import EditArtworkScreen from '../screens/EditArtworkScreen';
// import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';

const Stack = createStackNavigator();

const ArtistsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='UserProfile'
      component={UserProfileScreen}
      options={{ headerTitle: 'User Profile' }}
    />
    <Stack.Screen
      name='CreateArtwork'
      component={CreateArtworkScreen}
      options={{ headerTitle: 'Add Artwork' }}
    />
    <Stack.Screen
      name='EditUser'
      component={EditUserScreen}
      options={{ headerTitle: 'Edit Profile' }}
    />
    {/* <Stack.Screen
      name='ArtworkDetail'
      component={ArtworkDetailScreen}
      options={{ headerTitle: 'Art Deets' }}
    />
    <Stack.Screen
      name='EditArtwork'
      component={EditArtworkScreen}
      options={{ headerTitle: 'Edit Artwork' }}
    /> */}
  </Stack.Navigator>
);

export default ArtistsNavigator;
