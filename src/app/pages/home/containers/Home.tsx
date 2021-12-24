import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { PostService } from '@app/core/services/post.service';
import { RootState } from '@app/App';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';
import Banner from '../components/banner/Banner';
import FeaturedArticles from '../components/featured-articles/FeaturedArticles';
import PublicArticles from '../components/public-articles/PublicArticles';

const Home = () => {
  const postService = new PostService();
  const accountState = useSelector((state: RootState) => state.accountReducer);
  const [publicArticles, setPublicArticles] = useState([]);
  const [featuresArticles, setfeaturesArticles] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [hasError, setHasError] = useState(false);
  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
    setLoading(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // fetch api Featured Articles
  useEffect(() => {
    setLoadingFeatured(true);
    setHasError(false);
    (async () => {
      try {
        const resFeatured: any = await postService.getFeaturedArticles({
          page: 1,
          size: 6,
        });
        setfeaturesArticles([...featuresArticles, ...resFeatured.data]);
        setLoadingFeatured(false);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setPage(1);
    setPublicArticles([]);
    (async () => {
      setHasError(false);
      try {
        if (accountState.data) {
          const resPublic: any = await postService.getFollowingPost({
            page: page,
            size: 6,
          });
          setPublicArticles([...resPublic.data]);
        } else {
          const resPublic: any = await postService.getPublicArticles({
            page: page,
            size: 6,
          });
          setPublicArticles([...resPublic.data]);
        }
        setLoading(false);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    })();
  }, [accountState.data]);

  // fetch api List Posts
  useEffect(() => {
    setLoading(true);
    (async () => {
      setHasError(false);
      try {
        if (accountState.data) {
          const resPublic: any = await postService.getFollowingPost({
            page: page,
            size: 6,
          });
          setPublicArticles([...publicArticles, ...resPublic.data]);
        } else {
          const resPublic: any = await postService.getPublicArticles({
            page: page,
            size: 6,
          });
          setPublicArticles([...publicArticles, ...resPublic.data]);
        }
        setLoading(false);
      } catch (error) {
        setHasError(true);
        setLoading(false);
      }
    })();
  }, [page]);

  if (hasError) {
    return (
      <p className="txt-center txt-error mt-10">
        Something went wrong. Please try again!
      </p>
    );
  }

  if (loadingFeatured) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home">
      <Banner />
      {featuresArticles.length && (
        <FeaturedArticles featuredList={featuresArticles} />
      )}
      <PublicArticles
        publicArticles={publicArticles}
        handleLoadMore={handleLoadMore}
        loading={loading}
        title="Public Posts"
      />
    </div>
  );
};

export default Home;
