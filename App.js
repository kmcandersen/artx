import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ArtworkProvider } from './src/contexts/ArtworkContext';
import ArtworkNavigator from './src/navigators/ArtworkNavigator';

export default function App() {
  return (
    <ArtworkProvider>
      <NavigationContainer>
        <ArtworkNavigator />
      </NavigationContainer>
    </ArtworkProvider>
  );
}
