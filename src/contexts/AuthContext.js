import React, { useContext, useState } from 'react';
import * as firebase from 'firebase';
import axios from 'axios';
import { BASE_URL } from '../config/vars';

import ArtistsContext from '../contexts/ArtistsContext';
import ArtworkContext from '../contexts/ArtworkContext';

const loginRequest = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { artists, setArtists, getArtists } = useContext(ArtistsContext);
  const { getArtwork } = useContext(ArtworkContext);

  const onLogin = async ({ email, password }) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await loginRequest(email, password);
      // setUser(response);
      setUser({ fbId: response.user.uid, email: response.user.email });
      // getArtwork();
      // getArtists();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.toString());
    }
  };

  const addArtist = async (fbId, email) => {
    try {
      setError(null);
      const newArtist = await axios.post(`${BASE_URL}/artists`, {
        fbId,
        email,
      });
      setArtists({ ...artists, newArtist });
    } catch (error) {
      setError(error.toString());
    }
  };

  const onRegister = async ({ email, password, repeatedPassword }) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      return;
    }
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const fbId = response.user.uid;
      const userEmail = response.user.email;
      setUser({ fbId, email: userEmail });
      addArtist(fbId, userEmail);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.toString());
    }
  };

  const onLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      setError(null);
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
