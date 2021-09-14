import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AppButtonFilled } from './AppButtons';
import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';
import { colors } from '../config/theme';
import { Content } from './wrappers/Content';

function AppDropdownPicker({
  items,
  name,
  prompt,
  btnLabel,
  icon,
  itemHeight,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { setFieldValue, values } = useFormikContext();

  const selectedItem = values[name];

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <AppText variant='label'>
            {selectedItem ? selectedItem : prompt}
          </AppText>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Content>
          <View
            style={{ flex: 'display', alignItems: 'center', marginTop: 50 }}
          >
            <AppText variant='subhead'>{prompt}</AppText>
          </View>
          <Picker
            itemStyle={{
              height: itemHeight,
            }}
            mode='dropdown'
            selectedValue={values[name]}
            onValueChange={(item) => setFieldValue(name, item)}
          >
            {items.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
          {/* sim to SubmitButton, wo handleSumbit function */}
          <AppButtonFilled
            label={btnLabel}
            onPress={() => setModalVisible(false)}
            width='wide'
            bgColor='primary'
            textColor='white'
            icon='check-bold'
            addlStyle={{ marginTop: 20, marginBottom: 25 }}
          />
        </Content>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    color: colors.medium,
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 30,
    top: 10,
    zIndex: 1,
  },
});

export default AppDropdownPicker;
