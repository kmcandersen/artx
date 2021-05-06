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
import Screen from '../components/Screen';

const PostListScreen = ({ navigation }) => {
  const { data, removePost } = useContext(PostContext);

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
        keyExtractor={(post) => post.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('PostDetail', { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title}-{item.id}
                </Text>
                <TouchableOpacity onPress={() => removePost(item.id)}>
                  <Feather style={styles.icon} name='trash' />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
};

// PostListScreen.navigationOptions = {
//   headerRight: () => (
//     <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
//       {/* <TouchableOpacity onPress={console.log('clickd')}> */}
//       {/* <Feather name='plus' size={30} /> */}
//       <Text>CLICK ME</Text>
//     </TouchableOpacity>
//   ),
// };

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
