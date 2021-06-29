import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/vars';

const ArtworkContext = React.createContext();

export const ArtworkProvider = ({ children }) => {
  const [artwork, setArtwork] = useState([]);
  const [artworkError, setArtworkError] = useState(null);
  const [coords, setCoords] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [deleteTokens, setDeleteTokens] = useState([]);
  const [currYear, setCurrYear] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const getArtwork = async () => {
    try {
      setCurrYear(new Date().getFullYear());
      setIsLoading(true);
      setArtworkError(null);
      const response = await axios.get(`${BASE_URL}/artwork`);
      setArtwork(response.data);
      if (artwork) {
        setIsLoading(false);
      }
    } catch (error) {
      setArtworkError(error.toString());
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
      setArtworkError(null);
      const { data } = await axios.post(`${BASE_URL}/artwork`, {
        artistFbId,
        title,
        address,
        year,
        aboutText,
        tags,
        photoUrls,
        coords,
      });
      setArtwork([...artwork, data]);
      setCoords([]);
      setImgCount(0);
      setDeleteTokens([]);
      if (callback) {
        callback();
      }
    } catch (error) {
      setArtworkError(error.toString());
    }
  };

  const removeArtwork = async (id, callback) => {
    try {
      setArtworkError(null);
      await axios.delete(`${BASE_URL}/artwork/${id}`);
      const updatedList = artwork.filter((work) => work._id !== id);
      setArtwork(updatedList);

      if (callback) {
        callback();
      }
    } catch (error) {
      setArtworkError(error.toString());
    }
  };

  const editArtwork = async ({ id, callback, ...otherProps }) => {
    try {
      setArtworkError(null);
      const { data } = await axios.patch(
        `${BASE_URL}/artwork/${id}`,
        otherProps
      );
      const editedList = artwork.map((work) =>
        work._id === id
          ? {
              ...data,
            }
          : work
      );
      setArtwork(editedList);
      if (callback) callback();
    } catch (error) {
      setArtworkError(error.toString());
    }
  };

  return (
    <ArtworkContext.Provider
      value={{
        artwork,
        artworkError,
        setArtworkError,
        coords,
        imgCount,
        setImgCount,
        setCoords,
        deleteTokens,
        setDeleteTokens,
        currYear,
        setCurrYear,
        screenWidth,
        setScreenWidth,
        getArtwork,
        addArtwork,
        removeArtwork,
        editArtwork,
        isLoading,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export default ArtworkContext;
