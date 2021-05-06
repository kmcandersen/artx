import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import CreatePostScreen from '../screens/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import PostListScreen from '../screens/PostListScreen';

const Stack = createStackNavigator();

const PostNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='PostList'
      component={PostListScreen}
      options={({ navigation }) => ({
        headerTitle: 'My Posts',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <Feather name='plus' size={30} />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen
      name='PostDetail'
      component={PostDetailScreen}
      options={{ headerTitle: 'Post Deets' }}
    />
    <Stack.Screen
      name='CreatePost'
      component={CreatePostScreen}
      options={{ headerTitle: 'New Post' }}
    />
  </Stack.Navigator>
);

export default PostNavigator;
