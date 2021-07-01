import React from 'react';
import * as firebase from 'firebase';
import {
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
  Inter_300Light,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
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
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ArtworkProvider>
      <ArtistsProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ArtistsProvider>
    </ArtworkProvider>
  );
};

export default App;
