import React from 'react';

import CommentPost from '@core/constants/entity/CommentPost';
import CommentCard from './CommentCard';

interface CommentListProps {
  data: CommentPost[];
}

const CommentList = (props: CommentListProps) => {
  return (
    <ul className="comment-list">
      {props.data?.map((comment: CommentPost) => {
        return (
          <li className="comment-item" key={comment.id}>
            <CommentCard data={comment} />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
