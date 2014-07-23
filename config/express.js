var express = require('express'),
  consolidate = require('consolidate'),
  http = require('http'),
  path = require('path'),
  bodyParser = require('body-parser'),
  settings = require('./settings');

module.exports = function() {
  var app = express();

  app.locals.title = settings.app.title;
  app.locals.description = settings.app.description;
  app.locals.keywords = settings.app.keywords;

  // css, img, js, etc...
  app.use('/public', express.static(path.resolve('./public')));

  // All server responses will contain the requested URL
  app.use(function(req, res, next) {
    res.locals.url = req.protocol + '://' + req.headers.host + req.url;
    next();
  });

  app.set('showStackError', true);

  app.set('views', './app/modules');
  app.engine('html', consolidate[settings.templateEngine]);
  app.use(bodyParser.urlencoded({extended: true}));

  return app;
};
