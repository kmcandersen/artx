import React, { useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import Screen from './Screen';

function AppDropdownPicker({ items, name, prompt, icon, height, itemHeight }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { setFieldValue, touched, values } = useFormikContext();

  const selectedItem = values[name];

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <Text style={defaultStyles.text}>
            {selectedItem ? selectedItem : prompt}
          </Text>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Screen>
          <Button title='Close' onPress={() => setModalVisible(false)} />
          <Text>{prompt}</Text>
          <Picker
            style={[styles.picker, { height: height }]}
            itemStyle={{
              height: itemHeight,
              borderColor: 'red',
              borderWidth: 1,
            }}
            mode='dropdown'
            selectedValue={values[name]}
            onValueChange={(item) => setFieldValue(name, item)}
          >
            {items.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    color: defaultStyles.colors.medium,
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
  },
  prompt: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: { flex: 1 },
  picker: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default AppDropdownPicker;