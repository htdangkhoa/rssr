import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchUsers } from '@redux/actions/home.action';
import { login } from '@redux/actions/auth.action';
import image from '@assets/placeholder.png';
import Layout from '@components/Layout';

export default ({ route }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth, shallowEqual);

  const { users } = useSelector(state => state.home, shallowEqual);

  // useEffect(() => {
  //   dispatch(fetchUsers())
  // }, [])

  const onLogin = () => {
    dispatch(login({
      email: 'abcd@gmail.com',
      password: '1',
    }))
  }

  return (
    <Layout title={route.title}>
      <Row>
        <Col>
          <React.Fragment>
            {users.map(item => (
              <p key={item._id}>{item.name}</p>
            ))}
          </React.Fragment>

          {user && user.data && <p>{user.data.email}</p>}

          <Button onClick={onLogin.bind(this)}>Login</Button>

          <img src={image} className="img-fluid" />
        </Col>
      </Row>
    </Layout>
  )
}
