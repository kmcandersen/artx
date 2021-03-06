import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseNavigator from './BrowseNavigator';

import CreateArtworkScreen from '../screens/CreateArtworkScreen';
import EditArtworkScreen from '../screens/EditArtworkScreen';
import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditUserScreen from '../screens/EditUserScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { colors } from '../config/theme';

const Stack = createStackNavigator();

const ArtworkNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: colors.background },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen
      name='Discover'
      component={BrowseNavigator}
      options={{ headerTitle: 'Discover Art & Artists' }}
    />
    <Stack.Screen
      name='ArtworkDetail'
      component={ArtworkDetailScreen}
      options={{ headerShown: false }}
      initialParams={{ showSnackbar: false }}
    />
    <Stack.Screen
      name='CreateArtwork'
      component={CreateArtworkScreen}
      options={{ headerTitle: 'Add Artwork', headerLeft: () => null }}
    />
    <Stack.Screen
      name='EditArtwork'
      component={EditArtworkScreen}
      options={{ headerTitle: 'Edit Artwork', headerLeft: () => null }}
    />
    <Stack.Screen
      name='UserProfile'
      component={UserProfileScreen}
      options={{ headerShown: false }}
      initialParams={{ showSnackbar: false }}
    />
    <Stack.Screen
      name='EditUser'
      component={EditUserScreen}
      options={{ headerTitle: 'Edit Profile', headerLeft: () => null }}
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
