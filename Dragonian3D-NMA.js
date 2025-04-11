/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.21
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

(async function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
      throw new Error(`"DragonianUSB3D" must be run unsandboxed.`);
    }
  
    const {Cast, BlockType, ArgumentType, vm} = Scratch,
    {runtime} = vm;
    const scratchRenderer = runtime.renderer;
  
    let Engine = "Turbowarp";

    if (Scratch.extensions.isUSB) {
        Engine = "UnSandBoxed";
    } else if (Scratch.extensions.isPenguinMod) {
        Engine = "PenguinMod";
    } else if (Scratch.extensions.isNitroBolt) {
        Engine = "NitroBolt";
    }

    const extcolors = {
      Three: ["#0000ff", "#0000ff", "#0000ff"], 
      Motion: ["#4C97FF", "#0000ff", "#0000ff"],       // Blue
      Looks: ["#9966FF", "#0000ff", "#0000ff"],       // Purple
      Sound: ["#CF63CF", "#0000ff", "#0000ff"],       // Pink
      Events: ["#FFBF00", "#0000ff", "#0000ff"],      // Yellow
      Control: ["#FFAB19", "#0000ff", "#0000ff"],     // Orange
      Sensing: ["#5CB1D6", "#0000ff", "#0000ff"],     // Light Blue
      Camera: ["#FF0000", "#0000ff", "#0000ff"],      // Pure Red
      Operators: ["#59C059", "#0000ff", "#0000ff"],   // Green
      Pen: ["#0FBD8C", "#0000ff", "#0000ff"],         // Teal
  };
  
    const extimages = {};
    const extsounds = {};
  
    // Import map only for core Three.js
    const importMap = document.createElement('script');
    importMap.type = 'importmap';
    importMap.textContent = JSON.stringify({
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.175.0/build/three.module.min.js"
      }
    });
    document.head.appendChild(importMap);
  
    try {
      // Import core Three.js (using namespace import)
      const threeModule = await import('three');
      window.THREE = threeModule; // Attach entire module to global scope
  
      // Import addons with full URLs using named imports
      const { OrbitControls } = await import(
        'https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/controls/OrbitControls.js'
      );
      
      const { GLTFLoader } = await import(
        'https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/loaders/GLTFLoader.js'
      );
      
      const { OBJLoader } = await import(
        'https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/loaders/OBJLoader.js'
      );
  
      // Attach addons to THREE namespace
      THREE.OrbitControls = OrbitControls;
      THREE.GLTFLoader = GLTFLoader;
      THREE.OBJLoader = OBJLoader;
  
      console.log('Three.js initialized with full URL imports:', THREE);
      
    } catch (error) {
      console.error('Initialization failed:', error);
      throw new Error('Three.js failed to initialize');
    }
  
    //setup here
  
      // Global camera settings with default values
      const cameraSettings = {
          name: 'Camera',
          type: 'perspective',
          fov: 75,
          minclip: 0.1,
          maxclip: 2000,
          x: 0,
          y: 0,
          z: 5,
          roll: 0,
          pitch: 0,
          yaw: 0,
          aspect: window.innerWidth / window.innerHeight,
          zoom: 1,
          upX: 0,
          upY: 1,
          upZ: 0,
          lookAtX: 0,
          lookAtY: 0,
          lookAtZ: 0,
          viewportX: 0,
          viewportY: 0,
          viewportWidth: 1,
          viewportHeight: 1,
          tiedto: null
        };
  
      const cameras = []; // Array to store camera objects
      let currentCamera = null; // Variable to store the current camera
      let scene = null; // Variable to store the current scene
      let renderer = null;
      let activeCamera = null;
      let isInitialized = false;
      let currentSprite = null;
      const spriteObjects = {};
      const modelObjects = {};
  
      
      class ThreeBase {
          constructor() {
              this.scene = null;
          }
      
          getInfo() {
              return {
                  id: 'DragonianUSB3D',
                  name: '3D',
                  color1: extcolors.Three[0],
                  color3: extcolors.Three[2],
                  blocks: [
                      {
                          opcode: "initializeScene",
                          blockType: BlockType.COMMAND,
                          text: "initialize scene",
                      },
                      {
                          opcode: "toggleScene",
                          blockType: BlockType.COMMAND,
                          text: "scene [ONOFF]",
                          arguments: {
                              ONOFF: { 
                                  type: ArgumentType.STRING, 
                                  menu: "onoff", 
                                  defaultValue: "on" 
                              },
                          },
                      },
                      {
                          opcode: "is3DOn",
                          blockType: BlockType.BOOLEAN,
                          text: "3D on?",
                      },
                      {
                          opcode: "setSkyboxColor",
                          blockType: BlockType.COMMAND,
                          text: "scene skybox color [COLOR]",
                          arguments: {
                              COLOR: { 
                                  type: ArgumentType.COLOR, 
                                  defaultValue: "#000000" 
                              },
                          },
                      },
                      {
                          opcode: "setSkyboxTexture",
                          blockType: BlockType.COMMAND,
                          text: "scene skybox Texture [Costume]",
                          arguments: {
                              Costume: { 
                                  type: ArgumentType.COSTUME, 
                              },
                          },
                      },
                  ],
                  menus: {
                      onoff: {
                          acceptReporters: true,
                          items: ["on", "off"],
                      },
                      MODE_MENU: {
                          acceptReporters: true,
                          items: ["disabled", "flat", "flat triangle", "sprite", 
                                  "cube", "sphere", "low-poly sphere"],
                      },
                      spriteMenu: {
                          acceptReporters: true,
                          items: "getSprites",
                      },
                  },
              };
          }
      
          initializeScene() {
  
          }
      
          toggleScene(args) {
  
          }
      
          is3DOn() {
  
          }
      
          setSkyboxColor(args) {
  
          }
  
          setSkyboxTexture(args) {
  
          }
      
          init() {
  
          }
      
          getSprites() {
              const spriteNames = [];
              const targets = runtime.targets;
              for (let index = 1; index < targets.length; index++) {
                  const target = targets[index];
                  if (target.isOriginal && target.sprite) {
                      spriteNames.push({
                          text: target.sprite.name,
                          value: target.sprite.name
                      });
                  }
              }
              return spriteNames.length > 0 ? spriteNames : [{ text: "", value: 0 }];
          }
      }
  
  
  class ThreeMotion {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DMotion',
            name: 'Motion 3D',
            color1: extcolors.Motion[0],
            color2: extcolors.Motion[1],
            color3: extcolors.Motion[2],
            blocks: [
              {
                  opcode: "moveSteps",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "move [STEPS] steps in 3D",
                  arguments: {
                    STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                  },
                },
                {
                  opcode: "setPosition",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set position to x:[X] y:[Y] z:[Z]",
                  arguments: {
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "changePosition",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change position by x:[X] y:[Y] z:[Z]",
                  arguments: {
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "setRotation",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set rotation to r:[R] p:[P] y:[Y]",
                  arguments: {
                    R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "changeRotation",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change rotation by r:[R] p:[P] y:[Y]",
                  arguments: {
                    R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "setPosMenu",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set pos [POSTYPES] to [NUMBER]",
                  arguments: {
                    POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                    NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "setRotMenu",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set rot [ROTTYPES] to [NUMBER]",
                  arguments: {
                    ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                    NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "directionAround",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "direction around [ROTTYPES]",
                  arguments: {
                    ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                  },
                },
                {
                  opcode: "xPosition",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "x position",
                },
                {
                  opcode: "yPosition",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "y position",
                },
                {
                  opcode: "zPosition",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "z position",
                },
                {
                  opcode: "roll",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "roll",
                },
                {
                  opcode: "pitch",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "pitch",
                },
                {
                  opcode: "yaw",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "yaw",
                },
                {
                  opcode: "positionArray",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "position",
                },
                {
                  opcode: "positionObject",
                  blockType: Scratch.BlockType.OBJECT,
                  text: "position",
                },
                {
                  opcode: "rotationArray",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "rotation",
                },
                {
                  opcode: "rotationObject",
                  blockType: Scratch.BlockType.OBJECT,
                  text: "rotation",
                },
                {
                  opcode: "turnDegrees",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "turn [TURNDIRS] [NUM] degrees",
                  arguments: {
                    TURNDIRS: { type: Scratch.ArgumentType.STRING, menu: "turndirs", defaultValue: "up" },
                    NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
              ],
              menus: {
                postypes: {
                  acceptReporters: true,
                  items: ["x", "y", "z"],
                },
                rottypes: {
                  acceptReporters: true,
                  items: [{ text: "r (roll)", value: "roll" }, { text: "p (pitch)", value: "pitch" }, { text: "y (yaw)", value: "yaw" }],
                },
                turndirs: {
                  acceptReporters: true,
                  items: ["up", "down", "left", "right"],
                },
              },
        };
    }
  
    moveSteps(args, util) {
  
    }
  
    setRotation(args, util) {
  
    }
  
    changeRotation(args, util) {
  
    }
  
    directionAround(args, util) {
  
    }
  
    xPosition(args, util) {
  
    }
  
    yPosition(args, util) {
  
    }
  
    zPosition(args, util) {
  
    }
  
    roll(args, util) {
  
    }
  
    pitch(args, util) {
  
    }
  
    yaw(args, util) {
  
    }
  
    positionArray(args, util) {
  
    }
  
    positionObject(args, util) {
  
    }
  
    rotationArray(args, util) {
  
    }
  
    rotationObject(args, util) {
  
    }
  
  }
  
  class ThreeLooks {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DLooks',
            name: 'Looks 3D',
            color1: extcolors.Looks[0],
            color2: extcolors.Looks[1],
            color3: extcolors.Looks[2],
            blocks: [
                {
                    opcode: 'helloWorld',
                    blockType: BlockType.REPORTER,
                    text: 'hello world',
                },
                {
                  opcode: "setMode",
                  blockType: BlockType.COMMAND,
                  text: "set sprite mode to [MODE]",
                  arguments: {
                      MODE: {
                          type: ArgumentType.STRING,
                          menu: "MODE_MENU",
                          defaultValue: "flat",
                      },
                  },
              },
              {
                  opcode: "setModel",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set model to [MODEL]",
                  arguments: {
                    MODEL: { type: Scratch.ArgumentType.STRING, menu: "models", defaultValue: "none" },
                  },
                },
                {
                  opcode: "addModel",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "add model as [MODELNAME] from url [MODELURL]",
                  arguments: {
                    MODELNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "new model" },
                    MODELURL: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue:
                        "https://raw.githubusercontent.com/alecjacobson/common-3d-test-models/refs/heads/master/data/teapot.obj",
                    },
                  },
                },
                {
                  opcode: "existingModels",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "existing models",
                },
                {
                  opcode: "setTextureFilter",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set texture filter to [TEXTUREFILTER]",
                  arguments: {
                    TEXTUREFILTER: { type: Scratch.ArgumentType.STRING, menu: "texturefilter", defaultValue: "nearest" },
                  },
                },
                {
                  opcode: "showFaces",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "show faces [SHOWFACES] of myself",
                  arguments: {
                    SHOWFACES: { type: Scratch.ArgumentType.STRING, menu: "showfaces", defaultValue: "both" },
                  },
                },
                {
                  opcode: "setStretch",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set stretch to x:[X] y:[Y] z:[Z]",
                  arguments: {
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                  },
                },
                {
                  opcode: "changeStretch",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change stretch by x:[X] y:[Y] z:[Z]",
                  arguments: {
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "setStretchMenu",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set stretch [POSTYPES] to [NUMBER]",
                  arguments: {
                    POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                    NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                  },
                },
                {
                  opcode: "changeStretchMenu",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change stretch [POSTYPES] by [NUMBER]",
                  arguments: {
                    POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                    NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "stretchX",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "stretch x",
                },
                {
                  opcode: "stretchY",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "stretch y",
                },
                {
                  opcode: "stretchZ",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "stretch z",
                },
                {
                  opcode: "stretchesArray",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "stretches",
                },
                {
                  opcode: "stretchesObject",
                  blockType: Scratch.BlockType.OBJECT,
                  text: "stretches",
                },
                {
                  opcode: "attachSprite",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "attach myself to [TARGET]",
                  arguments: {
                    TARGET: {
                      type: Scratch.ArgumentType.STRING,
                      menu: "spriteMenu",
                    },
                  },
                },
                {
                  opcode: "detachSprite",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "detach myself",
                },
                {
                  opcode: "attachedSprite",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "sprite I'm attached to",
                },

                "---",

                {
                  blockType: Scratch.BlockType.LABEL,
                  text: "Lighting",
                },


                "---",

                {
                  opcode: "getAllLights",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "get all light [LIGHTSTUFF]",
                  arguments: {
                    LIGHTSTUFF: { type: Scratch.ArgumentType.STRING, menu: "LightAttributes", defaultValue: "name" },
                  }
                },
                {
                  opcode: "nomorelights",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "delete all lights",
                },
                {
                  opcode: "createLight",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "create [TYPE] light named [LIGHT]",
                  arguments: {
                    TYPE: { type: Scratch.ArgumentType.STRING, menu: "LightTypes", defaultValue: "Spot" },
                    LIGHT: { type: Scratch.ArgumentType.STRING, defaultValue: "light" },
                  },
                },
                {
                  opcode: "deleteLight",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "delete light [LIGHT]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "setLightType",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set light [LIGHT] type to [TYPE]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    TYPE: { type: Scratch.ArgumentType.STRING, menu: "LightTypes", defaultValue: "Spot" },
                  },
                },
                {
                  opcode: "SetPositionLight",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set position of light [LIGHT] to x:[X] y:[Y] z:[Z]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "SetRotateLight",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set rotation of light [LIGHT] to r:[R] p:[P] y:[Y]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },

                  },
                },
                {
                  opcode: "PositionLight",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change position of light [LIGHT] by x:[X] y:[Y] z:[Z]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "RotateLight",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change rotation of light [LIGHT] by r:[R] p:[P] y:[Y]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "LightPosition",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] [postype] position",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    postype: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                  },
                },
                {
                  opcode: "LightRotation",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] [rottype] rotation",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    rottype: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                  },
                },
                {
                  opcode: "LightPositionArray",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "light [LIGHT] position",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "LightPositionObject",
                  blockType: Scratch.BlockType.OBJECT,
                  text: "light [LIGHT] position",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "LightRotationArray",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "light [LIGHT] rotation",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "LightRotationObject",
                  blockType: Scratch.BlockType.OBJECT,
                  text: "light [LIGHT] rotation",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "setLightColor",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set light [LIGHT] color to [COLOR]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#000000" },
                  },
                },
                {
                  opcode: "getLightColor",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] color",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "setLightIntensity",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set light [LIGHT] intensity to [INTENSITY]%",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    INTENSITY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                  },
                },
                {
                  opcode: "getLightIntensity",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] Intensity",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "setLightDistance",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set light [LIGHT] distance to [DISTANCE]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    DISTANCE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 },
                  },
                },
                {
                  opcode: "getLightDistance",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] distance",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "setLightAngle",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set light [LIGHT] angle to [ANGLE]",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 45 },
                  },
                },
                {
                  opcode: "getLightAngle",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] angle",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "setLightPenumbra",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set light [LIGHT] penumbra to [PENUMBRA]%",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    PENUMBRA: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "getLightPenumbra",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] penumbra",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
                {
                  opcode: "setLightDecay",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set light [LIGHT] decay to [DECAY]%",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                    DECAY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                  },
                },
                {
                  opcode: "getLightDecay",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "light [LIGHT] decay",
                  arguments: {
                    LIGHT: { type: Scratch.ArgumentType.STRING, menu: "Lights", },
                  },
                },
            ],
            menus: {
              MODE_MENU: {
                  acceptReporters: true,
                  items: ["disabled", "flat", "flat triangle", "sprite", 
                          "cube", "sphere", "low-poly sphere"],
              },
              spriteMenu: {
                  acceptReporters: true,
                  items: "getSprites",
              },
              models: {
                  acceptReporters: true,
                  items: "getModels",
                },
              texturefilter: {
                  acceptReporters: true,
                  items: ["nearest", "linear"],
                },
              showfaces: {
                  acceptReporters: true,
                  items: ["both", "front", "back"],
                },
              postypes: {
                  acceptReporters: true,
                  items: ["x", "y", "z"],
                },
              rottypes: {
                  acceptReporters: true,
                  items: [{ text: "r (roll)", value: "roll" }, { text: "p (pitch)", value: "pitch" }, { text: "y (yaw)", value: "yaw" }],
                },
              Lights: {
                  acceptReporters: true,
                  items: "getLights",
                },
              LightTypes: {
                  acceptReporters: true,
                  items: ["Ambient", "Directional", "Point", "Spot"],
                },
              LightAttributes: {
                  acceptReporters: true,
                  items: ["name", "type", "x", "y", "z", { text: "r (roll)", value: "roll" }, { text: "p (pitch)", value: "pitch" }, { text: "y (yaw)", value: "yaw" }, "color", "intensity", "distance", "angle", "penumbra", "decay"],
                },
          },
        };
    }

  
    setMode({ MODE }, util) {
  
    }
  
    getSprites() {
      const spriteNames = [];
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
          const target = targets[index];
          if (target.isOriginal && target.sprite) {
              spriteNames.push({
                  text: target.sprite.name,
                  value: target.sprite.name
              });
          }
      }
      return spriteNames.length > 0 ? spriteNames : [{ text: "", value: 0 }];
    }
  
    getModels() {
      const curModels = [];
      return curModels.length > 0 ? curModels : [{ text: "none", value: 0 }];
    }

    getLights() {
      const curLights = [];
      return curLights.length > 0 ? curLights : [{ text: "none", value: 0 }];
    }
  }
  
  class ThreeSound {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DSound',
            name: 'Sound 3D',
            color1: extcolors.Sound[0],
            color2: extcolors.Sound[1],
            color3: extcolors.Sound[2],
            blocks: [
              {
                  opcode: 'playSound3D',
                  blockType: BlockType.COMMAND,
                  text: 'play sound [sound] at x:[x] y:[y] z:[z] with volume [v] and range width:[w] height":[h] depth:[d]',
                  arguments: {
                    sound: { type: Scratch.ArgumentType.SOUND},
                    x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    v: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                    w: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 },
                    h: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 },
                    d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 },
                  },
              },
            ]
        };
    }
  
    playSound3D() {
        return 'bork bork!';
    }
  }
  
  class ThreeEvents {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DEvents',
            name: 'Events 3D',
            color1: extcolors.Events[0],
            color2: extcolors.Events[1],
            color3: extcolors.Events[2],
            blocks: [
              {
                  opcode: 'WhenSpriteClicked3D',
                  blockType: BlockType.HAT,
                  text: 'When sprite clicked in 3D',
              },
            ]
        };
    }
  }
  
  class ThreeControl {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DControl',
            name: 'Control 3D',
            color1: extcolors.Control[0],
            color2: extcolors.Control[1],
            color3: extcolors.Control[2],
            blocks: [
                {
                    opcode: 'helloWorld',
                    blockType: BlockType.REPORTER,
                    text: 'hello world',
                }
            ]
        };
    }
  
    helloWorld() {
        return 'bork bork!';
    }
  }
  
  class ThreeSensing {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DSensing',
            name: 'Sensing 3D',
            color1: extcolors.Sensing[0],
            color2: extcolors.Sensing[1],
            color3: extcolors.Sensing[2],
            blocks: [
            {
                opcode: 'createHitbox',
                blockType: BlockType.COMMAND,
                text: 'give [SPRITE] a [SHAPE] shaped hitbox named [HITBOX]',
                arguments: {
                  SHAPE: { type: ArgumentType.STRING, menu: "shapes" },
                  HITBOX: { type: ArgumentType.STRING, defaultValue: "my hitbox" },
                  SPRITE: { type: ArgumentType.STRING, menu: "spriteMenu" },
                },
            },
            {
              opcode: 'deleteHitbox',
              blockType: BlockType.COMMAND,
              text: 'delete hitbox [HITBOX] of [SPRITE]',
              arguments: {
                HITBOX: { type: ArgumentType.STRING, defaultValue: "my hitbox" },
                SPRITE: { type: ArgumentType.STRING, menu: "spriteMenu" },
              },
            },
            {
              opcode: 'createShape',
              blockType: BlockType.COMMAND,
              text: 'add hitbox shape [NAME] with data [DATA]',
              arguments: {
                NAME: { type: ArgumentType.STRING, defaultValue: "my shape" },
                DATA: { type: ArgumentType.STRING, defaultValue: "0 0 0" },
              },
            },
            {
              opcode: 'removeShape',
              blockType: BlockType.COMMAND,
              text: 'remove hitbox shape [NAME]',
              arguments: {
                NAME: { type: ArgumentType.STRING, menu: "shapes" },
              },
            },
            {
              opcode: 'collisionMesh',
              blockType: BlockType.BOOLEAN,
              text: 'is sprite [Sprite1] touching sprite [Sprite2] by mesh?',
              arguments: {
                Sprite1: { type: ArgumentType.STRING, menu: "spriteMenu" },
                Sprite2: { type: ArgumentType.STRING, menu: "spriteMenu" },
              },
            },
            {
              opcode: 'collisionHitbox',
              blockType: BlockType.BOOLEAN,
              text: 'is hitbox [TAG1] of sprite [SPRITE1] colliding with hitbox [TAG2] of sprite [SPRITE2]?',
              arguments: {
                TAG1: { type: ArgumentType.STRING, defaultValue: "hitbox" },
                SPRITE1: { type: ArgumentType.STRING, menu: "spriteMenu" },
                TAG2: { type: ArgumentType.STRING, defaultValue: "hitbox" },
                SPRITE2: { type: ArgumentType.STRING, menu: "spriteMenu"},
            },
            },
            {
              opcode: 'hitboxesof',
              blockType: BlockType.ARRAY,
              text: 'hitboxes of [SPRITE]',
              arguments: {
                SPRITE: { type: ArgumentType.STRING, menu: "spriteMenu" },
              },
            },
            ],
            menus: {
              shapes: {
                acceptReporters: true,
                items: "getShapes",
              },
              spriteMenu: {
                acceptReporters: true,
                items: "getSprites",
              },
            }
        };
    }
  
    createHitbox() {
      return 'bork bork!';
  }

    deleteHitbox() {
      return 'bork bork!';
    }

    createShape() {
      return 'bork bork!';
    }

    removeShape() {
      return 'bork bork!';
    }

    collisionMesh() {
      return 'bork bork!';
    }

    collisionHitbox() {
      return 'bork bork!';
    } 

    hitboxesof() {
      return 'bork bork!';
    }

    getShapes() {
      const curShapes = [];
      return curShapes.length > 0 ? curShapes : [{ text: "none", value: 0 }];
    }

    getSprites() {
      const spriteNames = [];
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
          const target = targets[index];
          if (target.isOriginal && target.sprite) {
              spriteNames.push({
                  text: target.sprite.name,
                  value: target.sprite.name
              });
          }
      }
      return spriteNames.length > 0 ? spriteNames : [{ text: "", value: 0 }];
    }

    getHitboxes() {
      const curHitboxes = [];
      return curHitboxes.length > 0 ? curHitboxes : [];
    }
    
  }
  
  class ThreeCamera {
    constructor() {
      this.cameras = cameras
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DCamera',
            name: 'Camera 3D',
            color1: extcolors.Camera[0],
            color2: extcolors.Camera[1],
            color3: extcolors.Camera[2],
            blocks: [
                {
                  opcode: "createCamera",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "create camera [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, defaultValue: "current" },
                  },
                },
                {
                  opcode: "deleteCamera",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "delete camera [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras"},
                  },
                },
                {
                  opcode: "existingCameras",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "existing cameras",
                },
                {
                  opcode: "focusCamera",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "focus on camera [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "moveCameraSteps",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "move camera [CAMERA] [STEPS] steps in 3D",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras"},
                    STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                  },
                },
                {
                  opcode: "setCameraPosition",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set camera position of [CAMERA] to x:[X] y:[Y] z:[Z]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras"},
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "changeCameraPosition",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change camera position of [CAMERA] by x:[X] y:[Y] z:[Z]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras"},
                    X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "setCameraRotation",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set camera rotation of [CAMERA] to r:[R] p:[P] y:[Y]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras"},
                    R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "changeCameraRotation",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "change camera rotation of [CAMERA] by r:[R] p:[P] y:[Y]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras"},
                    R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "setCameraPosMenu",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set camera pos [POSTYPES] of [CAMERA] to [NUMBER]",
                  arguments: {
                    POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                    NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "setCameraRotMenu",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set camera rot [ROTTYPES] of [CAMERA] to [NUMBER]",
                  arguments: {
                    ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                    NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                  },
                },
                {
                  opcode: "cameraDirectionAround",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera direction around [ROTTYPES] of [CAMERA]",
                  arguments: {
                    ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraXPosition",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera x position of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraYPosition",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera y position of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraZPosition",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera z position of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraRoll",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera roll of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraPitch",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera pitch of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraYaw",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera yaw of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraPositionArray",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "camera position of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraPositionObject",
                  blockType: Scratch.BlockType.OBJECT,
                  text: "camera position of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraRotationArray",
                  blockType: Scratch.BlockType.ARRAY,
                  text: "camera rotation of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "cameraRotationObject",
                  blockType: Scratch.BlockType.OBJECT,
                  text: "camera rotation of [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "bindCamera",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "attach camera [CAMERA] to [SPRITE]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                    SPRITE: { type: Scratch.ArgumentType.STRING, menu: "spriteMenu" },
                  },
                },
                {
                  opcode: "unbindCamera",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "detach camera [CAMERA]",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "bindedSprite",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "sprite camera [CAMERA] is attached to",
                  arguments: {
                    CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
                  },
                },
                {
                  opcode: "setCameraVis",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "set camera [CAMVIS] to [NUMBER]",
                  arguments: {
                    CAMVIS: { type: Scratch.ArgumentType.STRING, menu: "camvis" },
                    NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 },
                  },
                },
                {
                  opcode: "getCameraVis",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "camera [CAMVIS]",
                  arguments: {
                    CAMVIS: { type: Scratch.ArgumentType.STRING, menu: "camvis", defaultValue: "FOV" },
                  },
              },
            ],
            menus: {
                cameras: {
                  acceptReporters: true,
                  items: "getCameras",
              },
                spriteMenu: {
                acceptReporters: true,
                items: "getSprites",
              },
                postypes: {
                  acceptReporters: true,
                  items: ["x", "y", "z"],
                },
                rottypes: {
                  acceptReporters: true,
                  items: [{ text: "r (roll)", value: "roll" }, { text: "p (pitch)", value: "pitch" }, { text: "y (yaw)", value: "yaw" }],
                },
                camvis: {
                  acceptReporters: true,
                  items: [{ text: "field of view", value: "fov" }, { text: "near", value: "minclip" }, { text: "far", value: "maxclip" }],
                },
                turndirs: {
                  acceptReporters: true,
                  items: ["up", "down", "left", "right"],
                },
          },
        };
    }
  
    helloWorld() {
        return 'bork bork!';
    }

    createCamera(args) {}
    deleteCamera(args) {}
    existingCameras(args) {}
    focusCamera(args) {}
    moveCameraSteps(args) {}
    setCameraPosition(args) {}
    changeCameraPosition(args) {}
    setCameraRotation(args) {}
    changeCameraRotation(args) {}
    setCameraPosMenu(args) {}
    setCameraRotMenu(args) {}
    cameraDirectionAround(args) {}
    cameraXPosition(args) {}
    cameraYPosition(args) {}
    cameraZPosition(args) {}
    cameraRoll(args) {}
    cameraPitch(args) {}
    cameraYaw(args) {}
    cameraPositionArray(args) {}
    cameraPositionObject(args) {}
    cameraRotationArray(args) {}
    cameraRotationObject(args) {}
    bindCamera(args) {}
    unbindCamera(args) {}
    bindedSprite(args) {}
    setCameraVis(args) {}
    getCameraVis(args) {}

    getSprites() {
      const spriteNames = [];
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
          const target = targets[index];
          if (target.isOriginal && target.sprite) {
              spriteNames.push({
                  text: target.sprite.name,
                  value: target.sprite.name
              });
          }
      }
      return spriteNames.length > 0 ? spriteNames : [{ text: "none", value: 0 }];
    }

    getCameras() {
      const cameraNames = [];
      if (cameras.length > 0){
        cameraNames.push({ text: "current", value: cameras[1] });
      }
      return cameraNames.length > 0 ? cameraNames : [{ text: "none", value: 0 }];
    }
  }
  
  class ThreeOperators {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DOperators',
            name: 'Operators 3D',
            color1: extcolors.Operators[0],
            color2: extcolors.Operators[1],
            color3: extcolors.Operators[2],
            blocks: [
                {
                    opcode: 'helloWorld',
                    blockType: BlockType.REPORTER,
                    text: 'hello world',
                }
            ]
        };
    }
  
    helloWorld() {
        return 'bork bork!';
    }
  }
  
  class ThreePen {
    constructor() {
  
    }
  
    getInfo() {
        return {
            id: 'Dragonian3DPen',
            name: 'Pen 3D',
            color1: extcolors.Pen[0],
            color2: extcolors.Pen[1],
            color3: extcolors.Pen[2],
            blocks: [
                {
                    opcode: 'helloWorld',
                    blockType: BlockType.REPORTER,
                    text: 'hello world',
                }
            ]
        };
    }
  
    helloWorld() {
        return 'bork bork!';
    }
  }
  
  Scratch.extensions.register(new ThreeBase());
  Scratch.extensions.register(new ThreeMotion());
  Scratch.extensions.register(new ThreeLooks());
  Scratch.extensions.register(new ThreeSound());
  Scratch.extensions.register(new ThreeEvents());
  Scratch.extensions.register(new ThreeControl());
  Scratch.extensions.register(new ThreeSensing());
  Scratch.extensions.register(new ThreeCamera());
  Scratch.extensions.register(new ThreeOperators());
  Scratch.extensions.register(new ThreePen());
  
  })(Scratch);