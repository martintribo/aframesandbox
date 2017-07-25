import playerTemplate from '../loaders/naf-template-loader!./player';
import thirdPlayer from '../loaders/naf-template-loader!./thirdpersonviewplayer';
// TODO: Make a loader that takes an html file and generates a file like this.
// The loader can parse the networked component template value for non id references.
// When it finds one, it assumes it's referring to a module, and uses the module's default export instead.
export default `
<a-scene id="sceneNode" embedded networked-scene="
      room: basic;
      debug: true;
    ">

    <!--<a-box velocity color="#4CC3D9" position="0 2 0" wasd-physics="fly: true;" dynamic-body look-controls>
      <a-entity camera position="0 2 4"></a-entity>
    </a-box>-->

    <a-entity id="player" networked="template:${thirdPlayer};" position="0 2 0">
    </a-entity>

  <a-entity id="subSceneContainer">
  </a-entity>
</a-scene>
`;
