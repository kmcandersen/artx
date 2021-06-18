import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
    >
      <View style={{ paddingVertical: 80 }}>
        <View style={styles.identityContainer}>
          <Image
            source={require('../../assets/logo-white.png')}
            style={styles.logo}
          />
          <Image
            source={require('../../assets/banner.png')}
            style={styles.banner}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={[styles.button, { marginBottom: 15 }]}
            labelStyle={{ color: 'black' }}
            // if contained, color = bg color
            color='white'
            mode='contained'
            onPress={() => navigation.navigate('Login')}
          >
            Log In
          </Button>
          <Button
            style={[styles.button, { borderColor: 'white', borderWidth: 2 }]}
            labelStyle={{ color: 'black' }}
            mode='outlined'
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </Button>
          {/* <AppButton
          title='Log In'
          onPress={() => navigation.navigate('Login')}
        />
        <AppButton
          color='secondary'
          title='Register'
          onPress={() => navigation.navigate('Register')}
        /> */}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    justifyContent: 'center',
    width: width * 0.75,
    height: 50,
  },
  buttonsContainer: {
    alignItems: 'center',
    width,
  },
  identityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.4,
    height: (width * 0.4) / 1.9,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  banner: {
    width: width * 0.95,
    height: (width * 0.95) / 1.696,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;
