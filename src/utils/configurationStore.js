import { createBrowserHistory, createMemoryHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createReducers from '../app/redux/reducers';

const isDev = process.env.NODE_ENV !== 'production';

const fromServer = typeof window === 'undefined';

const logger = createLogger({ predicate: (getState, action) => isDev })

export default ({ initialState, url }) => {
  const history = fromServer ? createMemoryHistory({ initialEntries: [url || '/'] }) : createBrowserHistory();
  
  const middlewares = [
    routerMiddleware(history),
    logger,
    thunk,
  ].filter(Boolean)

  const store = createStore(
    createReducers(history),
    initialState || {},
    composeWithDevTools(
      applyMiddleware(...middlewares)
    ),
  );

  return { store, history };
}