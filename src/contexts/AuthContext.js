import React, { useState } from 'react';
import * as firebase from 'firebase';

const loginRequest = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
