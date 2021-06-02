import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import ArtworkContext from '../contexts/ArtworkContext';
import ArtistsContext from '../contexts/ArtistsContext';

import Screen from '../components/Screen';
import colors from '../config/colors';
import BrowseMap from '../components/BrowseMap';

const { height } = Dimensions.get('window');
const listHeight = height * 0.3;

const BrowseScreen = ({ navigation }) => {
  const { artwork, getArtwork, error } = useContext(ArtworkContext);
  const { getArtists } = useContext(ArtistsContext);

  const [isDataLoading, setIsDataLoading] = useState(true);
  useEffect(() => {
    let data = getArtwork();
    getArtists();
    if (data) {
      setIsDataLoading(false);
    } else {
      setIsDataLoading(true);
    }
  }, []);

  return (
    <Screen>
      {isDataLoading && !error ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loading}
            size={50}
            animating={true}
            color={colors.secondary}
          />
        </View>
      ) : null}
      {error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.mapContainer}>
            <BrowseMap navigation={navigation} />
          </View>
          <ScrollView style={styles.listContainer}>
            {artwork.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => {
                  navigation.navigate('ArtworkDetail', {
                    id: item._id,
                    artistId: item.artistFbId,
                  });
                }}
              >
                {item._id && (
                  <View style={styles.row}>
                    {item.title && (
                      <Text style={styles.title}>{item.title}</Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginLeft: -25,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  mapContainer: {
    height: 300,
  },
  listContainer: {
    height: listHeight,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default BrowseScreen;
