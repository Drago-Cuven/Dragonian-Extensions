
/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.17
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

(async function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
        throw new Error(`"DragonianUSB3D" must be run unsandboxed.`)
      }
    const Three = document.createElement('Three');
    const OBJLoader = document.createElement('OBJLoader');
    const GLTFLoader = document.createElement('GLTFLoader');
    // Three.src = 'https://cdn.jsdelivr.net/npm/three@0.175.0/build/three.module.js';
    Three.src = 'https://cdn.jsdelivr.net/npm/three@0.715.0/build/three.module.min.js';
    OBJLoader.src = 'https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/OBJLoader.js';
    GLTFLoader.src = 'https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/GLTFLoader.js';
    document.head.appendChild(Three);
    document.head.appendChild(OBJLoader);
    document.head.appendChild(GLTFLoader);
    console.log("Three.js imported");
})(Scratch);
