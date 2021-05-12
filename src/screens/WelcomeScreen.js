import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <Screen style={styles.buttonsContainer}>
      <Text>WELCOME SCREEN</Text>
      <AppButton
        buttonStyle={{ backgroundColor: colors.primary }}
        title='Log In'
        onPress={() => navigation.navigate('Login')}
      />
      <AppButton
        buttonStyle={{ backgroundColor: colors.secondary }}
        title='Register'
        onPress={() => navigation.navigate('Register')}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  logoGroup: {
    alignItems: 'center',
    position: 'absolute',
    top: 70,
  },
  tagline: {
    color: colors.black,
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
