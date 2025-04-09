
/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.17
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

(async function (Scratch) {
  if (!Scratch.extensions.unsandboxed) {
      throw new Error(`"DragonianUSB3D" must be run unsandboxed.`);
  }

  // Add import map to resolve 'three' specifier
  const importMap = document.createElement('script');
  importMap.type = 'importmap';
  importMap.textContent = JSON.stringify({
      "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.175.0/build/three.module.min.js"
      }
  });
  document.head.appendChild(importMap);

  // Load Three.js modules
  async function loadModule(url) {
      const module = await import(url);
      return module;
  }

  try {
      // Load main Three.js library
      const threeModule = await loadModule('three');
      window.THREE = threeModule;

      // Load addons with proper relative paths
      const objLoader = await loadModule('https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/loaders/OBJLoader.js');
      const gltfLoader = await loadModule('https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/loaders/GLTFLoader.js');
      
      // Attach loaders to THREE object
      THREE.OBJLoader = objLoader.OBJLoader;
      THREE.GLTFLoader = gltfLoader.GLTFLoader;

      console.log('Three.js initialized:', THREE);
      
  } catch (error) {
      console.error('Initialization failed:', error);
      throw new Error('Three.js failed to initialize');
  }
  
})(Scratch);