var express = require('express'),
  path = require('path');

module.exports = function (app) {
  var base = require(__dirname + '/base/controller')(app);

  // No modules responded
  app.use(function(req, res) {
    res.status(404).render('', {
      url: req.originalUrl,
      error: 'Not Found'
    });
  });
};
