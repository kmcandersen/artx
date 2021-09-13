import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing } from '../config/theme';

const BackIcon = ({ color, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.backIcon}
      activeOpacity={color === 'black' ? 1 : 0.7}
      onPress={onPress}
    >
      <MaterialIcons name='arrow-back-ios' size={30} style={styles[color]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // coordinated with position of UserProfile elements & style of AuthNav:
  backIcon: {
    position: 'absolute',
    top: 64,
    left: spacing.content,
    zIndex: 1,
  },
  black: {
    color: colors.dark,
    opacity: 0.7,
    paddingLeft: 4,
  },
  white: {
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 7,
    paddingLeft: 4,
  },
});

export default BackIcon;
