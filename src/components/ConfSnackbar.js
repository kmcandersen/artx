import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { colors } from '../config/theme';

const ConfSnackbar = ({ message }) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={true}
        style={{
          backgroundColor: colors.confirm,
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConfSnackbar;
