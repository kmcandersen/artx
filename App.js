import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PostProvider } from './src/contexts/PostContext';
import PostNavigator from './src/navigators/PostNavigator';

export default function App() {
  return (
    <PostProvider>
      <NavigationContainer>
        <PostNavigator />
      </NavigationContainer>
    </PostProvider>
  );
}
