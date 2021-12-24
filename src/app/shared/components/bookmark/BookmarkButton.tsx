import React, { useContext, useState } from 'react';

import { BookmarksService } from '@app/core/services/bookmarks.service';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';

interface BookmarkButtonOptions {
  isInBookmark: boolean;
  postId: number | string;
}

const BookmarkButton = (props: BookmarkButtonOptions) => {
  const { showNotification } = useContext(NotificationContext);
  const bookmarkService = new BookmarksService();
  const [isInBookmark, setIsInBookmark] = useState(props.isInBookmark);
  const [isLoading, setIsLoading] = useState(false);

  const bookmarkHandler = async () => {
    setIsLoading(true);
    try {
      const response: any = await bookmarkService.toggleBookmarks({
        postId: props.postId.toString(),
      });
      const { isInBookmark } = response;
      setIsInBookmark(isInBookmark);
    } catch (error) {
      showNotification({
        isSuccess: false,
        message:
          error.response.status === 401
            ? 'Please login first!'
            : `${
                isInBookmark ? 'Unbookmark' : 'Bookmark'
              } post unsuccessfully!`,
      });
    }
    setIsLoading(false);
  };

  return (
    <button
      className="btn btn-reaction"
      onClick={bookmarkHandler}
      disabled={isLoading}
    >
      <img
        className="reaction-icon"
        src={
          isInBookmark
            ? '../../../../assets/icons/bookmark-solid.svg'
            : '../../../../assets/icons/bookmark-outline.svg'
        }
        alt="Bookmark"
      />
    </button>
  );
};

export default BookmarkButton;
