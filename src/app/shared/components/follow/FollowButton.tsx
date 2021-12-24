import React, { useContext, useState } from 'react';

import { FriendsService } from '@app/core/services/friends.service';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import LoadingButton from '../loading-button/LoadingButton';

interface FollowButtonOptions {
  isFollowed: boolean;
  followingId: number | string;
  onClick?: () => void;
}

const FollowButton = (props: FollowButtonOptions) => {
  const { showNotification } = useContext(NotificationContext);
  const friendService = new FriendsService();
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);
  const [isLoading, setIsLoading] = useState(false);

  const followHandler = async () => {
    setIsLoading(true);
    try {
      const response: any = await friendService.followUser({
        followingId: props.followingId,
      });
      const { followed } = response;
      setIsFollowed(followed);
      if (props.onClick) {
        props.onClick();
      }
    } catch (error) {
      showNotification({
        isSuccess: false,
        message: `${isFollowed ? 'Unfollow' : 'Follow'} user unsuccessfully!`,
      });
    }
    setIsLoading(false);
  };

  return (
    <LoadingButton
      loading={isLoading}
      classBtn="btn btn-outline btn-follow"
      handleFunction={followHandler}
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </LoadingButton>
  );
};

export default FollowButton;
