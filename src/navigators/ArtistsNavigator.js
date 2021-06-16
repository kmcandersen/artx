import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfileScreen from '../screens/UserProfileScreen';
import EditUserScreen from '../screens/EditUserScreen';
import CreateArtworkScreen from '../screens/CreateArtworkScreen';

const Stack = createStackNavigator();

const ArtistsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='UserProfile'
      component={UserProfileScreen}
      options={{ headerTitle: 'User Profile' }}
      initialParams={{ showSnackbar: false }}
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
  </Stack.Navigator>
);

export default ArtistsNavigator;
