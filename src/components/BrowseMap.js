import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import ArtworkContext from '../contexts/ArtworkContext';

const BrowseMap = ({ navigation }) => {
  const { artwork } = useContext(ArtworkContext);

  const artMapInfo = [];

  if (artwork) {
    artwork.forEach((work) => {
      let itemInfo = {
        artworkId: work._id,
        artistId: work.artistFbId,
        title: work.title,
        long: work.coords[0] > 0 ? -work.coords[0] : work.coords[0],
        lat: work.coords[1],
      };
      artMapInfo.push(itemInfo);
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.267222,
          longitude: -97.743056,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {artMapInfo.map((work) => (
          <Marker
            key={work.artworkId}
            coordinate={{
              latitude: work.lat || 0,
              longitude: work.long || 0,
            }}
          >
            <Callout
              onPress={() =>
                navigation.navigate('ArtworkDetail', {
                  id: work.artworkId,
                  artistId: work.artistId,
                })
              }
            >
              <Text>{work.title}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
});

export default BrowseMap;
