module.exports = function(app) {
  app.use('/', function(req, res, next) {
    res.render(__dirname + '/views/index.html', {});
  });
};
