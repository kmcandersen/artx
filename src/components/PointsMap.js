import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../config/theme';

//const width = Dimensions.get('window').width;
// data = all artwork (from BrowseScreen) or 1 artist's artwork (from UserProfileScreen)
const PointsMap = ({ navigation, data, width }) => {
  const artMapInfo = [];
  data.forEach((work) => {
    let itemInfo = {
      artworkId: work._id,
      artistId: work.artistFbId,
      title: work.title,
      long: work.coords[0] > 0 ? -work.coords[0] : work.coords[0],
      lat: work.coords[1],
    };
    artMapInfo.push(itemInfo);
  });

  // full width (BrowseScreen) or width matches padding of Content component (UserProfile)
  const mapWidth =
    width === 'content'
      ? Dimensions.get('window').width - spacing.content * 2
      : Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { width: mapWidth }]}
        initialRegion={{
          latitude: 30.267222,
          longitude: -97.743056,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
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
              <View style={styles.callout}>
                <Text>{work.title}</Text>
                <Ionicons name='chevron-forward' size={18} color='black' />
              </View>
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
  callout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    height: 300,
  },
});

export default PointsMap;
