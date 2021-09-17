import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { AppButtonOutlined } from '../components/AppButtons';
import AppText from '../components/AppText';
import BackIcon from '../components/BackIcon';
import ConfSnackbar from '../components/ConfSnackbar';
import { Content } from '../components/wrappers/Content';
import PointsMap from '../components/PointsMap';
import { colors, spacing } from '../config/theme';

import AuthContext from '../contexts/AuthContext';
import ArtistsContext from '../contexts/ArtistsContext';
import ArtworkContext from '../contexts/ArtworkContext';

const { width } = Dimensions.get('window');
// from Bottom Tab: no route passed in. from elsewhere: route.params.artistId
// route.params.showSnackbar default from Navigators; route.params.showSnackbar & message set by callback when artwork added or artist edited
const UserProfileScreen = ({ navigation, route }) => {
  const { user, onLogout } = useContext(AuthContext);
  const { artists } = useContext(ArtistsContext);
  const { artwork } = useContext(ArtworkContext);

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

  const { artistId } = route.params || '';
  // if no artistId passed in w/route (coming from bottom tab) OR the artistId === id of logged in user, 'artist' is the logged-in user and can add artwork, edit their profile, & log out
  const profileType =
    artistId === undefined || artistId === user.fbId ? 'user' : 'artist';
  const profileId = profileType === 'user' ? user.fbId : artistId;

  const profileArtwork = artwork
    ? artwork.filter((a) => a.artistFbId === profileId)
    : [];

  const profileInfo = artists ? artists.find((a) => a.fbId === profileId) : {};

  const {
    name,
    initials,
    email,
    displayEmail,
    city,
    state,
    country,
    aboutMe,
    moreInfo,
    profilePhotoUrl,
  } = profileInfo;

  const createLogoutAlert = () =>
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: () => onLogout(),
        style: 'destructive',
      },
    ]);

  const basedIn = () => {
    let result = '';
    result = city ? (result += city) : '';
    state && state !== 'Other' ? (result += `, ${state}`) : '';
    country ? (result += `, ${country}`) : '';
    if (result === '') result = 'NA';
    return result;
  };

  return (
    <>
      <ScrollView>
        <Content>
          {/* Back button only visible if screen not accessed from bottom Tab */}
          {artistId !== undefined && (
            <BackIcon color='black' onPress={() => navigation.goBack()} />
          )}
          <View style={styles.profilePhotoContainer}>
            {profilePhotoUrl[0] ? (
              <Image
                source={{ uri: profilePhotoUrl[0] }}
                style={styles.profilePhoto}
              />
            ) : (
              <Avatar.Text
                size={90}
                label={initials}
                color={colors.white}
                style={{
                  backgroundColor: colors.primary,
                }}
              />
            )}
          </View>
          {profileType === 'user' && (
            <TouchableOpacity
              style={styles.logoutIcon}
              activeOpacity={1}
              onPress={createLogoutAlert}
            >
              <MaterialIcons
                name='logout'
                size={30}
                color={colors.dark}
                style={{ opacity: 0.7 }}
              />
            </TouchableOpacity>
          )}

          <>
            <AppText variant='header' addlStyle={{ color: colors.primary }}>
              {name}
            </AppText>
            {profileType === 'user' || displayEmail ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  Linking.openURL(`mailto:${email}`).catch((error) =>
                    console.log(error)
                  )
                }
              >
                <AppText variant='item'>{email}</AppText>
              </TouchableOpacity>
            ) : null}

            <AppText variant='item'>Based in: {basedIn()}</AppText>
            <AppText variant='copy'>
              About Me: {aboutMe ? aboutMe : 'NA'}
            </AppText>
            <View style={styles.textLinkRow}>
              <AppText variant='item'>More info: </AppText>
              {moreInfo ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => Linking.openURL(`https://www.${moreInfo}`)}
                >
                  <AppText variant='item'>{moreInfo}</AppText>
                </TouchableOpacity>
              ) : (
                <AppText variant='item'>NA</AppText>
              )}
            </View>
          </>
          {profileType === 'user' && (
            <View style={styles.buttonRow}>
              <AppButtonOutlined
                label='Add Artwork'
                onPress={() => navigation.navigate('CreateArtwork')}
                width='regular'
                outlineColor='primary'
                textColor='primary'
                icon='plus'
              />
              <AppButtonOutlined
                label='Edit Profile'
                onPress={() =>
                  navigation.navigate('EditUser', { profile: profileInfo })
                }
                width='regular'
                outlineColor='secondary'
                textColor='black'
                icon='pencil'
              ></AppButtonOutlined>
            </View>
          )}
          {/* profileType === 'user': button row adds vertical spacing */}
          <AppText
            variant='category'
            addlStyle={{
              paddingTop: Number(
                `${profileType === 'artist' ? spacing.section1 : 0}`
              ),
            }}
          >
            My Artwork
          </AppText>

          <View>
            {profileArtwork.length ? (
              <View style={styles.artPhotoContainer}>
                {profileArtwork.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() =>
                        navigation.navigate('ArtworkDetail', {
                          id: item._id,
                          artistId: item.artistFbId,
                          prevScreen: 'artist',
                        })
                      }
                    >
                      <Image
                        style={styles.artPhoto}
                        source={{ uri: item.photoUrls[0] }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <AppText variant='itemEmpty'>
                You haven't added any artwork
              </AppText>
            )}
          </View>
          {profileArtwork.length &&
          profileArtwork.find((el) => el.coords.length) ? (
            <View style={styles.mapContainer}>
              <PointsMap
                navigation={navigation}
                data={profileArtwork}
                width='content'
                height={300}
              />
            </View>
          ) : profileArtwork.length ? (
            <AppText variant='itemEmpty'>Location map not available</AppText>
          ) : null}
        </Content>
      </ScrollView>
      <View>
        {snackbarVisible && (
          <ConfSnackbar message={route.params.snackbarMessage} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  artPhoto: {
    // represents horiz padding from Content wrapper
    width: (width - spacing.content * 2) / 4,
    height: (width - spacing.content * 2) / 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.background,
  },
  artPhotoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: spacing.section1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.section1,
    marginBottom: spacing.section3,
  },
  mapContainer: {
    height: 300,
    marginTop: spacing.section1,
  },
  textLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  // coordinated with position of BackIcon:
  profilePhotoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 64,
    height: 120,
  },
  logoutIcon: {
    position: 'absolute',
    top: 64,
    right: spacing.content,
  },
});

export default UserProfileScreen;
