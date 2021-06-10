import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ArtworkDetailMap = ({ coords, title }) => {
  const artworkLong = coords[0] > 0 ? -coords[0] : coords[0];
  const artworkLat = coords[1];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: artworkLat,
          longitude: artworkLong,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: artworkLat, longitude: artworkLong }}
          title={title}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 200,
  },
});

export default ArtworkDetailMap;
