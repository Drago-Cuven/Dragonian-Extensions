/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.16
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

// Global mutable arrays and variables (using let)
let models = [];
let cameras = [];  // Global cameras array
// No scenes array is needed since there is only one scene.
let currentCamera = null;

// Global camera settings with default values.
let cameraSettings = {
  FOV: 90,
  minrender: 0.1,
  maxrender: 1000
};

(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`"Dragonian3D" must be run unsandboxed.`);
  }

  // Global extension variables – note that we reuse the global arrays above.
  let ext = {
    colors: {
      three: "#0000FF",
      motion: "#396FAF",
      looks: "#734EBF",
      events: "#BF8F00",
      camera: "#BF3F26",
      control: "#BF8F00"
    },
    cameras: cameras,
    models: models
  };

  /* =======================================================================
   * Three: Scene Management (Single Scene)
   * Blocks:
   *  - initialize scene
   *  - scene [ONOFF]   (menu onoff: on, off)
   *  - 3D on?         (boolean reporter)
   * ======================================================================= */
  class Three {
    constructor() {
      this.scene = null; // Single scene storage
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
            text: 'initialize scene'
          },
          {
            opcode: 'toggleScene',
            blockType: Scratch.BlockType.COMMAND,
            text: 'scene [ONOFF]',
            arguments: {
              ONOFF: { type: Scratch.ArgumentType.STRING, menu: 'onoff', defaultValue: 'on' }
            }
          },
          {
            opcode: 'is3DOn',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '3D on?'
          },
          {
            opcode: 'existingScenes',
            blockType: Scratch.BlockType.ARRAY,
            text: 'existing scenes'
          }
        ],
        menus: {
          onoff: {
            acceptReporters: true,
            items: ['on', 'off']
          }
        }
      };
    }
    initializeScene() { return "in development"; }
    toggleScene(args) { return "in development"; }
    is3DOn() { return "in development"; }
    existingScenes() { return JSON.stringify([]); }
  }

  /* =======================================================================
   * ThreeMotion: 3D Object Movement
   * (Blocks unchanged)
   * ======================================================================= */
  class ThreeMotion {
    getInfo() {
      return {
        id: 'DragonianUSB3DMotion',
        name: 'Motion 3D',
        color1: ext.colors.motion,
        blocks: [
          {
            opcode: 'moveSteps',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move [STEPS] steps in 3D',
            arguments: {
              STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'setPosition',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set position to x:[X] y:[Y] z:[Z]',
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'changePosition',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change position by x:[X] y:[Y] z:[Z]',
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'setRotation',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rotation to r:[R] p:[P] y:[Y]',
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'changeRotation',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change rotation by r:[R] p:[P] y:[Y]',
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'setPosMenu',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set pos [POSTYPES] to [NUMBER]',
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: 'postypes', defaultValue: 'x' },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'setRotMenu',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rot [ROTTYPES] to [NUMBER]',
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: 'rottypes', defaultValue: 'r (roll)' },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'directionAround',
            blockType: Scratch.BlockType.REPORTER,
            text: 'direction around [ROTTYPES]',
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: 'rottypes', defaultValue: 'r (roll)' }
            }
          },
          {
            opcode: 'xPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'x position'
          },
          {
            opcode: 'yPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'y position'
          },
          {
            opcode: 'zPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'z position'
          },
          {
            opcode: 'roll',
            blockType: Scratch.BlockType.REPORTER,
            text: 'roll'
          },
          {
            opcode: 'pitch',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pitch'
          },
          {
            opcode: 'yaw',
            blockType: Scratch.BlockType.REPORTER,
            text: 'yaw'
          },
          {
            opcode: 'positionArray',
            blockType: Scratch.BlockType.ARRAY,
            text: 'position'
          },
          {
            opcode: 'positionObject',
            blockType: Scratch.BlockType.OBJECT,
            text: 'position'
          },
          {
            opcode: 'rotationArray',
            blockType: Scratch.BlockType.ARRAY,
            text: 'rotation'
          },
          {
            opcode: 'rotationObject',
            blockType: Scratch.BlockType.OBJECT,
            text: 'rotation'
          },
          {
            opcode: 'turnDegrees',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn [TURNDIRS] [NUM] degrees',
            arguments: {
              TURNDIRS: { type: Scratch.ArgumentType.STRING, menu: 'turndirs', defaultValue: 'up' },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          }
        ],
        menus: {
          postypes: {
            acceptReporters: true,
            items: ['x', 'y', 'z']
          },
          rottypes: {
            acceptReporters: true,
            items: [
              { text: "r (roll)", value: "r (roll)" },
              { text: "p (pitch)", value: "p (pitch)" },
              { text: "y (yaw)", value: "y (yaw)" }
            ]
          },
          turndirs: {
            acceptReporters: true,
            items: ['up', 'down', 'left', 'right']
          }
        }
      };
    }
    moveSteps(args) { return "in development"; }
    setPosition(args) { return "in development"; }
    changePosition(args) { return "in development"; }
    setRotation(args) { return "in development"; }
    changeRotation(args) { return "in development"; }
    setPosMenu(args) { return "in development"; }
    setRotMenu(args) { return "in development"; }
    directionAround(args) { return "in development"; }
    xPosition() { return "in development"; }
    yPosition() { return "in development"; }
    zPosition() { return "in development"; }
    roll() { return "in development"; }
    pitch() { return "in development"; }
    yaw() { return "in development"; }
    positionArray() { return "in development"; }
    positionObject() { return "in development"; }
    rotationArray() { return "in development"; }
    rotationObject() { return "in development"; }
    turnDegrees(args) { return "in development"; }
  }

  /* =======================================================================
   * ThreeLooks: Model & Appearance Management
   * Blocks:
   *  - set model to [MODEL] (menu from models array)
   *  - add model as [MODELNAME] from url [MODELURL]
   *  - existing models (array reporter)
   *  - set texture filter to [TEXTUREFILTER]   (menu: texturefilter: [nearest, linear])
   *  - show faces [SHOWFACES] of myself        (menu: showfaces: [both, front, back])
   *  - set sprite mode to [SPRITEMODE]          (menu: spritemode: [2D, 3D])
   *  - set stretch to x:[X] y:[Y] z:[Z]
   *  - change stretch by x:[X] y:[Y] z:[Z]
   *  - set stretch [POSTYPES] to [NUMBER]
   *  - change stretch [POSTYPES] by [NUMBER]
   *  - stretch x         (reporter)
   *  - stretch y         (reporter)
   *  - stretch z         (reporter)
   *  - stretches         (array reporter)
   *  - stretches         (object reporter)
   * ======================================================================= */
  class ThreeLooks {
    getInfo() {
      return {
        id: 'DragonianUSB3DLooks',
        name: 'Looks 3D',
        color1: ext.colors.looks,
        blocks: [
          {
            opcode: 'setModel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set model to [MODEL]',
            arguments: {
              MODEL: { type: Scratch.ArgumentType.STRING, menu: 'models', defaultValue: "none" }
            }
          },
          {
            opcode: 'addModel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add model as [MODELNAME] from url [MODELURL]',
            arguments: {
              MODELNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "new model" },
              MODELURL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://raw.githubusercontent.com/alecjacobson/common-3d-test-models/refs/heads/master/data/teapot.obj" }
            }
          },
          {
            opcode: 'existingModels',
            blockType: Scratch.BlockType.ARRAY,
            text: 'existing models'
          },
          {
            opcode: 'setTextureFilter',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set texture filter to [TEXTUREFILTER]',
            arguments: {
              TEXTUREFILTER: { type: Scratch.ArgumentType.STRING, menu: 'texturefilter', defaultValue: 'nearest' }
            }
          },
          {
            opcode: 'showFaces',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show faces [SHOWFACES] of myself',
            arguments: {
              SHOWFACES: { type: Scratch.ArgumentType.STRING, menu: 'showfaces', defaultValue: 'both' }
            }
          },
          {
            opcode: 'setSpriteMode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set sprite mode to [SPRITEMODE]',
            arguments: {
              SPRITEMODE: { type: Scratch.ArgumentType.STRING, menu: 'spritemode', defaultValue: '2D' }
            }
          },
          {
            opcode: 'setStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch to x:[X] y:[Y] z:[Z]',
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'changeStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change stretch by x:[X] y:[Y] z:[Z]',
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'setStretchMenu',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch [POSTYPES] to [NUMBER]',
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: 'postypes', defaultValue: 'x' },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'changeStretchMenu',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change stretch [POSTYPES] by [NUMBER]',
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: 'postypes', defaultValue: 'x' },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'stretchX',
            blockType: Scratch.BlockType.REPORTER,
            text: 'stretch x'
          },
          {
            opcode: 'stretchY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'stretch y'
          },
          {
            opcode: 'stretchZ',
            blockType: Scratch.BlockType.REPORTER,
            text: 'stretch z'
          },
          {
            opcode: 'stretchesArray',
            blockType: Scratch.BlockType.ARRAY,
            text: 'stretches'
          },
          {
            opcode: 'stretchesObject',
            blockType: Scratch.BlockType.OBJECT,
            text: 'stretches'
          }
        ],
        menus: {
          models: {
            acceptReporters: true,
            items: () => models.length > 0 ? models : ["none"]
          },
          texturefilter: {
            acceptReporters: true,
            items: ['nearest', 'linear']
          },
          showfaces: {
            acceptReporters: true,
            items: ['both', 'front', 'back']
          },
          spritemode: {
            acceptReporters: true,
            items: ['2D', '3D']
          },
          postypes: {
            acceptReporters: true,
            items: ['x', 'y', 'z']
          }
        }
      };
    }
    setModel(args) { return "in development"; }
    addModel(args) { return "in development"; }
    setTextureFilter(args) { return "in development"; }
    showFaces(args) { return "in development"; }
    setSpriteMode(args) { return "in development"; }
    setStretch(args) { return "in development"; }
    changeStretch(args) { return "in development"; }
    setStretchMenu(args) { return "in development"; }
    changeStretchMenu(args) { return "in development"; }
    stretchX() { return "in development"; }
    stretchY() { return "in development"; }
    stretchZ() { return "in development"; }
    stretchesArray() { return JSON.stringify(models); }
    stretchesObject() { return JSON.stringify(models); }
  }

  /* =======================================================================
   * ThreeEvents: Event Handling
   * Block:
   *  - temp (reporter)
   * ======================================================================= */
  class ThreeEvents {
    getInfo() {
      return {
        id: 'DragonianUSB3DEvents',
        name: 'Events 3D',
        color1: ext.colors.events,
        blocks: [
          {
            opcode: 'temp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'temp'
          }
        ]
      };
    }
    temp() { return "in development"; }
  }

  /* =======================================================================
   * ThreeControl: Control (Replacing Clones)
   * Block:
   *  - temp (reporter)
   * ======================================================================= */
  class ThreeControl {
    getInfo() {
      return {
        id: 'DragonianUSB3DControl',
        name: 'Control 3D',
        color1: ext.colors.control,
        blocks: [
          {
            opcode: 'temp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'temp'
          }
        ]
      };
    }
    temp() { return "in development"; }
  }

  /* =======================================================================
   * ThreeCamera: Camera Management
   * Blocks:
   *  - create camera [CAMERA]
   *  - delete camera [CAMERA]          (from cameras menu)
   *  - existing cameras (array reporter) [moved below delete camera]
   *  - focus on camera [CAMERA]         (new block)
   *  - move camera [CAMERA] [STEPS] steps in 3D
   *  - set camera position of [CAMERA] to x:[X] y:[Y] z:[Z]
   *  - change camera position of [CAMERA] by x:[X] y:[Y] z:[Z]
   *  - set camera rotation of [CAMERA] to r:[R] p:[P] y:[Y]
   *  - change camera rotation of [CAMERA] by r:[R] p:[P] y:[Y]
   *  - set camera pos [POSTYPES] of [CAMERA] to [NUMBER]
   *  - set camera rot [ROTTYPES] of [CAMERA] to [NUMBER]
   *  - camera direction around [ROTTYPES] of [CAMERA] (reporter)
   *  - camera x position of [CAMERA] (reporter)
   *  - camera y position of [CAMERA] (reporter)
   *  - camera z position of [CAMERA] (reporter)
   *  - camera roll of [CAMERA] (reporter)
   *  - camera pitch of [CAMERA] (reporter)
   *  - camera yaw of [CAMERA] (reporter)
   *  - camera position of [CAMERA] (array reporter)
   *  - camera position of [CAMERA] (object reporter) --> OBJECT type
   *  - camera rotation of [CAMERA] (array reporter)
   *  - camera rotation of [CAMERA] (object reporter) --> OBJECT type
   *  - bind camera [CAMERA] to [SPRITE]
   *  - unbind camera [CAMERA]
   *  - binded sprite of camera [CAMERA] (reporter)
   *  - set camera [CAMVIS] to [NUMBER]   (new functional block)
   *  - camera [CAMVIS]                  (new reporter block)
   * ======================================================================= */
  class ThreeCamera {
    getInfo() {
      return {
        id: 'DragonianUSB3DCamera',
        name: 'Camera 3D',
        color1: ext.colors.camera,
        blocks: [
          {
            opcode: 'createCamera',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create camera [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, defaultValue: "current" }
            }
          },
          {
            opcode: 'deleteCamera',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete camera [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'existingCameras',
            blockType: Scratch.BlockType.ARRAY,
            text: 'existing cameras'
          },
          {
            opcode: 'focusCamera',
            blockType: Scratch.BlockType.COMMAND,
            text: 'focus on camera [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'moveCameraSteps',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move camera [CAMERA] [STEPS] steps in 3D',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'setCameraPosition',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera position of [CAMERA] to x:[X] y:[Y] z:[Z]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'changeCameraPosition',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera position of [CAMERA] by x:[X] y:[Y] z:[Z]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'setCameraRotation',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera rotation of [CAMERA] to r:[R] p:[P] y:[Y]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'changeCameraRotation',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera rotation of [CAMERA] by r:[R] p:[P] y:[Y]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'setCameraPosMenu',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera pos [POSTYPES] of [CAMERA] to [NUMBER]',
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: 'postypes', defaultValue: 'x' },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'setCameraRotMenu',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera rot [ROTTYPES] of [CAMERA] to [NUMBER]',
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: 'rottypes', defaultValue: 'r (roll)' },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'cameraDirectionAround',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera direction around [ROTTYPES] of [CAMERA]',
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: 'rottypes', defaultValue: 'r (roll)' },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraXPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera x position of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraYPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera y position of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraZPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera z position of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraRoll',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera roll of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraPitch',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera pitch of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraYaw',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera yaw of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraPositionArray',
            blockType: Scratch.BlockType.ARRAY,
            text: 'camera position of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraPositionObject',
            blockType: Scratch.BlockType.OBJECT,
            text: 'camera position of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraRotationArray',
            blockType: Scratch.BlockType.ARRAY,
            text: 'camera rotation of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'cameraRotationObject',
            blockType: Scratch.BlockType.OBJECT,
            text: 'camera rotation of [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'bindCamera',
            blockType: Scratch.BlockType.COMMAND,
            text: 'bind camera [CAMERA] to [SPRITE]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" },
              SPRITE: { type: Scratch.ArgumentType.STRING }
            }
          },
          {
            opcode: 'unbindCamera',
            blockType: Scratch.BlockType.COMMAND,
            text: 'unbind camera [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'bindedSprite',
            blockType: Scratch.BlockType.REPORTER,
            text: 'binded sprite of camera [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'focusCamera',
            blockType: Scratch.BlockType.COMMAND,
            text: 'focus on camera [CAMERA]',
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: 'cameras', defaultValue: "current" }
            }
          },
          {
            opcode: 'setCameraVis',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera [CAMVIS] to [NUMBER]',
            arguments: {
              CAMVIS: { type: Scratch.ArgumentType.STRING, menu: 'camvis' },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 }
            }
          },
          {
            opcode: 'getCameraVis',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera [CAMVIS]',
            arguments: {
              CAMVIS: { type: Scratch.ArgumentType.STRING, menu: 'camvis', defaultValue: 'FOV' }
            }
          }
        ],
        menus: {
          cameras: {
            acceptReporters: true,
            items: () => {
              // Always have "current" as the first option.
              let camList = ["current"];
              camList = camList.concat(cameras.filter(c => c !== "current"));
              return camList.length > 0 ? camList : ["none"];
            }
          },
          postypes: {
            acceptReporters: true,
            items: ['x', 'y', 'z']
          },
          rottypes: {
            acceptReporters: true,
            items: [
              { text: "r (roll)", value: "r (roll)" },
              { text: "p (pitch)", value: "p (pitch)" },
              { text: "y (yaw)", value: "y (yaw)" }
            ]
          },
          camvis: {
            acceptReporters: true,
            items: [
              "FOV",
              { text: "Minimum render distance", value: "minrender" },
              { text: "Maximum render distance", value: "maxrender" }
            ]
          },
          turndirs: {
            acceptReporters: true,
            items: ['up', 'down', 'left', 'right']
          }
        }
      };
    }
    createCamera(args) { 
      cameras.push(args.CAMERA);
      return "in development"; 
    }
    deleteCamera(args) { 
      cameras = cameras.filter(c => c !== args.CAMERA);
      return "in development"; 
    }
    moveCameraSteps(args) { return "in development"; }
    setCameraPosition(args) { return "in development"; }
    changeCameraPosition(args) { return "in development"; }
    setCameraRotation(args) { return "in development"; }
    changeCameraRotation(args) { return "in development"; }
    setCameraPosMenu(args) { return "in development"; }
    setCameraRotMenu(args) { return "in development"; }
    cameraDirectionAround(args) { return "in development"; }
    cameraXPosition(args) { return "in development"; }
    cameraYPosition(args) { return "in development"; }
    cameraZPosition(args) { return "in development"; }
    cameraRoll(args) { return "in development"; }
    cameraPitch(args) { return "in development"; }
    cameraYaw(args) { return "in development"; }
    cameraPositionArray(args) { return "in development"; }
    cameraPositionObject(args) { return "in development"; }
    cameraRotationArray(args) { return "in development"; }
    cameraRotationObject(args) { return "in development"; }
    bindCamera(args) { return "in development"; }
    unbindCamera(args) { return "in development"; }
    bindedSprite(args) { return "in development"; }
    existingCameras() { return JSON.stringify(cameras); }
    focusCamera(args) { return "in development"; }
    setCameraVis(args) {
      let visType = args.CAMVIS;
      let value = Number(args.NUMBER);
      switch (visType) {
        case 'FOV':
          cameraSettings.FOV = value;
          break;
        case 'minrender':
          cameraSettings.minrender = value;
          break;
        case 'maxrender':
          cameraSettings.maxrender = value;
          break;
        default:
          cameraSettings.FOV = value;
          break;
      }
      return "in development";
    }
    getCameraVis(args) {
      let visType = args.CAMVIS;
      switch (visType) {
        case 'FOV':
          return cameraSettings.FOV;
        case 'minrender':
          return cameraSettings.minrender;
        case 'maxrender':
          return cameraSettings.maxrender;
        default:
          return cameraSettings.FOV;
      }
    }
  }

  /* =======================================================================
   * Registering Extensions
   * Order: Three, ThreeMotion, ThreeLooks, ThreeEvents, ThreeControl, ThreeCamera
   * =======================================================================
   */
  Scratch.extensions.register(new Three());
  Scratch.extensions.register(new ThreeMotion());
  Scratch.extensions.register(new ThreeLooks());
  Scratch.extensions.register(new ThreeEvents());
  Scratch.extensions.register(new ThreeControl());
  Scratch.extensions.register(new ThreeCamera());

})(Scratch);
