import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreatePostScreen from '../screens/CreatePostScreen';
import EditPostScreen from '../screens/EditPostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import PostListScreen from '../screens/PostListScreen';

const Stack = createStackNavigator();

const PostNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='PostList'
      component={PostListScreen}
      options={{ headerTitle: 'Post List' }}
    />
    <Stack.Screen
      name='PostDetail'
      component={PostDetailScreen}
      options={{ headerTitle: 'Post Deets' }}
    />
    <Stack.Screen
      name='CreatePost'
      component={CreatePostScreen}
      options={{ headerTitle: 'Add Post' }}
    />
    <Stack.Screen
      name='EditPost'
      component={EditPostScreen}
      options={{ headerTitle: 'Edit Post' }}
    />
  </Stack.Navigator>
);

export default PostNavigator;
