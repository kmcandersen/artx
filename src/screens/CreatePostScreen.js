import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import ArtworkContext from '../contexts/PostContext';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const CreatePostScreen = ({ navigation }) => {
  const { addArtwork } = useContext(ArtworkContext);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');

  return (
    <Screen>
      <Text style={styles.label}>Enter title</Text>
      <TextInput
        style={styles.inputs}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Address</Text>
      <TextInput
        style={styles.inputs}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <AppButton
        title='Submit New Artwork'
        onPress={() => {
          addArtwork('A012', title, address, () => {
            navigation.navigate('PostList');
          });
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  inputs: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    margin: 5,
    padding: 5,
  },
  labels: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default CreatePostScreen;
