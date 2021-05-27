import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://rn-artx.herokuapp.com';
//const BASE_URL = 'https://localhost:3000';

const ArtistsContext = React.createContext();

export const ArtistsProvider = ({ children }) => {
  const [artists, setArtists] = useState();
  const [oneArtist, setOneArtist] = useState({});
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

  const getOneArtist = async (id) => {
    try {
      setError(null);
      const response = await axios.get(`${BASE_URL}/artists/${id}`);
      setOneArtist(response.data);
    } catch (error) {
      setError(error.toString());
    }
  };

  const addArtist = async ({ fbId, name, email }) => {
    try {
      setError(null);
      const newArtist = await axios.post(`${BASE_URL}/artists`, {
        fbId,
        name,
        email,
      });
      setArtists({ ...artists, newArtist });
    } catch (error) {
      setError(error.toString());
    }
  };

  const editArtist = async ({ id, callback, ...otherProps }) => {
    try {
      setError(null);
      const { data } = await axios.patch(
        `${BASE_URL}/artists/${id}`,
        otherProps
      );
      const editedList = artists.map((work) =>
        work.id === id
          ? {
              ...work,
              data,
            }
          : work
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
        artistError,
        getArtists,
        oneArtist,
        getOneArtist,
        addArtist,
        editArtist,
      }}
    >
      {children}
    </ArtistsContext.Provider>
  );
};

export default ArtistsContext;
