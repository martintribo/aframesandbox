export var template = `
  <a-entity class="avatar" camera="userHeight: 1.6" universal-controls look-controls jump-ability kinematic-body>
    <a-sphere class="head"
      color="#5985ff"
      scale="0.45 0.5 0.4"
      random-color
    ></a-sphere>
    <a-entity class="face"
      position="0 0.05 0"
    >
      <a-sphere class="eye"
        color="#efefef"
        position="0.16 0.1 -0.35"
        scale="0.12 0.12 0.12"
      >
        <a-sphere class="pupil"
          color="#000"
          position="0 0 -1"
          scale="0.2 0.2 0.2"
        ></a-sphere>
      </a-sphere>
      <a-sphere class="eye"
        color="#efefef"
        position="-0.16 0.1 -0.35"
        scale="0.12 0.12 0.12"
      >
        <a-sphere class="pupil"
          color="#000"
          position="0 0 -1"
          scale="0.2 0.2 0.2"
        ></a-sphere>
      </a-sphere>
    </a-entity>
  </a-entity>
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
