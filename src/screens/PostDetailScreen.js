import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import PostContext from '../contexts/PostContext';
import { Feather } from '@expo/vector-icons';

const PostDetailScreen = ({ route, navigation }) => {
  const postId = route.params.id;
  const { data, removePost } = useContext(PostContext);
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

  // if post is removed, doesn't try to render DetailScreen; callback redirects to PostList
  if (post) {
    return (
      <Screen>
        <Text>{post.title}</Text>
        <Text>{post.address}</Text>

        <TouchableOpacity
          onPress={() =>
            removePost(post._id, () => navigation.navigate('PostList'))
          }
        >
          <Feather style={styles.icon} name='trash' />
        </TouchableOpacity>
      </Screen>
    );
  }
  return null;
};

// onPress={() => navigation.navigate('EditPost')}

const styles = StyleSheet.create({
  container: {},
});

export default PostDetailScreen;
