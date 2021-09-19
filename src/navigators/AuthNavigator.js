import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { colors, spacing } from '../config/theme';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: colors.background },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen
      name='Welcome'
      component={WelcomeScreen}
      options={{ headerShown: false, headerTitle: false }}
    />
    <Stack.Screen
      name='Login'
      component={LoginScreen}
      options={({ navigation }) => ({
        headerTitle: 'Log In',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={1}
          >
            <MaterialIcons
              name='arrow-back-ios'
              size={30}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen
      name='Register'
      component={RegisterScreen}
      options={({ navigation }) => ({
        headerTitle: 'Register',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={1}
          >
            <MaterialIcons
              name='arrow-back-ios'
              size={30}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  // coordinated with style of BackIcon & UserProfile elements:
  backIcon: {
    left: spacing.content,
    color: colors.dark,
    opacity: 0.7,
  },
});

export default AuthNavigator;
