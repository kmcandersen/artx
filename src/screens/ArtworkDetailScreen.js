import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import PhotoSlider from '../components/PhotoSlider';
import ArtworkContext from '../contexts/ArtworkContext';
import { Feather } from '@expo/vector-icons';

const ArtworkDetailScreen = ({ route, navigation }) => {
  const artworkId = route.params.id;
  const { artwork, error, removeArtwork } = useContext(ArtworkContext);

  const work = artwork ? artwork.find((work) => work._id === artworkId) : [];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditArtwork', { id: artworkId })}
        >
          <EvilIcons name='pencil' size={35} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // if an indiv artwork is deleted, doesn't try to render DetailScreen; callback redirects to ArtworkList
  if (work) {
    return (
      <Screen>
        {error && (
          <View>
            <Text>{error}</Text>
          </View>
        )}
        <View>
          <PhotoSlider photos={work.photoUrls} />
        </View>
        <Text>{work.title}</Text>
        <Text>{work.address}</Text>

        <TouchableOpacity
          onPress={() =>
            removeArtwork(work._id, () => navigation.navigate('ArtworkList'))
          }
        >
          <Feather style={styles.icon} name='trash' />
        </TouchableOpacity>
      </Screen>
    );
  }
  return null;
};

const styles = StyleSheet.create({});

export default ArtworkDetailScreen;
