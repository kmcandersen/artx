import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/wrappers/Screen';
import { AppButtonOutlined } from '../components/AppButtons';
import AuthContext from '../contexts/AuthContext';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LoginScreen = ({ navigation }) => {
  const { onLogin, error } = useContext(AuthContext);

  return (
    <Screen>
      <Text>LOGIN SCREEN error is: {error}</Text>
      <AppForm
        initialValues={{ email: 'wross@example.com', password: 'test123' }}
        //initialValues={{ email: '', password: '' }}
        onSubmit={onLogin}
        validationSchema={validationSchema}
      >
        <ErrorMessage error='Invalid email and/or password' visible={error} />
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='email'
          keyboardType='email-address'
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
        />
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='lock'
          name='password'
          placeholder='Password'
          secureTextEntry
          textContentType='password'
        />
        <SubmitButton label='Log In' />
        <AppButtonOutlined
          label='Back'
          onPress={() => navigation.goBack()}
          width='wide'
          outlineColor='secondary'
          textColor='black'
          icon='chevron-left'
        />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
