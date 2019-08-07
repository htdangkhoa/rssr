import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { fetchUsers } from '../redux/actions/home.action';
import image from '../assets/placeholder.png';

export default ({ route }) => {
  const [lang, setLang] = useState('en')

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const { users } = useSelector(state => state.home, shallowEqual);

  // useEffect(() => {
  //   dispatch(fetchUsers())
  // }, [])

  const onCheckBoxChange = ({ target }) => {
    const { checked } = target;

    setLang(checked ? 'vn' : 'en');
    
    i18n.changeLanguage(checked ? 'vn' : 'en')
  }

  return (
    <div>
      <Helmet title={route.title} />
      <React.Fragment>
        {users.map(item => (
          <p key={item._id}>{item.name}</p>
        ))}
      </React.Fragment>

      <Link to='/about'>About</Link>
      <div>
        <input type='checkbox' defaultChecked={false} onChange={onCheckBoxChange} />
        <p>{lang}</p>
        <p>{t('hello')}</p>
      </div>
      <img src={image} />
    </div>
  )
}
