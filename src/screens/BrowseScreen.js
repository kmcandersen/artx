import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import ArtworkContext from '../contexts/ArtworkContext';
import ArtistsContext from '../contexts/ArtistsContext';
import AuthContext from '../contexts/AuthContext';

import AppText from '../components/AppText';
import { Content } from '../components/wrappers/Content';
import Screen from '../components/wrappers/Screen';
import { colors, spacing } from '../config/theme';

const { height, width } = Dimensions.get('window');
const listHeight = height * 0.7;
const listWidth = width - spacing.content * 2;

const BrowseScreen = ({ navigation }) => {
  const { artwork, artworkError, setArtworkError, isLoading } =
    useContext(ArtworkContext);
  const { artists } = useContext(ArtistsContext);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    // data loading, not auth, error
    if (artworkError) {
      Alert.alert('Error', 'An error has occurred.', [
        {
          text: 'Try Again',
          onPress: () => {
            // wo user, !isAuthenticated & app redirects to WelcomeScreen
            setUser(null);
            setArtworkError(null);
          },
        },
      ]);
    }
  }, [artworkError]);

  // need list of artists with artwork (not all registered users); a unique list of artistFbId's & their profilePhotoUrl's
  // loop thru artists, if found (once) in artwork (work.artistFbId), save artist.fbId and artist.profilePhotoUrl to artistList

  let getArtistList = () => {
    let result = [];
    artists.forEach((a) => {
      if (artwork.find((work) => work.artistFbId === a.fbId)) {
        result.push({
          artistId: a.fbId,
          initials: a.initials,
          profilePhotoUrl: a.profilePhotoUrl || [],
        });
      }
    });
    return result;
  };

  const artistList = artists && artwork ? getArtistList() : [];

  {
    if (isLoading && !artworkError) {
      return (
        <Screen>
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              style={styles.loading}
              size={50}
              animating={true}
              color={colors.secondary}
            />
          </View>
        </Screen>
      );
    } else if (!isLoading && !artworkError) {
      return (
        <Screen>
          <ScrollView>
            <AppText
              variant='category'
              addlStyle={{
                paddingLeft: spacing.content,
                paddingTop: Platform.OS === 'ios' ? spacing.section3 : 0,
              }}
            >
              All Artists
            </AppText>
            <FlatList
              data={artistList}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.artistId}
              style={styles.artistPhotosContainer}
              contentContainerStyle={styles.alignRowItems}
              renderItem={({ item }) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UserProfile', {
                          artistId: item.artistId,
                        })
                      }
                      activeOpacity={0.6}
                    >
                      {item.profilePhotoUrl.length ? (
                        <Image
                          source={{ uri: item.profilePhotoUrl[0] }}
                          style={styles.profilePhoto}
                        />
                      ) : (
                        <Avatar.Text
                          size={90}
                          label={item.initials}
                          color={colors.white}
                          style={{
                            backgroundColor: colors.primary,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </>
                );
              }}
              // adds padding to right of last item
              ListFooterComponent={<View style={{ width: 44 }}></View>}
            />
            <Content>
              <AppText
                variant='category'
                addlStyle={{
                  paddingTop: spacing.section3,
                }}
              >
                All Artwork
              </AppText>
              <ScrollView style={styles.list} nestedScrollEnabled={true}>
                {artwork.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                      navigation.navigate('ArtworkDetail', {
                        id: item._id,
                        artistId: item.artistFbId,
                      });
                    }}
                    activeOpacity={0.6}
                  >
                    {item._id && (
                      <ImageBackground
                        source={{ uri: item.photoUrls[0] }}
                        style={styles.listRow}
                        imageStyle={{ borderRadius: 5 }}
                      >
                        {item.title && (
                          <AppText
                            variant='subheadTitle'
                            addlStyle={styles.title}
                          >
                            {item.title}
                          </AppText>
                        )}
                      </ImageBackground>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Content>
          </ScrollView>
        </Screen>
      );
    } else if (artworkError) {
      return null;
    }
  }
};

const styles = StyleSheet.create({
  artistPhotosContainer: {
    paddingLeft: spacing.content,
  },
  alignRowItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 90,
    margin: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listRow: {
    paddingVertical: 20,
    marginVertical: 7,
    width: listWidth,
    justifyContent: 'center',
  },
  list: {
    height: listHeight,
    width: width,
  },
  title: {
    paddingHorizontal: spacing.content,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 7,
  },
});

export default BrowseScreen;
