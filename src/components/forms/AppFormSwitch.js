import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useFormikContext } from 'formik';
import { colors } from '../../config/theme';

function AppFormSwitch({ name, label1, label2 }) {
  const { setFieldValue, values } = useFormikContext();
  const isSwitchOn = values[name];
  const toggleSwitch = () => setFieldValue(name, !values[name]);

  return (
    <View style={styles.displayEmailRow}>
      <Switch
        trackColor={{ false: colors.mediumLight, true: colors.primary }}
        thumbColor={isSwitchOn ? colors.tertiary : colors.light}
        ios_backgroundColor={colors.darkGray}
        onValueChange={toggleSwitch}
        value={isSwitchOn}
      />
      <Text style={{ marginLeft: 7 }}>{isSwitchOn ? label1 : label2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  displayEmailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
});

export default AppFormSwitch;
