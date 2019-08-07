import serialize from 'serialize-javascript';

const isDev = process.env.NODE_ENV !== 'production';

export default (head, content, initialState = {}) => `
  <!DOCTYPE html>
  <html ${head.htmlAttributes.toString()}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
  </head>
  <body ${head.bodyAttributes.toString()}>
    <div id="app">${content}</div>
    <script>window.__INITIAL_STATE__=${serialize(initialState)}</script>
    <script src="./bundle${isDev ? '' : '.min'}.js"></script>
    ${head.script.toString()}
  </body>
  </html>
`