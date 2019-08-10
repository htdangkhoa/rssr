import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import { Switch, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled, { ThemeProvider } from 'styled-components';
import { capitalize } from 'lodash';
import { light, dark } from './themes';
import head from '../utils/head';

const menus = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/about',
    label: 'About',
  },
];

const CustomButton = styled.button`
  background: ${props => props.theme.colors.background};
`;

export default ({ route }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [t, i18n] = useTranslation();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isDarkMode') || false;

    setIsDarkMode(JSON.parse(stored));
  }, []);

  const handleLanguage = (locale) => {
    i18n.changeLanguage(locale);
  }

  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <>
        <Helmet {...head} />
        <Navbar color={isDarkMode ? 'dark' : 'light'} light={!isDarkMode} dark={isDarkMode} expand='md' sticky='top'>
          <NavbarBrand tag={Link} to='/'>Lluvias</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {menus.map(({ to, label }, index) => (
                <NavItem key={index}>
                  <NavLink tag={Link} to={to} replace>{label}</NavLink>
                </NavItem>
              ))}

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{t('language')}</DropdownToggle>
                <DropdownMenu right>
                  {i18n.languages.sort().map((item, index) => (
                    <DropdownItem 
                      key={index}
                      onClick={handleLanguage.bind(this, item)}
                      active={i18n.language === item}
                    >
                      {capitalize(item)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <CustomButton onClick={() => {
          setIsDarkMode(!isDarkMode);
          
          localStorage.setItem('isDarkMode', !isDarkMode);
        }}>Dark Mode is {isDarkMode ? 'Enabled' : 'Disabled'}</CustomButton>
        <Container>
          {renderRoutes(route.routes, { name: 'khoa' })}
        </Container>
      </>
    </ThemeProvider>
  );
};
