import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateArtworkScreen from '../screens/CreateArtworkScreen';
import EditArtworkScreen from '../screens/EditArtworkScreen';
import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';
import ArtworkListScreen from '../screens/ArtworkListScreen';

const Stack = createStackNavigator();

const ArtworkNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='ArtworkList'
      component={ArtworkListScreen}
      options={{ headerTitle: 'Artwork List' }}
    />
    <Stack.Screen
      name='ArtworkDetail'
      component={ArtworkDetailScreen}
      options={{ headerTitle: 'Art Deets' }}
    />
    {/* REMOVE: */}
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
  </Stack.Navigator>
);

export default ArtworkNavigator;
