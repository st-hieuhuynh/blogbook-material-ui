import React from 'react';

import LoadingButton from '@app/shared/components/loading-button/LoadingButton';
import { Article } from '@app/core/constants/entity/Article';
import ArticlesList from './ArticlesList';

interface PublicArticles {
  publicArticles: Article[];
  handleLoadMore: Function;
  loading: boolean;
  title: string;
}

const PublicArticles = (props: PublicArticles) => {
  return (
    <section className="public" id="post-list">
      <div className="container">
        <h3 className="section-title">{props.title}</h3>
        <ArticlesList publicArticles={props.publicArticles} />
        <div className="public-pagination">
          <LoadingButton
            loading={props.loading}
            handleFunction={() => props.handleLoadMore()}
            classBtn="btn btn-primary btn-show"
          >
            Show more
          </LoadingButton>
        </div>
      </div>
    </section>
  );
};

export default PublicArticles;
