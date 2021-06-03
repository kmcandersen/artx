import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ArtworkDetailMap from '../components/ArtworkDetailMap';
import PhotoSlider from '../components/PhotoSlider';

import ArtworkContext from '../contexts/ArtworkContext';
import ArtistsContext from '../contexts/ArtistsContext';

const ArtworkDetailScreen = ({ route, navigation }) => {
  const { id, artistId } = route.params;

  const { artwork, removeArtwork } = useContext(ArtworkContext);
  const { artists } = useContext(ArtistsContext);

  let work = artwork ? artwork.find((a) => a._id === id) : {};
  let artist = artists ? artists.find((a) => a.fbId === artistId) : {};

  // can't destructure 'work' or app fails after removeArtwork
  const { name } = artist;

  // if an indiv artwork is deleted, doesn't try to render DetailScreen; callback redirects to ArtworkList
  // if there's only 1 photo, slider is still needed, for tap to enlarge
  if (work) {
    return (
      <Screen style={{ backgroundColor: '#fff' }}>
        <View>{work.photoUrls && <PhotoSlider photos={work.photoUrls} />}</View>
        <View>
          <Text>{work.title}</Text>
          <Text>{name}</Text>
          <Text>{work.address}</Text>
          <Text>Year: {work.year ? work.year : 'NA'}</Text>
          <Text>{work.aboutText}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Browse');
            removeArtwork(work._id);
          }}
        >
          <Feather style={styles.icon} name='trash' />
        </TouchableOpacity>
        {/* formerly: id sent, used by .find in EditArtwork */}
        <TouchableOpacity
          onPress={() => navigation.navigate('EditArtwork', { work })}
        >
          <EvilIcons name='pencil' size={35} />
        </TouchableOpacity>
        {work.coords.length ? (
          <ArtworkDetailMap coords={work.coords} title={work.title} />
        ) : (
          <Text>Map not available</Text>
        )}
      </Screen>
    );
  }
  return null;
};

const styles = StyleSheet.create({});

export default ArtworkDetailScreen;
