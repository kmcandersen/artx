import React from 'react';
import * as firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from './src/config/vars';
import Navigation from './src/navigators';
import { ArtistsProvider } from './src/contexts/ArtistsContext';
import { ArtworkProvider } from './src/contexts/ArtworkContext';
import { AuthProvider } from './src/contexts/AuthContext';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <ArtistsProvider>
      <ArtworkProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ArtworkProvider>
    </ArtistsProvider>
  );
};

export default App;
