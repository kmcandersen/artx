import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../config/theme';
import Screen from './wrappers/Screen';

const { width } = Dimensions.get('window');
const thumbHeight = width * 0.7;

const PhotoSlider = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const changePhoto = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== activePhoto) {
      setActivePhoto(slide);
    }
  };

  return (
    <View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={changePhoto}
        scrollEventThrottle={0}
        style={styles.container}
      >
        {photos.map((photo, index) => (
          <View key={index}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide'>
              <Screen>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => setModalVisible(false)}
                >
                  <AntDesign name='closecircleo' size={30} color='black' />
                </TouchableOpacity>
                {/* <Button title='Close' onPress={() => setModalVisible(false)} /> */}
                <View style={styles.photoEnlargedContainer}>
                  <ImageBackground
                    source={{ uri: photos[activePhoto] }}
                    style={styles.photoEnlarged}
                    //resizeMode={'center'}
                  ></ImageBackground>
                </View>
              </Screen>
            </Modal>
          </View>
        ))}
      </ScrollView>
      {photos.length > 1 && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    fontSize: width / 10,
    color: colors.mediumLight,
    margin: 3,
  },
  dotActive: {
    fontSize: width / 10,
    color: colors.white,
    margin: 3,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 30,
    top: 10,
    zIndex: 1,
  },
  photo: {
    width,
    height: thumbHeight,
    resizeMode: 'cover',
  },
  photoEnlarged: {
    height: width,
    // aspect ratio = 4:3
    width: width * 1.33,
    transform: [{ rotate: '90deg' }],
  },
  photoEnlargedContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhotoSlider;
