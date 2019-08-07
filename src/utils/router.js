import React from 'react';
import App from '../app/App';
import { Home, About, Error } from '../app/pages';
import { fetchUsers } from '../app/redux/actions/home.action';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        title: 'Home',
        preload: ({ params }) => [
          fetchUsers()
        ]
      },
      {
        path: '/about',
        title: 'About',
        component: About,
      },
      {
        component: Error,
        title: 'Error',
        type: '404'
      }
    ],
  },
];
