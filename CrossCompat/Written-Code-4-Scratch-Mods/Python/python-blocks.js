// @ts-no-check

/**!
 * DragoPython
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * @comment Main development by Drago Cuven
 * @comment With help from.. alot of people (check the code)
 * Do not remove this comment
 */
// @ts-ignore
(async function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('"Dragonian Python" must be ran unsandboxed.');
  }

  const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTEuMTYxMzUiIGhlaWdodD0iMTEyLjM4OSIgdmlld0JveD0iMCwwLDExMS4xNjEzNSwxMTIuMzg5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjE4NC40MTkzMiIgeTE9IjEyMy44MDU1IiB4Mj0iMjQ1Ljc0NTQ3IiB5Mj0iMTc3LjA3NzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWE5ZmQ0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzA2OTk4Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjI1NC4zNTAwMiIgeTE9IjIyMS4zNTM1NCIgeDI9IjIzMi40NTA0OCIgeTI9IjE5MC4wNzAzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0yIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmQ0M2IiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmU4NzMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg0LjQxOTMyLC0xMjMuODA1NSkiPjxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjUzLjMwNjg2LDEyNC45MDAxN2M3LjI3NjI3LDEuMjEyNzIgMTMuNDA2MjUsNi42NzExNiAxMy40MDYyNSwxMy45Mzc1djI1LjUzMTI1YzAsNy40ODY4NCAtNS45NTEzLDEzLjYyNSAtMTMuNDA2MjUsMTMuNjI1aC0yNi43ODEyNWMtOS4wOTI4NiwwIC0xNi43NSw3LjgwNjM1IC0xNi43NSwxNi42NTYyNXYxMi4yNWgtOS4yMTg3NWMtNy43OTI0NiwwIC0xMi4zNDQwNywtNS42NTU5IC0xNC4yNSwtMTMuNTkzNzVjLTIuNTcxMDIsLTEwLjY2Mzk4IC0yLjQ2MTgyLC0xNy4wMzcwMyAwLC0yNy4yNWMyLjEzNDI0LC04LjkxMDAzIDguOTU3NTQsLTEzLjU5Mzc1IDE2Ljc1LC0xMy41OTM3NWgxMC4wNjI1aDI2LjgxMjV2LTMuNDA2MjVoLTI2LjgxMjV2LTEwLjIxODc1YzAsLTcuNzM3NCAyLjA2MDAzLC0xMS45MzMgMTMuNDA2MjUsLTEzLjkzNzVjMy44NTE1NiwtMC42ODE1MyA4LjIyODg1LC0xLjA3MjQ1IDEyLjgxMjUsLTEuMDkzNzVjNC41ODM2NSwtMC4wMjEzIDkuMzYyNzYsMC4zMjcwMiAxMy45Njg3NSwxLjA5Mzc1ek0yMTkuODA2ODYsMTM3LjE1MDE3YzAsMi44MTYzMyAyLjI1MTc3LDUuMDkzNzUgNS4wMzEyNSw1LjA5Mzc1YzIuNzY5NTUsMCA1LjAzMTI1LC0yLjI3NzQxIDUuMDMxMjUsLTUuMDkzNzVjMCwtMi44MjYzNSAtMi4yNjE3LC01LjEyNSAtNS4wMzEyNSwtNS4xMjVjLTIuNzc5NDgsMCAtNS4wMzEyNSwyLjI5ODY1IC01LjAzMTI1LDUuMTI1eiIgZmlsbD0idXJsKCNjb2xvci0xKSIvPjxwYXRoIGQ9Ik0yODAuMTE5MzYsMTUyLjQ2MjY3YzcuODAyMzcsMCAxMS40ODA0Niw1LjgzNjMxIDEzLjQwNjI0LDEzLjU5Mzc1YzIuNjgwMjIsMTAuNzc0MjIgMi43OTkzMywxOC44NTExMSAwLDI3LjI1Yy0yLjcwOTk5LDguMTU4MzQgLTUuNjEzNzgsMTMuNTkzNzUgLTEzLjQwNjI0LDEzLjU5Mzc1aC0xMy40MDYyNWgtMjYuNzgxMjV2My40MDYyNWgyNi43ODEyNXYxMC4yMTg3NWMwLDcuNzM3MzkgLTYuNjU2MDksMTEuNjcwNjEgLTEzLjQwNjI1LDEzLjYyNWMtMTAuMTU1MDEsMi45NDY2MyAtMTguMjkzOTIsMi40OTU2MSAtMjYuNzgxMjUsMGMtNy4wODc2NiwtMi4wODQ2OCAtMTMuNDA2MjUsLTYuMzU4NjYgLTEzLjQwNjI1LC0xMy42MjV2LTI1LjUzMTI1YzAsLTcuMzQ2NTIgNi4wNzA0MiwtMTMuNjI1IDEzLjQwNjI1LC0xMy42MjVoMjYuNzgxMjVjOC45MjQxMSwwIDE2Ljc1LC03Ljc2OTI1IDE2Ljc1LC0xN3YtMTEuOTA2MjV6TTI0OS45NjMxMSwyMjIuMjEyNjZjMCwyLjgyNjM1IDIuMjYxNyw1LjEyNSA1LjAzMTI1LDUuMTI1YzIuNzc5NDgsMCA1LjAzMTI1LC0yLjI5ODY1IDUuMDMxMjUsLTUuMTI1YzAsLTIuODE2MzMgLTIuMjUxNzcsLTUuMDkzNzQgLTUuMDMxMjUsLTUuMDkzNzVjLTIuNzY5NTUsMCAtNS4wMzEyNSwyLjI3NzQyIC01LjAzMTI1LDUuMDkzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NTUuNTgwNjc2OTYyOTY2Mzg6NTYuMTk0NTAxMTE0NTE3MjEtLT4=";

  const extId = 'DragoPython';
  const {Cast, BlockType, ArgumentType, vm} = Scratch;
  const {runtime} = vm;
  const Thread = (
    // PenguinMod
    vm.exports.Thread ??
    // TurboWarp and forks
    vm.exports.i_will_not_ask_for_help_when_these_break().Thread
  );
  const soundCategory = runtime.ext_scratch3_sound;

  function reloadBlocks(){Scratch.vm.extensionManager.refreshBlocks()}

  // Currently this can be used on TurboWarp via staging.
  // https://staging.turbowarp.org/
  if (!Scratch.BlockShape) throw new Error(`VM is outdated! please see TurboWarp/scratch-vm#210`);

  // @todo Find a way to embed this so it works offline
  //       and prevent global leakage
  // just use the dataurl when the extension is finished
  // @ts-ignore I know it exists so shut it TS
  
  await import('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js');
  let python = await loadPyodide();
  let canRunPY = true; // <- this should probably be false initially, but then people will complain about it not working
  let allowMainScript = ((runtime.extensionStorage[extId] ??= {}).allowMainScript ??= false);
  let pythonMainScript = ((runtime.extensionStorage[extId] ??= {}).pythonMainScript ||= '');
  let runMainScriptWhen = ((runtime.extensionStorage[extId] ??= {}).runMainScriptWhen ||= 'never');
  let initWCSCMDS = true; // initialize scratch commands for the written programming language. (stands for Written Code Scratch Commands)
  const pythonError = {
  cur:  { msg: '', line: 0, linemsg: '' },
  last: { msg: '', line: 0, linemsg: '' }
};

const pythonMainError = {
  cur:  { msg: '', line: 0, linemsg: '' },
  last: { msg: '', line: 0, linemsg: '' }
};

  // @ts-ignore
  const sbfuncArgs = Symbol('sbfuncArgs');
  const sbfuncwatcher = Symbol('sbfuncwatcher');
  const sbfuncstatus = Symbol('sbfuncstatus');

  // Utility functions
  const formatRes = (res) => {
    if (res === '') return '[empty String]';
    if (res === true) return '[boolean True]';
    if (res === false) return '[boolean False]';
    if (res === null) return '[empty Null]';
    if (res === undefined) return '[empty Undefined]';
    if (typeof res === 'object') {
      if (Array.isArray(res)) return '[object Array]';
      return '[object Object]';
    }
    if (typeof res === 'function') return '[object Function]';
    if (typeof res === 'number') return `[number ${res}]`;
    return `[string|empty <\n${res}\n>]`;
  };
  const _getVarObjectFromName = (name, util, type) => {
    const stageTarget = runtime.getTargetForStage();
    const target = util.target;
    let listObject = Object.create(null);

    listObject = stageTarget.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
    listObject = target.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
  };

  function _parseJSON(obj) {
    if (Array.isArray(obj)) return {};
    if (typeof obj === 'object') return obj;
    try {
      obj = JSON.parse(obj);
      if (Array.isArray(obj)) return {};
      if (typeof obj === 'object') return obj;
      return {};
    } catch {
      return {};
    }
  }

  // Resetting the python runtime
  // @ts-ignore
  let reloadOnStart = true; // <- this is a variable to make sure the python engine is reset on flag click
  async function resetPython() {
    python = await loadPyodide();
    initWCSCMDS = true;
  }



  const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = cbfsb(blockInfo, categoryInfo);
    if (blockInfo.outputShape) {
      res.json.outputShape = blockInfo.outputShape;
    }
    return res;
  };

  // Actual extension code
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
      return extension.MoreFields ? runtime.ext_0znzwMoreFields.constructor.customFieldTypes : {};
    }
    constructor() {
      this.DEBUG = true;
      this._curErrorMsg = '';
      this._lastErrorMsg = '';
      this._curErrorLine = 0;
      this._lastErrorLine = 0;
      this._curMainErrorMsg = '';
      this._lastMainErrorMsg = '';
      this._curMainErrorLine = 0;
      this._lastMainErrorLine = 0;
      //Some things may require util
      this.preservedUtil = null;
      this.setupClasses();
    }
    getInfo() {
      const MoreFields = extension.MoreFields;
      return {
        id: extId,
        name: 'Python',
        color1: '#4584b6',
        color2: '#ffde57',
        color3: '#646464', 
        menuIconURI,
        blocks: [
          "---",
          {opcode: 'VMState', func: 'isPYenabled', blockType: BlockType.BOOLEAN, text: 'is python on?'},
          {opcode: 'toggleInit', func: 'setScratchCommandsEnabled', blockType: BlockType.COMMAND, text: 'enable scratch commands for python? [INIT]', arguments: {INIT: {type: ArgumentType.STRING, menu: 'boolean', defaultValue: 'true'}}},
          {opcode: 'pythonVMdo', blockType: BlockType.COMMAND, text: '[ACTION] python vm', arguments: {ACTION: {type: ArgumentType.STRING, menu: `pythonVMdo`, defaultValue: `stop`}}, func: 'pythonVMdo'},
          '---',
          {blockType: BlockType.LABEL, text: 'Python Code'},
          "---",
          {blockType: BlockType.BUTTON, func: 'mainScriptToggle', text: allowMainScript ? "Disable Main Script": 'Enable Main Script', hideFromPalette: false},
          {opcode: 'runMainScriptOn', blockType: BlockType.COMMAND, text: 'run main script [RMSW]', arguments: {RMSW: {type: ArgumentType.STRING, defaultValue: 'never', menu: 'RMSW'}}, func: 'runMainScriptOn', hideFromPalette: !allowMainScript},
          {opcode: 'setMainScript', blockType: BlockType.COMMAND, text: 'set main script to [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: 'print "hello world"'}}, func: 'setMainScript', hideFromPalette: !allowMainScript},
          {opcode: 'getMainScript', blockType: BlockType.REPORTER, text: 'main script', func: 'getMainScript', outputShape: 3, hideFromPalette: !allowMainScript},
          {opcode: 'no_op_0', blockType: BlockType.COMMAND, text: 'run python [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `data.setVar("my variable", "Running in Python")`}}, func: 'runPython', filter: [Scratch.TargetType.SPRITE]},
          {opcode: 'no_op_1', blockType: BlockType.REPORTER, text: 'run python [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `data.setVar("my variable", "Running in Python")`}}, func: 'runPython', outputShape: 3, filter: [Scratch.TargetType.SPRITE]},
          "---",
          {opcode: 'no_op_4', blockType: Scratch.BlockType.REPORTER, text: 'variable [VAR]', outputShape: Scratch.extensions.isPenguinmod ? 5 : 3, blockShape: Scratch.extensions.isPenguinmod ? 5 : 3, arguments: {VAR: {type: ArgumentType.STRING}}, allowDropAnywhere: true, func: 'getVar'},
          '---',
          {blockType: BlockType.LABEL, text: 'Bridging'},
          "---",
          {opcode: 'linkedFunctionCallback', blockType: BlockType.EVENT, text: 'when sbfunc() is called', isEdgeActivated: false, shouldRestartExistingThreads: true},
          {opcode: 'linkedFunctionCallbackReturn', blockType: BlockType.COMMAND, text: 'return [DATA]', arguments: {DATA: {type: ArgumentType.STRING}}, isTerminal: true},
          {opcode: 'no_op_5', blockType: Scratch.BlockType.REPORTER, text: '[TYPE] arguments', arguments: {TYPE: {type: ArgumentType.STRING, defaultValue: 'clean', menu: 'argreptypes'}}, allowDropAnywhere: true, disableMonitor: true, outputShape: 3, func: 'getsbfuncArgs'},
          {opcode: 'no_op_6', blockType: Scratch.BlockType.REPORTER, text: 'argument [NUM]', arguments: {NUM: {type: ArgumentType.NUMBER, defaultValue: 1}}, allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgsnum'},
          {opcode: 'no_op_7', blockType: Scratch.BlockType.REPORTER, text: 'argument count', allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgscnt'},
           '---',
          {blockType: BlockType.LABEL, text: 'Python Errors'},
          "---",
          {opcode: 'onError', blockType: BlockType.EVENT, text: 'when catching an error', isEdgeActivated: false, shouldRestartExistingThreads: true,},
          {opcode: 'curError', blockType: Scratch.BlockType.REPORTER, text: 'current error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true},
          {opcode: 'lastError', blockType: Scratch.BlockType.REPORTER, text: 'last error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true},
          {opcode: 'clearLastErrorMsg', blockType: Scratch.BlockType.COMMAND, text: 'clear last error message'},
          {opcode: 'onMainError', blockType: BlockType.EVENT, text: 'when main script errors', isEdgeActivated: false, shouldRestartExistingThreads: true, hideFromPalette: !allowMainScript},
          {opcode: 'curMainError', blockType: Scratch.BlockType.REPORTER, text: 'current main script error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true, hideFromPalette: !allowMainScript},
          {opcode: 'lastMainError', blockType: Scratch.BlockType.REPORTER, text: 'last main script error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true, hideFromPalette: !allowMainScript},
          {opcode: 'clearLastMainErrorMsg', blockType: Scratch.BlockType.COMMAND, text: 'clear last main script error message', hideFromPalette: !allowMainScript}
        ],
        menus: {pythonVMdo: {acceptReporters: true, items: ['stop', 'start', 'reset']}, argreptypes: {acceptReporters: true, items: ['clean', 'joined', 'raw']}, RMSW: {acceptReporters: true, items: ['never', 'on start', 'always']}, boolean: {acceptReporters: true, items: ['true', 'false']}, errtypes: {acceptReporters: true, items: ['message', 'line', 'codeline']}},
        customFieldTypes: extension.customFieldTypes,
      };
    }

    // no-op functions ignore these and leave them blank
    isPYenabled() {
      return canRunPY;
    }
    no_op_0() {}
    no_op_1() {}
    no_op_2() {}
    no_op_3() {}
    no_op_4() {}
    no_op_5() {}
    no_op_6() {}
    no_op_7() {}
    onError() {}
    onMainError() {}

    lastError     = (args) => { switch(args?.TYPE){ case 'line':     return pythonError.last.line; case 'codeline': return pythonError.last.linemsg; } return pythonError.last.msg; };
    
    curError      = (args) => { switch(args?.TYPE){ case 'line':     return pythonError.cur.line;  case 'codeline': return pythonError.cur.linemsg; } return pythonError.cur.msg; };

    lastMainError = (args) => { switch(args?.TYPE){ case 'line':     return pythonMainError.last.line; case 'codeline': return pythonMainError.last.linemsg; } return pythonMainError.last.msg; };
    
    curMainError  = (args) => { switch(args?.TYPE){ case 'line':     return pythonMainError.cur.line;  case 'codeline': return pythonMainError.cur.linemsg; } return pythonMainError.cur.msg; };




    _extensions() {
      // @ts-ignore
      const arr = Array.from(vm.extensionManager._loadedExtensions.keys());
      if (typeof arr[0] !== 'string') arr.push('');
      return arr;
    }
    runBlock({EXT, OPCODE, ARGS}, util, blockJSON) {
      /* @author https://github.com/TheShovel/ */
      /* @author https://scratch.mit.edu/users/0znzw/ */
      /* @link https://github.com/PenguinMod/PenguinMod-ExtensionsGallery/blob/main/static/extensions/TheShovel/extexp.js */
      // (and the subsequent custom functions ^)
      if (((EXT = Cast.toString(EXT)), (!this._extensions().includes(EXT) || EXT === '') && !runtime[`ext_${EXT}`])) return '';
      const fn = runtime._primitives[`${EXT}_${Cast.toString(OPCODE)}`] || runtime[`ext_${EXT}`]?.[Cast.toString(OPCODE)];
      if (!fn) return '';
      // blockJSON is not "as" important as util
      // util is usually required for a block to even run
      // expect a lot of errors if it is missing
      const res = fn(_parseJSON(ARGS), this._util(util), blockJSON || {});
      if (this.DEBUG) console.trace(`runBlock_JS | Ran ${EXT}_${OPCODE} and got:\n`, formatRes(res));
      return res;
    }

    getVar(args) {
      const v = python.globals.get(Cast.toString(args.VAR));
      return (v === null) ? '' : v;
    }

    mainScriptToggle() { (allowMainScript = !(allowMainScript), runtime.extensionStorage[extId].allowMainScript = allowMainScript, Scratch.vm.extensionManager.refreshBlocks()); }
    setMainScript({ CODE }) { (runtime.extensionStorage[extId] ??= {}).pythonMainScript = pythonMainScript = Cast.toString(CODE); }
    getMainScript(){return Cast.toString(pythonMainScript);}
    runMainScriptOn(args){(runMainScriptWhen = args.RMSW, runtime.extensionStorage[extId].runMainScriptWhen = runMainScriptWhen)}

    linkedFunctionCallback(){}
    
    linkedFunctionCallbackReturn(args, { thread }) {
      // Make sure to do this first otherwise the default return value may be returned.
      // this fixes an edge case where there is only 1 thread.      
      // Don't cast the return value as we don't know what it can be :3
      if (thread[sbfuncwatcher]) thread[sbfuncwatcher](args.DATA);
      thread.stopThisScript(); //never defined. is this a natural scratch api function or something?
      thread.status = Thread.STATUS_DONE; // likely has something to do with this. u sure this is right?
    }

    _util(util) {
      return this.preservedUtil || util;
    }
    _constructFakeUtil(realUtil) {
      return this._util(realUtil) || {target: vm.editingTarget, thread: runtime.threads[0], stackFrame: {}};
    }

    async pythonVMdo(args) {
      switch (args.ACTION) {
        case 'stop':
          python = null;
          canRunPY = false;
          break;
        case 'start':
          if (!canRunPY) {
            await resetPython();
            canRunPY = true;
          }
          break;
        default:
          canRunPY = false;
          await resetPython();
          canRunPY = true;
          break;
      }
    }

getsbfuncArgs(args, { thread }) {
  if (!thread[sbfuncArgs]) return '[]';

  const argArray = thread[sbfuncArgs];
  const type = Cast.toString(args.TYPE);

  if (type === 'raw') {
    return JSON.stringify(argArray);
  }

  if (type === 'joined') {
    return argArray.map(item => Cast.toString(item)).join(', ');
  }

    const stringifiedItems = argArray.map(item => Cast.toString(item));
    return JSON.stringify(stringifiedItems);
}



    getsbfuncArgsnum(args, { thread }) {
      if (!thread[sbfuncArgs]) return '';
      return thread[sbfuncArgs][Cast.toNumber(args.NUM) - 1] ?? ''; //first is 1 not 0
    }
    getsbfuncArgscnt(args, { thread }) {
      const argsList = thread[sbfuncArgs];
      if (!Array.isArray(argsList)) return 0;
      return argsList.length;
    }
    clearLastErrorMsg() {
      pythonError.last.msg     = '';
      pythonError.last.line    = 0;
      pythonError.last.linemsg = '';
    }

    clearLastMainErrorMsg() {
      pythonMainError.last.msg     = '';
      pythonMainError.last.line    = 0;
      pythonMainError.last.linemsg = '';
    }




    setupClasses() {
      const MathUtil = {PI: Math.PI, E: Math.E, degToRad: (deg) => deg * (Math.PI / 180), radToDeg: (rad) => rad * (180 / Math.PI)};
      this.MathUtil = MathUtil;
      this.Functions = {
        // Motion functions
        motion_moveSteps: (util, steps) => runtime.ext_scratch3_motion._moveSteps.call(runtime.ext_scratch3_motion, Cast.toNumber(steps), util.target),
        motion_turn: (util, deg) => util.target.setDirection(util.target.direction + Cast.toNumber(deg)),
        motion_goTo: (util, x, y) => util.target.setXY(Cast.toNumber(x), Cast.toNumber(y)),
        motion_changePos: (util, dx, dy) => util.target.setXY(util.target.x + Cast.toNumber(dx), util.target.y + Cast.toNumber(dy)),
        motion_setX: (util, x) => util.target.setXY(Cast.toNumber(x), util.target.y),
        motion_setY: (util, y) => util.target.setXY(util.target.x, Cast.toNumber(y)),
        motion_changeX: (util, dx) => util.target.setXY(util.target.x + Cast.toNumber(dx), util.target.y),
        motion_changeY: (util, dy) => util.target.setXY(util.target.x, util.target.y + Cast.toNumber(dy)),
        motion_pointInDir: (util, deg) => (util.target.direction = Cast.toNumber(deg)),
        motion_setRotationStyle: (util, style) => util.target.setRotationStyle(Cast.toString(style)),
        motion_ifOnEdgeBounce: (util) => runtime.ext_scratch3_motion._ifOnEdgeBounce.call(runtime.ext_scratch3_motion, util.target),

        // Looks
        looks_say: (util, msg, secs) => secs != null ? runtime.ext_scratch3_looks.sayforsecs.call(runtime.ext_scratch3_looks, { MESSAGE: Cast.toString(msg), SECS: Cast.toNumber(secs) }, util) : runtime.ext_scratch3_looks._say.call(runtime.ext_scratch3_looks, Cast.toString(msg), util.target),
        looks_sayForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.sayforsecs.call(runtime.ext_scratch3_looks, {MESSAGE: msg, SECS: secs}, util),
        looks_think: (util, msg, secs) => secs != null ? runtime.ext_scratch3_looks.thinkforsecs.call(runtime.ext_scratch3_looks, { MESSAGE: Cast.toString(msg), SECS: Cast.toNumber(secs) }, util) : runtime.emit(runtime.ext_scratch3_looks.SAY_OR_THINK, util.target, 'think', Cast.toString(msg)),
        looks_thinkForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.thinkforsecs.call(runtime.ext_scratch3_looks, {MESSAGE: msg, SECS: secs}, util),
        looks_show: (util) => runtime.ext_scratch3_looks.show.call(runtime.ext_scratch3_looks, null, util),
        looks_hide: (util) => runtime.ext_scratch3_looks.hide.call(runtime.ext_scratch3_looks, null, util),
        looks_getCostume: (util) => util.target.getCostume().name,
        looks_setCostume: (util, costume) => util.target.setCostume(costume),
        looks_nextCostume: (util) => util.target.setCostume(util.target.currentCostume + 1),
        looks_lastCostume: (util) => util.target.setCostume(util.target.currentCostume - 1),
        looks_getSize: (util) => util.target.size,
        looks_setSize: (util, size) => util.target.setSize(Cast.toNumber(size)),
        looks_changeSize: (util, size) => util.target.setSize(util.target.size + Cast.toNumber(size)),
        looks_setEffect: (util, effect, value) => util.target.effects.set(Cast.toString(effect), Cast.toNumber(value)),
        looks_changeEffect: (util, effect, value) => {
          const current = util.target.effects.get(Cast.toString(effect)) || 0;
          util.target.effects.set(Cast.toString(effect), current + Cast.toNumber(value));
        },
        looks_effectClear: (util) => util.target.effects.clear(),

        //Events
        events_broadcast: (util, msg) => util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: msg}),
        events_broadcastandwait: (util, msg) => runtime.ext_scratch3_events.broadcastAndWait({BROADCAST_OPTION: msg}, util),

        // Control
        // @ts-ignore
        control_wait: (_, seconds) => new Promise((resolve) => setTimeout(resolve, Cast.toNumber(seconds) * 1000)),
        control_clone: (util) => runtime.ext_scratch3_control.createClone(util),
        control_deleteClone: (util) => util.target.removeClone(),

        //Sensing
        // @ts-ignore
        sensing_loudness: () => runtime.ioDevices.audio.getLoudness(),
        sensing_loud: () => runtime.ioDevices.audio.getLoudness() > 10,
        sensing_mouseX: () => runtime.ioDevices.mouse._scratchX,
        sensing_mouseY: () => runtime.ioDevices.mouse._scratchY,
        // @ts-ignore
        sensing_mouseDown: (util) => runtime.ioDevices.mouse,
        // @ts-ignore

        sensing_timer: () => runtime.ioDevices.clock.projectTimer(),
        sensing_resettimer: () => runtime.ioDevices.clock.resetProjectTimer(),
        sensing_username: () => runtime.ioDevices.userData.getUsername() || '',
        sensing_current: (util, type) => runtime.ext_scratch3_sensing._getCurrent(Cast.toString(type)),
        sensing_dayssince2000: () => {
          const msPerDay = 1000 * 60 * 60 * 24;
          return (Date.now() - new Date('2000-01-01').getTime()) / msPerDay;
        },
        sensing_distanceto: (util, spriteName) => {
          const target = runtime.getTargetForName(spriteName);
          if (!target) return 0;
          const dx = target.x - util.target.x;
          const dy = target.y - util.target.y;
          return Math.sqrt(dx * dx + dy * dy);
        },
        sensing_colorIsTouchingColor: (util, color1, color2) =>
          runtime.renderer.colorTouchingColor(util.target.drawableID, color1, color2),
        sensing_touchingcolor: (util, color) =>
          runtime.renderer.touchingColor(util.target.drawableID, color),
        sensing_touchingobject: (util, sprite) =>
          runtime.ext_scratch3_sensing._isTouchingObject({TOUCHINGOBJECTMENU: sprite}, util),
        sensing_keypressed: (util, key) =>
          runtime.ioDevices.keyboard.isKeyPressed(key),
        sensing_ask: (util, msg) => runtime.ext_scratch3_sensing.askAndWait({QUESTION: msg}, util),
        sensing_answer: () => runtime.ioDevices.promptProvider.getLastAnswer(),

    // Data – variable support
    /*
    data_setvar: (util, name, val) => {
      const key = Cast.toString(name);
      if (util.target.variables[key]) {
        util.target.variables[key].value = val;
      }
    },
    data_getvar: (util, name) => {
      const key = Cast.toString(name);
      return util.target.variables[key]?.value;
    },
    */

    data_setvar: (util, name, val) => (_getVarObjectFromName(Cast.toString(name), util, false).value = val),
    data_getvar: (util, name) => _getVarObjectFromName(Cast.toString(name), false).value,
    data_changevar: (util, name, val) => (_getVarObjectFromName(Cast.toString(name), util, false).value = Cast.toNumber(_getVarObjectFromName(Cast.toString(name), util, false).value + Cast.toNumber(val))),
    data_makevar: (util, name) => runtime.emit('VARIABLE_CREATE', Cast.toString(name), 'global', false),
    data_deletevar: (util, name) => runtime.emit('VARIABLE_DELETE', Cast.toString(name), 'global'),
    data_showvar: (util, name) => runtime.emit('MONITORS_SHOW', { id: Cast.toString(name) }),
    data_hidevar: (util, name) => runtime.emit('MONITORS_HIDE', { id: Cast.toString(name) }),

    // Data – list support
    data_setlist: (util, name, list) => (_getVarObjectFromName(Cast.toString(name), util, true).value = list),
    data_getlist: (util, name) => _getVarObjectFromName(Cast.toString(name), true).value,
    data_addtolist: (util, name, value) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) list.value.push(value);
    },
    data_removefromlist: (util, name, pos) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) {
        const index = Cast.toNumber(pos) - 1;
        if (index >= 0 && index < list.value.length) list.value.splice(index, 1);
      }
    },
    data_clearlist: (util, name) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) list.value.length = 0;
    },
    data_replacelistitem: (util, name, val, pos) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) {
        const index = Cast.toNumber(pos) - 1;
        if (index >= 0 && index < list.value.length) list.value[index] = val;
      }
    },
    data_listitem: (util, name, pos) => {
      const list = util.target.lists[Cast.toString(name)];
      const index = Cast.toNumber(pos) - 1;
      return Cast.toString(list?.value[index]);
    },
    data_listitemnum: (util, name, item) => {
      const list = util.target.lists[Cast.toString(name)];
      return list ? list.value.indexOf(item) + 1 : 0;
    },
    data_makelist: (util, name) => runtime.emit('LIST_CREATE', Cast.toString(name), 'global', false),
    data_deletelist: (util, name) => runtime.emit('LIST_DELETE', Cast.toString(name), 'global'),
    data_getvars: (util) => Cast.toString(Object.values(util.target.variables)),
    data_getlists: (util) => Cast.toString(Object.values(util.target.lists)),
    data_listlength: (util, name) => {
      const list = util.target.lists[Cast.toString(name)];
      return list ? list.value.length : 0;
    }
  };
}


    initPythonCommands(util) {
      // Register all the commands for python.
      util = this._constructFakeUtil(util);
      const ref =
        (fn, fnn) =>
        (...args) =>
          // @ts-ignore I know it "could" be undefined but it wont be
          this.Functions[fn || fnn](util, ...args);
      const bindHere = (fn) => fn.bind(this);

      // Setting  sbfunc
      python.globals.set('sbfunc', async (...args) => {
        const returns = [];
        let alive = 0;
        const bindAlive = thread => {
          ++alive;
          const status_getter = thread.__lookupGetter__('status');
          const status_setter = thread.__lookupSetter__('status');
          thread.__defineGetter__('status', (...args) => {
            if (status_getter) status_getter(...args);
            return thread[sbfuncstatus];
          });
          thread.__defineSetter__('status', (...args) => {
            if (
              thread[sbfuncstatus] !== args[0] &&
              args[0] === Thread.STATUS_DONE &&
              !--alive
            ) {
              thread[sbfuncwatcher]('');
              for (const thread of threads) {
                if (thread.status == Thread.STATUS_DONE) continue;
                thread.stopThisScript();
                thread.status = Thread.STATUS_DONE;
              }
            }
            thread[sbfuncstatus] = args[0]
            if (status_setter) return status_setter(...args);
            return args[0];
          });
        };
        const threads = util.startHats(`${extId}_linkedFunctionCallback`);
        for (const thread of threads) {
          thread.status = Thread.STATUS_PROMISE_WAIT;
          bindAlive(thread);
          // Don't let the thread run till we can resolve.
          thread[sbfuncArgs] = args;
          returns.push(new Promise(resolve => {
            // Allow the thread to run.
            thread[sbfuncwatcher] = (value) => resolve(value);
            thread.status = Thread.STATUS_RUNNING;
          }));
        }
        // We only care about one return value,
        // the rest are useless. (for now)
        const res = await Promise.any(returns);
        // kill any extra threads
        for (const thread of threads) {
          if (thread.status == Thread.STATUS_DONE) continue;
          thread.stopThisScript();
          thread.status = Thread.STATUS_DONE;
        }
        return res;
      });
      // Setting up the target // idk lmao
      python.globals.set('sprite', {switch: (name) => runtime.setEditingTarget(runtime.getSpriteTargetByName(Cast.toString(name)) || runtime.getTargetForStage()), x: () => util.target.x, y: () => util.target.y, direction: () => util.target.direction, size: () => Math.round(util.target.size), trueSize: () => util.target.size, rotationStyle: () => util.target.rotationStyle, costume: (type) => (Cast.toString(type) === 'name' ? util.target.getCostumes()[util.target.currentCostume].name : util.target.currentCostume + 1)});

      // Custom category: MathUtil
      python.globals.set('MathUtil', this.MathUtil);

      // Category: sounds
      python.globals.set('sounds', {
        play: ref('sounds_play'),
        playSound: ref('sounds_play'),
        stopAll: ref('sounds_stopAll'),
        stop: ref('sounds_stopAll'),
        setVolume: ref('sounds_setVolume'),
        changeVolume: ref('sounds_changeVolume'),
        volume: ref('sounds_volume'),
        getVolume: ref('sounds_volume'),
        effect: ref('sounds_effects'),
        setEffect: ref('sounds_effects')
      });

      // Category: events
      python.globals.set('events', {
        broadcast: ref('events_broadcast'),
        broadcastAndWait: ref('events_broadcastandwait'),
        trigger: ref('events_broadcast'),
        emit: ref('events_broadcast')
      });

      // Category: control
      python.globals.set('control', {
        wait: ref('control_wait'),
        sleep: ref('control_wait'),
        delay: ref('control_wait'),
        clone: ref('control_clone'),
        createClone: ref('control_clone'),
        deleteClone: ref('control_deleteClone'),
        removeClone: ref('control_deleteClone')
      });

      // Category: sensing
      python.globals.set('sensing', {
        loudness: ref('sensing_loudness'),
        loud: ref('sensing_loud'),
        isLoud: ref('sensing_loud'),
        mouseX: ref('sensing_mouseX'),
        mouseY: ref('sensing_mouseY'),
        mouseDown: ref('sensing_mouseDown'),
        timer: ref('sensing_timer'),
        resetTimer: ref('sensing_resettimer'),
        username: ref('sensing_username'),
        current: ref('sensing_current'),
        daysSince2000: ref('sensing_dayssince2000'),
        distanceTo: ref('sensing_distanceto'),
        colorTouching: ref('sensing_colorIsTouchingColor'),
        touchingColor: ref('sensing_touchingcolor'),
        touchingObject: ref('sensing_touchingobject'),
        keyPressed: ref('sensing_keypressed'),
        key: ref('sensing_keypressed'),
        ask: ref('sensing_ask'),
        answer: ref('sensing_answer')
      });

      // Category: data
      python.globals.set('data', {
        setVar: ref('data_setvar'),
        getVar: ref('data_getvar'),
        changeVar: ref('data_changevar'),
        makeVar: ref('data_makevar'),
        createVar: ref('data_makevar'),
        deleteVar: ref('data_deletevar'),
        showVar: ref('data_showvar'),
        hideVar: ref('data_hidevar'),
        makeList: ref('data_makelist'),
        createList: ref('data_makelist'),
        deleteList: ref('data_deletelist'),
        getList: ref('data_getlist'),
        setList: ref('data_setlist'),
        addToList: ref('data_addtolist'),
        push: ref('data_addtolist'),
        append: ref('data_addtolist'),
        remove: ref('data_removefromlist'),
        removeFromList: ref('data_removefromlist'),
        pull: ref('data_removefromlist'),
        clear: ref('data_clearlist'),
        replace: ref('data_replacelistitem'),
        item: ref('data_listitem'),
        getFromList: ref('data_listitem'),
        itemNum: ref('data_listitemnum'),
        length: ref('data_listlength'),
        size: ref('data_listlength'),
        getVars: ref('data_getvars'),
        getLists: ref('data_getlists')
      });

      // Category: motion
      python.globals.set('motion', {move: ref('motion_moveSteps'), moveSteps: ref('motion_moveSteps'), turn: ref('motion_turn'), rotate: ref('motion_turn'), goTo: ref('motion_goTo'), setPos: ref('motion_goTo'), set: ref('motion_goTo'), XY: ref('motion_goTo'), changePos: ref('motion_changePos'), change: ref('motion_changePos'), transform: ref('motion_changePos'), setX: ref('motion_setX'), X: ref('motion_setX'), setY: ref('motion_setY'), Y: ref('motion_setY'), changeX: ref('motion_changeX'), changeY: ref('motion_changeY'), pointInDir: ref('motion_pointInDir'), point: ref('motion_pointInDir'), setRotationStyle: ref('motion_setRotationStyle'), RotStyle: ref('motion_setRotationStyle'), RotationStyle: ref('motion_setRotationStyle'), ifOnEdgeBounce: ref('motion_ifOnEdgeBounce')});

      //Category: Looks
      python.globals.set('looks', {say: ref('looks_say'), sayForSecs: ref('looks_sayForSecs'), speak: ref('looks_say'), think: ref('looks_think'), thinkForSecs: ref('looks_thinkForSecs'), show: ref('looks_show'), hide: ref('looks_hide'), getCostume: ref('looks_getCostume'), setCostume: ref('looks_setCostume'), costume: ref('looks_getCostume'), nextCostume: ref('looks_nextCostume'), lastCostume: ref('looks_lastCostume'), getSize: ref('looks_getSize'), size: ref('looks_getSize'), setSize: ref('looks_setSize'), changeSize: ref('looks_changeSize'), setEffect: ref('looks_setEffect'), changeEffect: ref('looks_changeEffect'), effectClear: ref('looks_effectClear'), clearEffects: ref('looks_effectClear')});

    // helper: strict‐arity, ignores extras, errors on too few/invalid
    function wrapMathFn(fn) {
      const arity = fn.length;
      return (...args) => {
        if (args.length < arity) {
          throw new Error(`Expected at least ${arity} arguments, got ${args.length}`);
        }
        const safe = args.slice(0, arity);
        safe.forEach((v, i) => {
          if (typeof v !== "number" || Number.isNaN(v)) {
            throw new Error(`Argument ${i+1} must be a valid number`);
          }
        });
        return fn(...safe);
      };
    }

      // Custom category: Cast
      python.globals.set('Cast', Cast);


      // Custom category: JS
      python.globals.set('JS', {
        JSON: {
          parse(...args) {
            // @ts-expect-error
            return JSON.parse(...args);
          },
          stringify(...args) {
            // @ts-expect-error
            return JSON.stringify(...args);
          },
        },
        Array: {
          new(length) {
            return new Array(Cast.toNumber(length) || 0);
          },
          from(value) {
            // @ts-ignore
            return Array.from(value);
          },
          fromIndexed(object) {
            if (Array.isArray(object)) return object;
            if (typeof object !== 'object') return [];
            return [];
          },
          toIndexed(array) {
            if (!Array.isArray(array)) return {};
            // @ts-ignore
            return Object.fromEntries(array.map((v, i) => [i, v]));
          },
          isArray(value) {
            return Array.isArray(value);
          },
        },
        Object: {
          create(prototype) {
            return Object.create(prototype || {});
          },
          assign(a, b) {
            // @ts-ignore
            return Object.assign(a, b);
          },
          new() {
            return Object.create(null);
          },
        },
      });
      // Custom functions
      python.globals.set('scratch', {
        fetch(url, opts, ...args) {
          opts = opts || {};
          return Scratch.fetch(Cast.toString(url), opts, ...args);
        },
        preserveUtil: function () {
          // Util may become outdated, use this with causion!
          this.extension.preservedUtil = this.util;
        }.bind({util, extension: this}),
        wipeUtil: bindHere(function () {
          this.preservedUtil = null;
        }),
        primitiveRunBlock: bindHere(this.runBlock),
        runBlock: async (EXT, OPCODE, ARGS) => {
          const res = await this.runBlock(
            {EXT: Cast.toString(EXT), OPCODE: Cast.toString(OPCODE), ARGS: Cast.toString(ARGS)},
            this.preservedUtil || util,
            // we dont have access to the REAL blockJSON
            {},
          );
          if (this.DEBUG) console.trace(`runBlock_PY | Ran ${EXT}_${OPCODE} and got:\n`, formatRes(res));
          return res;
        },
        // This is just a cool novelty to show its possible :D
        _scratchLoader: `data:application/javascript;base64,${btoa(`
              (async function(Scratch) {
                const SafeScratch = {
                  extensions: {
                    unsandboxed: true,
                    register(object) {
                      Scratch.extensions.register(object);
                    }
                  },
                  Cast: Object.assign({}, Object.fromEntries(Object.getOwnPropertyNames(Scratch.Cast).flatMap(v => [
                    'constructor', 'prototype', 'name', 'length'
                  ].includes(v) ? [] : [[
                    v, Scratch.Cast[v]
                  ]]))),
                  BlockType: Object.assign({}, Scratch.BlockType),
                  ArgumentType: Object.assign({}, Scratch.ArgumentType),
                };
                await window._pythonExtensionLoader(Scratch);
              })(Scratch);
          `)}`,
        // @ts-ignore
        async _loadHack(url) {
          const gsm = vm.extensionManager.securityManager.getSandboxMode;
          // @ts-ignore
          vm.extensionManager.securityManager.getSandboxMode = () => Promise.resolve('unsandboxed');
          try {
            await vm.extensionManager.loadExtensionURL(Cast.toString(url));
          } finally {
            vm.extensionManager.securityManager.getSandboxMode = gsm;
            // @ts-ignore
            delete window._pythonExtensionLoader;
          }
        },
        
        _loadObject(object) {
          // @ts-ignore
          window._pythonExtensionLoader = object;
          // A extension to load the PY extension
          return this._loadHack(this._scratchLoader);
        },
      });
    }

    // Some "secret" stuff for python to use :3
    async secret_load({url}) {
      return await vm.extensionManager.loadExtensionURL(Cast.toString(url));
    }
    secret_injectFunction({namespace, args, js}) {
      python.globals.set(Cast.toString(namespace), new Function('python', ...args.split(' '), js).bind(window, python));
    }

    // Running, etc...
    setScratchCommandsEnabled({INIT}) {
      initWCSCMDS = Cast.toBoolean(INIT);
    }

    async runMainScript({ CODE }, util) {
    if (!canRunPY || CODE === '') return '';

    if (initWCSCMDS) {
        this.initPythonCommands(util);
        initWCSCMDS = false;
    }

    let result;
    try {
        result = await python.runPythonAsync(Cast.toString(CODE));
    } catch (err) {
        const msg = err instanceof Error ? err.message : Cast.toString(err);

        // Updated to match Python-style errors
        const match = msg.match(/<string>, line (\d+)/);
        const line = match ? parseInt(match[1], 10) : -1;

        let linemsg = '';
        if (line > 0) {
        const lines = CODE.split(/\r?\n/);
        linemsg = lines[line - 1] || '';
        }

        pythonMainError.cur = { msg, line, linemsg };
        pythonMainError.last = { ...pythonMainError.cur };

        // Removed invalid python.globals.getTop()
        vm.runtime.startHats('DragoPython_onMainError');
        return '';
    }

    // Removed invalid python.globals.getTop()

    if (typeof result === 'function') {
        const msg = `Invalid return: received a function value instead of a result → ${Cast.toString(result)}`;
        pythonMainError.cur = { msg, line: -1, linemsg: '' };
        pythonMainError.last = { ...pythonMainError.cur };
        vm.runtime.startHats('DragoPython_onMainError');
        return '';
    }

    pythonMainError.cur = { msg: '', line: 0, linemsg: '' };
    return result ?? '';
    }

    async runPython({ CODE }, util) {
    if (!canRunPY) return '';
    if (initWCSCMDS) {
        this.initPythonCommands(util);
        initWCSCMDS = false;
    }

    let result;
    try {
        result = await python.runPythonAsync(Cast.toString(CODE));
    } catch (err) {
        const msg   = err instanceof Error ? err.message : Cast.toString(err);
        const match = msg.match(/<string>, line (\d+)/); // Python error format
        const line  = match ? parseInt(match[1], 10) : -1;
        let linemsg = '';
        if (line > 0) {
        const lines = CODE.split(/\r?\n/);
        linemsg = lines[line - 1] || '';
        }
        pythonError.cur  = { msg, line, linemsg };
        pythonError.last = { ...pythonError.cur };

        // No getTop/pop necessary
        util.startHats('DragoPython_onError');
        return '';
    }

    // No getTop/pop necessary
    if (typeof result === 'function') {
        const msg = `Invalid return: received a function value instead of a result → ${Cast.toString(result)}`;
        pythonError.cur  = { msg, line: -1, linemsg: '' };
        pythonError.last = { ...pythonError.cur };
        util.startHats('DragoPython_onError');
        return '';
    }

    pythonError.cur = { msg: '', line: 0, linemsg: '' };
    return result ?? '';
    }



}

Scratch.vm.runtime.on('EXTENSION_ADDED', d => d?.id === '0znzwMoreFields' && reloadBlocks());
runtime.on('PROJECT_START', () => { if (reloadOnStart) resetPython(); if (allowMainScript && canRunPY && runMainScriptWhen == 'on start') runtime.ext_secret_dragonianpython.runMainScript({CODE: Scratch.vm.runtime.extensionStorage["DragoPython"].pythonMainScript}); });
runtime.on('PROJECT_STOP_ALL', () => resetPython());
runtime.on('BEFORE_EXECUTE', () => {if (allowMainScript && canRunPY && runMainScriptWhen == 'always') runtime.ext_secret_dragonianpython.runMainScript({CODE: Scratch.vm.runtime.extensionStorage["DragoPython"].pythonMainScript})});

  Scratch.extensions.register((runtime.ext_secret_dragonianpython = new extension()));
})(Scratch);