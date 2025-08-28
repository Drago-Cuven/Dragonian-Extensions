/**
 * DragoPython
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.25
 * License: MIT & LGPLv3
 */


(async function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('"Dragonian Python" must be ran unsandboxed.');
  }

  // Restore your planned destructuring
  const { Cast, BlockType, ArgumentType, vm } = Scratch;
  const { runtime } = vm;
  const renderer = runtime.renderer;

const pyodidePkg = await import("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs");
const pyodide = await pyodidePkg.loadPyodide();

await pyodide.runPythonAsync(`
def hello(name):
    return f"hi, {name}!"
`);

pyodide.globals.set("jsVar", 123);
console.log(pyodide.runPython("jsVar + 1"));



  class DragoPython {
    getInfo() {
      return {
        id: 'DragoPython', // case-sensitive ID you requested
        name: 'Python',
        color1: '#ee8f1f',
        color2: '#f8c039',
        color3: '#e65b29',
        blocks: [
          {
            opcode: 'dothing',
            blockType: BlockType.BOOLEAN,
            text: 'thingdo?',
            disableMonitor: false
          }
        ]
      };
    }

    dothing() {
      return true;
    }
  }

  Scratch.extensions.register(new DragoPython());
})(Scratch);
