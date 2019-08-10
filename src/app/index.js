import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Suspense} from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { useSSR } from 'react-i18next';
import routes from '../utils/routes';
import configurationStore from '../utils/configurationStore';
import '../utils/i18n';

const renderMethod = !!module.hot ? render : hydrate

const {
  __INITIAL_STATE__,
  initialI18nStore,
  initialLanguage
} = window;

const initialState = __INITIAL_STATE__;

delete window.__INITIAL_STATE__;

const { store, history } = configurationStore({ initialState })

const app = document.getElementById('app');

const Loader = () => (<div>Loading...</div>);

const Dom = () => {
  useSSR(initialI18nStore, initialLanguage);

  return (
    <Suspense fallback={<Loader />}>
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {renderRoutes(routes)}
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    </Suspense>
  )
}

render(<Dom />, app);

if (module.hot) {
  module.hot.accept();
}
