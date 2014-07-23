function Monitor() {
  var _processes = [];
  var _process;
  var _port;

  function setPort(port) {
    _port = port;
  }

  function getPort() {
    return _port;
  }

  function setProcesses(processes) {
    _processes = processes;
  }
  
  function getProcesses() {
    return _processes;
  }

  function setProcess(process) {
    _process = process;
  }

  function getProcess() {
    return _process;
  }

  return {
    setPort: setPort,
    getPort: getPort,
    setProcess: setProcess,
    setProcesses: setProcesses,
    getProcess: getProcess,
    getProcesses: getProcesses
  };
}

module.exports = exports = new Monitor();
