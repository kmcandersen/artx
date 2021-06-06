import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormSwitch,
  AppFormField,
  SubmitButton,
} from '../components/forms';

import ArtistsContext from '../contexts/ArtistsContext';

import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const EditUserScreen = ({ route, navigation }) => {
  const profile = route.params.profile;

  const { artistError, editArtist } = useContext(ArtistsContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(1).max(40).label('Name'),
    city: Yup.string().min(2).max(40).label('City'),
    state: Yup.string().min(2).max(3).label('State abbreviation'),
    country: Yup.string().min(2).max(40).label('Country'),
    aboutMe: Yup.string().max(450).label('About'),
    moreInfo: Yup.string().max(40).label('More info'),
  });

  const initialValues = {
    id: profile.fbId,
    name: profile.name,
    city: profile.city,
    state: profile.state,
    country: profile.country,
    aboutMe: profile.aboutMe,
    moreInfo: profile.moreInfo,
    displayEmail: profile.displayEmail,
    profilePhotoUrl: profile.profilePhotoUrl,
    callback: () => {
      navigation.pop();
    },
  };

  return (
    <Screen>
      <AppForm
        initialValues={initialValues}
        onSubmit={editArtist}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={artistError} visible={artistError} />
        <AppFormField
          autoCapitalize='words'
          autoCorrect={false}
          name='name'
          placeholder='Full Name'
          textContentType='name'
        />
        <AppFormSwitch
          name='displayEmail'
          label='Show my email address in my public profile'
        />
        <AppFormField
          name='city'
          placeholder='City'
          textContentType='addressCity'
          autoCapitalize='words'
          autoCompleteType='off'
          autoCorrect={false}
        />
        <AppFormField
          name='state'
          placeholder='State/Province, e.g. TX'
          textContentType='addressState'
          autoCapitalize='characters'
          autoCompleteType='off'
          autoCorrect={false}
        />
        <AppFormField
          name='country'
          placeholder='State/Province'
          textContentType='countryName'
          autoCapitalize='words'
          autoCompleteType='off'
        />
        <AppFormField
          name='aboutMe'
          placeholder='About Me'
          textContentType='none'
          maxLength={450}
          multiline
          autoCapitalize='sentences'
          autoCompleteType='off'
          autoCorrect={false}
        />
        <AppFormField
          name='moreInfo'
          placeholder='Where to find more info (website, social, etc.)'
          textContentType='none'
          maxLength={40}
          multiline
          autoCapitalize='none'
          autoCompleteType='off'
          autoCorrect={false}
        />
        <SubmitButton title='Update Profile' />
        <AppButton title='Back' onPress={() => navigation.goBack()} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default EditUserScreen;
