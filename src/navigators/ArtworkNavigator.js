import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseScreen from '../screens/BrowseScreen';
import EditArtworkScreen from '../screens/EditArtworkScreen';
import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';

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
      name='EditArtwork'
      component={EditArtworkScreen}
      options={{ headerTitle: 'Edit Artwork' }}
    />
  </Stack.Navigator>
);

export default ArtworkNavigator;
