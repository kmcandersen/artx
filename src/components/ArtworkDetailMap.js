import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ArtworkDetailMap = ({ coords, title }) => {
  const artworkLat = coords[0];
  const artworkLong = coords[1] > 0 ? -coords[1] : coords[1];

  // austin: 30.267222, -97.743056
  // chicago: 41.881944, -87.627778

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

export default ArtworkDetailMap;
