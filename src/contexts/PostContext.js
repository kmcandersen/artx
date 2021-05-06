import React, { useState } from 'react';

const PostContext = React.createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    setPosts([...posts, { title: `Post #${posts.length + 1}` }]);
  };

  return (
    <PostContext.Provider value={{ data: posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
