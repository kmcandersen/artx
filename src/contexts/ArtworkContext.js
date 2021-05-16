import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://rn-artx.herokuapp.com';
//const BASE_URL = 'https://localhost:3000';

const ArtworkContext = React.createContext();

export const ArtworkProvider = ({ children }) => {
  const [artwork, setArtwork] = useState([]);
  const [error, setError] = useState(null);

  const getArtwork = async () => {
    try {
      setError(null);
      const response = await axios.get(`${BASE_URL}/artwork`);
      setArtwork(response.data);
    } catch (error) {
      setError(error.toString());
    }
  };

  const addArtwork = async ({ artistFbId, title, address, callback }) => {
    try {
      setError(null);
      const newArtwork = await axios.post(`${BASE_URL}/artwork`, {
        artistFbId,
        title,
        address,
      });
      setArtwork({ ...artwork, newArtwork });
      if (callback) callback();
    } catch (error) {
      setError(error.toString());
    }
  };

  const removeArtwork = async (id, callback) => {
    try {
      setError(null);
      await axios.delete(`${BASE_URL}/artwork/${id}`);
      const updatedList = artwork.filter((work) => work._id !== id);
      setArtwork(updatedList);

      if (callback) callback();
    } catch (error) {
      setError(error.toString());
    }
  };

  const editArtwork = async (id, title, address, callback) => {
    try {
      setError(null);
      await axios.patch(`${BASE_URL}/artwork/${id}`, { title, address });
      const editedList = artwork.map((work) =>
        work.id === id
          ? {
              ...work,
              title: title,
              address: address,
            }
          : work
      );
      setArtwork(editedList);

      if (callback) callback();
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <ArtworkContext.Provider
      value={{
        artwork,
        error,
        getArtwork,
        addArtwork,
        removeArtwork,
        editArtwork,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
