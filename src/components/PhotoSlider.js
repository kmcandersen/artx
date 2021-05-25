import React, { useState } from 'react';
import {
  Button,
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
import Screen from './Screen';

const { width } = Dimensions.get('window');
const thumbHeight = width * 0.6;

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
          <View key={index}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide'>
              <Screen>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <AntDesign
                    name='closecircleo'
                    size={30}
                    color='black'
                    style={styles.icon}
                  />
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
    height: thumbHeight,
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
  //   icon: {
  //     position: 'absolute',
  //     right: 30,
  //     top: 10,
  //   },
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
