/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.23
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

(async function (Scratch) {
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`"DragonianUSB3D" must be run unsandboxed.`);
  }

  const {Cast, BlockType, ArgumentType, vm} = Scratch,
  {runtime} = vm;
  const renderer = runtime.renderer;
  const IN_3D = "THREE.in3d";
  const OBJECT = "THREE.object";
  const THREE_DIRTY = "THREE.dirty";
  const SIDE_MODE = "THREE.sidemode";
  const TEX_FILTER = "THREE.texfilter";
  const Z_POS = "THREE.zpos";
  const Z_STRETCH = "THREE.zstretch";
  const YAW = "THREE.yaw";
  const PITCH = "THREE.pitch";
  const ROLL = "THREE.roll";
  const ATTACHED_TO = "THREE.attachedto";

  let Engine = "Turbowarp";

  if (Scratch.extensions.isUSB) {
      Engine = "UnSandBoxed";
  } else if (Scratch.extensions.isPenguinMod) {
      Engine = "PenguinMod";
  } else if (Scratch.extensions.isNitroBolt) {
      Engine = "NitroBolt";
  }

  console.log(`Current engine is "${Engine}`);

  const checkerKey = "SCENE"; // constant argument name of the constant menu
  const dependerKey = "CAMERA"; // constant argument name of the dependent menu

  const extcolors = {
    Three: ["#0000ff", "#00000", "#0000ff"], 
    Motion: ["#4C97FF", "#0000ff", "#0000ff"],       // Blue
    Looks: ["#9966FF", "#0000ff", "#0000ff"],       // Purple
    Sound: ["#CF63CF", "#0000ff", "#0000ff"],       // Pink
    Events: ["#FFBF00", "#0000ff", "#0000ff"],      // Yellow
    Control: ["#FFAB19", "#0000ff", "#0000ff"],     // Orange
    Sensing: ["#5CB1D6", "#0000ff", "#0000ff"],     // Light Blue
    Camera: ["#FF4C4C", "#0000ff", "#0000ff"],      // Pure Red
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
    const threeModule = await import('three');
    window.THREE = threeModule; 


    const { OrbitControls } = await import(
      'https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/controls/OrbitControls.js'
    );
    
    const { GLTFLoader } = await import(
      'https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/loaders/GLTFLoader.js'
    );
    
    const { OBJLoader } = await import(
      'https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/loaders/OBJLoader.js'
    );

    // Attach addons to THREE namespace cus otherwise it'll just screw itself
    THREE.OrbitControls = OrbitControls;
    THREE.GLTFLoader = GLTFLoader;
    THREE.OBJLoader = OBJLoader;

    console.log('Three.js initialized with full URL imports:', THREE);
    
  } catch (error) {
    console.error('Initialization failed:', error);
    throw new Error('Three.js failed to initialize');
  }

  //setup here
let idc = Math.floor(Math.random() * 100000) + 1;
let IDFailCount = 0
function makeRandomID() {
  const length = 20;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let id = '';
  idc = Math.floor(Math.random() * 100000) + 1;
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters.charAt(randomIndex);
    id += randomCharacter;
  }

  return `${idc}${id}`;
}

    // Global camera settings with default values so i don't forget like a dummy
    const defaultCameraSettings = {
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
      tiedto: ""
      };

    let scenes = [{ 
      name: "default",
      ID: "defScene1",
      cameras: [{name:'Camera_1',id:'G7t8R4f1Jp',type:'perspective',fov:75,minclip:0.1,maxclip:2000,x:0,y:0,z:5,roll:0,pitch:0,yaw:0,aspect:window.innerWidth/window.innerHeight,zoom:1,upX:0,upY:1,upZ:0,lookAtX:0,lookAtY:0,lookAtZ:0,viewportX:0,viewportY:0,viewportWidth:1,viewportHeight:1,tiedto:""},{name:'Camera_2',id:'Q3k9T1v2Xp',type:'orthographic',fov:75,minclip:0.1,maxclip:2000,x:0,y:0,z:5,roll:0,pitch:0,yaw:0,aspect:window.innerWidth/window.innerHeight,zoom:1,upX:0,upY:1,upZ:0,lookAtX:0,lookAtY:0,lookAtZ:0,viewportX:0,viewportY:0,viewportWidth:1,viewportHeight:1,tiedto:""}],
      curcam: "",
      lights: []
    }];
    let curScene = null;
    let curCamera = null;
    let isInitialized = false;
    let currentSprite = null;
    const spriteObjects = {};
    const modelObjects = {};

function createS3DCamera(name, sceneName, type) {
  // 1. Find the scene object by name :p
  const scene = scenes.find(s => s.name === sceneName);
  if (!scene) {
    console.error(`Scene "${sceneName}" does not exist.`);
    return;
  }

  // 2. Cancel if a camera with that name already exists in this scene :P
  if (scene.cameras[name]) {
    console.error(`Camera "${name}" already exists in scene "${sceneName}".`);
    return;
  }

  // 3. Build a fresh settings object from defaultcameraSettings :3
  const settings = {
    ...defaultCameraSettings,
    name: String(name).trim(),
    type: String(type).trim().toLowerCase()
  };

  // 4. Create the actual Three.js camera instance cus i have too 
  let camera3D;
  if (settings.type === 'orthographic') {
    // Calculate half-width/height for orthographic frustum because thats apparently a thing
    const halfH = settings.zoom / 2;
    const halfW = halfH * settings.aspect;
    camera3D = new THREE.OrthographicCamera(
      -halfW, halfW, halfH, -halfH,
      settings.minclip, settings.maxclip
    );
  } else {
    // Default to a PerspectiveCamera cus its the proper friggin way
    camera3D = new THREE.PerspectiveCamera(
      settings.fov,
      settings.aspect,
      settings.minclip,
      settings.maxclip
    );
  }

  // 5. Apply position, orientation, zoom, look-at, etc etc -_-.
  camera3D.position.set(settings.x, settings.y, settings.z);
  camera3D.up.set(settings.upX, settings.upY, settings.upZ);
  camera3D.lookAt(settings.lookAtX, settings.lookAtY, settings.lookAtZ);
  camera3D.rotation.set(
    settings.pitch * Math.PI / 180,
    settings.yaw   * Math.PI / 180,
    settings.roll  * Math.PI / 180
  );
  camera3D.zoom = settings.zoom;
  camera3D.updateProjectionMatrix();

  // 6. Grab the real Three.js ID cus it does that, and store it in settings 
  settings.id = camera3D.id;

  // 7. now that all that stuffs is done, add this camera into the scene’s cameras object
  scene.cameras[settings.name] = {
    settings,
    camera3D
  };

  console.log(
    `Created camera "${settings.name}" (ID=${settings.id}) in scene "${sceneName}".`
  );
}



function createS3DScene(name, force) {
  const sceneName = String(name).trim();
  if (!sceneName) return;

  // 1. Remove any existing scene if force=true
  const existingIndex = scenes.findIndex(s => s.name === sceneName);
  if (existingIndex !== -1) {
    if (!force) return;
    scenes.splice(existingIndex, 1);
  }

  // 2. Build metadata placeholder
  const newSceneMeta = {
    name: sceneName,
    threeScene: null,
    cameras: {},       // will hold named THREE.Camera instances
    curCamera: null    // name of the active camera
  };

  // 3. Create the actual Three.js Scene
  const threeScene = new THREE.Scene();
  newSceneMeta.threeScene = threeScene;

  // 4. Create a default PerspectiveCamera
  //    FOV 75°, aspect from your renderer size, near=0.1, far=10000
  const size = renderer.getSize(new THREE.Vector2()); // {width, height}
  const defaultCam = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    10000
  );
  defaultCam.position.set(0, 0, Math.max(size.width, size.height) / 2);
  // register it under the name "default"
  newSceneMeta.cameras["default"] = defaultCam;
  newSceneMeta.curCamera = "default";

  // 5. Register the new scene
  scenes.push(newSceneMeta);

  console.log(`Scene "${sceneName}" created with default camera.`);
}


function deleteS3DScene(name) {
  const sceneName = String(name).trim();
  if (!sceneName) return;

  // Find the scene metadata
  const idx = scenes.findIndex(s => s.name === sceneName);
  if (idx < 0) {
    console.warn(`Cannot delete "${sceneName}": not found.`);
    return;
  }
  const meta = scenes[idx];
  const threeScene = meta.threeScene;

  // Traverse and dispose all geometries, materials, and textures
  threeScene.traverse(obj => {
    if (obj.geometry) {
      obj.geometry.dispose();
    }
    if (obj.material) {
      // Handle array of materials too
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(mat => {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
    }
  });

  // Remove from our scenes array
  scenes.splice(idx, 1);

  // If that was the active scene, clear pointers
  if (curScene === sceneName) {
    curScene = null;
    curCamera = null;
  }

  // (Optional) clear renderer caches
  if (renderer && renderer._renderer && renderer._renderer.renderLists) {
    renderer._renderer.renderLists.dispose();
  }

  console.log(`Scene "${sceneName}" deleted.`);
}


  
  function switchCamera(cameraName, sceneName) {
   const targetScene = sceneName && sceneName.trim() ? sceneName.trim() : curScene;
    const sceneObj = scenes.find(s => s.name === targetScene);
    if (!sceneObj || !sceneObj.cameras[cameraName]) return;
    curScene  = targetScene;
    curCamera = cameraName;
  }

function switchScene(sceneName) {
  // If  disabling 3D
  if (sceneName === null) {
    curScene = null;
    curCamera = null;
    return;
  }

  const target = String(sceneName).trim();
  const sceneObj = scenes.find(s => s.name === target);
  if (!sceneObj) {
    // scene not found = disable 3D
    curScene = null;
    curCamera = null;
    return;
  }

  // Activate the scene
  curScene = target;

  // Ensure the scene has a curCamera; if not, default to the first camera or null
  if (sceneObj.curCamera && sceneObj.cameras[sceneObj.curCamera]) {
    curCamera = sceneObj.curCamera;
  } else {
    // pick first defined camera name, or null
    const names = Object.keys(sceneObj.cameras);
    curCamera = names.length ? names[0] : null;
    sceneObj.curCamera = curCamera; // store back
  }
}

/**
 * Returns the active Three.js camera, or null.
 */
function getActiveThreeCamera() {
  if (!curScene || !curCamera) return null;
  const sceneObj = scenes.find(s => s.name === curScene);
  if (!sceneObj) return null;
  const camEntry = sceneObj.cameras[curCamera];
  return camEntry ? camEntry.camera3D : null;
}

    const PATCHES_ID = "__patches" + "Dragonian3D";
    const patch = (obj, functions) => {
      if (obj[PATCHES_ID]) return;
      obj[PATCHES_ID] = {};
      for (const name in functions) {
        const original = obj[name];
        obj[PATCHES_ID][name] = obj[name];
        if (original) {
          obj[name] = function(...args) {
            const callOriginal = (...ogArgs) => original.call(this, ...ogArgs);
            return functions[name].call(this, callOriginal, ...args);
          };
        } else {
          obj[name] = function (...args) {
            return functions[name].call(this, () => {}, ...args);
          }
        }
      }
    }
    const _unpatch = (obj) => {
      if (!obj[PATCHES_ID]) return;
      for (const name in obj[PATCHES_ID]) {
        obj[name] = obj[PATCHES_ID][name];
      }
      delete obj[PATCHES_ID];
    }
  
    const Skin = renderer.exports.Skin;
  
    // this class was originally made by Vadik1
    class SimpleSkin extends Skin {
      constructor(id, renderer) {
        super(id, renderer);
        const gl = renderer.gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,255,0,255]));
        this._texture = texture;
        /**
         * @type {[number, number]}
         */
        this._rotationCenter = [240, 180];
        /**
         * @type {[number, number]}
         */
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

    class ThreeBase {
        constructor() {
            this.scene = null;
        }
    
        getInfo() {
            return {
                id: 'Dragonian3D',
                name: '3D',
                color1: extcolors.Three[0],
                color3: extcolors.Three[2],
                blocks: [
                    {
                        opcode: "createScene",
                        blockType: BlockType.COMMAND,
                        text: "create 3D scene named [SCENE]. force creation? [FORCE]",
                        arguments: {
                            SCENE: { 
                                type: ArgumentType.STRING,  
                                defaultValue: "my scene" 
                            },
                            FORCE: { 
                                type: ArgumentType.BOOLEAN,  
                                defaultValue: "my scene" 
                            },
                        },
                    },
                    {
                        opcode: "deleteScene",
                        blockType: BlockType.COMMAND,
                        text: "delete 3D scene [SCENE]",
                        arguments: {
                            SCENE: { 
                                type: ArgumentType.STRING, 
                                menu: "sceneMenu", 
                                defaultValue: "current" 
                            },
                        },
                    },
                    {
                        opcode: "toggleScene",
                        blockType: BlockType.COMMAND,
                        text: "set 3D scene to [SCENE]",
                        arguments: {
                            SCENE: { 
                                type: ArgumentType.STRING, 
                                menu: "setsceneMenu", 
                                defaultValue: "current" 
                            },
                        },
                    },
                    {
                        opcode: "myscenes",
                        blockType: BlockType.ARRAY,
                        text: "3D scenes",
                    },
                    {
                        opcode: "myscenedata",
                        blockType: BlockType.ARRAY,
                        text: "get [DATA] of 3D scene [SCENE]",
                        arguments: {
                            SCENE: { 
                                type: ArgumentType.STRING, 
                                menu: "sceneMenu", 
                                defaultValue: "current" 
                            },
                            DATA: { 
                                type: ArgumentType.STRING, 
                                menu: "sceneAssets", 
                                defaultValue: "ID" 
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
                        text: "3D scene skybox color [COLOR]",
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
                        text: "3D scene skybox Texture [Costume]",
                        arguments: {
                            Costume: { 
                                type: ArgumentType.COSTUME, 
                            },
                        },
                    },
                ],
                menus: {
                    sceneAssets: {
                        acceptReporters: true,
                        items: ["ID", "cameras", "lights"],
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
                    sceneMenu: {
                        acceptReporters: true,
                        items: "getScenes",
                    },
                    setsceneMenu: {
                        acceptReporters: true,
                        items: "getsetScenes",
                    },
                },
            };
        }
    
        initializeScene() {
          if (this.scene) return;
    
          // create everything
          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
          this.camera.position.set(0, 0, 200);
          this.camera.lookAt(0, 0, 0);
          this.camera.near = 0.5;
          this.camera.far = 4800;
    
          this.renderer = new THREE.WebGLRenderer();
          this.renderer.useLegacyLights = true;
          this.renderer.setClearAlpha(0);
    
          // create the scratch stuff
          this.threeSkinId = renderer._nextSkinId++;
          this.threeSkin = new SimpleSkin(
            this.threeSkinId,
            renderer
          );
          renderer._allSkins[this.threeSkinId] = this.threeSkin;
          this.THREErawableId = renderer.createDrawable("pen");
          // @ts-expect-error not typed
          renderer._allDrawables[this.THREErawableId].customDrawableName = "CST 3D Layer"
          renderer.updateDrawableSkinId(
            this.THREErawableId,
            this.threeSkinId
          );
    
          this.stageSizeEvent = (() => {
            this.updateScale();
          }).bind(this);
          vm.on("STAGE_SIZE_CHANGED", this.stageSizeEvent);
    
          this.stampRenderTarget = new THREE.WebGLRenderTarget();
    
          this.raycaster = new THREE.Raycaster();
    
          this.applyPatches();
          this.updateScale();
        }
    
        uninitializeScene() {
          // delete everything
          for (const dr of renderer._allDrawables) {
            if (!dr) continue;
            this.disable3DForDrawable(dr.id);
            delete dr[IN_3D];
            delete dr[OBJECT];
          }
          if (this.scene) this.scene.clear();
          this.scene = undefined;
          this.camera = undefined;
          if (this.renderer) this.renderer.dispose();
          this.renderer = undefined;
          if (this.threeSkinId)
            this.threeSkin.dispose();
          this.threeSkinId = undefined;
          if (this.THREErawableId)
            renderer._allDrawables[this.THREErawableId].dispose();
          this.THREErawableId = undefined;
          if (this.stageSizeEvent)
            vm.off("STAGE_SIZE_CHANGED", this.stageSizeEvent);
          this.stageSizeEvent = undefined;
          if (this.stampRenderTarget)
            this.stampRenderTarget.dispose();
          this.stampRenderTarget = undefined;
    
          runtime.requestRedraw();
        }

        createScene(args)       { createS3DScene(args.SCENE, args.FORCE); }
        deleteScene(args)       { deleteS3DScene(args.SCENE); }
        setScene(args)          { switchScene(args.SCENE); }


        updateScale() {
          const w = runtime.stageWidth || 480;
          const h = runtime.stageHeight || 360;
    
          this.threeSkin.size = [w, h];
    
          this.camera.aspect = w / h;
          this.renderer.setSize(w, h);
          this.stampRenderTarget.setSize(w, h);
          this.camera.updateProjectionMatrix();
    
          this.updateRenderer();
        }
        
        applyPatches() {
          const Drawable = renderer.exports.Drawable;
    
          const THREE = this;
          patch(Drawable.prototype, {
            getVisible(og) {
              if (this[IN_3D]) return false;
              return og();
            },
            updateVisible(og, value) {
              if (this[IN_3D]) {
                const o = this[OBJECT];
                if (o.visible !== value) {
                  o.visible = value;
                  THREE.updateRenderer();
                }
              }
              return og(value);
            },
            updatePosition(og, position) {
              if (this[IN_3D]) {
                const o = this[OBJECT];
                o.position.x = position[0];
                o.position.y = position[1];
                THREE.updateRenderer();
              }
              return og(position);
            },
            updateDirection(og, direction) {
              if (this[IN_3D]) {
                this[ROLL] = THREE.MathUtils.degToRad(direction);
                THREE.updateSpriteAngle(this);
                THREE.updateRenderer();
              }
              return og(direction);
            },
            updateScale(og, scale) {
              if (this[IN_3D]) {
                const obj = this[OBJECT];
                obj.scale.x = (obj._sizeX ?? 100) / 100 * scale[0];
                obj.scale.y = (obj._sizeY ?? 100) / 100 * scale[1];
                obj.scale.z = (obj._sizeZ ?? 100) / 100 * (this[Z_STRETCH] ?? scale[0]);
                THREE.updateRenderer();
              }
              return og(scale);
            },
            dispose(og) {
              if (this[OBJECT]) {
                this[OBJECT].removeFromParent();
                this[OBJECT].material.dispose();
                if (this[OBJECT].material.map) this[OBJECT].material.map.dispose();
                this[OBJECT].geometry.dispose();
                this[OBJECT] = null;
                THREE.updateRenderer();
              }
              return og();
            },
            _skinWasAltered(og) {
              og();
              if (this[IN_3D]) {
                THREE.updateDrawableSkin(this);
                THREE.updateRenderer();
              }
            }
          });
          
          patch(renderer, {
            draw(og) {
              if (this[THREE_DIRTY]) {
                // Do a 3D redraw
                THREE.doUpdateRenderer();
                this[THREE_DIRTY] = false;
              }
              return og();
            },
            setPenMode(og, mode) {
              if (mode === "3D") {
                this[THREE_DIRTY] = true;
                this._drawList = this._drawList.filter(id => !this._allDrawables[id][IN_3D]);
              } else {
                this[THREE_DIRTY] = true;
                this._drawList = this._drawList.filter(id => this._allDrawables[id][IN_3D]);
              }
              return og(mode);
            },
            setPenSkin(og, skinID) {
              if (this._allSkins[skinID] && this._allSkins[skinID][IN_3D]) {
                this._drawList = this._drawList.filter(id => !this._allDrawables[id][IN_3D]);
              } else {
                this._drawList = this._drawList.filter(id => this._allDrawables[id][IN_3D]);
              }
              return og(skinID);
            },
            isTouchingDrawables(og, drawableID, candidateIDs = this._drawList) {
              const dr = this._allDrawables[drawableID];
    
              if (dr[IN_3D]) {
                // 3D sprites can't collide with 2D
                const candidates = candidateIDs.filter(id => this._allDrawables[id][IN_3D]);
                for (const candidate of candidates) {
                  if (THREE.touching3D(dr[OBJECT], this._allDrawables[candidate][OBJECT]))
                    return true;
                }
                return false;
              }
    
              return og(drawableID, candidateIDs.filter(id => !(this._allDrawables[id][IN_3D])));
            },
    
            penStamp(og, penSkinID, stampID) {
              const dr = this._allDrawables[stampID];
              if (!dr) return;
              if (dr[IN_3D]) {
                // Draw the sprite to the 3D drawable then stamp it
                THREE.renderer.render(dr[OBJECT], THREE.camera);
                this._allSkins[THREE.threeSkinId].setContent(
                  THREE.renderer.domElement
                );
                og(penSkinID, THREE.THREErawableId);
                THREE.updateRenderer();
                return;
              }
              return og(penSkinID, stampID);
            },
    
            pick(og, centerX, centerY, touchWidth, touchHeight, candidateIDs) {
              const pick2d = og(centerX, centerY, touchWidth, touchHeight, candidateIDs);
              if (pick2d !== -1) return pick2d;
              
              if (!THREE.raycaster) return false;
    
              const bounds = this.clientSpaceToScratchBounds(centerX, centerY, touchWidth, touchHeight);
              if (bounds.left === -Infinity || bounds.bottom === -Infinity) {
                  return false;
              }
    
              const candidates =
                (candidateIDs || this._drawList).map(id => this._allDrawables[id]).filter(dr => dr[IN_3D]);
              if (candidates.length <= 0) return -1;
    
              const scratchCenterX = (bounds.left + bounds.right) / this._gl.canvas.clientWidth;
              const scratchCenterY = (bounds.top + bounds.bottom) / this._gl.canvas.clientHeight;
              THREE.raycaster.setFromCamera(new THREE.Vector2(scratchCenterX, scratchCenterY), THREE.camera);
    
              const object = THREE.raycaster.intersectObject(THREE.scene, true)[0]?.object;
              if (!object) return -1;
              const drawable = candidates.find(c => (c[IN_3D] && c[OBJECT] === object));
              if (!drawable) return -1;
              return drawable._id;
            },
            drawableTouching(og, drawableID, centerX, centerY, touchWidth, touchHeight) {
              const drawable = this._allDrawables[drawableID];
              if (!drawable) {
                  return false;
              }
              if (!drawable[IN_3D]) {
                return og(drawableID, centerX, centerY, touchWidth, touchHeight);
              }
      
              if (!THREE.raycaster) return false;
      
              const bounds = this.clientSpaceToScratchBounds(centerX, centerY, touchWidth, touchHeight);
              const scratchCenterX = (bounds.left + bounds.right) / this._gl.canvas.clientWidth;
              const scratchCenterY = (bounds.top + bounds.bottom) / this._gl.canvas.clientHeight;
              THREE.raycaster.setFromCamera(new THREE.Vector2(scratchCenterX, scratchCenterY), THREE.camera);
      
              const intersect = (THREE.raycaster.intersectObject(THREE.scene, true));
              const object = intersect[0]?.object;
              return object === drawable[OBJECT];
            },
            extractDrawableScreenSpace(og, drawableID) {
              const drawable = this._allDrawables[drawableID];
              if (!drawable)
                throw new Error(`Could not extract drawable with ID ${drawableID}; it does not exist`);
              if (!drawable[IN_3D])
                return og(drawableID);
    
              // Draw the sprite to the 3D drawable then extract it
              THREE.renderer.render(drawable[OBJECT], THREE.camera);
              this._allSkins[THREE.threeSkinId].setContent(
                THREE.renderer.domElement
              );
              const extracted = og(THREE.THREErawableId);
              THREE.updateRenderer();
              return extracted;
            },
          });
          patch(renderer.exports.Skin, {
            dispose(og) {
              if (this._3dCachedTexture) this._3dCachedTexture.dispose();
              og();
            },
            _setTexture(og, textureData) {
              if (this._3dCachedTexture) {
                this._3dCachedTexture.dispose();
                this._3dCachedTexture = null;
                const returnValue = og(textureData);
                THREE.getThreeTextureFromSkin(this);
                return returnValue;
              }
              return og(textureData);
            },
          });
        }

        updateRenderer() {
          // Schedule a 3D redraw
          renderer[THREE_DIRTY] = true;
          runtime.requestRedraw();
        }
    
        // pushes the current 3d render state into the drawable
        doUpdateRenderer() {
          this.initializeScene();
          this.renderer.render(this.scene, this.camera);
    
          if (!this.threeSkinId) return;
    
          this.threeSkin.setContent(
            this.renderer.domElement
          );
        }
    
        toggleScene(args) {

        }
    
        is3DOn() {

        }
    
        setSkyboxColor(args) {
          if (!this.scene) return;
          const color = new THREE.Color(Cast.toString(args.COLOR));
          this.scene.background = color;
          this.updateRenderer();
        }

        setSkyboxTexture(args) {

        }
    
        initializeScene() {

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
        
        getScenes() {
              return ['current', ...scenes.map(s => s.name)];
        }

        getsetScenes() {
              return ['none', ...scenes.map(s => s.name)];
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
                blockType: BlockType.COMMAND,
                text: "move [STEPS] steps in 3D",
                arguments: {
                  STEPS: { type: ArgumentType.NUMBER, defaultValue: 10 },
                },
              },
              {
                opcode: "setPosition",
                blockType: BlockType.COMMAND,
                text: "set position to x:[X] y:[Y] z:[Z]",
                arguments: {
                  X: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Z: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "changePosition",
                blockType: BlockType.COMMAND,
                text: "change position by x:[X] y:[Y] z:[Z]",
                arguments: {
                  X: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Z: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "setRotation",
                blockType: BlockType.COMMAND,
                text: "set rotation to r:[R] p:[P] y:[Y]",
                arguments: {
                  R: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  P: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "changeRotation",
                blockType: BlockType.COMMAND,
                text: "change rotation by r:[R] p:[P] y:[Y]",
                arguments: {
                  R: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  P: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "setPosMenu",
                blockType: BlockType.COMMAND,
                text: "set pos [POSTYPES] to [NUMBER]",
                arguments: {
                  POSTYPES: { type: ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                  NUMBER: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "setRotMenu",
                blockType: BlockType.COMMAND,
                text: "set rot [ROTTYPES] to [NUMBER]",
                arguments: {
                  ROTTYPES: { type: ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                  NUMBER: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "directionAround",
                blockType: BlockType.REPORTER,
                text: "direction around [ROTTYPES]",
                arguments: {
                  ROTTYPES: { type: ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                },
              },
              {
                opcode: "xPosition",
                blockType: BlockType.REPORTER,
                text: "x position",
              },
              {
                opcode: "yPosition",
                blockType: BlockType.REPORTER,
                text: "y position",
              },
              {
                opcode: "zPosition",
                blockType: BlockType.REPORTER,
                text: "z position",
              },
              {
                opcode: "roll",
                blockType: BlockType.REPORTER,
                text: "roll",
              },
              {
                opcode: "pitch",
                blockType: BlockType.REPORTER,
                text: "pitch",
              },
              {
                opcode: "yaw",
                blockType: BlockType.REPORTER,
                text: "yaw",
              },
              {
                opcode: "positionArray",
                blockType: BlockType.ARRAY,
                text: "position",
              },
              {
                opcode: "positionObject",
                blockType: BlockType.OBJECT,
                text: "position",
              },
              {
                opcode: "rotationArray",
                blockType: BlockType.ARRAY,
                text: "rotation",
              },
              {
                opcode: "rotationObject",
                blockType: BlockType.OBJECT,
                text: "rotation",
              },
              {
                opcode: "turnDegrees",
                blockType: BlockType.COMMAND,
                text: "turn [TURNDIRS] [NUM] degrees",
                arguments: {
                  TURNDIRS: { type: ArgumentType.STRING, menu: "turndirs", defaultValue: "up" },
                  NUM: { type: ArgumentType.NUMBER, defaultValue: 0 },
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


  setPosition(args, util) {}
  changePosition(args, util) {}
  setPosMenu(args, util) {}
    

  setRotMenu(args, util) {}
  turnDegrees(args, util) {}


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
                opcode: "existingModels",
                blockType: BlockType.ARRAY,
                text: "existing models",
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
            blockType: BlockType.COMMAND,
            text: "switch model to [MODEL]",
            arguments: {
              SPRITE: { type: ArgumentType.STRING, menu: "spriteMenu" },
              MODEL: { type: ArgumentType.STRING, menu: "models" },
              },
            }, 
            {
                opcode: "addModel",
                blockType: BlockType.COMMAND,
                text: "add model of type [TYPE] as [MODELNAME] from url [MODELURL]",
                arguments: {
                  TYPE: { type: ArgumentType.STRING, menu: "modelimports" },
                  MODELNAME: { type: ArgumentType.STRING, defaultValue: "new model" },
                  MODELURL: {
                    type: ArgumentType.STRING,
                    defaultValue:
                      "https://raw.githubusercontent.com/alecjacobson/common-3d-test-models/refs/heads/master/data/teapot.obj",
                  },
                },
            },
            {
              opcode: "givetoModel",
              blockType: BlockType.COMMAND,
              text: "load [MODELTYPE] data [DATA] into model [MODEL]",
              arguments: {
                MODELTYPE: { type: ArgumentType.STRING, menu: "modeltypes" },
                DATA: { type: ArgumentType.STRING, defaultValue: "(multiline data)" },
                MODEL: { type: ArgumentType.STRING, menu: "models" },
              },
            },
            {
              opcode: "givetoModelfromlist",
              blockType: BlockType.COMMAND,
              text: "load [MODELTYPE] data from list [LIST] into model [MODEL]",
              arguments: {
                MODELTYPE: { type: ArgumentType.STRING, menu: "modeltypes" },
                LIST: { type: ArgumentType.STRING, defaultValue: "WIP" },
                MODEL: { type: ArgumentType.STRING, menu: "models" },
              },
            },
            {
              opcode: "deletemodel",
              blockType: BlockType.COMMAND,
              text: "delete model [MODEL]",
              arguments: {
                MODEL: { type: ArgumentType.STRING, menu: "models" },
              }
            },
              {
                opcode: "setTextureFilter",
                blockType: BlockType.COMMAND,
                text: "set texture filter to [TEXTUREFILTER]",
                arguments: {
                  TEXTUREFILTER: { type: ArgumentType.STRING, menu: "texturefilter", defaultValue: "nearest" },
                },
              },
              {
                opcode: "showFaces",
                blockType: BlockType.COMMAND,
                text: "show faces [SHOWFACES] of myself",
                arguments: {
                  SHOWFACES: { type: ArgumentType.STRING, menu: "showfaces", defaultValue: "both" },
                },
              },
              {
                opcode: "setStretch",
                blockType: BlockType.COMMAND,
                text: "set stretch to x:[X] y:[Y] z:[Z]",
                arguments: {
                  X: { type: ArgumentType.NUMBER, defaultValue: 100 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 100 },
                  Z: { type: ArgumentType.NUMBER, defaultValue: 100 },
                },
              },
              {
                opcode: "changeStretch",
                blockType: BlockType.COMMAND,
                text: "change stretch by x:[X] y:[Y] z:[Z]",
                arguments: {
                  X: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Z: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "setStretchMenu",
                blockType: BlockType.COMMAND,
                text: "set stretch [POSTYPES] to [NUMBER]",
                arguments: {
                  POSTYPES: { type: ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                  NUMBER: { type: ArgumentType.NUMBER, defaultValue: 100 },
                },
              },
              {
                opcode: "changeStretchMenu",
                blockType: BlockType.COMMAND,
                text: "change stretch [POSTYPES] by [NUMBER]",
                arguments: {
                  POSTYPES: { type: ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                  NUMBER: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "stretchX",
                blockType: BlockType.REPORTER,
                text: "stretch x",
              },
              {
                opcode: "stretchY",
                blockType: BlockType.REPORTER,
                text: "stretch y",
              },
              {
                opcode: "stretchZ",
                blockType: BlockType.REPORTER,
                text: "stretch z",
              },
              {
                opcode: "stretchesArray",
                blockType: BlockType.ARRAY,
                text: "stretches",
              },
              {
                opcode: "stretchesObject",
                blockType: BlockType.OBJECT,
                text: "stretches",
              },


              "---",

              {
                blockType: BlockType.LABEL,
                text: "Lighting",
              },


              "---",

              {
                opcode: "getAllLights",
                blockType: BlockType.ARRAY,
                text: "get all light [LIGHTSTUFF]",
                arguments: {
                  LIGHTSTUFF: { type: ArgumentType.STRING, menu: "LightAttributes", defaultValue: "name" },
                }
              },
              {
                opcode: "nomorelights",
                blockType: BlockType.COMMAND,
                text: "delete all lights",
              },
              {
                opcode: "createLight",
                blockType: BlockType.COMMAND,
                text: "create [TYPE] light named [LIGHT]",
                arguments: {
                  TYPE: { type: ArgumentType.STRING, menu: "LightTypes", defaultValue: "Spot" },
                  LIGHT: { type: ArgumentType.STRING, defaultValue: "light" },
                },
              },
              {
                opcode: "deleteLight",
                blockType: BlockType.COMMAND,
                text: "delete light [LIGHT]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "setLightType",
                blockType: BlockType.COMMAND,
                text: "set light [LIGHT] type to [TYPE]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  TYPE: { type: ArgumentType.STRING, menu: "LightTypes", defaultValue: "Spot" },
                },
              },
              {
                opcode: "SetPositionLight",
                blockType: BlockType.COMMAND,
                text: "set position of light [LIGHT] to x:[X] y:[Y] z:[Z]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  X: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Z: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "SetRotateLight",
                blockType: BlockType.COMMAND,
                text: "set rotation of light [LIGHT] to r:[R] p:[P] y:[Y]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  R: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  P: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },

                },
              },
              {
                opcode: "PositionLight",
                blockType: BlockType.COMMAND,
                text: "change position of light [LIGHT] by x:[X] y:[Y] z:[Z]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  X: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Z: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "RotateLight",
                blockType: BlockType.COMMAND,
                text: "change rotation of light [LIGHT] by r:[R] p:[P] y:[Y]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  R: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  P: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "LightPosition",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] [postype] position",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  postype: { type: ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
                },
              },
              {
                opcode: "LightRotation",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] [rottype] rotation",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  rottype: { type: ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
                },
              },
              {
                opcode: "LightPositionArray",
                blockType: BlockType.ARRAY,
                text: "light [LIGHT] position",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "LightPositionObject",
                blockType: BlockType.OBJECT,
                text: "light [LIGHT] position",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "LightRotationArray",
                blockType: BlockType.ARRAY,
                text: "light [LIGHT] rotation",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "LightRotationObject",
                blockType: BlockType.OBJECT,
                text: "light [LIGHT] rotation",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "setLightColor",
                blockType: BlockType.COMMAND,
                text: "set light [LIGHT] color to [COLOR]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  COLOR: { type: ArgumentType.COLOR, defaultValue: "#000000" },
                },
              },
              {
                opcode: "getLightColor",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] color",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "setLightIntensity",
                blockType: BlockType.COMMAND,
                text: "set light [LIGHT] intensity to [INTENSITY]%",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  INTENSITY: { type: ArgumentType.NUMBER, defaultValue: 100 },
                },
              },
              {
                opcode: "getLightIntensity",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] Intensity",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "setLightDistance",
                blockType: BlockType.COMMAND,
                text: "set light [LIGHT] distance to [DISTANCE]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  DISTANCE: { type: ArgumentType.NUMBER, defaultValue: 1000 },
                },
              },
              {
                opcode: "getLightDistance",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] distance",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "setLightAngle",
                blockType: BlockType.COMMAND,
                text: "set light [LIGHT] angle to [ANGLE]",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  ANGLE: { type: ArgumentType.ANGLE, defaultValue: 45 },
                },
              },
              {
                opcode: "getLightAngle",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] angle",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "setLightPenumbra",
                blockType: BlockType.COMMAND,
                text: "set light [LIGHT] penumbra to [PENUMBRA]%",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  PENUMBRA: { type: ArgumentType.NUMBER, defaultValue: 0 },
                },
              },
              {
                opcode: "getLightPenumbra",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] penumbra",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                },
              },
              {
                opcode: "setLightDecay",
                blockType: BlockType.COMMAND,
                text: "set light [LIGHT] decay to [DECAY]%",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
                  DECAY: { type: ArgumentType.NUMBER, defaultValue: 2 },
                },
              },
              {
                opcode: "getLightDecay",
                blockType: BlockType.REPORTER,
                text: "light [LIGHT] decay",
                arguments: {
                  LIGHT: { type: ArgumentType.STRING, menu: "Lights", },
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
            modeltypes: {
              acceptReporters: true,
              items: ["OBJ", "GLTF", "MTL"]
            },
            modelimports: {
              acceptReporters: true,
              items: ["OBJ", "GLTF"]
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

  setModel(args, util) {}
  addModel() {}
  givetoModel() {}
  givetoModelfromlist() {}
  deletemodel() {}
  existingModels() { return this.getModels(); }

  setTextureFilter() {}
  showFaces() {}
  setStretch() {}
  changeStretch() {}
  setStretchMenu() {}
  changeStretchMenu() {}
  stretchX() { return 100; }
  stretchY() { return 100; }
  stretchZ() { return 100; }
  stretchesArray() { return [100, 100, 100]; }
  stretchesObject() { return {x: 100, y: 100, z: 100}; }

  getAllLights() { return []; }
  nomorelights() {}
  createLight() {}
  deleteLight() {}
  setLightType() {}
  SetPositionLight() {}
  SetRotateLight() {}
  PositionLight() {}
  RotateLight() {}
  LightPosition() { return 0; }
  LightRotation() { return 0; }
  LightPositionArray() { return []; }
  LightPositionObject() { return {}; }
  LightRotationArray() { return []; }
  LightRotationObject() { return {}; }
  setLightColor() {}
  getLightColor() { return '#ffffff'; }
  setLightIntensity() {}
  getLightIntensity() { return 100; }
  setLightDistance() {}
  getLightDistance() { return 1000; }
  setLightAngle() {}
  getLightAngle() { return 45; }
  setLightPenumbra() {}
  getLightPenumbra() { return 0; }
  setLightDecay() {}
  getLightDecay() { return 2; }


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
                  sound: { type: ArgumentType.SOUND},
                  x: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  y: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  z: { type: ArgumentType.NUMBER, defaultValue: 0 },
                  v: { type: ArgumentType.NUMBER, defaultValue: 100 },
                  w: { type: ArgumentType.NUMBER, defaultValue: 1000 },
                  h: { type: ArgumentType.NUMBER, defaultValue: 1000 },
                  d: { type: ArgumentType.NUMBER, defaultValue: 1000 },
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

  WhenSpriteClicked3D() {

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
    // 3D disabled?
    if (curScene === null) {
      this.sceneObj   = null;
      this.cameras    = {};
      this.curCamera  = null;
      this.current3D  = null;
      return;
    }

    // Look up the active scene
    const scene = scenes.find(s => s.name === curScene);
    if (!scene) {
      // invalid curScene → treat as 3D off
      this.sceneObj   = null;
      this.cameras    = {};
      this.curCamera  = null;
      this.current3D  = null;
      return;
    }

    // Bind to that scene
    this.sceneObj   = scene;
    this.cameras    = scene.cameras;
    // scene.curCamera may be missing—default to the first camera or null
    this.curCamera  =
      (scene.curCamera && scene.cameras[scene.curCamera])
        ? scene.curCamera
        : Object.keys(scene.cameras)[0] || null;
    // Always sync the global curCamera
    curCamera = this.curCamera;
    this.current3D  = this.curCamera
        ? this.cameras[this.curCamera].camera3D
        : null;
  }

  switchCamera(cameraName, sceneName) {
    // Determine target scene name (nullable)
    const targetScene = (sceneName != null && String(sceneName).trim())
      ? String(sceneName).trim()
      : curScene;

    // Handle disabling 3D
    if (targetScene === null) {
      curScene  = null;
      curCamera = null;
      this.sceneObj   = null;
      this.cameras    = {};
      this.curCamera  = null;
      this.current3D  = null;
      return;
    }

    // Lookup that scene
    const scene = scenes.find(s => s.name === targetScene);
    if (!scene) return;              // invalid scene → no-op

    // Does the named camera exist?
    if (!scene.cameras[cameraName]) return;  // invalid camera → no-op

    // Commit the switch
    curScene  = targetScene;
    curCamera = cameraName;
    // Store on the scene metadata
    scene.curCamera = cameraName;

    // Re-bind
    this.sceneObj   = scene;
    this.cameras    = scene.cameras;
    this.curCamera  = cameraName;
    this.current3D  = scene.cameras[cameraName].camera3D;
  }

  switchCamera(cameraName, sceneName) {
    // Determine which scene to switch in
    const targetScene = (sceneName && sceneName.trim()) 
      ? sceneName.trim() 
      : curScene;

    // If disabling 3D:
    if (targetScene === null) {
      curScene  = null;
      curCamera = null;
      this.sceneName = null;
      this.cameras   = {};
      this.current3D = null;
      return;
    }

    // Find the scene
    const sceneObj = scenes.find(s => s.name === targetScene);
    if (!sceneObj) return;               // invalid scene → no-op
    if (!sceneObj.cameras[cameraName]) return; // invalid camera → no-op

    // Commit the switch
    curScene  = targetScene;
    curCamera = cameraName;
    this.sceneName = targetScene;
    this.cameras   = sceneObj.cameras;
    this.current3D = this.cameras[cameraName].camera3D;
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
        blockType: BlockType.COMMAND,
        text: "create camera [CAMERA] in scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "deleteCamera",
        blockType: BlockType.COMMAND,
        text: "delete camera [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "existingCameras",
        blockType: BlockType.ARRAY,
        text: "existing cameras of scene [SCENE]",
        arguments: {
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "focusCamera",
        blockType: BlockType.COMMAND,
        text: "focus on camera [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "moveCameraSteps",
        blockType: BlockType.COMMAND,
        text: "move camera [CAMERA] of scene [SCENE] [STEPS] steps in 3D",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          STEPS: { type: ArgumentType.NUMBER, defaultValue: 10 },
        },
          },
          {
        opcode: "setCameraPosition",
        blockType: BlockType.COMMAND,
        text: "set camera position of [CAMERA] of scene [SCENE] to x:[X] y:[Y] z:[Z]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          X: { type: ArgumentType.NUMBER, defaultValue: 0 },
          Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
          Z: { type: ArgumentType.NUMBER, defaultValue: 0 },
        },
          },
          {
        opcode: "changeCameraPosition",
        blockType: BlockType.COMMAND,
        text: "change camera position of [CAMERA] of scene [SCENE] by x:[X] y:[Y] z:[Z]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          X: { type: ArgumentType.NUMBER, defaultValue: 0 },
          Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
          Z: { type: ArgumentType.NUMBER, defaultValue: 0 },
        },
          },
          {
        opcode: "setCameraRotation",
        blockType: BlockType.COMMAND,
        text: "set camera rotation of [CAMERA] of scene [SCENE] to r:[R] p:[P] y:[Y]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          R: { type: ArgumentType.NUMBER, defaultValue: 0 },
          P: { type: ArgumentType.NUMBER, defaultValue: 0 },
          Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
        },
          },
          {
        opcode: "changeCameraRotation",
        blockType: BlockType.COMMAND,
        text: "change camera rotation of [CAMERA] of scene [SCENE] by r:[R] p:[P] y:[Y]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          R: { type: ArgumentType.NUMBER, defaultValue: 0 },
          P: { type: ArgumentType.NUMBER, defaultValue: 0 },
          Y: { type: ArgumentType.NUMBER, defaultValue: 0 },
        },
          },
          {
        opcode: "setCameraPosMenu",
        blockType: BlockType.COMMAND,
        text: "set camera pos [POSTYPES] of [CAMERA] of scene [SCENE] to [NUMBER]",
        arguments: {
          POSTYPES: { type: ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          NUMBER: { type: ArgumentType.NUMBER, defaultValue: 0 },
        },
          },
          {
        opcode: "setCameraRotMenu",
        blockType: BlockType.COMMAND,
        text: "set camera rot [ROTTYPES] of [CAMERA] of scene [SCENE] to [NUMBER]",
        arguments: {
          ROTTYPES: { type: ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          NUMBER: { type: ArgumentType.NUMBER, defaultValue: 0 },
        },
          },
          {
        opcode: "cameraDirectionAround",
        blockType: BlockType.REPORTER,
        text: "camera direction around [ROTTYPES] of [CAMERA] of scene [SCENE]",
        arguments: {
          ROTTYPES: { type: ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraXPosition",
        blockType: BlockType.REPORTER,
        text: "camera x position of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraYPosition",
        blockType: BlockType.REPORTER,
        text: "camera y position of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraZPosition",
        blockType: BlockType.REPORTER,
        text: "camera z position of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraRoll",
        blockType: BlockType.REPORTER,
        text: "camera roll of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraPitch",
        blockType: BlockType.REPORTER,
        text: "camera pitch of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraYaw",
        blockType: BlockType.REPORTER,
        text: "camera yaw of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraPositionArray",
        blockType: BlockType.ARRAY,
        text: "camera position of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraPositionObject",
        blockType: BlockType.OBJECT,
        text: "camera position of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraRotationArray",
        blockType: BlockType.ARRAY,
        text: "camera rotation of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "cameraRotationObject",
        blockType: BlockType.OBJECT,
        text: "camera rotation of [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "bindCamera",
        blockType: BlockType.COMMAND,
        text: "attach camera [CAMERA] of scene [SCENE] to [SPRITE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          SPRITE: { type: ArgumentType.STRING, menu: "spriteMenu" },
        },
          },
          {
        opcode: "unbindCamera",
        blockType: BlockType.COMMAND,
        text: "detach camera [CAMERA] of scene [SCENE]",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "bindedSprite",
        blockType: BlockType.REPORTER,
        text: "sprite camera [CAMERA] of scene [SCENE] is attached to",
        arguments: {
          CAMERA: { type: ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
          },
          {
        opcode: "setCameraVis",
        blockType: BlockType.COMMAND,
        text: "set camera [CAMVIS] of scene [SCENE] to [NUMBER]",
        arguments: {
          CAMVIS: { type: ArgumentType.STRING, menu: "camvis" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
          NUMBER: { type: ArgumentType.NUMBER, defaultValue: 90 },
        },
          },
          {
        opcode: "getCameraVis",
        blockType: BlockType.REPORTER,
        text: "camera [CAMVIS] of scene [SCENE]",
        arguments: {
          CAMVIS: { type: ArgumentType.STRING, menu: "camvis", defaultValue: "FOV" },
          SCENE: { type: ArgumentType.STRING, menu: "scenes", defaultValue: "current" },
        },
        },
          ],
          menus: {
          cameras: {
        acceptReporters: true,
        items: "getCameras",
        },
          scenes: {
        acceptReporters: true,
        items: "getScenes",
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
    return spriteNames.length > 0 ? spriteNames : [{ text: "none", value: "0" }];
  }

  getCameras() {
    const defaultMenu = ["cam test"];
    let menu = [""];
    if (!ScratchBlocks || !ScratchBlocks.selected) return defaultMenu;

    const block = ScratchBlocks.selected;
    for (let i = 0; i < block.inputList.length; i++) {
      const input = block.inputList[i];
      if (input.name === checkerKey) {
        const otherInput = input.connection.targetBlock();
        if (!otherInput) return defaultMenu;

        const sceneName = otherInput.inputList[0].fieldRow[0].value_;
        const scene = scenes.find((e) => e.name === sceneName);
        if (scene) return scene.cameras;
      }
    }
    return menu;
  }
  getScenes() {
    const list = [{text:"current", value: curScene}, ...scenes.map(s => ({text: s.name, value: s.name}))];
    if (!ScratchBlocks || !ScratchBlocks.selected) return list;

    const block = ScratchBlocks.selected;
    block.inputList.forEach((input) => {
      if (input.name === dependerKey) {
        const otherInput = input.connection.targetBlock();
        if (!otherInput) return;
        otherInput.inputList[0].fieldRow[0].setValue(this.getCameras()[0]);
      }
    });
    return list;
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

function renderLoop() {
  const camera = getActiveThreeCamera();
  if (camera) {
    renderer3D.render(
      // use the Three.js Scene instance stored on your scene object:
      scenes.find(s => s.name === curScene).threeScene,
      camera
    );
  }
  requestAnimationFrame(renderLoop);
}

Scratch.extensions.register(new ThreeBase());
Scratch.extensions.register(new ThreeMotion());
Scratch.extensions.register(new ThreeLooks());
Scratch.extensions.register(new ThreeSound());
//Scratch.extensions.register(new ThreeEvents());
//Scratch.extensions.register(new ThreeControl());
Scratch.extensions.register(new ThreeSensing());
Scratch.extensions.register(new ThreeCamera());
//Scratch.extensions.register(new ThreeOperators());
//Scratch.extensions.register(new ThreePen());

})(Scratch);
