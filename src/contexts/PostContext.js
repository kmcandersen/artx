import React, { useReducer } from 'react';

const PostContext = React.createContext();

const postReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
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

const initialPosts = [
  { id: 123, title: 'Hellow wrld', text: "Is it me you're looking for?" },
  {
    id: 456,
    title: 'My name is Kramer',
    text: 'These pretzels are making me thirsty!',
  },
  {
    id: 789,
    title: 'Allo, guvnur',
    text: 'Bears R awesome',
  },
];

export const PostProvider = ({ children }) => {
  // posts = state
  const [posts, dispatch] = useReducer(postReducer, initialPosts);

  const addPost = (title, text, callback) => {
    dispatch({ type: 'ADD_POST', payload: { title, text } });
    if (callback) callback();
  };

  const removePost = (id) => {
    dispatch({ type: 'REMOVE_POST', payload: id });
  };

  const editPost = (id, title, text, callback) => {
    dispatch({ type: 'EDIT_POST', payload: { id, title, text } });
    if (callback) callback();
  };

  return (
    <PostContext.Provider
      value={{ data: posts, addPost, removePost, editPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
