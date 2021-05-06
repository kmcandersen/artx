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
    // case 'EDIT_POST':
    //   return state.map((post) =>
    //     post.id === action.id ? { ...post, text: action.newPost } : post
    //   );

    default:
      return state;
  }
};

const initialPosts = [
  { id: 123, title: 'Hellow wrld', text: "It's just me." },
  {
    id: 456,
    title: 'My name is Kramer',
    text: 'These pretzels are making me thirsty!',
  },
];

export const PostProvider = ({ children }) => {
  // posts = state
  const [posts, dispatch] = useReducer(postReducer, initialPosts);

  const addPost = (title, text, callback) => {
    dispatch({ type: 'ADD_POST', payload: { title, text } });
    callback();
  };

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
