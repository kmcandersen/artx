import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
// icons from RN Paper: callstack.github.io/react-native-paper/icons.html
import { Button } from 'react-native-paper';
import { colors } from '../config/theme';
import ArtworkContext from '../contexts/ArtworkContext';

// Outlined props incl borderColor, Filled props incl bgColor; others identical

export function AppButtonOutlined({
  label,
  onPress,
  width,
  outlineColor,
  textColor,
  icon,
  addlStyle,
}) {
  const { screenWidth } = useContext(ArtworkContext);
  const buttonWidth =
    width === 'wide' ? screenWidth * 0.75 : screenWidth * 0.42;
  return (
    <View style={{ justifyContent: 'center' }}>
      <Button
        style={[
          styles.button,
          { width: buttonWidth, borderColor: colors[outlineColor] },
          addlStyle,
        ]}
        labelStyle={{ color: colors[textColor] }}
        onPress={onPress}
        icon={icon}
      >
        {label}
      </Button>
    </View>
  );
}

// most instances of AppButtonFilled are SubmitButton components

export function AppButtonFilled({
  label,
  onPress,
  width,
  bgColor,
  textColor,
  icon,
  addlStyle,
}) {
  const { screenWidth } = useContext(ArtworkContext);
  const buttonWidth =
    width === 'wide' ? screenWidth * 0.75 : screenWidth * 0.45;
  return (
    <View style={{ justifyContent: 'center' }}>
      <Button
        style={[styles.button, { width: buttonWidth }, addlStyle]}
        labelStyle={{ color: colors[textColor] }}
        // if mode = contained, color = bg color
        color={colors[bgColor]}
        mode='contained'
        onPress={onPress}
        icon={icon}
      >
        {label}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    justifyContent: 'center',
    height: 50,
  },
});
