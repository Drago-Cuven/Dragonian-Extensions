/**
 * DragonianUSB3D
 * Author: Drago Cuven <https:
 * Version: 0.0.16
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

let models = [];
let cameras = [];  

let currentCamera = null;

let cameraSettings = {
  FOV: 90,
  minrender: 0.1,
  maxrender: 1000
};

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`"Dragonian3D" must be run unsandboxed.`);
  }

  async function loadThree() {
    try {
      const three = await import('https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js');
      return three;
    } catch (error) {
      console.error("Failed to load Three.js:", error);
      return null;
    }
  }

  let three = null;
  let scene = null;
  let renderer = null;
  let camerasObj = {};
  let activeCamera = null;
  let isInitialized = false;
  let currentSprite = null; 
  let spriteObjects = {}; 
  let modelObjects = {}; 

  const vm = Scratch.vm;
  const scratchRenderer = vm.runtime.renderer;

  class ThreeDSkin extends scratchRenderer.exports.Skin {
    constructor(id, renderer) {
      super(id, renderer);
      const gl = renderer.gl;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      this._texture = texture;
      this._rotationCenter = [240, 180];
      this._size = [480, 360];
    }

    dispose() {
      if (this._texture) {
        this._renderer.gl.deleteTexture(this._texture);
        this._texture = null;
      }
      super.dispose();
    }

    set size(value) {
      this._size = value;
      this._rotationCenter = [value[0] / 2, value[1] / 2];
    }

    get size() {
      return this._size;
    }

    getTexture(scale) {
      return this._texture || super.getTexture(scale);
    }

    setContent(textureData) {
      const gl = this._renderer.gl;
      gl.bindTexture(gl.TEXTURE_2D, this._texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textureData
      );
      this.emitWasAltered();
    }
  }

  loadThree().then(loadedThree => {
    if (loadedThree) {
      three = loadedThree;
      initialize3D();
    } else {
      console.error("Three.js failed to load, extension cannot initialize.");
    }
  });

  function initialize3D() {

    scene = new three.Scene();
    renderer = new three.WebGLRenderer({ antialias: true });
    renderer.setSize(vm.runtime.stageWidth || 480, vm.runtime.stageHeight || 360);
    renderer.setClearColor(0x000000, 0); 

    const ambientLight = new three.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new three.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camerasObj = {};

    camerasObj.default = new three.PerspectiveCamera(
      cameraSettings.FOV,
      (vm.runtime.stageWidth || 480) / (vm.runtime.stageHeight || 360),
      cameraSettings.minrender,
      cameraSettings.maxrender
    );
    camerasObj.default.position.set(0, 0, 200);
    camerasObj.default.lookAt(0, 0, 0);

    camerasObj.topView = new three.OrthographicCamera(
      (vm.runtime.stageWidth || 480) / -2,
      (vm.runtime.stageWidth || 480) / 2,
      (vm.runtime.stageHeight || 360) / 2,
      (vm.runtime.stageHeight || 360) / -2,
      0.1,
      1000
    );
    camerasObj.topView.position.set(0, 200, 0);
    camerasObj.topView.lookAt(0, 0, 0);

    activeCamera = camerasObj.default;
    currentCamera = "default";

    cameras.push("default");
    cameras.push("topView");

    createDefaultSprite();

    createScratchDrawable();

    window.addEventListener('resize', () => {
      const width = vm.runtime.stageWidth || 480;
      const height = vm.runtime.stageHeight || 360;

      renderer.setSize(width, height);

      Object.values(camerasObj).forEach((camera) => {
        if (camera.isPerspectiveCamera) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        } else if (camera.isOrthographicCamera) {

          camera.left = width / -2;
          camera.right = width / 2;
          camera.top = height / 2;
          camera.bottom = height / -2;
          camera.updateProjectionMatrix();
        }
      });
    });

    isInitialized = true;

    if (vm.runtime) {
      vm.runtime.on('BEFORE_EXECUTE', refreshScene);
      console.log("Attached refreshScene to BEFORE_EXECUTE event");
    }
  }

  let threeSkinId = null;
  let threeDrawableId = null;
  let threeSkin = null;

  function createScratchDrawable() {

    threeSkinId = scratchRenderer._nextSkinId++;
    threeSkin = new ThreeDSkin(threeSkinId, scratchRenderer);
    scratchRenderer._allSkins[threeSkinId] = threeSkin;

    threeDrawableId = scratchRenderer.createDrawable('pen');
    scratchRenderer.updateDrawableSkinId(threeDrawableId, threeSkinId);

    scratchRenderer.updateDrawableVisible(threeDrawableId, true);
    scratchRenderer.updateDrawableEffect(threeDrawableId, 'ghost', 0);

    scratchRenderer.updateDrawablePosition(threeDrawableId, [0, 0]);
    scratchRenderer.updateDrawableScale(threeDrawableId, [100, 100]);

    vm.runtime.on('BEFORE_DRAW', () => {
      if (isInitialized) {

        renderer.render(scene, activeCamera);

        if (threeSkin) {
          threeSkin.setContent(renderer.domElement);
        }
      }
    });
  }

  function createDefaultSprite() {
    const geometry = new three.BoxGeometry(50, 50, 50);
    const material = new three.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new three.Mesh(geometry, material);
    scene.add(cube);

    spriteObjects["default"] = cube;
    currentSprite = "default";
  }

  function refreshScene() {
    if (isInitialized && scene && renderer && activeCamera) {

      renderer.render(scene, activeCamera);

      if (threeSkin) {
        threeSkin.setContent(renderer.domElement);
      }
    }
  }

  function switchCamera(cameraName) {
    if (camerasObj[cameraName]) {
      activeCamera = camerasObj[cameraName];
      currentCamera = cameraName;
    } else {
      console.warn(`Camera '${cameraName}' not found.`);
    }
  }

  async function loadModel(modelName, modelURL) {
    if (!three) return null;

    try {

      if (modelURL.toLowerCase().endsWith('.obj')) {
        const OBJLoader = await import('https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/OBJLoader.js');
        const loader = new OBJLoader.OBJLoader();

        return new Promise((resolve, reject) => {
          loader.load(
            modelURL,
            (object) => {
              resolve(object);
            },
            (xhr) => {
              console.log(`${modelName} ${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            (error) => {
              console.error('Error loading model:', error);
              reject(error);
            }
          );
        });
      }

      else if (modelURL.toLowerCase().endsWith('.gltf') || modelURL.toLowerCase().endsWith('.glb')) {
        const GLTFLoader = await import('https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader.GLTFLoader();

        return new Promise((resolve, reject) => {
          loader.load(
            modelURL,
            (gltf) => {
              resolve(gltf.scene);
            },
            (xhr) => {
              console.log(`${modelName} ${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            (error) => {
              console.error('Error loading model:', error);
              reject(error);
            }
          );
        });
      } else {
        console.error('Unsupported model format. Please use .obj, .gltf, or .glb files.');
        return null;
      }
    } catch (error) {
      console.error('Error loading model:', error);
      return null;
    }
  }

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
    models: models,
    three: three,
    scene: scene,
    renderer: renderer,
    camerasObj: camerasObj,
    activeCamera: activeCamera,
    switchCamera: switchCamera,
    spriteObjects: spriteObjects,
    currentSprite: currentSprite
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
      this.scene = null; 
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
    initializeScene() { 
      if (!isInitialized && three) {
        initialize3D();
        return "Scene initialized";
      }
      return "Scene already initialized";
    }

    toggleScene(args) { 
      if (isInitialized && renderer) {
        if (args.ONOFF === 'on') {
          if (threeDrawableId) {
            scratchRenderer.updateDrawableVisible(threeDrawableId, true);
          }
          return "Scene turned on";
        } else {
          if (threeDrawableId) {
            scratchRenderer.updateDrawableVisible(threeDrawableId, false);
          }
          return "Scene turned off";
        }
      }
      return "Scene not initialized";
    }

    is3DOn() { 
      return isInitialized && threeDrawableId && 
             scratchRenderer._allDrawables[threeDrawableId].visible;
    }

    existingScenes() { 

      return JSON.stringify(["main"]); 
    }
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

    moveSteps(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const steps = Number(args.STEPS);
      const sprite = spriteObjects[currentSprite];

      const direction = new three.Vector3(0, 0, -1);
      direction.applyQuaternion(sprite.quaternion);
      direction.multiplyScalar(steps / 10); 

      sprite.position.add(direction);

      refreshScene();
      return "Moved steps";
    }

    setPosition(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const x = Number(args.X);
      const y = Number(args.Y);
      const z = Number(args.Z);

      spriteObjects[currentSprite].position.set(x, y, z);

      refreshScene();
      return "Position set";
    }

    changePosition(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const x = Number(args.X);
      const y = Number(args.Y);
      const z = Number(args.Z);

      spriteObjects[currentSprite].position.x += x;
      spriteObjects[currentSprite].position.y += y;
      spriteObjects[currentSprite].position.z += z;

      refreshScene();
      return "Position changed";
    }

    setRotation(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const r = Number(args.R) * (Math.PI / 180); 
      const p = Number(args.P) * (Math.PI / 180);
      const y = Number(args.Y) * (Math.PI / 180);

      spriteObjects[currentSprite].rotation.set(p, y, r, 'YXZ');

      refreshScene();
      return "Rotation set";
    }

    changeRotation(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const r = Number(args.R) * (Math.PI / 180); 
      const p = Number(args.P) * (Math.PI / 180);
      const y = Number(args.Y) * (Math.PI / 180);

      spriteObjects[currentSprite].rotation.x += p;
      spriteObjects[currentSprite].rotation.y += y;
      spriteObjects[currentSprite].rotation.z += r;

      refreshScene();
      return "Rotation changed";
    }

    setPosMenu(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const posType = args.POSTYPES;
      const value = Number(args.NUMBER);

      switch (posType) {
        case 'x':
          spriteObjects[currentSprite].position.x = value;
          break;
        case 'y':
          spriteObjects[currentSprite].position.y = value;
          break;
        case 'z':
          spriteObjects[currentSprite].position.z = value;
          break;
      }

      refreshScene();
      return "Position set";
    }

    setRotMenu(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const rotType = args.ROTTYPES;
      const value = Number(args.NUMBER) * (Math.PI / 180); 

      switch (rotType) {
        case 'r (roll)':
          spriteObjects[currentSprite].rotation.z = value;
          break;
        case 'p (pitch)':
          spriteObjects[currentSprite].rotation.x = value;
          break;
        case 'y (yaw)':
          spriteObjects[currentSprite].rotation.y = value;
          break;
      }

      refreshScene();
      return "Rotation set";
    }

    directionAround(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 0;

      const rotType = args.ROTTYPES;

      switch (rotType) {
        case 'r (roll)':
          return (spriteObjects[currentSprite].rotation.z * 180 / Math.PI).toFixed(2);
        case 'p (pitch)':
          return (spriteObjects[currentSprite].rotation.x * 180 / Math.PI).toFixed(2);
        case 'y (yaw)':
          return (spriteObjects[currentSprite].rotation.y * 180 / Math.PI).toFixed(2);
      }

      return 0;
    }

    xPosition() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 0;
      return spriteObjects[currentSprite].position.x.toFixed(2);
    }

    yPosition() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 0;
      return spriteObjects[currentSprite].position.y.toFixed(2);
    }

    zPosition() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 0;
      return spriteObjects[currentSprite].position.z.toFixed(2);
    }

    roll() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 0;
      return (spriteObjects[currentSprite].rotation.z * 180 / Math.PI).toFixed(2);
    }

    pitch() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 0;
      return (spriteObjects[currentSprite].rotation.x * 180 / Math.PI).toFixed(2);
    }

    yaw() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 0;
      return (spriteObjects[currentSprite].rotation.y * 180 / Math.PI).toFixed(2);
    }

    positionArray() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return JSON.stringify([0, 0, 0]);

      const pos = spriteObjects[currentSprite].position;
      return JSON.stringify([pos.x, pos.y, pos.z]);
    }

    positionObject() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return JSON.stringify({x: 0, y: 0, z: 0});

      const pos = spriteObjects[currentSprite].position;
      return JSON.stringify({x: pos.x, y: pos.y, z: pos.z});
    }

    rotationArray() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return JSON.stringify([0, 0, 0]);

      const rot = spriteObjects[currentSprite].rotation;
      return JSON.stringify([
        rot.z * 180 / Math.PI, 
        rot.x * 180 / Math.PI, 
        rot.y * 180 / Math.PI  
      ]);
    }

    rotationObject() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return JSON.stringify({roll: 0, pitch: 0, yaw: 0});

      const rot = spriteObjects[currentSprite].rotation;
      return JSON.stringify({
        roll: rot.z * 180 / Math.PI,
        pitch: rot.x * 180 / Math.PI,
        yaw: rot.y * 180 / Math.PI
      });
    }

    turnDegrees(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const turnDirection = args.TURNDIRS;
      const degrees = Number(args.NUM);
      const radians = degrees * (Math.PI / 180);

      switch (turnDirection) {
        case 'up':
          spriteObjects[currentSprite].rotation.x -= radians;
          break;
        case 'down':
          spriteObjects[currentSprite].rotation.x += radians;
          break;
        case 'left':
          spriteObjects[currentSprite].rotation.y += radians;
          break;
        case 'right':
          spriteObjects[currentSprite].rotation.y -= radians;
          break;
      }

      refreshScene();
      return "Turned";
    }
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

    async setModel(args) { 
      if (!isInitialized) return "Scene not initialized";

      const modelName = args.MODEL;
      if (modelName === "none" || !modelObjects[modelName]) {
        return "Model not found";
      }

      if (spriteObjects[currentSprite]) {
        scene.remove(spriteObjects[currentSprite]);
      }

      const modelClone = modelObjects[modelName].clone();
      scene.add(modelClone);

      spriteObjects[currentSprite] = modelClone;

      refreshScene();
      return "Model set";
    }

    async addModel(args) { 
      if (!isInitialized) return "Scene not initialized";

      const modelName = args.MODELNAME;
      const modelURL = args.MODELURL;

      try {
        const model = await loadModel(modelName, modelURL);

        if (model) {

          modelObjects[modelName] = model;

          if (!models.includes(modelName)) {
            models.push(modelName);
          }

          return "Model added";
        } else {
          return "Failed to load model";
        }
      } catch (error) {
        console.error("Error adding model:", error);
        return "Error loading model";
      }
    }

    existingModels() { 
      return JSON.stringify(models);
    }

    setTextureFilter(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const filter = args.TEXTUREFILTER;
      const sprite = spriteObjects[currentSprite];

      sprite.traverse((child) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];

          materials.forEach(material => {
            if (material.map) {
              material.map.minFilter = filter === 'nearest' ? three.NearestFilter : three.LinearFilter;
              material.map.magFilter = filter === 'nearest' ? three.NearestFilter : three.LinearFilter;
              material.map.needsUpdate = true;
            }
          });
        }
      });

      refreshScene();
      return "Texture filter set";
    }

    showFaces(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const faces = args.SHOWFACES;
      const sprite = spriteObjects[currentSprite];

      sprite.traverse((child) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];

          materials.forEach(material => {
            switch (faces) {
              case 'both':
                material.side = three.DoubleSide;
                break;
              case 'front':
                material.side = three.FrontSide;
                break;
              case 'back':
                material.side = three.BackSide;
                break;
            }
            material.needsUpdate = true;
          });
        }
      });

      refreshScene();
      return "Face culling set";
    }

    setSpriteMode(args) { 

      return "Sprite mode setting in development";
    }

    setStretch(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const x = Number(args.X);
      const y = Number(args.Y);
      const z = Number(args.Z);

      spriteObjects[currentSprite].scale.set(x, y, z);

      refreshScene();
      return "Stretch set";
    }

    changeStretch(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const x = Number(args.X);
      const y = Number(args.Y);
      const z = Number(args.Z);

      spriteObjects[currentSprite].scale.x += x;
      spriteObjects[currentSprite].scale.y += y;
      spriteObjects[currentSprite].scale.z += z;

      refreshScene();
      return "Stretch changed";
    }

    setStretchMenu(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const posType = args.POSTYPES;
      const value = Number(args.NUMBER);

      switch (posType) {
        case 'x':
          spriteObjects[currentSprite].scale.x = value;
          break;
        case 'y':
          spriteObjects[currentSprite].scale.y = value;
          break;
        case 'z':
          spriteObjects[currentSprite].scale.z = value;
          break;
      }

      refreshScene();
      return "Stretch set";
    }

    changeStretchMenu(args) { 
      if (!isInitialized || !spriteObjects[currentSprite]) return "No active sprite";

      const posType = args.POSTYPES;
      const value = Number(args.NUMBER);

      switch (posType) {
        case 'x':
          spriteObjects[currentSprite].scale.x += value;
          break;
        case 'y':
          spriteObjects[currentSprite].scale.y += value;
          break;
        case 'z':
          spriteObjects[currentSprite].scale.z += value;
          break;
      }

      refreshScene();
      return "Stretch changed";
    }

    stretchX() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 1;
      return spriteObjects[currentSprite].scale.x.toFixed(2);
    }

    stretchY() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 1;
      return spriteObjects[currentSprite].scale.y.toFixed(2);
    }

    stretchZ() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return 1;
      return spriteObjects[currentSprite].scale.z.toFixed(2);
    }

    stretchesArray() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return JSON.stringify([1, 1, 1]);

      const scale = spriteObjects[currentSprite].scale;
      return JSON.stringify([scale.x, scale.y, scale.z]);
    }

    stretchesObject() { 
      if (!isInitialized || !spriteObjects[currentSprite]) return JSON.stringify({x: 1, y: 1, z: 1});

      const scale = spriteObjects[currentSprite].scale;
      return JSON.stringify({x: scale.x, y: scale.y, z: scale.z});
    }
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
    temp() { return "Events in development"; }
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
    temp() { return "Control in development"; }
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

      const cameraName = args.CAMERA;
      if (!camerasObj[cameraName]) {

        camerasObj[cameraName] = new three.PerspectiveCamera(
          cameraSettings.FOV,
          (vm.runtime.stageWidth || 480) / (vm.runtime.stageHeight || 360),
          cameraSettings.minrender,
          cameraSettings.maxrender
        );
        camerasObj[cameraName].position.set(0, 0, 200);

        cameras.push(cameraName);
      }
      return "Camera created";
    }

    deleteCamera(args) {
      const cameraName = args.CAMERA;

      if (cameraName === "current" || activeCamera === camerasObj[cameraName]) {
        return "Cannot delete active camera";
      }

      if (camerasObj[cameraName]) {

        delete camerasObj[cameraName];

        cameras = cameras.filter(c => c !== cameraName);
      }
      return "Camera deleted";
    }

    focusCamera(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {

        switchCamera(cameraName);
        activeCamera = camerasObj[cameraName];
        currentCamera = cameraName;
        refreshScene();
        return "Camera focused";
      }
      return "Camera not found";
    }

    moveCameraSteps(args) {
      const cameraName = args.CAMERA;
      const steps = Number(args.STEPS);

      if (camerasObj[cameraName]) {
        const camera = camerasObj[cameraName];

        const direction = new three.Vector3(0, 0, -1);
        direction.applyQuaternion(camera.quaternion);
        direction.multiplyScalar(steps / 10); 
        camera.position.add(direction);
        refreshScene();
        return "Camera moved";
      }
      return "Camera not found";
    }

    setCameraPosition(args) {
      const cameraName = args.CAMERA;
      const x = Number(args.X);
      const y = Number(args.Y);
      const z = Number(args.Z);

      if (camerasObj[cameraName]) {
        camerasObj[cameraName].position.set(x, y, z);
        refreshScene();
        return "Camera position set";
      }
      return "Camera not found";
    }

    changeCameraPosition(args) {
      const cameraName = args.CAMERA;
      const x = Number(args.X);
      const y = Number(args.Y);
      const z = Number(args.Z);

      if (camerasObj[cameraName]) {
        camerasObj[cameraName].position.x += x;
        camerasObj[cameraName].position.y += y;
        camerasObj[cameraName].position.z += z;
        refreshScene();
        return "Camera position changed";
      }
      return "Camera not found";
    }

    setCameraRotation(args) {
      const cameraName = args.CAMERA;
      const r = Number(args.R) * (Math.PI / 180); 
      const p = Number(args.P) * (Math.PI / 180);
      const y = Number(args.Y) * (Math.PI / 180);

      if (camerasObj[cameraName]) {

        camerasObj[cameraName].rotation.set(p, y, r, 'YXZ');
        refreshScene();
        return "Camera rotation set";
      }
      return "Camera not found";
    }

    changeCameraRotation(args) {
      const cameraName = args.CAMERA;
      const r = Number(args.R) * (Math.PI / 180); 
      const p = Number(args.P) * (Math.PI / 180);
      const y = Number(args.Y) * (Math.PI / 180);

      if (camerasObj[cameraName]) {

        camerasObj[cameraName].rotation.x += p;
        camerasObj[cameraName].rotation.y += y;
        camerasObj[cameraName].rotation.z += r;
        refreshScene();
        return "Camera rotation changed";
      }
      return "Camera not found";
    }

    setCameraPosMenu(args) {
      const cameraName = args.CAMERA;
      const posType = args.POSTYPES;
      const value = Number(args.NUMBER);

      if (camerasObj[cameraName]) {
        switch (posType) {
          case 'x':
            camerasObj[cameraName].position.x = value;
            break;
          case 'y':
            camerasObj[cameraName].position.y = value;
            break;
          case 'z':
            camerasObj[cameraName].position.z = value;
            break;
        }
        refreshScene();
        return "Camera position set";
      }
      return "Camera not found";
    }

    setCameraRotMenu(args) {
      const cameraName = args.CAMERA;
      const rotType = args.ROTTYPES;
      const value = Number(args.NUMBER) * (Math.PI / 180); 

      if (camerasObj[cameraName]) {
        switch (rotType) {
          case 'r (roll)':
            camerasObj[cameraName].rotation.z = value;
            break;
          case 'p (pitch)':
            camerasObj[cameraName].rotation.x = value;
            break;
          case 'y (yaw)':
            camerasObj[cameraName].rotation.y = value;
            break;
        }
        refreshScene();
        return "Camera rotation set";
      }
      return "Camera not found";
    }

    cameraDirectionAround(args) {
      const cameraName = args.CAMERA;
      const rotType = args.ROTTYPES;

      if (camerasObj[cameraName]) {
        switch (rotType) {
          case 'r (roll)':
            return (camerasObj[cameraName].rotation.z * 180 / Math.PI).toFixed(2);
          case 'p (pitch)':
            return (camerasObj[cameraName].rotation.x * 180 / Math.PI).toFixed(2);
          case 'y (yaw)':
            return (camerasObj[cameraName].rotation.y * 180 / Math.PI).toFixed(2);
        }
      }
      return 0;
    }

    cameraXPosition(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        return camerasObj[cameraName].position.x.toFixed(2);
      }
      return 0;
    }

    cameraYPosition(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        return camerasObj[cameraName].position.y.toFixed(2);
      }
      return 0;
    }

    cameraZPosition(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        return camerasObj[cameraName].position.z.toFixed(2);
      }
      return 0;
    }

    cameraRoll(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        return (camerasObj[cameraName].rotation.z * 180 / Math.PI).toFixed(2);
      }
      return 0;
    }

    cameraPitch(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        return (camerasObj[cameraName].rotation.x * 180 / Math.PI).toFixed(2);
      }
      return 0;
    }

    cameraYaw(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        return (camerasObj[cameraName].rotation.y * 180 / Math.PI).toFixed(2);
      }
      return 0;
    }

    cameraPositionArray(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        const pos = camerasObj[cameraName].position;
        return JSON.stringify([pos.x, pos.y, pos.z]);
      }
      return JSON.stringify([0, 0, 0]);
    }

    cameraPositionObject(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        const pos = camerasObj[cameraName].position;
        return JSON.stringify({ x: pos.x, y: pos.y, z: pos.z });
      }
      return JSON.stringify({ x: 0, y: 0, z: 0 });
    }

    cameraRotationArray(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        const rot = camerasObj[cameraName].rotation;

        return JSON.stringify([
          rot.z * 180 / Math.PI, 
          rot.x * 180 / Math.PI, 
          rot.y * 180 / Math.PI  
        ]);
      }
      return JSON.stringify([0, 0, 0]);
    }

    cameraRotationObject(args) {
      const cameraName = args.CAMERA;
      if (camerasObj[cameraName]) {
        const rot = camerasObj[cameraName].rotation;

        return JSON.stringify({
          roll: rot.z * 180 / Math.PI,
          pitch: rot.x * 180 / Math.PI,
          yaw: rot.y * 180 / Math.PI
        });
      }
      return JSON.stringify({ roll: 0, pitch: 0, yaw: 0 });
    }

    #cameraBoundSprites = {};

    bindCamera(args) {
      const cameraName = args.CAMERA;
      const spriteName = args.SPRITE;

      if (!camerasObj[cameraName]) {
        return "Camera not found";
      }

      if (!spriteObjects[spriteName]) {
        return "Sprite not found";
      }

      this.#cameraBoundSprites[cameraName] = spriteName;

      const sprite = spriteObjects[spriteName];
      const camera = camerasObj[cameraName];

      camera.position.set(
        sprite.position.x,
        sprite.position.y + 2,
        sprite.position.z + 5
      );

      camera.lookAt(sprite.position);

      refreshScene();
      return "Camera bound to sprite";
    }

    unbindCamera(args) {
      const cameraName = args.CAMERA;

      if (this.#cameraBoundSprites[cameraName]) {
        delete this.#cameraBoundSprites[cameraName];
        refreshScene();
        return "Camera unbound";
      }

      return "Camera not bound";
    }

    bindedSprite(args) {
      const cameraName = args.CAMERA;
      return this.#cameraBoundSprites[cameraName] || "none";
    }

    existingCameras() {
      return JSON.stringify(cameras);
    }

    setCameraVis(args) {
      let visType = args.CAMVIS;
      let value = Number(args.NUMBER);

      switch (visType) {
        case 'FOV':
          cameraSettings.FOV = value;

          Object.values(camerasObj).forEach(camera => {
            if (camera.isPerspectiveCamera) {
              camera.fov = value;
              camera.updateProjectionMatrix();
            }
          });
          break;
        case 'minrender':
          cameraSettings.minrender = value;

          Object.values(camerasObj).forEach(camera => {
            camera.near = value;
            camera.updateProjectionMatrix();
          });
          break;
        case 'maxrender':
          cameraSettings.maxrender = value;

          Object.values(camerasObj).forEach(camera => {
            camera.far = value;
            camera.updateProjectionMatrix();
          });
          break;
      }
      refreshScene();
      return "Camera settings updated";
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

  if (vm.runtime) {
    vm.runtime.on('BEFORE_EXECUTE', refreshScene);
    console.log("Attached refreshScene to BEFORE_EXECUTE event");
  } else {

    const checkForVM = setInterval(() => {
      if (vm.runtime) {
        vm.runtime.on('BEFORE_EXECUTE', refreshScene);
        console.log("Attached refreshScene to BEFORE_EXECUTE event (delayed)");
        clearInterval(checkForVM);
      }
    }, 1000);
  }

})(Scratch);
