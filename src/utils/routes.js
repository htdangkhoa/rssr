import React from 'react';
// import {  } from 'react-router';
// import {  } from 'react-router-dom';
// import {  } from 'react-router-config';
import App from '../app/App';
import { Login, Home, About, Error } from '../app/pages';
import { fetchUsers } from '../app/redux/actions/home.action';

export default [
  {
    component: App,
    routes: [
      {
        path: '/login',
        component: Login,
        title: 'Login',
      },
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
