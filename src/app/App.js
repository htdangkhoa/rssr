import React, { useEffect, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from 'reactstrap';
import { light, dark } from './themes';
import head from '../utils/head';

const CustomButton = styled.button`
  background: ${props => props.theme.colors.background};
`;

export default ({ route }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isDarkMode') || false;

    setIsDarkMode(JSON.parse(stored));
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <>
        <Helmet {...head} />
        <CustomButton onClick={() => {
          setIsDarkMode(!isDarkMode);
          
          localStorage.setItem('isDarkMode', !isDarkMode);
        }}>Dark Mode is {isDarkMode ? 'Enabled' : 'Disabled'}</CustomButton>
        {renderRoutes(route.routes)}
      </>
    </ThemeProvider>
  );
};
