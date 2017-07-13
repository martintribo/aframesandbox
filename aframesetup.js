import 'aframe';
import 'aframe-randomizer-components';
// import 'easyrtc';
import 'networked-aframe';
import './spawnincircle';
import physics  from 'aframe-physics-system';
physics.registerAll();
var avatarSchema = {
  template: '#avatar-template',
  components: [
    'position',
    'rotation',
    {
      selector: '.head',
      component: 'material'
    }
  ]
};
NAF.schemas.add(avatarSchema);
