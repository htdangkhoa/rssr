import React from 'react';
import { Helmet } from 'react-helmet';

export default ({ route }) => (
  <div>
    <Helmet title={route.title} />
    About
  </div>
);
