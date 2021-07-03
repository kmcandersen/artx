import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import ArtworkContext from '../contexts/ArtworkContext';
import ArtistsContext from '../contexts/ArtistsContext';

import Screen from '../components/wrappers/Screen';
import colors from '../config/colors';

const ArtworkListScreen = ({ navigation }) => {
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
        <FlatList
          data={artwork}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ArtworkDetail', {
                    id: item._id,
                    artistId: item.artistFbId,
                  });
                }}
              >
                {/* so new item won't render before it's assigned an Id/key */}
                {item._id && (
                  <View style={styles.row}>
                    {item.title && (
                      <Text style={styles.title}>{item.title}</Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
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
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default ArtworkListScreen;
