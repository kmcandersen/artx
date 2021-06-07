import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useFormikContext } from 'formik';

function AppFormSwitch({ name, label }) {
  const { setFieldValue, values } = useFormikContext();
  const isSwitchOn = values[name];
  const toggleSwitch = () => setFieldValue(name, !values[name]);

  return (
    <View style={styles.displayEmailRow}>
      <Switch
        trackColor={{ false: '#767577', true: '#0336ff' }}
        thumbColor={isSwitchOn ? '#ffde03' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={toggleSwitch}
        value={isSwitchOn}
      />
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  displayEmailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppFormSwitch;