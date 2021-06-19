import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import { Avatar } from 'react-native-paper';

import { AppButtonOutlined } from '../components/AppButtons';
import Screen from '../components/Screen';
import PointsMap from '../components/PointsMap';
import ConfSnackbar from '../components/ConfSnackbar';

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

  profileType === 'user' &&
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              onLogout();
            }}
          >
            <Text>LOG OUT</Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

  const basedIn = () => {
    let result = '';
    result = city ? (result += city) : '';
    state && state !== 'Other' ? (result += `, ${state}`) : '';
    country ? (result += `, ${country}`) : '';
    if (result === '') result = 'NA';
    return result;
  };

  return (
    <Screen>
      <ScrollView>
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
              color='white'
              style={{
                backgroundColor: '#0336FF',
              }}
            />
          )}
        </View>
        <View>
          <Text>{name}</Text>
          {profileType === 'user' || displayEmail ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`mailto:${email}`).catch((error) =>
                  console.log(error)
                )
              }
            >
              <Text>{email}</Text>
            </TouchableOpacity>
          ) : null}

          <Text>Based in: {basedIn()}</Text>
          <Text>About Me: {aboutMe}</Text>
          <View style={[styles.textLinkRow]}>
            <Text>More info: </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`https://www.${moreInfo}`)}
            >
              <Text>{moreInfo}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>Artwork</Text>

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
            <Text>You haven't added any artwork</Text>
          )}
        </View>

        {profileType === 'user' && (
          <AppButtonOutlined
            label='Add Artwork'
            onPress={() => navigation.navigate('CreateArtwork')}
            width='regular'
            outlineColor='primary'
            textColor='primary'
            icon='plus'
          />
        )}
        {profileType === 'user' && (
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
        )}

        <View style={styles.mapContainer}>
          <PointsMap navigation={navigation} data={profileArtwork} />
        </View>
        {snackbarVisible && (
          <ConfSnackbar message={route.params.snackbarMessage} />
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  artPhoto: {
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },

  artPhotoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mapContainer: {
    height: 300,
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  textLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserProfileScreen;
