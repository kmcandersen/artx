import React, { useReducer } from 'react';

const PostContext = React.createContext();

const postReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, { title: `Post #${state.length + 1}` }];
    default:
      return state;
  }
};

export const PostProvider = ({ children }) => {
  // posts = state
  const [posts, dispatch] = useReducer(postReducer, []);

  //   const addPost = () => {
  //     setPosts([...posts, { title: `Post #${posts.length + 1}` }]);
  //   };

  const addPost = () => {
    dispatch({ type: 'ADD_POST' });
  };

  return (
    <PostContext.Provider value={{ data: posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
