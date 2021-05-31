import React, { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ArtworkDetailMap from '../components/ArtworkDetailMap';
import PhotoSlider from '../components/PhotoSlider';

import ArtworkContext from '../contexts/ArtworkContext';
import ArtistsContext from '../contexts/ArtistsContext';

const ArtworkDetailScreen = ({ route, navigation }) => {
  const artworkId = route.params.id;
  const artistId = route.params.artistFbId;

  const { artwork, error, removeArtwork } = useContext(ArtworkContext);
  const { artists } = useContext(ArtistsContext);

  const work = artwork ? artwork.find((work) => work._id === artworkId) : {};
  const artist = artists ? artists.find((a) => a.fbId === artistId) : {};

  const { aboutText, address, coords, photoUrls, title, year } = work;
  const { name } = artist;

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
      <Screen style={{ backgroundColor: '#fff' }}>
        {error && (
          <View>
            <Text>{error}</Text>
          </View>
        )}
        <ScrollView>
          <View>{photoUrls && <PhotoSlider photos={photoUrls} />}</View>
          <Text>{title}</Text>
          <Text>{name}</Text>
          <Text>{address}</Text>
          <Text>Year: {year ? year : 'NA'}</Text>
          <Text>{aboutText}</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ArtworkList');
              removeArtwork(work._id);
            }}
            // onPress={() =>
            //   removeArtwork(work._id, () => navigation.navigate('ArtworkList'))
            // }
          >
            <Feather style={styles.icon} name='trash' />
          </TouchableOpacity>
          {coords.length ? (
            <ArtworkDetailMap coords={coords} title={title} />
          ) : (
            <Text>Map not available</Text>
          )}
        </ScrollView>
      </Screen>
    );
  }
  return null;
};

const styles = StyleSheet.create({});

export default ArtworkDetailScreen;
