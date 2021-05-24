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
import ArtworkContext from '../contexts/ArtworkContext';

function ImageInput({ imageUri, onChangeImage }) {
  const { coords, setCoords, imgCount, setImgCount } =
    useContext(ArtworkContext);

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
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {
          text: 'Yes',
          // null bc image not physically deleted from the library, just the container
          onPress: () => {
            setImgCount(imgCount - 1);
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
      data.append('upload_preset', 'rn-artx');
      data.append('cloud_name', 'kmcandersen');
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/kmcandersen/image/upload`,
        data
      );
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
