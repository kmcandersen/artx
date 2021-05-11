import React, { useContext, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import ArtworkContext from '../contexts/ArtworkContext';
import Screen from '../components/Screen';

const ArtworkListScreen = ({ navigation }) => {
  const { data, getArtwork } = useContext(ArtworkContext);

  useEffect(() => {
    getArtwork();
  }, [data]);

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
      <Text>ERROR is: {data.error}</Text>

      <FlatList
        data={data.artwork}
        keyExtractor={(work) => work._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ArtworkDetail', { id: item._id })
              }
            >
              {/* so new item won't render before it's assigned an Id/key */}
              {item._id && (
                <View style={styles.row}>
                  {item.title && (
                    <Text style={styles.title}>
                      {item.title}-{item._id}
                    </Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
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
