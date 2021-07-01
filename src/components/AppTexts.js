import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, fontWeights, spacing } from '../config/theme';

export function AppText({ children, addlStyle, variant = 'default' }) {
  return <Text style={[styles[variant], addlStyle]}>{children}</Text>;
}

export function AppContentWrapper({ children }) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: fontSizes.header,
    fontWeight: fontWeights.bold,
    paddingTop: 4,
    paddingBottom: 8,
  },
  subhead: {
    color: colors.medium,
    fontSize: fontSizes.subhead,
    fontWeight: fontWeights.bold,
    paddingBottom: 10,
  },
  category: {
    fontSize: fontSizes.category,
    fontWeight: fontWeights.bold,
    paddingVertical: 12,
    paddingTop: 20,
    textTransform: 'uppercase',
    color: colors.medium,
  },
  item: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
    paddingVertical: 6,
  },
  copy: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
    lineHeight: 20,
    paddingVertical: 6,
  },

  // finish this:
  default: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
  },
  content: {
    padding: spacing.contentWrapper,
    // flex: 1,
  },
});
