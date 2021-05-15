import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import ArtworkContext from '../contexts/ArtworkContext';

import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const EditArtworkScreen = ({ route, navigation }) => {
  const artworkId = route.params.id;

  const { artwork, error, editArtwork } = useContext(ArtworkContext);

  const work = artwork ? artwork.find((work) => work._id === artworkId) : [];

  const [title, setTitle] = useState(work.title);
  const [address, setAddress] = useState(work.address);

  return (
    <Screen>
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
      <Text style={styles.label}>Edit title</Text>
      <Text>Artwork Id:{work._id}</Text>
      <TextInput
        style={styles.inputs}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Edit Address</Text>
      <TextInput
        style={styles.inputs}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <AppButton
        title='Submit Edit'
        onPress={() => {
          editArtwork(artworkId, title, address, () => {
            navigation.pop();
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

export default EditArtworkScreen;
