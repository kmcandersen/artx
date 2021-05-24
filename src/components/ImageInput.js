import React, { useContext, useEffect } from 'react';
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
import {
  CLOUD_NAME,
  CLOUD_FOLDER_A,
  CLOUD_PRESET_A,
  CLOUD_URL,
} from '../config/vars';
import ArtworkContext from '../contexts/ArtworkContext';

function ImageInput({ imageUri, onChangeImage }) {
  const {
    coords,
    setCoords,
    imgCount,
    setImgCount,
    deleteTokens,
    setDeleteTokens,
  } = useContext(ArtworkContext);

  useEffect(() => {
    requestPermission();
    setImgCount(0);
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
      const imageUriKey = imageUri.split('/')[8].split('.')[0];
      const matchingToken = deleteTokens.find(
        (obj) => obj.uri === imageUriKey
      ).token;

      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {
          text: 'Yes',
          onPress: async () => {
            await axios.post(`${CLOUD_URL}/delete_by_token`, {
              token: matchingToken,
            });
            setImgCount(imgCount - 1);
            // null bc image not physically deleted from the library, just the container
            onChangeImage(null);
            if (imgCount === 1) {
              setCoords([]);
            }
          },
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
        aspect: [4, 3],
        exif: true,
      });
      if (!result.cancelled) {
        if (result.exif.GPSLatitude && coords.length === 0) {
          setCoords([result.exif.GPSLongitude, result.exif.GPSLatitude]);
        }

        let newImage = {
          uri: result.uri,
          type: `test/${result.uri.split('.')[1]}`,
          name: `test.${result.uri.split('.')[1]}`,
        };
        handleUpload(newImage);
      }
    } catch (error) {
      console.log('Error reading the image');
    }
  };

  const handleUpload = async (image) => {
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', CLOUD_PRESET_A);
      data.append('folder', CLOUD_FOLDER_A);
      data.append('cloud_name', CLOUD_NAME);
      const response = await axios.post(`${CLOUD_URL}/image/upload`, data);
      const imageUriKey = response.data.url.split('/')[8].split('.')[0];
      setDeleteTokens([
        ...deleteTokens,
        { uri: imageUriKey, token: response.data.delete_token },
      ]);
      onChangeImage(response.data.url);
      setImgCount(imgCount + 1);
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
