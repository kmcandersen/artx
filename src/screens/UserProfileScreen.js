import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

import AuthContext from '../contexts/AuthContext';
import ArtistsContext from '../contexts/ArtistsContext';
import ArtworkContext from '../contexts/ArtworkContext';

const UserProfileScreen = ({ navigation }) => {
  const { user, onLogout } = useContext(AuthContext);
  const { artists } = useContext(ArtistsContext);
  const { artwork } = useContext(ArtworkContext);

  // will need a useEffect for artists once Edit func implemented (& Create Artwork)
  // MUST acct for if loggedInUser has nothing in artwork array
  // render thumbnails of artwork & send info if one is clicked
  const loggedInUser = artists ? artists.find((a) => a.fbId === user.fbId) : {};
  const loggedInUserArtwork = artwork
    ? artwork.filter((a) => a.artistFbId === user.fbId)
    : [];

  const { name, email, city, state, country, aboutMe, moreInfo } = loggedInUser;

  if (loggedInUserArtwork) {
    return (
      <Screen>
        {loggedInUserArtwork[0] ? (
          <>
            <Text>SAMPLE TITLE:{loggedInUserArtwork[0].title}</Text>
            <Text>SAMPLE COORD:{loggedInUserArtwork[0].coords[0]}</Text>
            <Text>{name}</Text>
            <Text>{email}</Text>
            <Text>
              Based in: {city}, {state}, {country}
            </Text>
            <Text>About me: {aboutMe}</Text>
            <Text>More info: {moreInfo}</Text>
          </>
        ) : (
          <Text>NO artwork for this user</Text>
        )}

        <AppButton
          title='Log Out'
          onPress={() => {
            onLogout();
          }}
        />
      </Screen>
    );
  }
  return null;
};

const styles = StyleSheet.create({});

export default UserProfileScreen;
