import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '@core/auth/auth.actions';
import { RootState } from '@app/App';

const AuthedActions = () => {
  const accountState = useSelector((state: RootState) => state.accountReducer);
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const ref: any = useRef();
  const dispatch = useDispatch();
  const displayName = `@${
    accountState.data?.displayName || accountState.data?.firstName
  }`;

  const logOut = () => {
    dispatch(signOut());
  };

  const toggleDropdown = () => {
    setIsDropdownShow((prevState) => !prevState);
  };

  useEffect(() => {
    const hideDropdown = (e) => {
      if (isDropdownShow && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownShow(false);
      }
    };
    document.addEventListener('mousedown', hideDropdown);
    return () => {
      document.removeEventListener('mousedown', hideDropdown);
    };
  }, [isDropdownShow]);

  return (
    <div className="nav-actions-list">
      <Link className="btn btn-primary" to="post/new-post">
        New Post
      </Link>
      <div ref={ref}>
        <button className="btn btn-profile" onClick={toggleDropdown}>
          <div className="profile-img-box">
            <img
              className="profile-img"
              src={
                accountState.data?.picture ||
                '../../../../assets/images/default-user-picture.jpeg'
              }
              alt={accountState.data?.displayName}
            />
          </div>
        </button>
        {isDropdownShow && (
          <ul className="nav-actions-dropdown">
            <li className="nav-actions-item">
              <button className="btn btn-dropdown" onClick={toggleDropdown}>
                <Link className="nav-actions-link" to="profile/me">
                  {displayName}
                </Link>
              </button>
            </li>
            <li className="nav-actions-item">
              <button className="btn btn-dropdown" onClick={toggleDropdown}>
                <Link className="nav-actions-link" to="account/info">
                  Change Profile
                </Link>
              </button>
            </li>
            <li className="nav-actions-item">
              <button className="btn btn-dropdown" onClick={toggleDropdown}>
                <Link className="nav-actions-link" to="draft">
                  My Draft
                </Link>
              </button>
            </li>
            <li className="nav-actions-item">
              <button className="btn btn-dropdown" onClick={toggleDropdown}>
                <Link className="nav-actions-link" to="bookmarks">
                  My Bookmark
                </Link>
              </button>
            </li>
            <li className="nav-actions-item">
              <button className="btn btn-dropdown" onClick={toggleDropdown}>
                <Link className="nav-actions-link" to="recyclebin">
                  Recyclebin
                </Link>
              </button>
            </li>
            <li className="nav-actions-item">
              <button
                className="btn btn-dropdown nav-actions-link"
                onClick={logOut}
              >
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AuthedActions;
