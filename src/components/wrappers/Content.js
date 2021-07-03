import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../config/theme';

export function Content({ children }) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.content,
    // flex: 1,
  },
});
