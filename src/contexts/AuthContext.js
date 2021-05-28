import React, { useState } from 'react';
import * as firebase from 'firebase';

const loginRequest = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = async ({ email, password }) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await loginRequest(email, password);
      setUser(response);
      setIsLoading(false);
      setTimeout(() => {
        console.log('user', response.uid);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
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
      setUser(response);
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
