import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { RootState } from '@app/App';
import AuthedActions from './AuthedActions';
import UnAuthedActions from './UnAuthedActions';

export const Header = () => {
  const accountState = useSelector((state: RootState) => state.accountReducer);

  return (
    <header>
      <div className="container">
        <div className="nav-container">
          <h1>
            <Link className="nav-logo" to="/">
              <img
                className="nav-logo-img pc-only"
                src="../../../../assets/icons/logo-text.svg"
                alt="BlogBook"
              />
              <img
                className="nav-logo-img sp-only"
                src="../../../../assets/icons/logo.svg"
                alt="BlogBook"
              />
            </Link>
          </h1>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#top">
                  Home
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#featured">
                  Featured Posts
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#post-list">
                  Public Posts
                </HashLink>
              </li>
            </ul>
          </nav>
          <div className="nav-actions">
            {accountState.data ? <AuthedActions /> : <UnAuthedActions />}
          </div>
        </div>
      </div>
    </header>
  );
};
