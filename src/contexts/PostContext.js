import React, { useReducer } from 'react';
import axios from 'axios';

const BASE_URL = 'https://rn-artx.herokuapp.com';
//const BASE_URL = 'https://localhost:3000';

const PostContext = React.createContext();

const postReducer = (state, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return action.payload;
    case 'ADD_POST':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          artistFbId: action.payload.artistFbId,
          title: action.payload.title,
          text: action.payload.text,
        },
      ];
    case 'REMOVE_POST':
      return state.filter((post) => post.id !== action.payload);
    case 'EDIT_POST':
      return state.map((post) =>
        post.id === action.payload.id
          ? { ...post, title: action.payload.title, text: action.payload.text }
          : post
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

export const PostProvider = ({ children }) => {
  // posts = state
  const [posts, dispatch] = useReducer(postReducer, []);

  const getPosts = async () => {
    const response = await axios.get(`${BASE_URL}/artwork`);
    dispatch({ type: 'GET_POSTS', payload: response.data });
  };

  const addPost = async (artistFbId, title, address, callback) => {
    await axios.post(`${BASE_URL}/artwork`, { artistFbId, title, address });
    dispatch({
      type: 'ADD_POST',
      payload: { artistFbId, title, text: address },
    });
    if (callback) callback();
  };

  const removePost = async (id, callback) => {
    await axios.delete(`${BASE_URL}/artwork/${id}`);
    dispatch({ type: 'REMOVE_POST', payload: id });
    if (callback) callback();
  };

  const editPost = async (id, title, address, callback) => {
    await axios.patch(`${BASE_URL}/artwork/${id}`, { title, address });
    dispatch({ type: 'EDIT_POST', payload: { id, title, text: address } });
    if (callback) callback();
  };

  return (
    <PostContext.Provider
      value={{ data: posts, getPosts, addPost, removePost, editPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
