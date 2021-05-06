import React from 'react';
import { Image, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../config/colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.buttonsContainer}>
      <Button
        buttonStyle={{ backgroundColor: colors.primary }}
        title='Log In'
        // onPress={() => navigation.navigate('Login')}
      />
      <Button
        buttonStyle={{ backgroundColor: colors.secondary }}
        title='Sign Up'
        // onPress={() => navigation.navigate('Signup')}
      />
    </SafeAreaView>
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
