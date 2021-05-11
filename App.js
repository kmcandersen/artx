import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ArtworkProvider } from './src/contexts/PostContext';
import PostNavigator from './src/navigators/PostNavigator';

export default function App() {
  return (
    <ArtworkProvider>
      <NavigationContainer>
        <PostNavigator />
      </NavigationContainer>
    </ArtworkProvider>
  );
}
