var monitor = require('../../management/cluster'),
  amqpManager = require('../../management/amqp');

module.exports = function(app) {
  (function() {
    amqpManager.addConsumer({consumerCallback: listeningForMessages});
  })();
  
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

  function listeningForMessages(payload) {
    console.log(payload);
  }
  
  app.get('/sendmessage', function(req, res, next) {
    var messageToSend = req.query.message;
    amqpManager.sendMessage({messageObject: messageToSend});
    
    res.redirect('/');
  });
};
