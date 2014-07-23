var settings = require('./config/settings'),
  commandLineParser = require('./config/utilities/commandLineParser'),
  amqpManager = require('./management/amqp'),
  cluster = require('cluster'),
  os = require('os'),
  mongoose = require('mongoose'),
  monitor = require('./management/cluster');

var dbHandle = mongoose.connect(settings.dbPath);
  app = require('./config/express')(dbHandle);

// Must come before modules - otherwise controllers will not initialize with amqp
amqpManager.initialize(settings.amqpPath);

var modules = require('./app/settings')(app);

if (cluster.isMaster) {
  var commandLineArguments = commandLineParser.parse();
  var port = commandLineArguments.port || settings.port || 3000;
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
        process.send({type: 'monitor', port: port, processes: processes});
      });
    })(key);
  }
  cluster.on('exit', function(worker, code, signal) {
    console.info('Worker ' + worker.process.pid + ' died');
  });
} else {
  cluster.worker.on('message', function(message) {
    if (message.type === 'monitor') {
      console.log('Listening on port: ' + message.port);
      app.listen(message.port);
      monitor.setPort(message.port);
      monitor.setProcess(cluster.worker.process.pid);
      monitor.setProcesses(message.processes);
    }
  });
}

exports = module.exports = app;


