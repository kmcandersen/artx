import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';

const PostListScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>POST LIST SCREEN</Text>
      <AppButton
        title='Go to Post Details'
        onPress={() => navigation.navigate('PostDetail')}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PostListScreen;
