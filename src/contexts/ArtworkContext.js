import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/vars';

const ArtworkContext = React.createContext();

export const ArtworkProvider = ({ children }) => {
  const [artwork, setArtwork] = useState([]);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [deleteTokens, setDeleteTokens] = useState([]);
  const [currYear, setCurrYear] = useState(0);

  const getArtwork = async () => {
    try {
      setCurrYear(new Date().getFullYear());
      setError(null);
      const response = await axios.get(`${BASE_URL}/artwork`);
      setArtwork(response.data);
    } catch (error) {
      setError(error.toString());
    }
  };

  const addArtwork = async ({
    artistFbId,
    title,
    address,
    year,
    aboutText,
    tags,
    photoUrls,
    callback,
  }) => {
    try {
      setError(null);
      const newArtwork = await axios.post(`${BASE_URL}/artwork`, {
        artistFbId,
        title,
        address,
        year,
        aboutText,
        tags,
        photoUrls,
        coords,
      });
      setArtwork({ ...artwork, newArtwork });
      setCoords([]);
      setDeleteTokens([]);
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

  const editArtwork = async ({ id, callback, ...otherProps }) => {
    try {
      setError(null);
      const { data } = await axios.patch(
        `${BASE_URL}/artwork/${id}`,
        otherProps
      );
      const editedList = artwork.map((work) =>
        work.id === id
          ? {
              ...work,
              data,
              // title: title,
              // address: address,
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
        coords,
        imgCount,
        setImgCount,
        setCoords,
        deleteTokens,
        setDeleteTokens,
        currYear,
        setCurrYear,
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
