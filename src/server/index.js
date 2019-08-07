import path from 'path';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
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
import routes from '../utils/router';
import auth from './routes/auth.route';
import '../utils/i18n';

config();

connectDB();

const isDev = process.env.NODE_ENV !== 'production';

const app = express();

let middlewares = [
  express.static(path.resolve(__dirname, '../..', 'dist')),
  express.static(path.resolve(__dirname, '..', 'app/assets')),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors(),
  compression(),
  helmet(),
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

app.use('/auth', auth);

app.get('**', (req, res) => {
  const { store } = configurationStore({ url: req.url });

  const preloadData = () => {
    const branch = matchRoutes(routes, req.path);

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
          {renderRoutes(routes)}
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

app.listen(process.env.PORT || 80, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);

  if (isDev && openBrowser(`http://localhost:${process.env.PORT}`)) {
    console.log("==> 🖥️  Opened on your browser's tab!");
  }
});