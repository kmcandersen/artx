import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  AppFormPicker,
  FormImagePicker,
  SubmitButton,
} from '../components/forms';
import TagPickerItem from '../components/TagPickerItem';
import tags from '../config/tags';
import ArtworkContext from '../contexts/ArtworkContext';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const CreateArtworkScreen = ({ navigation }) => {
  const { error, addArtwork, currYear } = useContext(ArtworkContext);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    address: Yup.string().required().min(4).label('Address'),
    year: Yup.number().min(1950).max(currYear).label('Year'),
    aboutText: Yup.string().max(450).label('About'),
    photoUrls: Yup.array().min(1, 'Please select at least 1 image'),
  });

  const initialValues = {
    artistFbId: 'A012',
    title: '',
    address: '',
    year: '',
    aboutText: '',
    tags: [],
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
        <FormImagePicker name='photoUrls' />
        <AppFormPicker
          items={tags}
          name='tags'
          numberOfColumns={3}
          PickerItemComponent={TagPickerItem}
          placeholder='Select Tag'
          width='50%'
        />
        <SubmitButton title='Add Artwork' />
        <AppButton title='Back' onPress={() => navigation.goBack()} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default CreateArtworkScreen;
