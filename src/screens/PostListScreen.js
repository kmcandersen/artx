import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import PostContext from '../contexts/PostContext';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';

const PostListScreen = ({ navigation }) => {
  const { data, addPost } = useContext(PostContext);

  return (
    <Screen>
      <Text>POST LIST SCREEN</Text>
      <FlatList
        data={data}
        keyExtractor={(post) => post.title}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
      <AppButton title='Add a Post' onPress={addPost} />
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
