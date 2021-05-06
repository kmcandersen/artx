import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import PostContext from '../contexts/PostContext';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

const CreatePostScreen = ({ navigation }) => {
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Screen>
      <Text style={styles.label}>Enter title</Text>
      <TextInput
        style={styles.inputs}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content</Text>
      <TextInput
        style={styles.inputs}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <AppButton
        title='Submit Post'
        onPress={() => {
          addPost(title, content, () => {
            navigation.navigate('PostList');
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

export default CreatePostScreen;
