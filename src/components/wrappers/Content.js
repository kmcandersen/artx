import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../config/theme';

export function Content({ children, height = null }) {
  return <View style={[styles.content, { height: height }]}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.content,
    backgroundColor: colors.background,
  },
});
