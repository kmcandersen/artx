import React, { useContext, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import ArtworkContext from '../contexts/PostContext';
import Screen from '../components/Screen';

const PostListScreen = ({ navigation }) => {
  const { data, getArtwork } = useContext(ArtworkContext);

  useEffect(() => {
    getArtwork();
  }, [data]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <Feather name='plus' size={20} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(work) => work._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PostDetail', { id: item._id })
              }
            >
              <View style={styles.row}>
                {item.title && (
                  <Text style={styles.title}>
                    {item.title}-{item._id}
                  </Text>
                )}

                {/* <TouchableOpacity onPress={() => removePost(item._id)}>
                  <Feather style={styles.icon} name='trash' />
                </TouchableOpacity> */}
              </View>
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

export default PostListScreen;
