import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import PostContext from '../contexts/PostContext';

import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const EditPostScreen = ({ route, navigation }) => {
  const postId = route.params.id;

  const { data, editPost } = useContext(PostContext);

  const post = data.find((post) => post.id === postId);

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  return (
    <Screen>
      <Text style={styles.label}>Edit title</Text>
      <Text>Post Id:{post.id}</Text>
      <TextInput
        style={styles.inputs}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Edit Text</Text>
      <TextInput
        style={styles.inputs}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <AppButton
        title='Submit Edit'
        onPress={() => {
          editPost(postId, title, text, () => {
            navigation.pop();
          });
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  inputs: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    margin: 5,
    padding: 5,
  },
  labels: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default EditPostScreen;
