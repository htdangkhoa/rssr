import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import cookies from '@utils/cookies';

const DefaultLayout = ({ title, children }) => {
  useEffect(() => {
    console.log(cookies);
  }, [])

  return (
    <>
      <Helmet title={title} />
      {children}
    </>
  )
}

DefaultLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default DefaultLayout;