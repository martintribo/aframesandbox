const ToggableWatchPlugin = require('./plugin');

module.exports = function (compiler, socketServer) {
  socketServer.on('connection', function(socket) {
    const plugin = compiler.options.plugins.find(p => p instanceof ToggableWatchPlugin);
    const fs = plugin.fileSystem;

    socket.emit('syncWithheld', {
      files: fs.withheldFiles,
      dirs: fs.withheldDirs
    });

    fs.on('pathWithheld', path => {
      socket.emit('syncWithheld', {
        files: fs.withheldFiles,
        dirs: fs.withheldDirs
      });
    });
    fs.on('forwarded', () => {
      socket.emit('syncWithheld', {
        files: fs.withheldFiles,
        dirs: fs.withheldDirs
      });
    });

    socket.on('forwardAllWithheld', function () {
      fs.forwardAllWithheldChanges();
    });

    socket.on('forwardWithheldFile', function (path) {
      fs.forwardWithheldFile(path);
    });

    socket.on('forwardWithheldDirectory', function (path) {
      fs.forwardWithheldDirectory(path);
    });

    socket.on('disconnect', function() {
      // Nothing
    });
  });
};
