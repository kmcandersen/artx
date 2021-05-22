import React, { useEffect } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Alert,
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../config/styles';

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert('Sorry, we need camera roll permissions to make this work!');
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {
          text: 'Yes',
          // null bc image not physically deleted from the library, just the container
          onPress: () => onChangeImage(null),
        },
        {
          text: 'No',
        },
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        // TODO: EXTRACT COORDS
        let newfile = {
          uri: result.uri,
          type: `test/${result.uri.split('.')[1]}`,
          name: `test.${result.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
      }
    } catch (error) {
      console.log('Error reading an image');
    }
  };

  const handleUpload = async (image) => {
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'rn-artx');
      data.append('cloud_name', 'kmcandersen');
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/kmcandersen/image/upload`,
        data
      );
      onChangeImage(response.data.url);
    } catch (error) {
      Alert.alert('error while uploading');
    }
  };

  const cameraIcon = (
    <MaterialCommunityIcons name='camera' size={40} color={colors.medium} />
  );
  const photo = <Image source={{ uri: imageUri }} style={styles.image} />;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>{imageUri ? photo : cameraIcon}</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    height: 100,
    width: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageInput;
