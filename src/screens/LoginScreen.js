import React, { useContext, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components/forms';
import { Content } from '../components/wrappers/Content';
import Screen from '../components/wrappers/Screen';
import AppText from '../components/AppText';
import AuthContext from '../contexts/AuthContext';
import ArtworkContext from '../contexts/ArtworkContext';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().max(50).email().label('Email'),
  password: Yup.string().required().min(4).max(40).label('Password'),
});

const LoginScreen = ({ navigation }) => {
  const { onLogin, error } = useContext(AuthContext);
  const { screenWidth } = useContext(ArtworkContext);

  const [keyboardShift, setKeyboardShift] = useState(true);

  return (
    <Screen
      style={{
        justifyContent: 'center',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        enabled={keyboardShift}
      >
        <Content>
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <>
                <Image
                  source={require('../../assets/logo.png')}
                  style={[
                    styles.logo,
                    {
                      width: screenWidth * 0.3,
                      height: (screenWidth * 0.3) / 1.9,
                    },
                  ]}
                />
                <AppForm
                  //initialValues={{ email: 'wross@example.com', password: 'test123' }}
                  initialValues={{ email: '', password: '' }}
                  onSubmit={onLogin}
                  validationSchema={validationSchema}
                >
                  <ErrorMessage
                    error='Invalid email and/or password'
                    visible={error}
                  />
                  <AppFormField
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    name='email'
                    label='Email'
                    placeholder='Up to 50 characters'
                    textContentType='emailAddress'
                    onFocus={() => setKeyboardShift(true)}
                  />
                  <AppFormField
                    autoCapitalize='none'
                    autoCorrect={false}
                    name='password'
                    label='Password'
                    placeholder='4 to 40 characters'
                    secureTextEntry
                    textContentType='password'
                    onFocus={() => setKeyboardShift(true)}
                  />

                  <SubmitButton label='Log In' />
                </AppForm>
                <View style={styles.textLinkRow}>
                  <AppText variant='itemMessage'>
                    Don't have an account yet?{' '}
                  </AppText>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Register')}
                  >
                    <AppText
                      variant='itemMessage'
                      addlStyle={{ textDecorationLine: 'underline' }}
                    >
                      Register
                    </AppText>
                  </TouchableOpacity>
                </View>
              </>
            </TouchableWithoutFeedback>
          </View>
        </Content>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    marginBottom: 25,
    alignSelf: 'center',
  },
  textLinkRow: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default LoginScreen;
