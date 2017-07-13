// import socketio from 'socket.io/lib/client';
// window.io = socketio;
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

let tree = require('./html-hscript-loader!./scene.html');
const sceneNode = createElement(tree);

window.onload = function () {
  require('./aframesetup'); // A-Frame applies styles to the body, so need to load after the page is loaded
  document.querySelector('#container').appendChild(sceneNode);
};

if (module.hot) {
  module.hot.accept('./html-hscript-loader!./scene.html', function () {
    console.log('swap');
    var newTree = require('./html-hscript-loader!./scene.html');
    var patches = diff(tree, newTree);
    patch(sceneNode, patches);
    tree = newTree;
  });
}
