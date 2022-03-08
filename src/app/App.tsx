import 'core-js/stable'; // For IE
import 'regenerator-runtime/runtime'; // For IE

import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import { Footer, Header } from '@app/shared/components/layout/index';
import { RouterOutlet } from '@core/modules/custom-router-dom';
import appRoutes from './app.routes';
import appReducer from './app.reducers';
import { signInSocial, validateAuthToken } from './core/auth/auth.actions';

import LoadingSpinner from './shared/components/loading-spinner/LoadingSpinner';
import ScrollButton from './shared/components/scroll-button/ScrollButton';
import NotificationProvider from './shared/contexts/NotificationContext/NotificationProvider';
import { AuthService } from './core/services/auth.service';

const store = createStore(appReducer, applyMiddleware(thunk, logger));
export type RootState = ReturnType<typeof store.getState>;
const auth = new AuthService();

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const accessToken = params.get('accessToken');

  useEffect(() => {
    (async () => {
      if (accessToken) {
        window.history.pushState({}, document.title, '');
        await dispatch(signInSocial(accessToken));
      }
      if (auth.getToken()) {
        await dispatch(validateAuthToken());
      }
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Header />
      <RouterOutlet routes={appRoutes} />
      <ScrollButton />
      <Footer />
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
