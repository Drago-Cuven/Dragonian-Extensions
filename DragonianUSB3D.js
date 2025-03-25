/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.1
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`"Dragonian3D" must be ran unsandboxed.`);
  }

  // Dynamic global extension variable
  const ext = {
    colors: {
      three: "#0D2E6E",
      motion: "#396FAF",
      looks: "#734EBF",
      events: "#BF8F00",
      camera: "#BF3F26"
    },
    images: {
      blankIcon: ''
    },
    cameras: [], // Array of camera IDs (strings)
    scenes: [],  // Array of scene names (strings)
    clones: []   // Array of clone IDs (strings)
  }; 

  //const threejs = await import("https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js");
  //import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js';

  /* =======================================================================
   * Three: Generic scene management (supports multiple scenes)
   * ======================================================================= */
  class Three {
    constructor() {
      this.scenes = {}; // key: scene name, value: scene object
      this.currentScene = null;
    }
    getInfo() {
      return {
        id: 'DragonianUSB3D',
        name: '3D',
        color1: ext.colors.three,
        blocks: [
          {
            opcode: 'initializeScene',
            blockType: Scratch.BlockType.COMMAND,
            text: 'initialize scene [SCENENAME]',
            arguments: {
              SCENENAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'default scene' }
            }
          },
          {
            opcode: 'switchScene',
            blockType: Scratch.BlockType.COMMAND,
            text: 'switch to scene [SCENENAME]',
            arguments: {
              SCENENAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'default scene' }
            }
          }
        ]
      };
    }
    initializeScene(args) {
      const name = args.SCENENAME;
      this.scenes[name] = { name: name, objects: [] };
      this.currentScene = this.scenes[name];
      if (!ext.scenes.includes(name)) {
        ext.scenes.push(name);
      }
      console.log(`Scene '${name}' initialized.`);
    }
    switchScene(args) {
      const name = args.SCENENAME;
      if (this.scenes[name]) {
        this.currentScene = this.scenes[name];
        console.log(`Switched to scene '${name}'.`);
      } else {
        console.log(`Scene '${name}' does not exist.`);
      }
    }
  }

  /* =======================================================================
   * ThreeMotion: Blocks for moving and rotating models (position)
   * ======================================================================= */
  class ThreeMotion {
    constructor() {}
    getInfo() {
      return {
        id: 'DragonianUSB3DMotion',
        name: 'Motion 3D',
        color1: ext.colors.motion,
        blocks: [
          {
            opcode: 'moveModel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move model [MODEL] by x: [X] y: [Y] z: [Z]',
            arguments: {
              MODEL: { type: Scratch.ArgumentType.OBJECT, defaultValue: {} },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          }
        ]
      };
    }
    moveModel(args) {
      console.log(`Moving model ${JSON.stringify(args.MODEL)} by vector X:${args.X}, Y:${args.Y}, Z:${args.Z}`);
    }
  }

  /* =======================================================================
   * ThreeLooks: Blocks for handling models as costumes, animations, and scale
   * ======================================================================= */
  class ThreeLooks {
    constructor() {}
    getInfo() {
      return {
        id: 'DragonianUSB3DLooks',
        name: 'Looks 3D',
        color1: ext.colors.looks,
        blocks: [
          {
            opcode: 'addModel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add model from [SOURCE] as costume',
            arguments: {
              SOURCE: { type: Scratch.ArgumentType.STRING, defaultValue: 'http://example.com/model.gltf' }
            }
          }
        ]
      };
    }
    addModel(args) {
      console.log(`Adding model from source: ${args.SOURCE}`);
    }
  }

  /* =======================================================================
   * ThreeEvents: Blocks for scene and object events
   * ======================================================================= */
  class ThreeEvents {
    constructor() {}
    getInfo() {
      return {
        id: 'DragonianUSB3DEvents',
        name: 'Events 3D',
        color1: ext.colors.events,
        blocks: [
          {
            opcode: 'whenObjectClicked',
            blockType: Scratch.BlockType.HAT,
            text: 'when model [MODEL] clicked',
            arguments: {
              MODEL: { type: Scratch.ArgumentType.OBJECT, defaultValue: {} }
            }
          }
        ]
      };
    }
    whenObjectClicked(args) {
      console.log("scratch");
    }
  }

  /* =======================================================================
   * ThreeCamera: Blocks for managing multiple cameras and focusing on one
   * ======================================================================= */
  class ThreeCamera {
    constructor() {
      this.cameras = {};
      this.currentCamera = null;
    }
    getInfo() {
      return {
        id: 'DragonianUSB3DCamera',
        name: 'Camera 3D',
        color1: ext.colors.camera,
        blocks: [
          {
            opcode: 'addCamera',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add camera [CAMERANAME]',
            arguments: {
              CAMERANAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'default camera' }
            }
          }
        ]
      };
    }
    addCamera(args) {
      const name = args.CAMERANAME;
      this.cameras[name] = { name: name, position: [0, 0, 0], rotation: [0, 0, 0] };
      if (!ext.cameras.includes(name)) {
        ext.cameras.push(name);
      }
      console.log(`Camera '${name}' added.`);
      if (!this.currentCamera) {
        this.currentCamera = this.cameras[name];
      }
    }
  }

  /* =======================================================================
   * ThreeClones: Blocks for clone management (optional)
   * ======================================================================= */
  class ThreeClones {
    constructor() {}
    getInfo() {
      return {
        id: 'DragonianUSB3DClones',
        name: 'Clones 3D',
        color1: ext.colors.three,
        blocks: [
          {
            opcode: 'createClone',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create clone of [MODEL]',
            arguments: {
              MODEL: { type: Scratch.ArgumentType.OBJECT, defaultValue: {} }
            }
          }
        ]
      };
    }
    createClone(args) {
      const cloneID = "clone_" + Math.random().toString(36).substr(2, 5);
      ext.clones.push(cloneID);
      console.log(`Created clone of ${JSON.stringify(args.MODEL)} with ID ${cloneID}`);
    }
  }

  Scratch.extensions.register(new Three());
  Scratch.extensions.register(new ThreeMotion());
  Scratch.extensions.register(new ThreeLooks());
  Scratch.extensions.register(new ThreeEvents());
  Scratch.extensions.register(new ThreeCamera());
  Scratch.extensions.register(new ThreeClones());


})(Scratch);
