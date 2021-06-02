import React, { useContext, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import PointsMap from '../components/PointsMap';

import AuthContext from '../contexts/AuthContext';
import ArtistsContext from '../contexts/ArtistsContext';
import ArtworkContext from '../contexts/ArtworkContext';

const UserProfileScreen = ({ navigation }) => {
  const { user, onLogout } = useContext(AuthContext);
  const { artists } = useContext(ArtistsContext);
  const { artwork } = useContext(ArtworkContext);

  // will need a useEffect for artists once EditArtist func implemented?
  // MUST acct for if loggedInUser has nothing in artwork array
  // render thumbnails of artwork & send info if one is clicked

  let userArt = artwork
    ? artwork.filter((a) => a.artistFbId === user.fbId)
    : [];

  const loggedInUser = artists ? artists.find((a) => a.fbId === user.fbId) : {};
  const {
    name,
    email,
    city,
    state,
    country,
    aboutMe,
    moreInfo,
    profilePhotoUrl,
  } = loggedInUser;

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

  return (
    <Screen>
      <View style={styles.profilePhotoContainer}>
        <Image source={{ uri: profilePhotoUrl }} style={styles.profilePhoto} />
      </View>

      <View>
        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>
          Based in: {city}, {state}, {country}
        </Text>
        <Text>About me: {aboutMe}</Text>
        <Text>More info: {moreInfo}</Text>
      </View>

      <Text>Artwork</Text>
      {userArt.length ? (
        <View style={styles.artPhotoContainer}>
          <FlatList
            data={userArt}
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
        <Text>NO artwork for this user</Text>
      )}

      <AppButton
        title='Add New Artwork'
        onPress={() => navigation.navigate('CreateArtwork')}
      />

      <View style={styles.mapContainer}>
        <PointsMap navigation={navigation} data={userArt} />
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
});

export default UserProfileScreen;
