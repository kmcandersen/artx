import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
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
import Screen from '../components/wrappers/Screen';
import { AppButtonOutlined } from '../components/AppButtons';

const CreateArtworkScreen = ({ navigation }) => {
  const { artworkError, addArtwork, currYear } = useContext(ArtworkContext);
  const { user } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().max(85).label('Title'),
    address: Yup.string().required().min(4).max(50).label('Address'),
    year: Yup.number().min(1950).max(currYear).label('Year'),
    aboutText: Yup.string().max(450).label('About'),
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
    <Screen>
      <AppForm
        initialValues={initialValues}
        onSubmit={addArtwork}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={artworkError} visible={artworkError} />
        <AppFormField
          name='title'
          placeholder='Title'
          autoCapitalize='sentences'
          autoCompleteType='off'
          autoCorrect={false}
        />
        <AppFormField
          name='address'
          placeholder='Address or Intersection'
          textContentType='streetAddressLine1'
          autoCapitalize='words'
          autoCompleteType='off'
          autoCorrect={false}
        />
        <AppFormField
          keyboardType='number-pad'
          name='year'
          placeholder='Year completed'
          maxLength={4}
        />
        <AppFormField
          name='aboutText'
          placeholder='About this project'
          textContentType='none'
          maxLength={450}
          multiline
          textAlignVertical='top'
          autoCapitalize='sentences'
          autoCompleteType='off'
          autoCorrect={false}
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
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CreateArtworkScreen;
