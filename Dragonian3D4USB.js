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
      }
      
    })(Scratch);