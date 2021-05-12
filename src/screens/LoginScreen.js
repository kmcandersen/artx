import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import AuthContext from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, error } = useContext(AuthContext);

  return (
    <Screen>
      <Text>LOGIN SCREEN</Text>
      <Text style={styles.label}>Enter email</Text>
      <TextInput
        value={email}
        textContentType='emailAddress'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(u) => setEmail(u)}
        style={styles.inputs}
      />
      <Text style={styles.label}>Enter password</Text>
      <TextInput
        value={password}
        textContentType='password'
        secureTextEntry
        autoCapitalize='none'
        onChangeText={(p) => setPassword(p)}
        style={styles.inputs}
      />
      {error && (
        <View size='large'>
          <Text variant='error'>{error}</Text>
        </View>
      )}
      <AppButton
        title='Log In'
        onPress={() => {
          onLogin(email, password);
        }}
      />
      <AppButton title='Back' onPress={() => navigation.goBack()} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  inputs: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    margin: 5,
    padding: 5,
  },
  labels: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default LoginScreen;
