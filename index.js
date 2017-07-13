// import derp from './index.html';
// import 'aframe';
// import parser from 'html2hscript';
// import 'aframe-orbit-controls-component-2';
// import App from './reactscene';
// import { AppContainer } from 'react-hot-loader';
import socketio from 'socket.io/lib/client';
// window.io = socketio;
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

// import React from 'react';
// import ReactDOM from 'react-dom';

let tree = require('./html-hscript-loader!./scene.html');
const sceneNode = createElement(tree);

window.onload = function () {
  require('./aframesetup'); // A-Frame applies styles to the body, so need to load after that
  document.querySelector('#container').appendChild(sceneNode);
};

if (module.hot) {
  module.hot.accept('./reactscene', () => { console.log('update!'); render(App); });
  module.hot.accept('./html-hscript-loader!./scene.html', function () {
    console.log('swap');
    var newTree = require('./html-hscript-loader!./scene.html');
    var patches = diff(tree, newTree);
    patch(sceneNode, patches);
    tree = newTree;
  });
}

// import 'easyrtc';
// import 'networked-aframe';
