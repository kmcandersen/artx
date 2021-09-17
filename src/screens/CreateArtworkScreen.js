import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  FormImagePicker,
  SubmitButton,
} from '../components/forms';
import ArtworkContext from '../contexts/ArtworkContext';
import AuthContext from '../contexts/AuthContext';
import { Content } from '../components/wrappers/Content';
import { AppButtonOutlined } from '../components/AppButtons';

const CreateArtworkScreen = ({ navigation }) => {
  const { artworkError, addArtwork, currYear } = useContext(ArtworkContext);
  const { user } = useContext(AuthContext);

  const [keyboardShift, setKeyboardShift] = useState(true);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().max(85),
    address: Yup.string().required().min(4).max(50),
    year: Yup.number().min(1950).max(currYear),
    aboutText: Yup.string().max(450),
    //photoUrls: Yup.array().min(1, 'Please select at least 1 image'),
  });
  const initialValues = {
    artistFbId: user.fbId,
    title: '',
    address: '',
    year: '',
    aboutText: '',
    tags: [],
    photoUrls: [],
    callback: () => {
      navigation.navigate('UserProfile', {
        showSnackbar: true,
        snackbarMessage: 'Added artwork!',
      });
    },
  };

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{ flex: 1 }}
        enabled={keyboardShift}
      >
        <Content>
          <AppForm
            initialValues={initialValues}
            onSubmit={addArtwork}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={artworkError} visible={artworkError} />
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
              autoCorrect={false}
              onFocus={() => setKeyboardShift(false)}
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
            <FormImagePicker name='photoUrls' imageType='artwork' />
            <SubmitButton label='Add Artwork' />
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

export default CreateArtworkScreen;
