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
      return { artwork: action.payload, error: '' };
    case 'GET_ALL_ARTWORK_ERROR':
      return { artwork: [], error: action.payload };
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
    case 'REMOVE_ARTWORK':
      const removedList = state.artwork.filter(
        (work) => work._id !== action.payload
      );
      return { artwork: removedList };
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

    default:
      return state;
  }
};

export const ArtworkProvider = ({ children }) => {
  const [artwork, dispatch] = useReducer(artworkReducer, initialState);

  const getArtwork = async () => {
    try {
      const response = await axios.get(`https://rn-art.herokuapp.com/artwork`);
      dispatch({ type: 'GET_ALL_ARTWORK', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'GET_ALL_ARTWORK_ERROR',
        payload: `Artwork not fetched: ${error.message}`,
      });
    }
  };

  const addArtwork = async (artistFbId, title, address, callback) => {
    await axios.post(`${BASE_URL}/artwork`, { artistFbId, title, address });
    dispatch({
      type: 'ADD_ARTWORK',
      payload: { artistFbId, title, address: address },
    });
    if (callback) callback();
  };

  const removeArtwork = async (id, callback) => {
    await axios.delete(`${BASE_URL}/artwork/${id}`);
    dispatch({ type: 'REMOVE_ARTWORK', payload: id });
    if (callback) callback();
  };

  const editArtwork = async (id, title, address, callback) => {
    await axios.patch(`${BASE_URL}/artwork/${id}`, { title, address });
    dispatch({
      type: 'EDIT_ARTWORK',
      payload: { id, title, address: address },
    });
    if (callback) callback();
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
