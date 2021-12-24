import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { RootState } from '@app/App';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import { changeAvatar } from '../account.actions';

const AccountInfo = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state: RootState) => state.accountReducer);
  const userInfo = accountState.data;
  const [imagePreview, setImagePreview] = useState({
    preview: undefined,
    raw: undefined,
  });
  const { showNotification } = useContext(NotificationContext);
  const { register, handleSubmit, watch, resetField } = useForm();

  const watchPicture = watch('picture');

  useEffect(() => {
    if (watchPicture) {
      if (watchPicture?.length) {
        setImagePreview({
          preview: URL.createObjectURL(watchPicture[0]),
          raw: watchPicture,
        });
      }
    } else {
      setImagePreview({
        preview: undefined,
        raw: undefined,
      });
    }
  }, [watchPicture]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (accountState.isSuccess) {
      resetField('picture');
      showNotification({
        isSuccess: true,
        message: 'Update successfully !',
      });
    }
    if (accountState.hasError) {
      showNotification({
        isSuccess: false,
        message: accountState.error.errors[0],
      });
    }
  }, [accountState]);

  const onSubmit = () => {
    const additionData = { ...userInfo };
    delete additionData.id;
    delete additionData.email;
    delete additionData.isActive;
    delete additionData.isAdmin;
    delete additionData.verifyAt;
    delete additionData.createdAt;
    delete additionData.updatedAt;
    delete additionData.followers;
    delete additionData.followings;
    delete additionData.isFollowed;

    const submitData = {
      ...additionData,
      picture: imagePreview.raw,
    };
    dispatch(changeAvatar(submitData));
  };

  return (
    <div className="container container-sm">
      <div className="row">
        <div className="col col-lg-3 col-md-12 mb-10">
          <div className="profile-img-box my-10 ">
            <img
              className="profile-img"
              src={
                imagePreview.preview ||
                userInfo.picture ||
                '../../../../assets/images/default-user-picture.jpeg'
              }
              alt={userInfo.displayName}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="avatar-upload" htmlFor="avatar"></label>
              <input
                type="file"
                name="picture"
                id="avatar"
                {...register('picture')}
              />
              {imagePreview.preview ? (
                <button
                  className="submit-btn btn btn-primary"
                  type="submit"
                  disabled={accountState.isLoading}
                >
                  {accountState.isLoading ? (
                    <img
                      src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgifimage.net%2Fwp-content%2Fuploads%2F2017%2F09%2Fajax-loading-gif-transparent-background-8.gif&f=1&nofb=1"
                      alt="loading"
                      className="loading-indicator"
                    />
                  ) : (
                    <img
                      src="../../../../assets/icons/tick_white.svg"
                      alt="done"
                    />
                  )}
                </button>
              ) : (
                <label htmlFor="avatar" className="submit-btn btn btn-primary">
                  <img
                    src="../../../../assets/icons/photo_camera.svg"
                    alt="choose image"
                  />
                </label>
              )}
            </form>
          </div>
          <Link
            to="/account/update-infomation"
            className="btn btn-primary personal-info-action mb-5"
          >
            Update Infomation
          </Link>
          <Link
            to="/account/change-password"
            className="btn btn-primary personal-info-action"
          >
            Change Password
          </Link>
        </div>
        <div className="col col-lg-9 col-md-12">
          <section className="personal-info">
            <div className="personal-info-box mb-10">
              <div className="personal-info-detail mb-10">
                <h4 className="sub-heading txt-bold">Basic Infomation</h4>
                <div className="personal-info-detail-box">
                  <div className="info-box ">
                    <h5 className="info-label txt-capitalize">Name:</h5>
                    <span className="info-content txt-semi">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                  </div>
                  <div className="info-box ">
                    <h5 className="info-label txt-capitalize">Display name:</h5>
                    <span className="info-content txt-semi">
                      {userInfo.displayName}
                    </span>
                  </div>
                  <div className="info-box ">
                    <h5 className="info-label txt-capitalize">
                      Date of birth:
                    </h5>
                    <span className="info-content txt-semi">
                      {userInfo.dob}
                    </span>
                  </div>
                  <div className="info-box ">
                    <h5 className="info-label txt-capitalize">Gender:</h5>
                    <span className="info-content txt-semi">
                      {userInfo.gender}
                    </span>
                  </div>
                </div>
              </div>
              <div className="personal-info-detail mb-10">
                <h4 className="sub-heading txt-bold">Contact Infomation</h4>
                <div className="personal-info-detail-box">
                  <div className="info-box ">
                    <h5 className="info-label txt-capitalize">Phone number:</h5>
                    <span className="info-content txt-semi">
                      {userInfo.phone}
                    </span>
                  </div>
                  <div className="info-box ">
                    <h5 className="info-label txt-capitalize">Email:</h5>
                    <span className="info-content txt-semi">
                      {userInfo.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
