import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fontSizes, fontWeights } from '../config/theme';

function AppText({ children, addlStyle, variant = 'default' }) {
  return <Text style={[styles[variant], addlStyle]}>{children}</Text>;
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
  subheadTitle: {
    color: colors.white,
    fontSize: fontSizes.subhead,
    fontWeight: fontWeights.bold,
  },
  category: {
    fontSize: fontSizes.category,
    fontWeight: fontWeights.medium,
    paddingBottom: 20,
    textTransform: 'uppercase',
    color: colors.medium,
  },
  item: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
    paddingVertical: 6,
  },
  itemEmpty: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
    color: colors.medium,
    fontStyle: 'italic',
    paddingTop: 10,
  },
  itemMessage: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
    color: colors.medium,
    marginTop: 10,
  },
  copy: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
    lineHeight: 20,
    paddingVertical: 6,
  },
  error: {
    fontSize: fontSizes.item,
    color: colors.danger,
    paddingLeft: 5,
  },
  // finish this:
  default: {
    fontSize: fontSizes.item,
    fontWeight: fontWeights.regular,
  },
});

export default AppText;
