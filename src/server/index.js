import path from 'path';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import cookiesMiddleware from 'universal-cookie-express';
import compression from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import { connectDB } from './models';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import configurationStore from '../utils/configurationStore';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import html from '../utils/html';
import openBrowser from 'react-dev-utils/openBrowser';
import reactRoutes from '../utils/routes';
import routes from './routes';
import '../utils/i18n';

global.result = {
  code: 200,
  data: null,
  error: null,
};

config();

const { PORT, NODE_ENV, DB, SECRET } = process.env;

const isDev = NODE_ENV !== 'production';

const app = express();

app.set('trust proxy', 'loopback');

let middlewares = [
  express.static(path.resolve(__dirname, '..', '..', 'dist')),
  express.static(path.resolve(__dirname, '..', 'app', 'assets')),
  favicon(path.resolve(__dirname, '..', 'public', 'favicon.ico')),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors({ credentials: true, origin: true, }),
  compression(),
  helmet(),
  cookieParser(SECRET),
  cookieSession({
    name: 'token',
    secret: SECRET,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
  }),
  cookiesMiddleware(),
];

if (isDev) {
  const compiler = webpack(webpackConfig);

  middlewares = [
    ...middlewares,
    webpackDevMiddleware(compiler, {
      // publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true,
    }),
    webpackHotMiddleware(compiler),
  ]
}

app.use(middlewares);

app.use('/', routes);

app.get('**', (req, res) => {
  const { store } = configurationStore({ url: req.url });

  const preloadData = () => {
    const branch = matchRoutes(reactRoutes, req.path);

    const promises = branch.map(({ route, match }) => {
      if (route.preload) return Promise.all(
        route.preload({ params: match.params })
          .map(item => store.dispatch(item))
      );

      return Promise.resolve(null);
    })

    return Promise.all(promises);
  }

  (async () => {
    await preloadData();

    const context = {};

    const preloadedState = store.getState();

    const indexComponent = (
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          {renderRoutes(reactRoutes)}
        </StaticRouter>
      </Provider>
    );

    const content = renderToString(indexComponent);

    const reactHelmet = Helmet.renderStatic();

    if (context.url) {
      res.status(301).setHeader('location', context.url);

      return res.end();
    }

    const status = context.status === '404' ? 404 : 200;

    return res.status(status).send(html(reactHelmet, content, preloadedState));
  })();
});

(async () => {
  console.clear();

  await connectDB(DB);

  app.listen(PORT || 80, () => {
    console.log(`Server is listening on port: ${PORT}`);

    // if (isDev && openBrowser(`http://localhost:${PORT}`)) {
    //   console.log("==> 🖥️  Opened on your browser's tab!");
    // }
  });
})();