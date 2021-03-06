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
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { artists, setArtists, getArtists } = useContext(ArtistsContext);
  const { getArtwork } = useContext(ArtworkContext);

  const onLogin = async ({ email, password }) => {
    try {
      setError(null);
      const response = await loginRequest(email, password);
      setUser({ fbId: response.user.uid, email: response.user.email });
      getArtwork();
      getArtists();
    } catch (error) {
      setError(error.toString());
    }
  };

  const addArtist = async (fbId, email, name) => {
    try {
      setError(null);
      const { data } = await axios.post(`${BASE_URL}/artists`, {
        fbId,
        email,
        name,
      });
      if (artists) {
        setArtists([...artists, data]);
      }
    } catch (error) {
      setError(error.toString());
    }
  };

  const onRegister = async ({ name, email, password, repeatedPassword }) => {
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      return;
    }
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const fbId = response.user.uid;
      setUser({ fbId, email, name });
      addArtist(fbId, email, name);
      getArtwork();
      getArtists();
    } catch (error) {
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
        setUser,
        error,
        setError,
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
