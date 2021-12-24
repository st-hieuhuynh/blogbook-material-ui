import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import DraftList from './containers/DraftList';
import Draft from './Draft';

const draftRoutes: PageRoute[] = [
  {
    path: '/draft',
    element: Draft,
    children: [
      {
        path: '',
        element: DraftList,
      },
    ],
    isProtected: true,
  },
];

export default draftRoutes;
