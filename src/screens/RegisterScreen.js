import React, { useContext, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
import AppText from '../components/AppText';
import AuthContext from '../contexts/AuthContext';
import ArtworkContext from '../contexts/ArtworkContext';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(1)
    .max(50)
    .matches(/^([\w\s/-]*)$/, "Names can't include special characters"),
  email: Yup.string().required().email().max(50),
  password: Yup.string().required().min(4).max(40),
  repeatedPassword: Yup.string().required().min(4).max(40),
});

const RegisterScreen = ({ navigation }) => {
  const { onRegister, error } = useContext(AuthContext);
  const { screenWidth } = useContext(ArtworkContext);

  const [keyboardShift, setKeyboardShift] = useState(true);

  return (
    <ScrollView bounces={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        enabled={keyboardShift}
      >
        <Content>
          <>
            <Image
              source={require('../../assets/logo-multi.png')}
              style={[
                styles.logo,
                {
                  width: screenWidth * 0.35,
                  height: (screenWidth * 0.35) / 1.9,
                },
              ]}
            />
            <AppForm
              initialValues={{
                name: '',
                email: '',
                password: '',
                repeatedPassword: '',
              }}
              onSubmit={onRegister}
              validationSchema={validationSchema}
            >
              <AppFormField
                autoCapitalize='words'
                autoCorrect={false}
                name='name'
                label='Full Name'
                placeholder='Up to 50 alphanumeric characters'
                textContentType='name'
                onFocus={() => setKeyboardShift(false)}
              />
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
                onFocus={() => setKeyboardShift(false)}
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
              <AppFormField
                autoCapitalize='none'
                autoCorrect={false}
                name='repeatedPassword'
                label='Repeated Password'
                placeholder='Re-enter password'
                secureTextEntry
                textContentType='password'
                onFocus={() => setKeyboardShift(true)}
              />
              <SubmitButton label='Register' />
            </AppForm>
            <View style={styles.textLinkRow}>
              <AppText variant='itemMessage'>Already have an account? </AppText>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Login')}
              >
                <AppText
                  variant='itemMessage'
                  addlStyle={{ textDecorationLine: 'underline' }}
                >
                  Log In
                </AppText>
              </TouchableOpacity>
            </View>
          </>
        </Content>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    marginTop: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
  textLinkRow: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
