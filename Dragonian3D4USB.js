/**
 * Dragonian3D4USB
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.17
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/


(async function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
      throw new Error(`"DragonianUSB3D" must be run unsandboxed.`)
    }

    const importlink = {
        threejs: "https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js",
        OBJLoader: "https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/OBJLoader.js",
        GLTFLoader: "https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/GLTFLoader.js",
      };

    const models = []
    const cameras = []
    let currentCamera = null

    const cameraSettings = {
        FOV: 90,
        minrender: 0.1,
        maxrender: 1000,
      };

      let scene = null;
      let renderer = null;
      let camerasObj = {};
      let activeCamera = null;
      let isInitialized = false;
      const currentSprite = null;
      const spriteObjects = {};
      const modelObjects = {};

      const vm = Scratch.vm
      const runtime = vm.runtime
      const scratchRenderer = vm.runtime.renderer

      class Three {
        constructor() {
          this.scene = null // Single scene storage
        }
        getInfo() {
          return {
            id: "DragonianUSB3D",
            name: "3D",
            color1: ext.colors.threejs,
            blocks: [
                {
                    opcode: "initializeScene",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "initialize scene",
                  },
                  {
                    opcode: "toggleScene",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "scene [ONOFF]",
                    arguments: {
                      ONOFF: { type: Scratch.ArgumentType.STRING, menu: "onoff", defaultValue: "on" },
                    },
                  },
                  {
                    opcode: "is3DOn",
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: "3D on?",
                  },
                  {
                    opcode: "setSkyboxColor",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "scene skybox color [COLOR]",
                    arguments: {
                      COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#000000" },
                    },
                  },
                  {
                    opcode: "setMode",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set 3D mode to [MODE]",
                    arguments: {
                      MODE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: "MODES",
                        defaultValue: "flat",
                      },
                    },
                  },
            ]
        }
    }
}
    })(Scratch);