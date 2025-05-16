// @ts-check

/**!
 * Dragonian Python
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * @comment Main development by Drago Cuven
 * Do not remove this comment
 */
// @ts-ignore
(async function (Scratch) {
    // @ts-ignore
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('"Dragonian Python" must be ran unsandboxed.');
    }
  
    // @ts-ignore
    const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTEuMTYxMzUiIGhlaWdodD0iMTEyLjM4OSIgdmlld0JveD0iMCwwLDExMS4xNjEzNSwxMTIuMzg5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjE4NC40MTkzMiIgeTE9IjEyMy44MDU1IiB4Mj0iMjQ1Ljc0NTQ3IiB5Mj0iMTc3LjA3NzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWE5ZmQ0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzA2OTk4Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjI1NC4zNTAwMiIgeTE9IjIyMS4zNTM1NCIgeDI9IjIzMi40NTA0OCIgeTI9IjE5MC4wNzAzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0yIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmQ0M2IiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmU4NzMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg0LjQxOTMyLC0xMjMuODA1NSkiPjxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjUzLjMwNjg2LDEyNC45MDAxN2M3LjI3NjI3LDEuMjEyNzIgMTMuNDA2MjUsNi42NzExNiAxMy40MDYyNSwxMy45Mzc1djI1LjUzMTI1YzAsNy40ODY4NCAtNS45NTEzLDEzLjYyNSAtMTMuNDA2MjUsMTMuNjI1aC0yNi43ODEyNWMtOS4wOTI4NiwwIC0xNi43NSw3LjgwNjM1IC0xNi43NSwxNi42NTYyNXYxMi4yNWgtOS4yMTg3NWMtNy43OTI0NiwwIC0xMi4zNDQwNywtNS42NTU5IC0xNC4yNSwtMTMuNTkzNzVjLTIuNTcxMDIsLTEwLjY2Mzk4IC0yLjQ2MTgyLC0xNy4wMzcwMyAwLC0yNy4yNWMyLjEzNDI0LC04LjkxMDAzIDguOTU3NTQsLTEzLjU5Mzc1IDE2Ljc1LC0xMy41OTM3NWgxMC4wNjI1aDI2LjgxMjV2LTMuNDA2MjVoLTI2LjgxMjV2LTEwLjIxODc1YzAsLTcuNzM3NCAyLjA2MDAzLC0xMS45MzMgMTMuNDA2MjUsLTEzLjkzNzVjMy44NTE1NiwtMC42ODE1MyA4LjIyODg1LC0xLjA3MjQ1IDEyLjgxMjUsLTEuMDkzNzVjNC41ODM2NSwtMC4wMjEzIDkuMzYyNzYsMC4zMjcwMiAxMy45Njg3NSwxLjA5Mzc1ek0yMTkuODA2ODYsMTM3LjE1MDE3YzAsMi44MTYzMyAyLjI1MTc3LDUuMDkzNzUgNS4wMzEyNSw1LjA5Mzc1YzIuNzY5NTUsMCA1LjAzMTI1LC0yLjI3NzQxIDUuMDMxMjUsLTUuMDkzNzVjMCwtMi44MjYzNSAtMi4yNjE3LC01LjEyNSAtNS4wMzEyNSwtNS4xMjVjLTIuNzc5NDgsMCAtNS4wMzEyNSwyLjI5ODY1IC01LjAzMTI1LDUuMTI1eiIgZmlsbD0idXJsKCNjb2xvci0xKSIvPjxwYXRoIGQ9Ik0yODAuMTE5MzYsMTUyLjQ2MjY3YzcuODAyMzcsMCAxMS40ODA0Niw1LjgzNjMxIDEzLjQwNjI0LDEzLjU5Mzc1YzIuNjgwMjIsMTAuNzc0MjIgMi43OTkzMywxOC44NTExMSAwLDI3LjI1Yy0yLjcwOTk5LDguMTU4MzQgLTUuNjEzNzgsMTMuNTkzNzUgLTEzLjQwNjI0LDEzLjU5Mzc1aC0xMy40MDYyNWgtMjYuNzgxMjV2My40MDYyNWgyNi43ODEyNXYxMC4yMTg3NWMwLDcuNzM3MzkgLTYuNjU2MDksMTEuNjcwNjEgLTEzLjQwNjI1LDEzLjYyNWMtMTAuMTU1MDEsMi45NDY2MyAtMTguMjkzOTIsMi40OTU2MSAtMjYuNzgxMjUsMGMtNy4wODc2NiwtMi4wODQ2OCAtMTMuNDA2MjUsLTYuMzU4NjYgLTEzLjQwNjI1LC0xMy42MjV2LTI1LjUzMTI1YzAsLTcuMzQ2NTIgNi4wNzA0MiwtMTMuNjI1IDEzLjQwNjI1LC0xMy42MjVoMjYuNzgxMjVjOC45MjQxMSwwIDE2Ljc1LC03Ljc2OTI1IDE2Ljc1LC0xN3YtMTEuOTA2MjV6TTI0OS45NjMxMSwyMjIuMjEyNjZjMCwyLjgyNjM1IDIuMjYxNyw1LjEyNSA1LjAzMTI1LDUuMTI1YzIuNzc5NDgsMCA1LjAzMTI1LC0yLjI5ODY1IDUuMDMxMjUsLTUuMTI1YzAsLTIuODE2MzMgLTIuMjUxNzcsLTUuMDkzNzQgLTUuMDMxMjUsLTUuMDkzNzVjLTIuNzY5NTUsMCAtNS4wMzEyNSwyLjI3NzQyIC01LjAzMTI1LDUuMDkzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NTUuNTgwNjc2OTYyOTY2Mzg6NTYuMTk0NTAxMTE0NTE3MjEtLT4=";
  
      // @ts-ignore
    // @ts-ignore
    const {Cast, BlockType, ArgumentType, vm} = Scratch,
      // @ts-ignore

    {runtime} = vm;

  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/pypyjs/pypyjs-release@0.4.0/lib';  // 

  // @ts-ignore
  window.Module = {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    locateFile: (path, prefix) => `${CDN_BASE}/${path}`
  };  // 

  function injectScript(src) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
      // @ts-ignore
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  await injectScript(`${CDN_BASE}/Promise.min.js`);        
  await injectScript(`${CDN_BASE}/FunctionPromise.js`);   
  await injectScript(`${CDN_BASE}/pypyjs.js`);            

  // @ts-ignore
  let python = new pypyjs();
    // @ts-ignore
  await python.ready(); 
    /*
    // @ts-ignore
    async function resetPython() {
      const threads = runtime.threads;
      const oldStatus = [];
      for (var i = 0; i < threads.length; i++) {
        const thisThread = threads[i];
        oldStatus.push(thisThread.status);
        thisThread.status = 5;
      }
      // @ts-ignore
      python = pypy
      await python.ready();  
      for (var i = 0; i < threads.length; i++) {
        threads[i].status = oldStatus[i];
      }
    };
    */


  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  const pfuncargs = Symbol("pfuncargs");

  python.exec(`print("✅ PyPy.js is loaded and ready!")`);
  let pyOn = true;

  function myCallback(x, y) {
    // @ts-ignore
    return x+y
  };

  python.set("py_add", myCallback)

  class extension {
      get python() {
        return python;
      }
      static get MoreFields() {
        if (!runtime.ext_0znzwMoreFields) return false;
        if (!ArgumentType.INLINETEXTAREA) return false;
        if (!runtime.ext_0znzwMoreFields.constructor.customFieldTypes) return false;
        return true;
      }
      static get customFieldTypes() {
        return (extension.MoreFields ? runtime.ext_0znzwMoreFields.constructor.customFieldTypes : {});
      }
      constructor() {
        this.DEBUG = true;
        this.DO_INIT = true;
        // Some things may require util
        this.preservedUtil = null;
        //this.setupClasses();
      }
    getInfo() {
      const MoreFields = extension.MoreFields;
      return {
        id: 'DragonianPython',
        name: 'Python',
        menuIconURI,
        color1: '#4584B6',
        color2: '#2B5F89',
        color3: '#FFD43B',
        blocks: [
          {
            opcode: 'VMState',
            // @ts-ignore
            blockType: BlockType.BOOLEAN,
            text: 'is python on?'
          },
          {
              opcode: 'toggleInit',
              blockType: BlockType.COMMAND,
              text: 'enable scratch commands for python? [INIT]',
              arguments: {
                INIT: {
                  type: ArgumentType.BOOLEAN,
                },
              },
          },
          {
              opcode: 'pythonVMdo',
              blockType: BlockType.COMMAND,
              text: '[ACTION] python vm',
              arguments: {
                ACTION: {
                  type: ArgumentType.STRING,
                  menu: `pythonVMdo`,
                  defaultValue: `stop`,
                },
              },
            },
            {
              opcode: 'no_op_0',
              blockType: BlockType.COMMAND,
              text: 'run python [CODE]',
              arguments: {
                CODE: {
                  type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING,
                  defaultValue: ``,
                },
              },
              func: 'runPython',
              outputShape: 3,
            },
                        {
              opcode: 'no_op_1',
              blockType: BlockType.REPORTER,
              text: 'run python [CODE]',
              arguments: {
                CODE: {
                  type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING,
                  defaultValue: `'#data.set("variable", "value", None)\ndata.set("my variable", "Success!", False)\nreturn data.get("my variable")'`,
                },
              },
              func: 'evalPython',
              outputShape: 3,
            },
              {
                opcode: 'no_op_4',
                blockType: BlockType.REPORTER,
                text: 'variable [VAR]',
                // @ts-ignore
                outputShape: Scratch.extensions.isPenguinmod ? 5 : 3,
                // @ts-ignore
                blockShape: Scratch.extensions.isPenguinmod ? 5 : 3,
                arguments: {
                  VAR: {
                    type: ArgumentType.STRING,
                  },
                },
                allowDropAnywhere: true,
                func: 'getVar',
              },
              '---',
              //here
              {
                opcode: 'linkedFunctionCallback',
                blockType: BlockType.EVENT,
                text: 'on pfunc()',
                isEdgeActivated: false,
                shouldRestartExistingThreads: true
              },
              {
                opcode: 'linkedFunctionCallbackReturn',
                blockType: BlockType.COMMAND,
                text: 'return [DATA]',
                isTerminal: true,
              },
              {
                opcode: 'no_op_5',
                blockType: BlockType.REPORTER,
                text: '[TYPE] arguments',
                arguments: {
                  TYPE: {
                    type: ArgumentType.STRING,
                    defaultValue: "pure",
                    menu: "argreptypes",
                  },
                },
                allowDropAnywhere: true,
                disableMonitor: true,
                func: 'getpfuncArgs',
              },
              {
                opcode: 'no_op_6',
                blockType: BlockType.REPORTER,
                text: 'argument [NUM]',
                arguments: {
                  NUM: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
                allowDropAnywhere: true,
                disableMonitor: true,
                func: 'getpfuncArgsnum',
              },
              '---',
              {
                opcode: 'onError',
                blockType: BlockType.EVENT,
                text: 'on error',
                isEdgeActivated: false,
                shouldRestartExistingThreads: true
              },
              {
                opcode: 'lastError',
                blockType: BlockType.REPORTER,
                text: 'last error message',
                allowDropAnywhere: true,
              },
        ],
          menus: {
            pythonVMdo: { acceptReporters: true, items: ["stop", "start", "reset"] },
            argreptypes: { acceptReporters: true, items: ["pure", "stringified"] }
          },
      };
    }
    VMState() {
      return pyOn;
    }

    async pythonVMdo(args) {
      switch (args.INIT) {
        case "on": {
          if (pyOn) {
            python.exec(`print("Python VM is already running")`);
          } else {
            // @ts-ignore
            //await resetPython();
            python = new pypyjs();
            await python.ready();
            pyOn = true;
          };
          break
        }
        case "off": {
          python = ""
          pyOn = false
          break
        }
        case "reset": {
          python = ""
          pyOn = false
          // @ts-ignore
          //await resetPython();
          python = new pypyjs();
          await python.ready();
          pyOn = true
          break
        }
        default: {
          break
        }
    }
  }
    // @ts-ignore
    async runPython({CODE}) {
      if (pyOn) {
        // @ts-ignore
        return python.exec(CODE);
      } else {
        throw new Error("Python VM is not running");
      }
    }
    // @ts-ignore
    async evalPython({CODE}) {
      if (pyOn) {
        // @ts-ignore
        return python.eval(CODE);
      } else {
        throw new Error("Python VM is not running");
      }
    }

      // @ts-ignore
      toggleInit({INIT}) {
        this.DO_INIT = Cast.toBoolean(INIT);
      }
      // @ts-ignore
      no_op_0() {}
      // @ts-ignore
      no_op_1() {}
      // @ts-ignore
      no_op_2() {}
      // @ts-ignore
      no_op_3() {}
      // @ts-ignore
      no_op_4() {}
      // @ts-ignore
      no_op_5() {}
      // @ts-ignore
      no_op_6() {}

  }
  // @ts-ignore
  Scratch.extensions.register(new extension());
// @ts-ignore DON'T CARE!
})(Scratch);
