var appConfig = require('./config/settings'),
  app = require('./config/express')(),
  modules = require('./app/settings')(app);

console.log('Listening on port: ' + appConfig.port);
app.listen(appConfig.port);

exports = module.exports = app;


