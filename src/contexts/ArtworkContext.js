import React, { useReducer } from 'react';
import axios from 'axios';

const BASE_URL = 'https://rn-artx.herokuapp.com';
//const BASE_URL = 'https://localhost:3000';

const ArtworkContext = React.createContext();

const initialState = {
  artwork: [],
  error: '',
};

const artworkReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_ARTWORK':
      return { artwork: action.payload };
    case 'GET_ALL_ARTWORK_ERROR':
      return { error: action.payload };
    case 'ADD_ARTWORK':
      return [
        ...state.artwork,
        {
          artwork: {
            artistFbId: action.payload.artistFbId,
            title: action.payload.title,
            address: action.payload.address,
          },
        },
      ];
    case 'ADD_ARTWORK_ERROR':
      return { error: action.payload };
    case 'REMOVE_ARTWORK':
      const removedList = state.artwork.filter(
        (work) => work._id !== action.payload
      );
      return { artwork: removedList };
    case 'REMOVE_ARTWORK_ERROR':
      return { error: action.payload };
    case 'EDIT_ARTWORK':
      const editedList = state.artwork.map((work) =>
        work.id === action.payload.id
          ? {
              ...work,
              title: action.payload.title,
              address: action.payload.address,
            }
          : work
      );
      return { artwork: editedList };
    case 'EDIT_ARTWORK_ERROR':
      return { error: action.payload };
    default:
      return state;
  }
};

export const ArtworkProvider = ({ children }) => {
  const [artwork, dispatch] = useReducer(artworkReducer, initialState);

  const getArtwork = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/artwork`);
      dispatch({
        type: 'GET_ALL_ARTWORK',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_ALL_ARTWORK_ERROR',
        payload: `Artwork not fetched: ${error.message}`,
      });
    }
  };

  const addArtwork = async (artistFbId, title, address, callback) => {
    try {
      await axios.post(`${BASE_URL}/artwork`, {
        artistFbId,
        title,
        address,
      });
      dispatch({
        type: 'ADD_ARTWORK',
        payload: { artistFbId, title, address: address },
      });
      if (callback) callback();
    } catch (error) {
      dispatch({
        type: 'ADD_ARTWORK_ERROR',
        payload: `Artwork not added: ${error.message}`,
      });
    }
  };

  const removeArtwork = async (id, callback) => {
    try {
      await axios.delete(`${BASE_URL}/artwork/${id}`);
      dispatch({ type: 'REMOVE_ARTWORK', payload: id });
      if (callback) callback();
    } catch (error) {
      dispatch({
        type: 'REMOVE_ARTWORK_ERROR',
        payload: `Artwork not deleted: ${error.message}`,
      });
    }
  };

  const editArtwork = async (id, title, address, callback) => {
    try {
      await axios.patch(`${BASE_URL}/artwork/${id}`, { title, address });
      dispatch({
        type: 'EDIT_ARTWORK',
        payload: { id, title, address: address },
      });
      if (callback) callback();
    } catch (error) {
      dispatch({
        type: 'EDIT_ARTWORK_ERROR',
        payload: `Artwork not edited: ${error.message}`,
      });
    }
  };

  return (
    <ArtworkContext.Provider
      value={{
        data: artwork,
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
