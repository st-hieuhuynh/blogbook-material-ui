import { PageRoute } from '../modules/custom-router-dom/router.interface';
import Auth from './Auth';
import Login from './containers/Login';
import Register from './containers/Register';

const authRoutes: PageRoute[] = [
  {
    path: '/auth',
    element: Auth,
    children: [
      {
        path: '/',
        redirect: 'login',
      },
      {
        path: '/login',
        element: Login,
      },
      {
        path: '/register',
        element: Register,
      },
    ],
  },
];

export default authRoutes;
