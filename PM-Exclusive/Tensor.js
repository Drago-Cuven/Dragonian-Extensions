/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.25
 * License: MIT & LGPLv3
 */

const TFJS_URL = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.fesm.min.js';

(async function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Tensor must be run unsandboxed.');
  }

  // Restore your planned destructuring
  const { Cast, BlockType, ArgumentType, vm } = Scratch;
  const { runtime } = vm;
  const renderer = runtime.renderer;

  let tensor = null;

  // Correctly import TensorFlow.js as an ES module
  try {
    const module = await import(/* webpackIgnore: true */ TFJS_URL);
    tensor = module;

    if (tensor.setBackend) {
      await tensor.setBackend('webgl').catch(() => tensor.setBackend('cpu'));
      await tensor.ready();
      console.log('TensorFlow.js loaded, backend:', tensor.getBackend());
    }
  } catch (e) {
    console.error('Error loading TensorFlow.js:', e);
  }

  class TensorBlocks {
    getInfo() {
      return {
        id: 'DragoTensor', // case-sensitive ID you requested
        name: 'Tensor',
        color1: '#ee8f1f',
        color2: '#f8c039',
        color3: '#e65b29',
        blocks: [
          {
            opcode: 'tensorLoaded',
            blockType: BlockType.BOOLEAN,
            text: 'is tensor loaded?',
            disableMonitor: false
          }
        ]
      };
    }

    tensorLoaded() {
      return Boolean(tensor && tensor.ready && !tensor.loading);
    }
  }

  Scratch.extensions.register(new TensorBlocks());
})(Scratch);
