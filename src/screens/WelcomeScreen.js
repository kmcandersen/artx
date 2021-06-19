import React, { useContext } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import ArtworkContext from '../contexts/ArtworkContext';

import { AppButtonFilled, AppButtonOutlined } from '../components/AppButtons';

const width = Dimensions.get('window').width;

const WelcomeScreen = ({ navigation }) => {
  const { setScreenWidth } = useContext(ArtworkContext);
  setScreenWidth(width);

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
          <AppButtonFilled
            label='Log In'
            onPress={() => navigation.navigate('Login')}
            width='wide'
            bgColor='white'
            textColor='black'
            addlStyle={{ marginBottom: 15 }}
          />
          <AppButtonOutlined
            label='Register'
            onPress={() => navigation.navigate('Register')}
            width='wide'
            outlineColor='white'
            textColor='black'
          />
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
