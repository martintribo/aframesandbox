import 'aframe';
import 'aframe-template-component';
import 'aframe-randomizer-components';
// import 'easyrtc';
import 'networked-aframe/src/index';
import './spawnincircle';
import physics from 'aframe-physics-system';
physics.registerAll();

import './components/physicswasd';
import './components/expose';

import extras from 'aframe-extras';
extras.registerAll();
