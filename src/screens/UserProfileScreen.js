import React, { useContext } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import PointsMap from '../components/PointsMap';

import AuthContext from '../contexts/AuthContext';
import ArtistsContext from '../contexts/ArtistsContext';
import ArtworkContext from '../contexts/ArtworkContext';

// from Bottom Tab: no route passed in. from elsewhere: route.params.artistId
const UserProfileScreen = ({ navigation, route }) => {
  const { user, onLogout } = useContext(AuthContext);
  const { artists } = useContext(ArtistsContext);
  const { artwork } = useContext(ArtworkContext);

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
    state ? (result += `, ${state}`) : '';
    country ? (result += `, ${country}`) : '';
    if (result === '') result = 'NA';
    return result;
  };

  return (
    <Screen>
      <View style={styles.profilePhotoContainer}>
        <Image source={{ uri: profilePhotoUrl }} style={styles.profilePhoto} />
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
        <View style={styles.testBorder}>
          <Text>
            More info:{' '}
            <TouchableOpacity
              style={styles.testBorder}
              onPress={() => Linking.openURL(`https://www.${moreInfo}`)}
            >
              <Text>{moreInfo}</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <Text>Artwork</Text>
      {profileArtwork.length ? (
        <View style={styles.artPhotoContainer}>
          <FlatList
            data={profileArtwork}
            keyExtractor={(item) => item._id}
            numColumns={4}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
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
            }}
          />
        </View>
      ) : (
        <Text>You haven't added any artwork</Text>
      )}
      {profileType === 'user' && (
        <AppButton
          title='Add New Artwork'
          onPress={() => navigation.navigate('CreateArtwork')}
        />
      )}

      <View style={styles.mapContainer}>
        <PointsMap navigation={navigation} data={profileArtwork} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  artPhoto: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  artPhotoContainer: { alignItems: 'flex-start' },
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
  testBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  // textLink: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
});

export default UserProfileScreen;
