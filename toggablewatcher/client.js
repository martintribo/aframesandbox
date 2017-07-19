// Shamelessly ripped from webpack-hot-middleware/client-overlay

var io = require('socket.io-client');
var socket = io.connect();

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-interactive-watch-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#E8E8E8',
  lineHeight: '1.2',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left'
};
for (var key in styles) {
  clientOverlay.style[key] = styles[key];
}

socket.on('syncWithheld', function(withheld) {
  clientOverlay.innerHTML = '';

  Object.keys(withheld.files).forEach(path => {
    var container = document.createElement('div');
    var btn = document.createElement('button');
    btn.addEventListener('click', function () {
      socket.emit('forwardWithheldFile', path);
    });
    btn.innerText = 'Forward';
    var element = document.createElement('span');
    element.innerText = path;
    clientOverlay.appendChild(element);

    container.appendChild(btn);
    container.appendChild(element);
    clientOverlay.appendChild(container);
  });

  Object.keys(withheld.dirs).forEach(path => {
    var container = document.createElement('div');
    var btn = document.createElement('button');
    btn.addEventListener('click', function () {
      socket.emit('forwardWithheldDirectory', path);
    });
    btn.innerText = 'Forward';
    var element = document.createElement('span');
    element.innerText = path;
    clientOverlay.appendChild(element);

    container.appendChild(btn);
    container.appendChild(element);
    clientOverlay.appendChild(container);
  });

  if (Object.keys(withheld.files).length > 0 || Object.keys(withheld.dirs) > 0) {
    var btn = document.createElement('button');
    btn.addEventListener('click', function () {
      socket.emit('forwardAllWithheld');
    });
    btn.innerText = 'Forward All Changes';
    clientOverlay.appendChild(btn);
  }
});

document.addEventListener('keyup', function (e) {
  if (e.key === '`' && e.getModifierState('Control') && e.getModifierState('Alt')) {
    toggleConsole();
  }
});

function toggleConsole() {
  if (clientOverlay.parentNode == null) {
    document.body.appendChild(clientOverlay);
  } else {
    document.body.removeChild(clientOverlay);
  }
}
