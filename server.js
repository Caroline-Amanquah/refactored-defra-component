'use strict';

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const environmentConfig = require('./src/config/environmentConfig.js');
const { customHapiViews } = require('./src/views/views.js');
const Nunjucks = require("nunjucks");

const init = async () => {
  try {
    const server = Hapi.server({
      port: environmentConfig.PORT,
      host: 'localhost',
    });

    await server.register(Inert);
    await server.register({
      plugin: customHapiViews.plugin,
      options: customHapiViews.options,
    });

    // Serve the index route with the Nunjucks template
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.view('index');
      },
    });

    // Serve static files from node_modules
    server.route({
      method: 'GET',
      path: '/node_modules/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'node_modules'),
          redirectToSlash: true,
          index: true,
        },
      },
    });

    // Serve static assets from public directory
    server.route({
      method: 'GET',
      path: '/assets/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'src/public/assets'),
          redirectToSlash: true,
          index: true,
        },
      },
    });

    // Serve govuk-frontend assets from dist
    server.route({
      method: 'GET',
      path: '/govuk/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, '/node_modules/govuk-frontend/dist/govuk'),
          redirectToSlash: true,
          index: true,
        },
      },
    });

    console.log('Serving static files from:', Path.join(__dirname, 'node_modules'));
    console.log('Serving asset files from:', Path.join(__dirname, 'src/public/assets'));

    await server.start();
    console.log('Server running on %s', server.info.uri);

    // Log responses for debugging
    server.events.on('response', (request) => {
      console.log(`${request.method.toUpperCase()} ${request.path} --> ${request.response.statusCode}`);
    });

    return server;
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

init();

module.exports = { init };
