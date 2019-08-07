import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home.reducer';

const reducers = {
  home,
}

export default history => combineReducers({
  router: connectRouter(history),
  ...reducers,
})