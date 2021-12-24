import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux';

import { PostService } from '@app/core/services/post.service';
import { Article } from '@app/core/constants/entity/Article';
import { RootState } from '@app/App';
import TagsList from '@app/shared/components/tags/TagsList';
import LikePost from '@app/pages/post/components/like/LikePost';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';

interface UserArticleItemOptions {
  article: Article;
  isReaction: boolean;
  section?: string;
}

const UserArticleItem = (props: UserArticleItemOptions) => {
  const { article } = props;
  const postService = new PostService();
  const authState = useSelector((state: RootState) => state.authReducer);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isRecyclebin = props.section === 'Recyclebin';
  const { showNotification } = useContext(NotificationContext);
  const updateUrl = `/post/update-post/${article.id}`;

  const removeArticle = () => {
    setIsLoading(true);
    (async () => {
      try {
        const response: any = await postService.deletePost(article.id);
        setIsDeleted(response);
        showNotification({
          isSuccess: true,
          message:
            'Deleted Successfully! You can restore posts from Recyclebin.',
        });
      } catch (error) {
        showNotification({
          isSuccess: false,
          message: 'Deleted Unsuccessfully!',
        });
      }
      setIsLoading(false);
    })();
  };

  const restorePost = () => {
    setIsLoading(true);
    (async () => {
      try {
        const response: any = await postService.restoreDeletedPost(article.id);
        setIsRestored(response);
        showNotification({
          isSuccess: true,
          message: 'Restored Successfully!',
        });
      } catch (error) {
        showNotification({
          isSuccess: false,
          message: 'Restored Unsuccessfully!',
        });
      }
      setIsLoading(false);
    })();
  };

  if (isDeleted || isRestored) {
    return <></>;
  }

  return (
    <div className="article-card user-article-card">
      <div className="article-header">
        <Link
          to={`/post/${!props.isReaction ? 'update-post/' : ''}${article.id}`}
        >
          <img
            src={article.cover || '/assets/images/default_cover.jpg'}
            alt={article.title}
            className={`article-img ${isRecyclebin ? 'disableLink' : ''}`}
          />
          {authState.data?.userInfo.id === article?.userId && (
            <span className="btn btn-white btn-status">{article.status}</span>
          )}
        </Link>
      </div>
      <div className="article-body">
        <div className="article-body-top">
          <div className="article-tag">
            <TagsList tagsList={article.tags} />
          </div>
        </div>
        <Link
          to={`/post/${!props.isReaction ? 'update-post/' : ''}${article.id}`}
          className={`article-title-text ${isRecyclebin ? 'disableLink' : ''}`}
        >
          {article.title}
        </Link>
        <p className="article-content">{article.description}</p>
        <div className="article-footer">
          <div className="article-reaction">
            {props.isReaction && (
              <>
                <LikePost postDetail={article} isUserArticle={true} />
                <HashLink to={`/post/${article.id}#comment`}>
                  <img
                    className="article-reaction-icon"
                    src="../../../../assets/icons/comment-outline.svg"
                    alt="Comments"
                  />
                </HashLink>
                <span className="article-reaction-text">
                  {article.comments}
                </span>
              </>
            )}
          </div>
          {authState.data?.userInfo.id === article?.userId && (
            <div className="article-actions">
              {!isRecyclebin && (
                <Link className="btn btn-update" to={updateUrl}>
                  Update
                </Link>
              )}
              {!isLoading && (
                <>
                  <button
                    className="btn btn-delete"
                    onClick={isRecyclebin ? restorePost : removeArticle}
                  >
                    {isRecyclebin ? 'Restore' : 'Delete'}
                  </button>
                </>
              )}
              {isLoading && (
                <button className="btn btn-delete" disabled>
                  {isRecyclebin ? 'Restoring' : 'Deleting'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserArticleItem;
