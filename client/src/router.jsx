import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import RouterErrorPage from './components/error/RouterErrorPage';
import FriendsListPage from './components/friends/list/FriendsListPage';
import FriendsDetailsPage from './components/friends/details/FriendsDetailsPage';
import FriendsDetailsDisplay from './components/friends/details/FriendsDetailsDisplay';
import FriendsDetailsEdit from './components/friends/details/FriendsDetailsEdit';
import FriendsDetailsAdd from './components/friends/details/FriendsDetailsAdd';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouterErrorPage />,
    children: [
      {
        path: '',
        element: <Navigate to="/friends" replace />,
      },
      {
        path: 'friends',
        element: <FriendsListPage />,
      },
      {
        path: 'friends/new',
        element: <FriendsDetailsAdd />,
      },
      {
        path: 'friends/:friendId',
        element: <FriendsDetailsPage />,
        children: [
          {
            path: '',
            element: <FriendsDetailsDisplay />,
          },
          {
            path: 'edit',
            element: <FriendsDetailsEdit />,
          },
        ],
      },
    ],
  },
]);

export default router;
