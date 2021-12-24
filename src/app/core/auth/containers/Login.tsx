import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@app/App';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';
import { resetAuth, resetAuthError, signIn } from '../auth.actions';

const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.authReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = (data) => {
    dispatch(signIn(data));
  };

  useEffect(() => {
    return () => {
      if (authState.error) {
        dispatch(resetAuthError());
      }
    };
  }, [authState]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetAuth());
  }, []);

  return (
    <div className="auth auth-login">
      <div className="auth-heading">
        <img
          className="auth-logo"
          src="../../../../assets/icons/logo.svg"
          alt="BlogBook"
        />
        <h2>Sign in to continue</h2>
      </div>
      <form
        className="form form-login form-outline"
        onSubmit={handleSubmit(onLogin)}
      >
        <div className="form-control">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            className={`form-input ${errors.email ? 'invalid' : ''}`}
            id="email"
            type="text"
            {...register('email', {
              required: 'Please input email address',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email',
              },
            })}
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>
        <div className="form-control">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className={`form-input ${errors.password ? 'invalid' : ''}`}
            id="password"
            type="password"
            {...register('password', {
              required: 'Please input your password',
              minLength: {
                value: 8,
                message: 'Password at least 8 characters',
              },
            })}
          />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>
        {authState.error && (
          <span className="form-error txt-center">
            {authState.error.errors[0]}
          </span>
        )}
        <div>
          <LoadingButton
            loading={authState.isLoading}
            classBtn="btn btn-primary btn-login"
          >
            Sign In
          </LoadingButton>
        </div>
        <div className="line">
          <h3 className="line-text">or</h3>
        </div>
        <a
          href={`https://vast-lowlands-08945.herokuapp.com/api/v1/auth/google?redirect_to=${window.location.href}`}
          className="btn btn-login-social"
        >
          <img
            className="login-social-img"
            src="/assets/icons/login-google.svg"
            alt="Sign In with Google"
          />
          Sign In with Google
        </a>
        <a
          href={`https://vast-lowlands-08945.herokuapp.com/api/v1/auth/github?redirect_to=${window.location.href}`}
          className="btn btn-login-social"
        >
          <img
            className="login-social-img"
            src="/assets/icons/login-github.svg"
            alt="Sign In with Github"
          />
          Sign In with Github
        </a>
      </form>
      <p className="auth-options">
        Don't have account?
        <Link to="/auth/register"> Create new account</Link>
      </p>
    </div>
  );
};

export default Login;
