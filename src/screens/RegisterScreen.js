import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import AuthContext from '../contexts/AuthContext';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(1)
    .max(40)
    .matches(/^([\w\s/-]*)$/, "Names can't include special characters")
    .label('Name'),
  email: Yup.string().required().email().max(40).label('Email'),
  password: Yup.string().required().min(4).max(40).label('Password'),
  repeatedPassword: Yup.string()
    .required()
    .min(4)
    .max(40)
    .label('Repeated Password'),
});

const RegisterScreen = ({ navigation }) => {
  const { onRegister, error } = useContext(AuthContext);

  return (
    <Screen>
      <Text>REGISTER SCREEN error is: {error}</Text>
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
          icon='account'
          name='name'
          placeholder='Full Name'
          textContentType='name'
        />
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
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='lock'
          name='repeatedPassword'
          placeholder='Repeated Password'
          secureTextEntry
          textContentType='password'
        />
        <SubmitButton title='Register' />
        <AppButton title='Back' onPress={() => navigation.goBack()} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default RegisterScreen;
