import React, { useContext, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

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
  const { name, email, city, state, country, aboutMe, moreInfo } = loggedInUser;

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
      <Text>{name}</Text>
      <Text>{email}</Text>
      <Text>
        Based in: {city}, {state}, {country}
      </Text>
      <Text>About me: {aboutMe}</Text>
      <Text>More info: {moreInfo}</Text>

      {userArt.length ? (
        <FlatList
          data={userArt}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <Text>{item.title}</Text>;
          }}
        />
      ) : (
        <Text>NO artwork for this user</Text>
      )}

      <AppButton
        title='Add New Artwork'
        onPress={() => navigation.navigate('CreateArtwork')}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default UserProfileScreen;
