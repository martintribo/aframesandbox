// import socketio from 'socket.io/lib/client';
// window.io = socketio;
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import './aframesetup';

// import {element} from './loaders/naf-template-loader!./templates/player';
import sceneHTML from './templates/scene';

let sceneTree = require('./html-hscript-loader!./templates/subscene.html');
const sceneNode = createElement(sceneTree);

// TODO: Rethink hotswapping asset tree updates.
// Assets are meant for first time loading, so it doesn't make much sense to put runtime updates here
// However, if the project were bundled, it'd make sense to put assets here.
// It might make sense to code as if assets are being put here, but the build system could load them differently if hotswapping in
let assetTree = require('./html-hscript-loader!./assets.html');
const assetNode = createElement(assetTree);

window.onload = function () {
  document.querySelector('#container').innerHTML = sceneHTML;
  document.querySelector('#sceneNode').prepend(assetNode);
  document.querySelector('#subSceneContainer').appendChild(sceneNode);
};

if (module.hot) {
  module.hot.accept('./html-hscript-loader!./templates/subscene.html', function () {
    var newSceneTree = require('./html-hscript-loader!./templates/subscene.html');
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
