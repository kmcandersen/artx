import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';
import { TextInput } from 'react-native-paper';
import ErrorMessage from './ErrorMessage';
import { colors } from '../../config/theme';

function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        label
        onChangeText={(text) => setFieldValue(name, text)}
        error={errors[name] && touched[name]}
        {...otherProps}
        outlineColor={colors.primary}
        mode='outlined'
        theme={{
          colors: { primary: colors.primary },
        }}
        style={styles.input}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    marginVertical: 10,
  },
});

export default AppFormField;
