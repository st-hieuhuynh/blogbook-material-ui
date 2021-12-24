import React, { useContext, useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/App';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';
import { registerAccount, resetAuthError } from '../auth.actions';

const Register = () => {
  const authState = useSelector((state: RootState) => state.authReducer);
  const { showNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  useEffect(() => {
    return () => {
      if (authState.error) {
        dispatch(resetAuthError());
      }
    };
  }, [authState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onRegister = (data) => {
    delete data.rePassword;
    dispatch(registerAccount(data));
  };

  useEffect(() => {
    if (typeof authState.data === 'string') {
      showNotification({ isSuccess: true, message: authState.data });
    }
  }, [authState.data]);

  if (typeof authState.data === 'string') {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="auth auth-register">
      <div className="auth-heading">
        <img
          className="auth-logo"
          src="../../../../assets/icons/logo.svg"
          alt="BlogBook"
        />
        <h2>Create new account</h2>
      </div>
      <form
        className="form form-horizontal form-outline"
        onSubmit={handleSubmit(onRegister)}
      >
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required">Name</label>
          </div>
          <div className="form-box form-6">
            <div className="form-box">
              <input
                className={`form-input ${errors.firstName ? 'invalid' : ''}`}
                id="first-name"
                type="text"
                placeholder="First Name"
                {...register('firstName', {
                  required: 'Please input your first name',
                })}
              />
              {errors.firstName && (
                <span className="form-error">{errors.firstName.message}</span>
              )}
            </div>
            <div className="form-box">
              <input
                className={`form-input ${errors.lastName ? 'invalid' : ''}`}
                id="last-name"
                type="text"
                placeholder="Last Name"
                {...register('lastName', {
                  required: 'Please input your last name',
                })}
              />
              {errors.lastName && (
                <span className="form-error">{errors.lastName.message}</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required" htmlFor="display-name">
              Display Name
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.displayName ? 'invalid' : ''}`}
              id="display-name"
              type="text"
              placeholder="Display Name"
              {...register('displayName', {
                required: 'Please input display name',
              })}
            />
            {errors.displayName && (
              <span className="form-error">{errors.displayName.message}</span>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required" htmlFor="phone">
              Phone Number
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.phone ? 'invalid' : ''}`}
              id="phone"
              type="tel"
              placeholder="Phone Number"
              {...register('phone', {
                required: 'Please input your phone number',
                pattern: {
                  value: /^\d+$/g,
                  message: 'Invalid phone number',
                },
              })}
            />
            {errors.phone && (
              <span className="form-error">{errors.phone.message}</span>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required" htmlFor="dob">
              Date Of Birth
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.dob ? 'invalid' : ''}`}
              id="dob"
              type="date"
              {...register('dob', {
                required: 'Please input your date of birth',
              })}
            />
            {errors.dob && (
              <span className="form-error">{errors.dob.message}</span>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required" htmlFor="gender">
              Gender
            </label>
          </div>
          <div className="form-box">
            <div className="form-box form-radio">
              <div>
                <input
                  {...register('gender', {
                    required: 'Please choose your gender',
                  })}
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                />
                <label htmlFor="male" className="form-radio-label">
                  Male
                </label>
              </div>
              <div>
                <input
                  {...register('gender')}
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                />
                <label htmlFor="female" className="form-radio-label">
                  Female
                </label>
              </div>
              <div>
                <input
                  {...register('gender')}
                  type="radio"
                  name="gender"
                  value="other"
                  id="other"
                />
                <label htmlFor="other" className="form-radio-label">
                  Other
                </label>
              </div>
            </div>
            {errors.gender && (
              <span className="form-error">{errors.gender.message}</span>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required" htmlFor="email">
              Email
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.email ? 'invalid' : ''}`}
              id="email"
              type="text"
              placeholder="Email"
              {...register('email', {
                required: 'Please input your email',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email',
                },
              })}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required" htmlFor="password">
              Password
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.password ? 'invalid' : ''}`}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
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
        </div>
        <div className="form-control">
          <div className="form-label-box">
            <label className="form-label required" htmlFor="re-password">
              Confirm Password
            </label>
          </div>
          <div className="form-box">
            <input
              className={`form-input ${errors.rePassword ? 'invalid' : ''}`}
              id="re-password"
              type="password"
              placeholder="Confirm Password"
              {...register('rePassword', {
                validate: (value) =>
                  value === password.current || 'Not match password',
              })}
            />
            {errors.rePassword && (
              <span className="form-error">{errors.rePassword.message}</span>
            )}
          </div>
        </div>
        {authState.error && (
          <span className="form-error txt-center">
            {authState.error.errors[0]}
          </span>
        )}
        <LoadingButton
          classBtn="btn btn-primary btn-form-horizontal"
          loading={authState.isLoading}
        >
          Create Account
        </LoadingButton>
      </form>
      <p className="auth-options">
        Have an account? <Link to="/auth/login">Login now</Link>
      </p>
    </div>
  );
};

export default Register;
