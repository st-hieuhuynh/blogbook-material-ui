import React from 'react';

import ArticleCard from '@app/shared/modules/article-card/ArticleCard';
import FeaturedCard from '@app/shared/modules/featured-card/FeaturedCard';
import { Article } from '@app/core/constants/entity/Article';

const FeaturedList = (props: { featuredList: Article[] }) => {
  const { featuredList } = props;
  return (
    <div className="row">
      <ul className="col col-lg-6 col-md-12 col-sm-12">
        <li key={featuredList[0].id}>
          <ArticleCard item={featuredList[0]} className="article-card" />
        </li>
      </ul>
      <ul className="col col-lg-6 col-md-12 col-sm-12">
        {featuredList.slice(1).map((item) => (
          <li className="featured-card-right" key={item.id}>
            <FeaturedCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedList;
