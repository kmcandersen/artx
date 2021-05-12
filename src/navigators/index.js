import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

import AuthContext from '../contexts/AuthContext';

const Navigation = () => {
  const { isAuthenticated } = useContext(AuthContext);
  //console.log(isAuthenticated);
  //const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
