import React, { useContext } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import PostContext from '../contexts/PostContext';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';

const PostListScreen = ({ navigation }) => {
  const { data, addPost, removePost } = useContext(PostContext);

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(post) => post.title}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text style={styles.title}>
                {item.title}-{item.id}
              </Text>
              <TouchableOpacity onPress={() => removePost(item.id)}>
                <Feather style={styles.icon} name='trash' />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <AppButton title='Add a Post' onPress={addPost} />
      <AppButton
        title='Go to Post Details'
        onPress={() => navigation.navigate('PostDetail')}
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
