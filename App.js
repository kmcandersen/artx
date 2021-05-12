import React from 'react';
import * as firebase from 'firebase';
import Navigation from './src/navigators';
import { ArtworkProvider } from './src/contexts/ArtworkContext';
import { AuthProvider } from './src/contexts/AuthContext';

const firebaseConfig = {};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <AuthProvider>
      <ArtworkProvider>
        <Navigation />
      </ArtworkProvider>
    </AuthProvider>
  );
};

export default App;
