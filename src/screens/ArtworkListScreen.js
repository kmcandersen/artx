import React, { useContext, useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

import ArtworkContext from '../contexts/ArtworkContext';

import Screen from '../components/Screen';
import colors from '../config/colors';

const ArtworkListScreen = ({ navigation }) => {
  const { artwork, error, getArtwork } = useContext(ArtworkContext);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    let data = getArtwork();
    if (data) {
      setIsDataLoading(false);
    } else {
      setIsDataLoading(true);
    }
  }, [artwork]);

  // MOVE TO ACCOUNT PROFILE:
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CreateArtwork')}>
          <Feather name='plus' size={20} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
          keyExtractor={(work) => work._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ArtworkDetail', {
                    id: item._id,
                    artistFbId: item.artistFbId,
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
