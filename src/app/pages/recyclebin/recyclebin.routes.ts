import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import RecyclebinList from './containers/RecyclebinList';
import Recyclebin from './Recyclebin';

const recyclebinRoutes: PageRoute[] = [
  {
    path: '/recyclebin',
    element: Recyclebin,
    children: [
      {
        path: '',
        element: RecyclebinList,
      },
    ],
    isProtected: true,
  },
];

export default recyclebinRoutes;
