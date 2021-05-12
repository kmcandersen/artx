import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import AuthContext from '../contexts/AuthContext';

const AccountProfileScreen = ({ navigation }) => {
  const { onLogout, user, error } = useContext(AuthContext);

  return (
    <Screen>
      <Text>ACCOUNT PROFILE</Text>
      {/* conditional bc of depth: */}
      {user.user ? (
        <Text>EMAIL: {user.user.email}</Text>
      ) : (
        <Text>EMAIL: NA</Text>
      )}

      {error && (
        <View size='large'>
          <Text variant='error'>{error}</Text>
        </View>
      )}
      <AppButton
        title='Log Out'
        onPress={() => {
          onLogout();
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default AccountProfileScreen;
