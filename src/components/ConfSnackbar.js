import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

const ConfSnackbar = ({ message }) => {
  return (
    <View style={styles.container}>
      <Snackbar visible={true} style={{ backgroundColor: 'green' }}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 20,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

export default ConfSnackbar;
