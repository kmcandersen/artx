import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components/forms';

import ArtworkContext from '../contexts/ArtworkContext';

import { Content } from '../components/wrappers/Content';
import { AppButtonOutlined } from '../components/AppButtons';

const EditArtworkScreen = ({ route, navigation }) => {
  const item = route.params.work;

  const { error, editArtwork, currYear } = useContext(ArtworkContext);
  const [keyboardShift, setKeyboardShift] = useState(true);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().max(85),
    address: Yup.string().required().min(4).max(50),
    year: Yup.number().min(1950).max(currYear).nullable(),
    aboutText: Yup.string().max(450),
  });

  const initialYear = item
    ? item.year === null
      ? null
      : String(item.year)
    : null;

  const initialValues = {
    id: item._id,
    title: item.title,
    address: item.address,
    year: initialYear,
    aboutText: item.aboutText,
    callback: () => {
      // navigation.pop();
      navigation.navigate('ArtworkDetail', {
        showSnackbar: true,
        snackbarMessage: 'Updated artwork details!',
      });
    },
  };

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{ flex: 1 }}
        enabled={Platform.OS === 'ios' ? keyboardShift : null}
        keyboardVerticalOffset={Platform.OS === 'android' ? 30 : null}
      >
        <Content>
          <AppForm
            initialValues={initialValues}
            onSubmit={editArtwork}
            validationSchema={validationSchema}
          >
            <>
              <ErrorMessage error={error} visible={error} />
              <AppFormField
                name='title'
                label='Title'
                placeholder='Title'
                autoCapitalize='sentences'
                autoCompleteType='off'
                autoCorrect={false}
                onFocus={() => setKeyboardShift(false)}
              />
              <AppFormField
                name='address'
                label='Address or Intersection'
                placeholder='Address or Intersection'
                textContentType='streetAddressLine1'
                autoCapitalize='words'
                autoCompleteType='off'
                onFocus={() => setKeyboardShift(false)}
                autoCorrect={false}
              />
              <AppFormField
                keyboardType='number-pad'
                name='year'
                label='Year'
                placeholder='Year completed'
                maxLength={4}
                onFocus={() => setKeyboardShift(false)}
              />
              <AppFormField
                name='aboutText'
                label='About this project'
                placeholder='About this project'
                textContentType='none'
                maxLength={450}
                multiline
                textAlignVertical='top'
                autoCapitalize='sentences'
                autoCompleteType='off'
                autoCorrect={false}
                onFocus={() => setKeyboardShift(true)}
              />
            </>
            <SubmitButton label='Update Artwork' />
            <AppButtonOutlined
              label='Back'
              onPress={() => navigation.goBack()}
              width='wide'
              outlineColor='secondary'
              textColor='black'
              icon='chevron-left'
            />
          </AppForm>
        </Content>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default EditArtworkScreen;
