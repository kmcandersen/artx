import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/vars';

const ArtistsContext = React.createContext();

export const ArtistsProvider = ({ children }) => {
  const [artists, setArtists] = useState();
  const [artistError, setError] = useState(null);

  const getArtists = async () => {
    try {
      setError(null);
      const response = await axios.get(`${BASE_URL}/artists`);
      setArtists(response.data);
    } catch (error) {
      setError(error.toString());
    }
  };

  // moved to ArtistProfileScreen & ArtworkDetailScreen
  // const getOneArtist = async (id) => {
  //   try {
  //     setSelectedArtist({});
  //     setError(null);
  //     const response = await axios.get(`${BASE_URL}/artists/${id}`);
  //     setSelectedArtist(response.data);
  //   } catch (error) {
  //     setError(error.toString());
  //   }
  // };

  // moved to AuthContext
  // const addArtist = async ({ fbId, name, email }) => {
  //   try {
  //     setError(null);
  //     const newArtist = await axios.post(`${BASE_URL}/artists`, {
  //       fbId,
  //       name,
  //       email,
  //     });
  //     setArtists({ ...artists, newArtist });
  //   } catch (error) {
  //     setError(error.toString());
  //   }
  // };

  const editArtist = async ({ id, callback, ...otherProps }) => {
    try {
      setError(null);
      const { data } = await axios.patch(
        `${BASE_URL}/artists/${id}`,
        otherProps
      );
      const editedList = artists.map((user) =>
        user.fbId === id
          ? {
              ...data,
            }
          : user
      );
      setArtists(editedList);

      if (callback) callback();
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <ArtistsContext.Provider
      value={{
        artists,
        setArtists,
        artistError,
        getArtists,
        editArtist,
      }}
    >
      {children}
    </ArtistsContext.Provider>
  );
};

export default ArtistsContext;
