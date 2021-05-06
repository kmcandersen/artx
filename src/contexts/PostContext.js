import React, { useReducer } from 'react';

const PostContext = React.createContext();

const postReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: `Post #${state.length + 1}`,
          text: 'Hello',
        },
      ];
    case 'REMOVE_POST':
      return state.filter((post) => post.id !== action.payload);

    default:
      return state;
  }
};

export const PostProvider = ({ children }) => {
  // posts = state
  const [posts, dispatch] = useReducer(postReducer, []);

  const addPost = () => dispatch({ type: 'ADD_POST' });

  const removePost = (id) => {
    dispatch({ type: 'REMOVE_POST', payload: id });
  };

  return (
    <PostContext.Provider value={{ data: posts, addPost, removePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
