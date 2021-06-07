import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  imageType,
}) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
                imageType={imageType}
              />
            </View>
          ))}
          {/* Users can only add 1 profile pic, but multiple artwork images. Option to add a profile pic only available if they haven't selected/submitted one yet. Users can delete selected photo before submission. */}
          {!imageUris.length || imageType === 'artwork' ? (
            <ImageInput
              onChangeImage={(uri) => onAddImage(uri)}
              imageType={imageType}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
