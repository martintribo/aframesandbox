export var template = `
  <a-box id="player" position="0 0.5 0" universal-controls body jump-ability kinematic-body networked="template:${nafTemplateId};">
    <a-entity camera position="0 2 4"></a-entity>
  </a-entity>
`;

export var nafTemplate = ``;

export var schema =  {
  components: [
    'position',
    'rotation',
    'geometry',
    {
      selector: '.body',
      component: 'position'
    }
  ]
};
