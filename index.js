// import socketio from 'socket.io/lib/client';
// window.io = socketio;
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import './test';

let sceneTree = require('./html-hscript-loader!./subscene.html');
const sceneNode = createElement(sceneTree);

let assetTree = require('./html-hscript-loader!./assets.html');
const assetNode = createElement(assetTree);

window.onload = function () {
  require('./aframesetup'); // A-Frame applies styles to the body, so need to load after the page is loaded
  document.querySelector('#container').innerHTML = require('raw-loader!./scene.html');
  document.querySelector('#sceneNode').prepend(assetNode);
  document.querySelector('#subSceneContainer').appendChild(sceneNode);
};

if (module.hot) {
  module.hot.accept('./html-hscript-loader!./subscene.html', function () {
    console.log('swap');
    var newSceneTree = require('./html-hscript-loader!./subscene.html');
    var patches = diff(sceneTree, newSceneTree);
    patch(sceneNode, patches);
    sceneTree = newSceneTree;
  });
  module.hot.accept('./html-hscript-loader!./assets.html', function () {
    var newAssetTree = require('./html-hscript-loader!./assets.html');
    var patches = diff(assetTree, newAssetTree);
    patch(assetNode, patches);
    assetTree = newAssetTree;
  });
}
