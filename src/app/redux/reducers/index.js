import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth.reducer';
import home from './home.reducer';

const reducers = {
  auth,
  home,
}

export default history => combineReducers({
  router: connectRouter(history),
  ...reducers,
})