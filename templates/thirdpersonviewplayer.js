export var template = `
  <a-box velocity color="#4CC3D9" wasd-physics dynamic-body look-controls expose>
    <a-entity camera position="0 2 4"></a-entity>
  </a-box>
`;

export var schema =  {
  components: [
    'position',
    'rotation',
    {
      selector: '.head',
      component: 'material'
    }
  ]
};
