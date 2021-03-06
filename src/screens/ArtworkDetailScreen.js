import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import PhotoSlider from '../components/PhotoSlider';
import BackIcon from '../components/BackIcon';
import ConfSnackbar from '../components/ConfSnackbar';
import { AppButtonOutlined } from '../components/AppButtons';
import AppText from '../components/AppText';
import { Content } from '../components/wrappers/Content';
import { colors, spacing } from '../config/theme';

import AuthContext from '../contexts/AuthContext';
import ArtworkContext from '../contexts/ArtworkContext';
import ArtistsContext from '../contexts/ArtistsContext';
import PointsMap from '../components/PointsMap';

// route.params.showSnackbar default from Navigator; route.params.showSnackbar & message set by callback when artwork edited
const ArtworkDetailScreen = ({ route, navigation }) => {
  const { id, artistId } = route.params;

  const { user } = useContext(AuthContext);
  const { artwork, removeArtwork } = useContext(ArtworkContext);
  const { artists } = useContext(ArtistsContext);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const toggleSnackBar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
      route.params.showSnackbar = false;
    }, 2000);
  };

  useEffect(() => {
    if (route.params.showSnackbar && route.params.snackbarMessage) {
      toggleSnackBar();
    }
  }, [route.params.showSnackbar]);

  const profileType = artistId === user.fbId ? 'user' : 'artist';

  let work = artwork ? artwork.find((a) => a._id === id) : {};
  let artist = artists ? artists.find((a) => a.fbId === artistId) : {};

  // can't destructure 'work' or app fails after removeArtwork
  const { name } = artist;

  const createDeleteAlert = () =>
    Alert.alert('Delete', 'Are you sure you want to delete this artwork?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          navigation.goBack();
          removeArtwork(work._id);
        },
        style: 'destructive',
      },
    ]);

  // if an indiv artwork is deleted, doesn't try to render DetailScreen; callback redirects to ArtworkList
  // if there's only 1 photo, slider is still needed, for tap to enlarge
  if (work) {
    return (
      <>
        <ScrollView bounces={false}>
          <BackIcon
            color='white'
            onPress={() => {
              route.params.prevScreen === 'artist'
                ? navigation.navigate('UserProfile')
                : navigation.goBack();
            }}
          />

          <View>
            {work.photoUrls && <PhotoSlider photos={work.photoUrls} />}
          </View>

          <Content>
            <AppText variant='header' addlStyle={{ color: colors.secondary }}>
              {work.title}
            </AppText>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('UserProfile', {
                  artistId,
                });
              }}
            >
              <AppText variant='subhead'>{name}</AppText>
            </TouchableOpacity>

            <AppText variant='item'>{work.address}</AppText>
            <AppText variant='item'>
              Year: {work.year ? work.year : 'NA'}
            </AppText>
            <AppText variant='copy'>
              About: {work.aboutText ? work.aboutText : 'NA'}
            </AppText>
            {profileType === 'user' && (
              <View style={styles.buttonRow}>
                <AppButtonOutlined
                  label='Delete Artwork'
                  onPress={createDeleteAlert}
                  width='regular'
                  outlineColor='secondary'
                  textColor='black'
                  icon='trash-can'
                />
                {/* formerly: id sent, used by .find in EditArtwork */}
                <AppButtonOutlined
                  label='Edit Artwork'
                  onPress={() => navigation.navigate('EditArtwork', { work })}
                  width='regular'
                  outlineColor='primary'
                  textColor='primary'
                  icon='pencil'
                />
              </View>
            )}
            {work.coords.length ? (
              <View style={styles.mapContainer}>
                <PointsMap
                  navigation={null}
                  data={[work]}
                  width='content'
                  height={200}
                />
              </View>
            ) : (
              <AppText variant='itemEmpty'>Location map not available</AppText>
            )}
          </Content>
        </ScrollView>
        <View>
          {snackbarVisible && (
            <ConfSnackbar message={route.params.snackbarMessage} />
          )}
        </View>
      </>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.section1,
  },
  mapContainer: {
    height: 200,
    marginTop: spacing.section1,
  },
});

export default ArtworkDetailScreen;
