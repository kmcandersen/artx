import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.6;

const PhotoSlider = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState(0);

  const changePhoto = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== activePhoto) {
      setActivePhoto(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={changePhoto}
        scrollEventThrottle={0}
        style={styles.container}
      >
        {photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.photo} />
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {photos.map((i, k) => (
          <Text
            key={k}
            style={k === activePhoto ? styles.dotActive : styles.dot}
          >
            •
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  dot: {
    fontSize: width / 10,
    color: '#888',
    margin: 3,
  },
  dotActive: {
    fontSize: width / 10,
    color: '#fff',
    margin: 3,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  photo: {
    width,
    height,
    resizeMode: 'cover',
  },
});

export default PhotoSlider;
