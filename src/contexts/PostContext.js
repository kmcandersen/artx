import React, { useReducer } from 'react';
import axios from 'axios';

const BASE_URL = 'https://rn-artx.herokuapp.com';
//const BASE_URL = 'https://localhost:3000';

const ArtworkContext = React.createContext();

const artworkReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_ARTWORK':
      return action.payload;
    case 'ADD_ARTWORK':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          artistFbId: action.payload.artistFbId,
          title: action.payload.title,
          address: action.payload.address,
        },
      ];
    case 'REMOVE_ARTWORK':
      return state.filter((work) => work.id !== action.payload);
    case 'EDIT_ARTWORK':
      return state.map((work) =>
        work.id === action.payload.id
          ? {
              ...work,
              title: action.payload.title,
              address: action.payload.address,
            }
          : work
      );

    default:
      return state;
  }
};

// const initialPosts = [
//   { id: 123, title: 'Hellow wrld', text: "Is it me you're looking for?" },
//   {
//     id: 456,
//     title: 'My name is Kramer',
//     text: 'These pretzels are making me thirsty!',
//   },
//   {
//     id: 789,
//     title: 'Allo, guvnur',
//     text: 'Bears R awesome',
//   },
// ];

export const ArtworkProvider = ({ children }) => {
  // artwork = state
  const [artwork, dispatch] = useReducer(artworkReducer, []);

  const getArtwork = async () => {
    const response = await axios.get(`${BASE_URL}/artwork`);
    dispatch({ type: 'GET_ALL_ARTWORK', payload: response.data });
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
