// @ts-no-check

/**!
 * Drago0znzwPython
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

  const extId = 'Drago0znzwPython';
  const {Cast, BlockType, ArgumentType, vm} = Scratch;
  const {runtime} = vm;
  const Thread = (
    // PenguinMod
    vm.exports.Thread ??
    // TurboWarp and forks
    vm.exports.i_will_not_ask_for_help_when_these_break().Thread
  );

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
  let canRunPYTHON = true; // <- this should probably be false initially // but then people will complain about it not working


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
    python = loadPyodide();
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
      this.DO_INIT = true;
      this._curErrorMsg = '';
      this._lastErrorMsg = '';
      this._curMainErrorMsg = '';
      this._lastMainErrorMsg = '';
      this.allowMainScript = ((this.runtime = runtime).extensionStorage[extId] ??= {}).allowMainScript ?? false;
      //this.pythonMainScript = ((this.runtime = runtime).extensionStorage[extId] ??= {}).pythonMainScript || '';
      //this.runMainScriptWhen = ((this.runtime = runtime).extensionStorage[extId] ??= {}).runMainScriptWhen || 'never';
      // Some things may require util
      this.preservedUtil = null;
      this.setupClasses();
      runtime.on('PROJECT_START', () => { if (reloadOnStart) resetPython(); if (this.allowMainScript && this.runMainScriptWhen === 'on start') this.runMainScript(Cast.toString(this.pythonMainScript), util); });
      runtime.on('PROJECT_STOP_ALL', () => reloadOnStart && resetPython());
      runtime.on('BEFORE_EXECUTE', () => this.allowMainScript && this.runMainScriptWhen === 'always' && this.runMainScript(this.pythonMainScript));


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
          {blockType: BlockType.LABEL, text: 'VM'},
          "---",
          {opcode: 'VMState', func: 'isPYTHONenabled', blockType: BlockType.BOOLEAN, text: 'is python on?'},
          {opcode: 'toggleInit', func: 'setScratchCommandsEnabled', blockType: BlockType.COMMAND, text: 'enable scratch commands for python? [INIT]', arguments: {INIT: {type: ArgumentType.BOOLEAN}}},
          {opcode: 'pythonVMdo', blockType: BlockType.COMMAND, text: '[ACTION] python vm', arguments: {ACTION: {type: ArgumentType.STRING, menu: `pythonVMdo`, defaultValue: `stop`}}, func: 'pythonVMdo'},
          '---',
          {blockType: BlockType.LABEL, text: 'Python Code'},
          "---",
          {blockType: BlockType.BUTTON, func: 'mainScriptToggle', text: this.allowMainScript ? "Disable Main Script": 'Enable Main Script', hideFromPalette: true},
          {opcode: 'runMainScriptWhen', blockType: BlockType.COMMAND, text: 'run main script [RMSW]', arguments: {RMSW: {type: ArgumentType.STRING, defaultValue: 'always', menu: 'RMSW'}}, func: 'runMainScriptWhen', hideFromPalette: !this.allowMainScript},
          {opcode: 'setMainScript', blockType: BlockType.COMMAND, text: 'set main script to [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: 'print "hello world"'}}, func: 'setMainScript', hideFromPalette: !this.allowMainScript},
          {opcode: 'getMainScript', blockType: BlockType.REPORTER, text: 'main script', func: 'getMainScript', outputShape: 3, hideFromPalette: !this.allowMainScript},
          {opcode: 'no_op_0', blockType: BlockType.COMMAND, text: 'run python [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: '# data.set("variable", "value", is a list?) \ndata.set("my variable", "It works!", False) \nprint(data.get("my variable", False))'}}, func: 'runPython'},
          {opcode: 'no_op_1', blockType: BlockType.REPORTER, text: 'run python [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: '# data.set("variable", "value", is a list?) \ndata.set("my variable", "It works!", False) \nprint(data.get("my variable", False))'}}, func: 'runPython', outputShape: 3},
          {opcode: 'no_op_4', blockType: Scratch.BlockType.REPORTER, text: 'variable [VAR]', outputShape: Scratch.extensions.isPenguinmod ? 5 : 3, blockShape: Scratch.extensions.isPenguinmod ? 5 : 3, arguments: {VAR: {type: ArgumentType.STRING}}, allowDropAnywhere: true, func: 'getVar'},
          '---',
          {blockType: BlockType.LABEL, text: 'Python Bridge'},
          "---",
          {opcode: 'linkedFunctionCallback', blockType: BlockType.EVENT, text: 'when sbfunc() is called', isEdgeActivated: false, shouldRestartExistingThreads: true},
          {opcode: 'linkedFunctionCallbackReturn', blockType: BlockType.COMMAND, text: 'return [DATA]', arguments: {DATA: {type: ArgumentType.STRING}}, isTerminal: true},
          {opcode: 'no_op_5', blockType: Scratch.BlockType.REPORTER, text: '[TYPE] arguments', arguments: {TYPE: {type: ArgumentType.STRING, defaultValue: 'pure', menu: 'argreptypes'}}, allowDropAnywhere: true, disableMonitor: true, outputShape: 3, func: 'getsbfuncArgs'},
          {opcode: 'no_op_6', blockType: Scratch.BlockType.REPORTER, text: 'argument [NUM]', arguments: {NUM: {type: ArgumentType.NUMBER, defaultValue: 1}}, allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgsnum'},
          {opcode: 'no_op_7', blockType: Scratch.BlockType.REPORTER, text: 'argument count', allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgscnt'},
           '---',
          {blockType: BlockType.LABEL, text: 'Python Errors'},
          "---",
          {opcode: 'onError', blockType: BlockType.EVENT, text: 'when catching an error', isEdgeActivated: false, shouldRestartExistingThreads: true,},
          {opcode: 'curError', blockType: Scratch.BlockType.REPORTER, text: 'current error', allowDropAnywhere: true},
          {opcode: 'lastError', blockType: Scratch.BlockType.REPORTER, text: 'last error', allowDropAnywhere: true},
          {opcode: 'clearLastErrorMsg', blockType: Scratch.BlockType.COMMAND, text: 'clear last error message'},
          {opcode: 'onMainError', blockType: BlockType.EVENT, text: 'when main script errors', isEdgeActivated: false, shouldRestartExistingThreads: true, hideFromPalette: !this.allowMainScript},
          {opcode: 'curMainError', blockType: Scratch.BlockType.REPORTER, text: 'current main script error', allowDropAnywhere: true, hideFromPalette: !this.allowMainScript},
          {opcode: 'lastMainError', blockType: Scratch.BlockType.REPORTER, text: 'last main script error', allowDropAnywhere: true, hideFromPalette: !this.allowMainScript},
          {opcode: 'clearLastMainErrorMsg', blockType: Scratch.BlockType.COMMAND, text: 'clear last error message', hideFromPalette: !this.allowMainScript}
        ],
        menus: {pythonVMdo: {acceptReporters: true, items: ['stop', 'start', 'reset']}, argreptypes: {acceptReporters: true, items: ['pure', 'stringified']}, RMSW: {acceptReporters: true, items: ['on start', 'always']}},
        customFieldTypes: extension.customFieldTypes,
      };
    }

    // no-op functions ignore these and leave them blank
    isPYTHONenabled() {
      return canRunPYTHON;
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
    lastError() {
      return this._lastErrorMsg || '';
    }
    curError() {
      return this._curErrorMsg || '';
    }
    lastMainError() {
      return this._lastMainErrorMsg || '';
    }
    curMainError() {
      return this._curMainErrorMsg || '';
    }

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

    mainScriptToggle() { (this.allowMainScript = !(this.allowMainScript), this.runtime.extensionStorage[extId].allowMainScript = this.allowMainScript, Scratch.vm.extensionManager.refreshBlocks()); }
    setMainScript({ CODE }) { (this.runtime.extensionStorage[extId] ??= {}).pythonMainScript = this.pythonMainScript = Cast.toString(CODE); }
    getMainScript(){return Cast.toString(this.pythonMainScript);}
    runMainScriptWhen(args){

    }

    linkedFunctionCallback(){}
    
    linkedFunctionCallbackReturn(args, { thread }) {
      // Make sure to do this first otherwise the default return value may be returned. //what's "this"
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
          canRunPYTHON = false;
          break;
        case 'start':
          if (!canRunPYTHON) {
            await resetPython();
            canRunPYTHON = true;
          }
          break;
        default:
          canRunPYTHON = false;
          python = null;
          await resetPython();
          canRunPYTHON = true;
          break;
      }
    }

    getsbfuncArgs(args, { thread }) {
      if (!thread[sbfuncArgs]) return '';
      if (Cast.toString(args.TYPE) == 'stringified') {
        return thread[sbfuncArgs].map(Cast.toString);
      }
      return thread[sbfuncArgs];
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
    clearLastErrorMsg(){this._lastErrorMsg = '';}
    clearLastMainErrorMsg(){this._lastMainErrorMsg = '';}



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
        looks_say: (util, msg) => runtime.ext_scratch3_looks._say.call(runtime.ext_scratch3_looks, Cast.toString(msg), util.target),
        looks_sayForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.sayforsecs.call(runtime.ext_scratch3_looks, {MESSAGE: msg, SECS: secs}, util),
        looks_think: (util, msg) => runtime.emit(runtime.ext_scratch3_looks.SAY_OR_THINK, util.target, 'think', Cast.toString(msg)),
        looks_thinkForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.thinkforsecs.call(runtime.ext_scratch3_looks, {MESSAGE: msg, SECS: secs}, util),
        looks_show: (util) => runtime.ext_scratch3_looks.show.call(runtime.ext_scratch3_looks, null, util),
        looks_hide: (util) => runtime.ext_scratch3_looks.hide.call(runtime.ext_scratch3_looks, null, util),
        looks_getCostume: (util, costume) => 0,
        looks_setCostume: (util, costume) => 0,
        looks_nextCostume: (util, costume) => 0,
        looks_lastCostume: (util, costume) => 0,
        looks_getSize: (util, costume) => 0,
        looks_setSize: (util, costume) => 0,
        looks_changeSize: (util, costume) => 0,
        looks_setEffect: (util, costume) => 0,
        looks_changeEffect: (util, costume) => 0,
        looks_effectClear: (util, costume) => 0,

        //Events
        events_broadcast: (util, msg) => util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: msg}),
        // @ts-ignore
        events_broadcastandwait: (util, msg) => 0,

        // Control
        // @ts-ignore
        control_wait: (_, seconds) => new Promise((resolve) => setTimeout(resolve, Cast.toNumber(seconds) * 1000)),
        // @ts-ignore
        control_clone: (util, spr) => 0,
        // @ts-ignore
        control_deleteClone: (util) => 0,

        //Sensing
        // @ts-ignore
        sensing_loudness: (util) => 0,
        // @ts-ignore
        sensing_loud: (util) => 0,
        sensing_mouseX: () => runtime.ioDevices.mouse._scratchX,
        sensing_mouseY: () => runtime.ioDevices.mouse._scratchY,
        // @ts-ignore
        sensing_mouseDown: (util) => runtime.ioDevices.mouse,
        // @ts-ignore
        sensing_timer: (util) => 0,
        // @ts-ignore
        sensing_resettimer: (util) => 0,
        // @ts-ignore
        sensing_username: (util) => 0,
        // @ts-ignore
        sensing_current: (util) => 0,
        // @ts-ignore
        sensing_dayssince2000: (util, datetype) => 0,
        // @ts-ignore
        sensing_distanceto: (util, sprite) => 0,
        // @ts-ignore
        sensing_colorIsTouchingColor: (util, colour1, colour2) => 0,
        // @ts-ignore
        sensing_touchingcolor: (util, color) => 0,
        // @ts-ignore
        sensing_touchingobject: (util, sprite) => 0,
        // @ts-ignore
        sensing_keypressed: (util, key) => 0,
        // @ts-ignore
        sensing_ask: (util) => 0,
        // @ts-ignore
        sensing_answer: (util) => 0,

        //Data
        data_setvar: (util, name, val) => (_getVarObjectFromName(Cast.toString(name), util, '').value = val),
        // @ts-ignore
        data_getvar: (util, name) => _getVarObjectFromName(Cast.toString(name), '').value,
        // @ts-ignore
        data_makevar: (util, name) => 0,
        // @ts-ignore
        data_deletevar: (util, name) => 0,
        // @ts-ignore
        data_changevar: (util, name, val) => 0,
        // @ts-ignore
        data_showvar: (util, name) => 0,
        // @ts-ignore
        data_hidevar: (util, name) => 0,
        // @ts-ignore
        data_setlist: (util, name, list) => 0,
        // @ts-ignore
        data_getlist: (util, name) => 0,
        // @ts-ignore
        data_addtolist: (util, name, value, pos) => 0,
        // @ts-ignore
        data_removefromlist: (util, name, pos) => 0,
        // @ts-ignore
        data_clearlist: (util, name) => 0,
        // @ts-ignore
        data_replacelistitem: (util, name, val, pos) => 0,
        // @ts-ignore
        data_listitem: (util, name, pos) => 0,
        // @ts-ignore
        data_listitemnum: (util, name, item) => 0,
        // @ts-ignore
        data_makelist: (util, name) => 0,
        // @ts-ignore
        data_deletelist: (util, name) => 0,
        // @ts-ignore
        data_getvars: (util) => 0,
        // @ts-ignore
        data_getlists: (util) => 0,
        // @ts-ignore
        data_listlength: (util, name) => 0,
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

      // Category: motion
      python.globals.set('motion', {move: ref('motion_moveSteps'), moveSteps: ref('motion_moveSteps'), turn: ref('motion_turn'), rotate: ref('motion_turn'), goTo: ref('motion_goTo'), setPos: ref('motion_goTo'), set: ref('motion_goTo'), XY: ref('motion_goTo'), changePos: ref('motion_changePos'), change: ref('motion_changePos'), transform: ref('motion_changePos'), setX: ref('motion_setX'), X: ref('motion_setX'), setY: ref('motion_setY'), Y: ref('motion_setY'), changeX: ref('motion_changeX'), changeY: ref('motion_changeY'), pointInDir: ref('motion_pointInDir'), point: ref('motion_pointInDir'), setRotationStyle: ref('motion_setRotationStyle'), RotStyle: ref('motion_setRotationStyle'), RotationStyle: ref('motion_setRotationStyle'), ifOnEdgeBounce: ref('motion_ifOnEdgeBounce')});
      
      // These require async support:
      //   motion_glideTo
      //   motion_glideSecsToXY
      // Category: looks
      python.globals.set('looks', {say: ref('looks_say'), sayForSecs: ref('looks_sayForSecs'), think: ref('looks_think'), thinkForSecs: ref('looks_thinkForSecs'), show: ref('looks_show'), hide: ref('looks_hide')});
      // Category: events
      python.globals.set('events', {broadcast: ref('events_broadcast')});
      // Category: control
      python.globals.set('control', {wait: ref('control_wait')});
      // Category: data
      /*
      python.globals.set('data', {var: ref('data_setvar')});
      */

      python.globals.set('data', {
        set(varName, value, isList) {
          _getVarObjectFromName(Cast.toString(varName), util, Cast.toBoolean(isList) ? 'list' : '').value = value;
        },
        get(varName, isList) {
          isList = Cast.toBoolean(isList);
          const varObject = _getVarObjectFromName(Cast.toString(varName), isList ? 'list' : '');
          if (isList) {
            return Array.isArray(varObject.value) ? varObject.value : [varObject.value];
          } else {
            return varObject.value;
          }
        },
      });

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
          if (this.DEBUG) console.trace(`runBlock_PYTHON | Ran ${EXT}_${OPCODE} and got:\n`, formatRes(res));
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
          // A extension to load the PYTHON extension
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
      this.DO_INIT = Cast.toBoolean(INIT);
    }

    async runMainScript({ CODE }, util) {
      if (!canRunPYTHON || CODE === '') return '';

      if (this.DO_INIT) this.initPythonCommands(util);

      try {
          const result = await python.doString(Cast.toString(CODE));
          try {
              python.global.pop();
          } catch (popError) {
              console.log('prevented popstack error. ignore any aborts');
          } // pop the return value from the Python stack
            this._curErrorMsg = '';
          return result ?? '';
      } catch (error) {
          const message = typeof error?.message === 'string' ? error.message : Cast.toString(error);
          this._lastMainErrorMsg = message;
          this._curMainErrorMsg = message;
          vm.runtime.startHats('Drago0znzwPython_onMainError');
          return '';
      }
    }

    async runPython({ CODE }, util) {
      if (!canRunPYTHON) return '';

      if (this.DO_INIT) this.initPythonCommands(util);

      try {
          const result = await python.runPythonAsync(Cast.toString(CODE));
          try {
              python.global.pop();
          } catch (popError) {
              
          } // pop the return value from the Python stack
            this._curErrorMsg = '';
          return result ?? '';
      } catch (error) {
          const message = typeof error?.message === 'string' ? error.message : Cast.toString(error);
          this._lastErrorMsg = message;
          this._curErrorMsg = message;
          util.startHats('Drago0znzwPython_onError');
          return '';
      }
  }
}

  Scratch.vm.runtime.on('EXTENSION_ADDED',d=>d?.id==='0znzwMoreFields'&&reloadBlocks())
  // need to find out how to get this to work without screwing up the vm.

  Scratch.extensions.register((runtime.ext_secret_dragonianpython = new extension()));
})(Scratch);
