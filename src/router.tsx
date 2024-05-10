import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Photo } from './pages/Photo';
import { NotFound } from './pages/NotFound';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/photo/:id',
    element: <Photo />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
