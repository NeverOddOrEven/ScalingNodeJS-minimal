var settings = require('./config/settings'),
  cluster = require('cluster'),
  os = require('os'),
  mongoose = require('mongoose'),
  monitor = require('./management/cluster');

var dbHandle = mongoose.connect(settings.dbPath);
var  app = require('./config/express')(dbHandle),
  modules = require('./app/settings')(app);

if (cluster.isMaster) {
  var numberOfCores = os.cpus().length;
  for (var i = 0; i < numberOfCores; ++i) {
    cluster.fork();
  }
  
  var index = 0, processes = [];
  for (var key in cluster.workers) {
    (function (i) {
      processes[index++] = cluster.workers[i].process.pid;
    })(key);
  }

  for (var key in cluster.workers) {
    (function (i) {
      var process = cluster.workers[i];
      process.on('online', function() {
        process.send({type: 'monitor', port: settings.port, processes: processes});
      });
    })(key);
  }

} else {
  console.log('Listening on port: ' + settings.port);
  app.listen(settings.port);

  cluster.worker.on('message', function(message) {
    if (message.type === 'monitor') {
      monitor.setPort(message.port);
      monitor.setProcess(cluster.worker.process.pid);
      monitor.setProcesses(message.processes);
    }
  });
}


exports = module.exports = app;


