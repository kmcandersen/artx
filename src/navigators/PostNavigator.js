import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PostListScreen from '../screens/PostListScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

const Stack = createStackNavigator();

const PostNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='PostList'
      component={PostListScreen}
      options={{ headerTitle: 'My Posts' }}
    />
    <Stack.Screen
      name='PostDetail'
      component={PostDetailScreen}
      options={{ headerTitle: 'Post Deets' }}
    />
  </Stack.Navigator>
);

export default PostNavigator;
