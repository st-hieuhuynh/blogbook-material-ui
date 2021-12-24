import React, { useEffect } from 'react';

import PostForm from '../components/PostForm';

const NewPostPage = () => {
  const postDetail = {
    id: null,
    cover:
      'https://sharing-news-project.s3.amazonaws.com/cover-post/default_cover.jpg',
    status: 'public',
    tags: [],
    title: '',
    description: '',
    content: '',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <PostForm postDetail={postDetail} />;
};

export default NewPostPage;
