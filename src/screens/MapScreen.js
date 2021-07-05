import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import PointsMap from '../components/PointsMap';
import ArtworkContext from '../contexts/ArtworkContext';

const { height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const { artwork } = useContext(ArtworkContext);

  return (
    <View style={styles.mapContainer}>
      <PointsMap
        navigation={navigation}
        data={artwork}
        width='full'
        height={height}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: height,
  },
});

export default MapScreen;
