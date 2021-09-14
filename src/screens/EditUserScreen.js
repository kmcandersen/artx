import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import {
  ErrorMessage,
  AppForm,
  AppFormSwitch,
  AppFormField,
  FormImagePicker,
  SubmitButton,
} from '../components/forms';

import states from '../config/states';

import ArtistsContext from '../contexts/ArtistsContext';

import { Content } from '../components/wrappers/Content';
import { AppButtonOutlined } from '../components/AppButtons';
import AppDropdownPicker from '../components/AppDropdownPicker';

const height = Dimensions.get('window').height;
const itemHeight = height * 0.7;

const EditUserScreen = ({ route, navigation }) => {
  const profile = route.params.profile;

  const [keyboardShift, setKeyboardShift] = useState(true);

  const { artistError, editArtist } = useContext(ArtistsContext);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(1)
      .max(50)
      .matches(/^([\w\s/-]*)$/, "Names can't include special characters"),
    city: Yup.string().min(2).max(40),
    country: Yup.string().min(2).max(40),
    aboutMe: Yup.string().max(450),
    moreInfo: Yup.string().max(50),
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
      // navigation.pop();
      navigation.navigate('UserProfile', {
        showSnackbar: true,
        snackbarMessage: 'Updated your profile!',
      });
    },
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{ flex: 1 }}
        enabled={keyboardShift}
      >
        <Content>
          <AppForm
            initialValues={initialValues}
            onSubmit={editArtist}
            validationSchema={validationSchema}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <>
                <ErrorMessage error={artistError} visible={artistError} />
                {!profile.profilePhotoUrl[0] && (
                  <FormImagePicker name='profilePhotoUrl' imageType='profile' />
                )}
                <AppFormField
                  autoCapitalize='words'
                  autoCorrect={false}
                  name='name'
                  label='Full Name'
                  placeholder='Full Name'
                  textContentType='name'
                  onFocus={() => setKeyboardShift(false)}
                />
                <AppFormSwitch
                  name='displayEmail'
                  label1='Show my email address in public profile'
                  label2='Hide my email address in public profile'
                />
                <AppFormField
                  name='city'
                  label='City'
                  placeholder='City'
                  textContentType='addressCity'
                  autoCapitalize='words'
                  autoCompleteType='off'
                  autoCorrect={false}
                  onFocus={() => setKeyboardShift(false)}
                />
                <AppDropdownPicker
                  items={states}
                  name='state'
                  prompt='Select a US State'
                  icon='form-dropdown'
                  height={height}
                  itemHeight={itemHeight}
                />
                <AppFormField
                  name='country'
                  label='Country'
                  placeholder='Country'
                  textContentType='countryName'
                  autoCapitalize='words'
                  autoCompleteType='off'
                  onFocus={() => setKeyboardShift(false)}
                />
                <AppFormField
                  name='aboutMe'
                  label='About Me'
                  placeholder='About Me'
                  textContentType='none'
                  maxLength={450}
                  multiline
                  textAlignVertical='top'
                  autoCapitalize='sentences'
                  autoCompleteType='off'
                  autoCorrect={false}
                  onFocus={() => setKeyboardShift(true)}
                />
                <AppFormField
                  name='moreInfo'
                  label='More Info'
                  placeholder='Where to find more info (website, social, etc.)'
                  textContentType='none'
                  maxLength={40}
                  multiline
                  textAlignVertical='top'
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={false}
                  onFocus={() => setKeyboardShift(true)}
                />
              </>
            </TouchableWithoutFeedback>
            <SubmitButton label='Update Profile' />
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

export default EditUserScreen;
