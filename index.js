import derp from './index.html';
import 'aframe';
// import 'aframe-orbit-controls-component-2';
import App from './reactscene';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

// import physics  from 'aframe-physics-system';
// physics.registerAll();console.log("test");

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('container')
  )
}

window.onload = function () {
  render(App);
};

if (module.hot) {
  console.log('is hot ' + new Date());
  module.hot.accept('./reactscene', () => { console.log('update!'); render(App); })
}

// import 'easyrtc';
// import 'networked-aframe';
