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
  const scratchRenderer = runtime.renderer

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
    Lighting: ["#D1B894", "#0000ff", "#0000ff"],    // Gold
    Hitboxes: ["#6A6865", "#0000ff", "#0000ff"]     // Gravel
};

  const extimages = {};
   
  const cameras = [];

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

  class ThreeBase {
    constructor() {

    }

    getInfo() {
        return {
            id: 'Dragonian3D',
            name: '3D',
            color1: extcolors.Three[0],
            color2: extcolors.Three[1],
            color3: extcolors.Three[2],
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
              }
          ]
      };
  }

  helloWorld() {
      return 'bork bork!';
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

class ThreeCamera {
  constructor() {

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

class ThreeLighting {
  constructor() {

  }

  getInfo() {
      return {
          id: 'Dragonian3DLighting',
          name: 'Lighting 3D',
          color1: extcolors.Lighting[0],
          color2: extcolors.Lighting[1],
          color3: extcolors.Lighting[2],
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

class ThreeHitboxes {
  constructor() {

  }

  getInfo() {
      return {
          id: 'Dragonian3DHitboxes',
          name: 'Hitboxes 3D',
          color1: extcolors.Hitboxes[0],
          color2: extcolors.Hitboxes[1],
          color3: extcolors.Hitboxes[2],
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
Scratch.extensions.register(new ThreeLighting());
Scratch.extensions.register(new ThreeHitboxes());
Scratch.extensions.register(new ThreePen());

})(Scratch);