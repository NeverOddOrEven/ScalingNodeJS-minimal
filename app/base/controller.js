var monitor = require('../../management/cluster');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    var processes = monitor.getProcesses();
    var port = monitor.getPort();
    var pid = monitor.getProcess();
    res.render('./views/index.html', {
      info: {
        pid: pid,
        port: port,
        processes: processes,
        sessionValue: req.session.sessionValue
      }
    });
  });
    
  app.get('/setsession', function(req, res, next) {
    console.log(req.query.sessionValue);
    req.session.sessionValue = req.query.sessionValue;
      
    res.redirect('/');
  });
};
