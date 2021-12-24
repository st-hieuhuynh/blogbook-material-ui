import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import Bookmarks from './Bookmarks';
import Bookmark from './containers/Bookmark';

const bookmarksRoutes: PageRoute[] = [
  {
    path: '/bookmarks',
    element: Bookmarks,
    children: [
      {
        path: '',
        element: Bookmark,
      },
    ],
    isProtected: true,
  },
];

export default bookmarksRoutes;
