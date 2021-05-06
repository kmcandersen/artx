import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostContext from '../contexts/PostContext';
import AppButton from '../components/AppButton';

const PostDetailScreen = ({ route }) => {
  const postId = route.params.id;
  const { data } = useContext(PostContext);
  const post = data.find((post) => post.id === postId);
  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.text}</Text>
      <AppButton title='Edit Post' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PostDetailScreen;
