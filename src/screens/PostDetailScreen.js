import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import PostContext from '../contexts/PostContext';

const PostDetailScreen = ({ route, navigation }) => {
  const postId = route.params.id;
  const { data } = useContext(PostContext);
  const post = data.find((post) => post._id === postId);

  // useEffect(() => {
  //   getPosts();
  // }, [data]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditPost', { id: postId })}
        >
          <EvilIcons name='pencil' size={35} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Screen>
      <Text>{post.title}</Text>
      <Text>{post.address}</Text>
    </Screen>
  );
};

// onPress={() => navigation.navigate('EditPost')}

const styles = StyleSheet.create({
  container: {},
});

export default PostDetailScreen;
