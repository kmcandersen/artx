import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  FormImagePicker,
  SubmitButton,
} from '../components/forms';
import ArtworkContext from '../contexts/ArtworkContext';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label('Title'),
  address: Yup.string().required().min(4).label('Address'),
  // photoUrls: Yup.string().min(1, 'Please select at least 1 image'),
});

const CreateArtworkScreen = ({ navigation }) => {
  const { error, addArtwork } = useContext(ArtworkContext);

  const initialValues = {
    artistFbId: 'A012',
    title: '',
    address: '',
    photoUrls: [],
    callback: () => {
      navigation.navigate('ArtworkList');
    },
  };

  return (
    <Screen>
      <AppForm
        initialValues={initialValues}
        onSubmit={addArtwork}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <AppFormField name='title' placeholder='Title' />
        <AppFormField
          name='address'
          placeholder='Address or Intersection'
          textContentType='streetAddressLine1'
        />
        <FormImagePicker name='photoUrls' />
        <SubmitButton title='Add Artwork' />
        <AppButton title='Back' onPress={() => navigation.goBack()} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CreateArtworkScreen;
