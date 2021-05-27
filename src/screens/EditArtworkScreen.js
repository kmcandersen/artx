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
  const artworkId = route.params.id;

  const { artwork, error, editArtwork } = useContext(ArtworkContext);

  const work = artwork ? artwork.find((work) => work._id === artworkId) : [];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    address: Yup.string().required().min(4).label('Address'),
    aboutText: Yup.string().max(450).label('About'),
  });

  const initialValues = {
    id: work._id,
    title: work.title,
    address: work.address,
    aboutText: work.aboutText,
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
        <AppFormField name='title' placeholder='Title' />
        <AppFormField
          name='address'
          placeholder='Address or Intersection'
          textContentType='streetAddressLine1'
        />
        <AppFormField
          name='aboutText'
          placeholder='About this project'
          textContentType='none'
        />
        <SubmitButton title='Update Artwork' />
        <AppButton title='Back' onPress={() => navigation.goBack()} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default EditArtworkScreen;
