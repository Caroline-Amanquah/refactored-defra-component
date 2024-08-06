const Nunjucks = require('nunjucks');
const Path = require('path');
const Vision = require('@hapi/vision');
const environmentConfig = require('../config/environmentConfig');
const { webRoutePaths } = require('../utils/constants');

const customHapiViews = {
  plugin: Vision,
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          const template = Nunjucks.compile(src, options.environment);
          return (context) => {
            return template.render(context);
          };
        },
        prepare: (options, next) => {
          options.compileOptions.environment = Nunjucks.configure(
            [options.path, 'node_modules/govuk-frontend/dist'],
            { autoescape: true, watch: false }
          );
          options.compileOptions.environment.addFilter('merge', (obj1, obj2) => {
            return { ...obj1, ...obj2 };
          });
          return next();
        },
      },
    },
    path: Path.join(__dirname, '../views'),
    context: {
      assetPath: '/assets',
      serviceName: 'Simple Nunjucks Panel',
      pageTitle: 'Simple Nunjucks Panel - GOV.UK',
      routes: webRoutePaths,
    },
  },
};

module.exports = { customHapiViews };
