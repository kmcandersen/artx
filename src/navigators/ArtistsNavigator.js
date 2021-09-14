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
      options={{ headerShown: false }}
      initialParams={{ showSnackbar: false }}
    />
    <Stack.Screen
      name='CreateArtwork'
      component={CreateArtworkScreen}
      options={{ headerTitle: 'Add Artwork', headerLeft: () => null }}
    />
    <Stack.Screen
      name='EditUser'
      component={EditUserScreen}
      options={{ headerTitle: 'Edit Profile', headerLeft: () => null }}
    />
  </Stack.Navigator>
);

export default ArtistsNavigator;
