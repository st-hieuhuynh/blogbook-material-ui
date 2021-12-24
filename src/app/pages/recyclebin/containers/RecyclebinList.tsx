import React, { useEffect, useState } from 'react';

import { PostService } from '@app/core/services/post.service';
import LoadingSpinner from '@app/shared/components/loading-spinner/LoadingSpinner';
import UserArticlesList from '@app/shared/modules/user-article/UserArticlesList';

const RecyclebinList = () => {
  const postService = new PostService();
  const [recyclebinList, setRecyclebinList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
    setIsLoadingList(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setIsLoadingPage(true);
    setHasError(false);
    (async () => {
      try {
        const response: any = await postService.getRecyclebin({
          page: page,
          size: 6,
        });
        setRecyclebinList([...response.data]);
      } catch (error) {
        setHasError(true);
      }
      setIsLoadingPage(false);
    })();
  }, []);

  useEffect(() => {
    setIsLoadingList(true);
    setHasError(false);
    (async () => {
      try {
        const response: any = await postService.getRecyclebin({
          page: page,
          size: 6,
        });
        setRecyclebinList([...recyclebinList, ...response.data]);
        setIsLoadMore(
          response.loadMore && response.totalPage !== response.currentPage
        );
      } catch (error) {
        setHasError(true);
      }
      setIsLoadingList(false);
    })();
  }, [page]);
  if (isLoadingPage) {
    return <LoadingSpinner />;
  }
  if (hasError) {
    return (
      <p className="txt-center txt-error mt-10">
        Something went wrong. Please try again!
      </p>
    );
  }

  return (
    <>
      {recyclebinList && (
        <UserArticlesList
          isReaction={false}
          articlesList={recyclebinList}
          heading="Recyclebin"
          message="No deleted post to show"
          handleLoadMore={handleLoadMore}
          loading={isLoadingList}
          isLoadMore={isLoadMore}
        />
      )}
    </>
  );
};

export default RecyclebinList;
