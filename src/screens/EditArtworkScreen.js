import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components/forms';

import ArtworkContext from '../contexts/ArtworkContext';

import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const EditArtworkScreen = ({ route, navigation }) => {
  //const artworkId = route.params.id;
  const item = route.params.work;

  const { artwork, error, editArtwork, currYear } = useContext(ArtworkContext);

  //const work = artwork ? artwork.find((work) => work._id === artworkId) : [];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    address: Yup.string().required().min(4).label('Address'),
    year: Yup.number().min(1950).max(currYear).label('Year'),
    aboutText: Yup.string().max(450).label('About'),
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
      navigation.pop();
    },
  };

  return (
    <Screen>
      <AppForm
        initialValues={initialValues}
        onSubmit={editArtwork}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
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
          keyboardType='numeric'
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
          autoCapitalize='sentences'
          autoCompleteType='off'
          autoCorrect={false}
        />
        <SubmitButton title='Update Artwork' />
        <AppButton title='Back' onPress={() => navigation.goBack()} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default EditArtworkScreen;
