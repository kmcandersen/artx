import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../config/theme';

// data prop = all artwork (from BrowseScreen), 1 artist's artwork (from UserProfileScreen), or 1 artwork (from ArtworkDetailScreen)
// navigation prop = undefined from ArtworkDetail; these don't needed a Callout link since user is already on ArtworkDetailScreen
const PointsMap = ({ navigation, data, width, height }) => {
  const [artMapInfo, setArtMapInfo] = useState();
  const [mapCenter, setMapCenter] = useState();

  useEffect(() => {
    if (data) {
      let itemInfo = [];
      data.forEach((work) => {
        // for data arr with multiple items, only items with coords added to artMapInfo & used to calculate mapCenter. (PointsMap not rendered in ArtworkDetail if no coords)
        if (work.coords.length) {
          itemInfo.push({
            artworkId: work._id,
            artistId: work.artistFbId,
            title: work.title,
            long: work.coords[0] > 0 ? -work.coords[0] : work.coords[0],
            lat: work.coords[1],
          });
        }
      });
      setArtMapInfo(itemInfo);

      if (itemInfo.length) {
        let longSum = 0;
        let latSum = 0;
        itemInfo.forEach((point) => {
          if (point.long && point.lat) {
            longSum += point.long;
            latSum += point.lat;
          }
        });
        setMapCenter([longSum / itemInfo.length, latSum / itemInfo.length]);
      }
    }
  }, [data]);

  // full width (BrowseScreen) or width matches padding of Content component (UserProfile & ArtworkDetail)
  const mapWidth =
    width === 'content'
      ? Dimensions.get('window').width - spacing.content * 2
      : Dimensions.get('window').width;
  if (artMapInfo && artMapInfo.length && mapCenter) {
    return (
      <View style={styles.container}>
        <MapView
          style={{ width: mapWidth, height: height }}
          initialRegion={{
            longitude: mapCenter[0],
            latitude: mapCenter[1],
            // ArtworkDetail or Artist with 1 artwork: zoom in
            latitudeDelta: data.length === 1 ? 0.01 : 0.11,
            longitudeDelta: data.length === 1 ? 0.01 : 0.11,
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
              {navigation && (
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
                    <Ionicons
                      name='chevron-forward'
                      size={18}
                      color={colors.dark}
                    />
                  </View>
                </Callout>
              )}
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PointsMap;
