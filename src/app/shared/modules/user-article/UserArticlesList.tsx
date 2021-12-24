import React from 'react';

import { Article } from '@app/core/constants/entity/Article';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';
import UserArticleItem from './UserArticleItem';

interface UserArticlesListOptions {
  articlesList: Article[];
  heading: string;
  message: string;
  isReaction: boolean;
  handleLoadMore?: Function;
  loading?: boolean;
  isLoadMore?: boolean;
}

const UserArticlesList = (props: UserArticlesListOptions) => {
  const articlesList = [...props.articlesList].sort((a, b) => b.id - a.id);
  return (
    <section className="user-article">
      <div className="container container-sm">
        <h3 className="section-title">{props.heading}</h3>
        {articlesList.length ? (
          articlesList.map((item) => (
            <UserArticleItem
              key={item.id}
              article={item}
              isReaction={props.isReaction}
              section={props.heading}
            />
          ))
        ) : (
          <p>{props.message}</p>
        )}
        {props.heading === 'Recyclebin' && props.isLoadMore && (
          <div className="public-pagination">
            <LoadingButton
              loading={props.loading}
              handleFunction={() => props.handleLoadMore()}
              classBtn="btn btn-primary btn-show"
            >
              Show more
            </LoadingButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserArticlesList;
