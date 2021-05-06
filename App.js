import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import PostNavigator from './src/navigators/PostNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <PostNavigator />
    </NavigationContainer>
  );
}
