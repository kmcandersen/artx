import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ArtworkContext from '../contexts/PostContext';
import { Feather } from '@expo/vector-icons';

const PostDetailScreen = ({ route, navigation }) => {
  const artworkId = route.params.id;
  const { data, removeArtwork } = useContext(ArtworkContext);
  const work = data.find((work) => work._id === artworkId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditPost', { id: artworkId })}
        >
          <EvilIcons name='pencil' size={35} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // if work is removed, doesn't try to render DetailScreen; callback redirects to PostList
  if (work) {
    return (
      <Screen>
        <Text>{work.title}</Text>
        <Text>{work.address}</Text>

        <TouchableOpacity
          onPress={() =>
            removeArtwork(work._id, () => navigation.navigate('PostList'))
          }
        >
          <Feather style={styles.icon} name='trash' />
        </TouchableOpacity>
      </Screen>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {},
});

export default PostDetailScreen;
