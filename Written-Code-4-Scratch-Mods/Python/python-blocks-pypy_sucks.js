// @ts-nocheck

/**!
 * DragonianPython
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * @comment Main development by Drago Cuven
 * Do not remove this comment
 */
(async function (Scratch) {
  'use strict';
  // @ts-ignore
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('"Dragonian Python" must be ran unsandboxed.');
  }

  // @ts-ignore
  const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTEuMTYxMzUiIGhlaWdodD0iMTEyLjM4OSIgdmlld0JveD0iMCwwLDExMS4xNjEzNSwxMTIuMzg5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjE4NC40MTkzMiIgeTE9IjEyMy44MDU1IiB4Mj0iMjQ1Ljc0NTQ3IiB5Mj0iMTc3LjA3NzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWE5ZmQ0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzA2OTk4Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjI1NC4zNTAwMiIgeTE9IjIyMS4zNTM1NCIgeDI9IjIzMi40NTA0OCIgeTI9IjE5MC4wNzAzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0yIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmQ0M2IiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmU4NzMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg0LjQxOTMyLC0xMjMuODA1NSkiPjxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjUzLjMwNjg2LDEyNC45MDAxN2M3LjI3NjI3LDEuMjEyNzIgMTMuNDA2MjUsNi42NzExNiAxMy40MDYyNSwxMy45Mzc1djI1LjUzMTI1YzAsNy40ODY4NCAtNS45NTEzLDEzLjYyNSAtMTMuNDA2MjUsMTMuNjI1aC0yNi43ODEyNWMtOS4wOTI4NiwwIC0xNi43NSw3LjgwNjM1IC0xNi43NSwxNi42NTYyNXYxMi4yNWgtOS4yMTg3NWMtNy43OTI0NiwwIC0xMi4zNDQwNywtNS42NTU5IC0xNC4yNSwtMTMuNTkzNzVjLTIuNTcxMDIsLTEwLjY2Mzk4IC0yLjQ2MTgyLC0xNy4wMzcwMyAwLC0yNy4yNWMyLjEzNDI0LC04LjkxMDAzIDguOTU3NTQsLTEzLjU5Mzc1IDE2Ljc1LC0xMy41OTM3NWgxMC4wNjI1aDI2LjgxMjV2LTMuNDA2MjVoLTI2LjgxMjV2LTEwLjIxODc1YzAsLTcuNzM3NCAyLjA2MDAzLC0xMS45MzMgMTMuNDA2MjUsLTEzLjkzNzVjMy44NTE1NiwtMC42ODE1MyA4LjIyODg1LC0xLjA3MjQ1IDEyLjgxMjUsLTEuMDkzNzVjNC41ODM2NSwtMC4wMjEzIDkuMzYyNzYsMC4zMjcwMiAxMy45Njg3NSwxLjA5Mzc1ek0yMTkuODA2ODYsMTM3LjE1MDE3YzAsMi44MTYzMyAyLjI1MTc3LDUuMDkzNzUgNS4wMzEyNSw1LjA5Mzc1YzIuNzY5NTUsMCA1LjAzMTI1LC0yLjI3NzQxIDUuMDMxMjUsLTUuMDkzNzVjMCwtMi44MjYzNSAtMi4yNjE3LC01LjEyNSAtNS4wMzEyNSwtNS4xMjVjLTIuNzc5NDgsMCAtNS4wMzEyNSwyLjI5ODY1IC01LjAzMTI1LDUuMTI1eiIgZmlsbD0idXJsKCNjb2xvci0xKSIvPjxwYXRoIGQ9Ik0yODAuMTE5MzYsMTUyLjQ2MjY3YzcuODAyMzcsMCAxMS40ODA0Niw1LjgzNjMxIDEzLjQwNjI0LDEzLjU5Mzc1YzIuNjgwMjIsMTAuNzc0MjIgMi43OTkzMywxOC44NTExMSAwLDI3LjI1Yy0yLjcwOTk5LDguMTU4MzQgLTUuNjEzNzgsMTMuNTkzNzUgLTEzLjQwNjI0LDEzLjU5Mzc1aC0xMy40MDYyNWgtMjYuNzgxMjV2My40MDYyNWgyNi43ODEyNXYxMC4yMTg3NWMwLDcuNzM3MzkgLTYuNjU2MDksMTEuNjcwNjEgLTEzLjQwNjI1LDEzLjYyNWMtMTAuMTU1MDEsMi45NDY2MyAtMTguMjkzOTIsMi40OTU2MSAtMjYuNzgxMjUsMGMtNy4wODc2NiwtMi4wODQ2OCAtMTMuNDA2MjUsLTYuMzU4NjYgLTEzLjQwNjI1LC0xMy42MjV2LTI1LjUzMTI1YzAsLTcuMzQ2NTIgNi4wNzA0MiwtMTMuNjI1IDEzLjQwNjI1LC0xMy42MjVoMjYuNzgxMjVjOC45MjQxMSwwIDE2Ljc1LC03Ljc2OTI1IDE2Ljc1LC0xN3YtMTEuOTA2MjV6TTI0OS45NjMxMSwyMjIuMjEyNjZjMCwyLjgyNjM1IDIuMjYxNyw1LjEyNSA1LjAzMTI1LDUuMTI1YzIuNzc5NDgsMCA1LjAzMTI1LC0yLjI5ODY1IDUuMDMxMjUsLTUuMTI1YzAsLTIuODE2MzMgLTIuMjUxNzcsLTUuMDkzNzQgLTUuMDMxMjUsLTUuMDkzNzVjLTIuNzY5NTUsMCAtNS4wMzEyNSwyLjI3NzQyIC01LjAzMTI1LDUuMDkzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NTUuNTgwNjc2OTYyOTY2Mzg6NTYuMTk0NTAxMTE0NTE3MjEtLT4=";

  // @ts-ignore
  const extId = 'DragonianPython';
  // @ts-ignore
  const {Cast, BlockType, ArgumentType, vm} = Scratch;
  // @ts-ignore
  const {runtime} = vm;
  // @ts-ignore
  const Thread = (
    vm.exports.Thread ??
    vm.exports.i_will_not_ask_for_help_when_these_break().Thread
  );

  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/pypyjs/pypyjs-release@0.4.0/lib';

  // @ts-ignore
  window.Module = {
    locateFile: (path, prefix) => `${CDN_BASE}/${path}`
  };

  function injectScript(src) {
    return new Promise((resolve, reject) => {
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

  let pyOn = true;
// @ts-ignore
const sbfuncargs = Symbol("sbfuncargs");

python.exec(`print("✅ PyPy.js is loaded and ready!")`);

  function _getVarObjectFromName(name, util, type) {
    const stageTarget = runtime.getTargetForStage();
    const target = util.target;
    let listObject = Object.create(null);

    listObject = stageTarget.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
    listObject = target.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
  }

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

  const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = cbfsb(blockInfo, categoryInfo);
    if (blockInfo.outputShape) {
      res.json.outputShape = blockInfo.outputShape;
    }
    return res;
  };

  async function resetPython() {
    const threads = runtime.threads;
    const oldStatus = [];
    for (var i = 0; i < threads.length; i++) {
      const thisThread = threads[i];
      oldStatus.push(thisThread.status);
      thisThread.status = 5;
    }
    // @ts-ignore
    python = new pypyjs();
    // @ts-ignore
    await python.ready();
    for (var i = 0; i < threads.length; i++) {
      threads[i].status = oldStatus[i];
    }
  }

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
      this.preservedUtil = null;
      this.setupClasses();
    }
    getInfo() {
      const MoreFields = extension.MoreFields;
      return {
        id: extId,
        name: 'Python',
        color1: '#4584B6',
        color2: '#2B5F89',
        color3: '#FFD43B',
        menuIconURI,
        blocks: [
          {opcode: 'VMState', func: 'isPythonEnabled', blockType: BlockType.BOOLEAN, text: 'is python on?'},
          {opcode: 'toggleInit', func: 'setScratchCommandsEnabled', blockType: BlockType.COMMAND, text: 'enable scratch commands for python? [INIT]', arguments: {INIT: {type: ArgumentType.BOOLEAN}}},
          {opcode: 'pythonVMdo', blockType: BlockType.COMMAND, text: '[ACTION] python vm', arguments: {ACTION: {type: ArgumentType.STRING, menu: `pythonVMdo`, defaultValue: `stop`}}, func: 'pythonVMdo'},
          {
            opcode: 'pythonCommand',
            blockType: BlockType.COMMAND,
            text: '[DO] python [CODE]',
            arguments: {
              DO: { type: ArgumentType.STRING, menu: 'runPythonDo', defaultValue: 'run' },
              CODE: { type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `print("Hello from Python!")` }
            },
            func: 'runPython'
          },
          {
            opcode: 'pythonReporter',
            blockType: BlockType.REPORTER,
            text: '[DO] python [CODE]',
            arguments: {
              DO: { type: ArgumentType.STRING, menu: 'runPythonDo', defaultValue: 'eval' },
              CODE: { type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `123` }
            },
            func: 'runPython',
            outputShape: 3
          },
          '---',
          {opcode: 'getVar', blockType: BlockType.REPORTER, text: 'variable [VAR]', outputShape: Scratch.extensions.isPenguinmod ? 5 : 3, blockShape: Scratch.extensions.isPenguinmod ? 5 : 3, arguments: {VAR: {type: ArgumentType.STRING}}, allowDropAnywhere: true},
          '---',
          {opcode: 'linkedFunctionCallback', blockType: BlockType.EVENT, text: 'on sbfunc()', isEdgeActivated: false, shouldRestartExistingThreads: true},
          {opcode: 'linkedFunctionCallbackReturn', blockType: BlockType.COMMAND, text: 'return [DATA]', arguments: {DATA: {type: ArgumentType.STRING}}, isTerminal: true},
          {opcode: 'getpfuncArgs', blockType: BlockType.REPORTER, text: '[TYPE] arguments', arguments: {TYPE: {type: ArgumentType.STRING, defaultValue: 'pure', menu: 'argreptypes'}}, allowDropAnywhere: true, disableMonitor: true},
          {opcode: 'getpfuncArgsnum', blockType: BlockType.REPORTER, text: 'argument [NUM]', arguments: {NUM: {type: ArgumentType.NUMBER, defaultValue: 1}}, allowDropAnywhere: true, disableMonitor: true},
          {opcode: 'getpfuncArgscnt', blockType: BlockType.REPORTER, text: 'argument count', allowDropAnywhere: true, disableMonitor: true},
          '---',
          {opcode: 'onError', blockType: BlockType.EVENT, text: 'on error', isEdgeActivated: false, shouldRestartExistingThreads: true},
          {opcode: 'curError', blockType: BlockType.REPORTER, text: 'current error', allowDropAnywhere: true},
          {opcode: 'lastError', blockType: BlockType.REPORTER, text: 'last error', allowDropAnywhere: true},
          {opcode: 'clearLastErrorMsg', blockType: BlockType.COMMAND, text: 'clear last error message'},
        ],
        menus: {
          pythonVMdo: {acceptReporters: true, items: ['stop', 'start', 'reset']},
          argreptypes: {acceptReporters: true, items: ['pure', 'stringified']},
          runPythonDo: {acceptReporters: true, items: ['run', 'eval']}
        },
        customFieldTypes: extension.customFieldTypes,
      };
    }

    isPythonEnabled() {
      return pyOn;
    }
    no_op_0() {}
    no_op_1() {}
    no_op_2() {}
    no_op_3() {}
    no_op_4() {}
    no_op_5() {}
    no_op_6() {}
    no_op_7() {}
    pythonCommand() {}
    pythonReporter() {}
    onError() {}
    lastError() {
      return this._lastErrorMsg || '';
    }
    curError() {
      return this._curErrorMsg || '';
    }
    clearLastErrorMsg() {
      this._lastErrorMsg = '';
    }

    _extensions() {
      const arr = Array.from(vm.extensionManager._loadedExtensions.keys());
      if (typeof arr[0] !== 'string') arr.push('');
      return arr;
    }
    runBlock({EXT, OPCODE, ARGS}, util, blockJSON) {
      if (((EXT = Cast.toString(EXT)), (!this._extensions().includes(EXT) || EXT === '') && !runtime[`ext_${EXT}`])) return '';
      const fn = runtime._primitives[`${EXT}_${Cast.toString(OPCODE)}`] || runtime[`ext_${EXT}`]?.[Cast.toString(OPCODE)];
      if (!fn) return '';
      const res = fn(_parseJSON(ARGS), this._util(util), blockJSON || {});
      if (this.DEBUG) console.trace(`runBlock_JS | Ran ${EXT}_${OPCODE} and got:\n`, res);
      return res;
    }

    getVar(args) {
      const v = python.get(args.VAR);
      return (v === null) ? '' : v;
    }

    linkedFunctionCallback() {}

    linkedFunctionCallbackReturn(args, { thread }) {
      if (thread[sbfuncargs]) thread[sbfuncargs](args.DATA);
      thread.stopThisScript();
      thread.status = Thread.STATUS_DONE;
    }

    getpfuncArgs(args, { thread }) {
      if (!thread[sbfuncargs]) return '';
      if (Cast.toString(args.TYPE) == 'stringified') {
        return thread[sbfuncargs].map(Cast.toString);
      }
      return thread[sbfuncargs];
    }
    getpfuncArgsnum(args, { thread }) {
      if (!thread[sbfuncargs]) return '';
      return thread[sbfuncargs][Cast.toNumber(args.NUM) - 1] ?? '';
    }
    getpfuncArgscnt(args, { thread }) {
      const argsList = thread[sbfuncargs];
      if (!Array.isArray(argsList)) return 0;
      return argsList.length;
    }

    setScratchCommandsEnabled({INIT}) {
      this.DO_INIT = Cast.toBoolean(INIT);
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
          pyOn = false;
          break;
        case 'start':
          if (!pyOn) {
            await resetPython();
            pyOn = true;
          }
          break;
        default:
          pyOn = false;
          await resetPython();
          pyOn = true;
          break;
      }
    }

    async runPython(args, util) {
      if (!pyOn) return '';
      if (this.DO_INIT) this.initPythonCommands(util);
      try {
        let result;
        if (args.DO === 'eval') {
          result = await python.eval(Cast.toString(args.CODE));
        } else {
          result = await python.exec(Cast.toString(args.CODE));
        }
        try {
          python.pop && python.pop();
        } catch (popError) {
          // ignore pop errors, as in lua-blocks
        }
        this._curErrorMsg = '';
        return result ?? '';
      } catch (error) {
        this._lastErrorMsg = typeof error.message === 'string' ? error.message : Cast.toString(error);
        this._curErrorMsg = this._lastErrorMsg;
        util.startHats('DragonianPython_onError');
        return '';
      }
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

        // Events
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

        // Sensing
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

        // Data
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
      util = this._constructFakeUtil(util);
      const ref = (fn, fnn) => (...args) => this.Functions[fn || fnn](util, ...args);
      const bindHere = (fn) => fn.bind(this);

      // Use sbfunc for callback/event
      python.set('sbfunc', (...args) => {
        let argsString = args;
        let sbfuncthread = util.startHats("DragonianPython_linkedFunctionCallback");
        for (const thread of sbfuncthread) thread[sbfuncargs] = argsString;
        return sbfuncthread;
      });

      python.set('sprite', {
        switch: (name) => runtime.setEditingTarget(runtime.getSpriteTargetByName(Cast.toString(name)) || runtime.getTargetForStage()),
        x: () => util.target.x,
        y: () => util.target.y,
        direction: () => util.target.direction,
        size: () => Math.round(util.target.size),
        trueSize: () => util.target.size,
        rotationStyle: () => util.target.rotationStyle,
        costume: (type) => (Cast.toString(type) === 'name' ? util.target.getCostumes()[util.target.currentCostume].name : util.target.currentCostume + 1)
      });

      python.set('MathUtil', this.MathUtil);

      python.set('motion', {
        move: ref('motion_moveSteps'),
        moveSteps: ref('motion_moveSteps'),
        turn: ref('motion_turn'),
        rotate: ref('motion_turn'),
        goTo: ref('motion_goTo'),
        setPos: ref('motion_goTo'),
        set: ref('motion_goTo'),
        XY: ref('motion_goTo'),
        changePos: ref('motion_changePos'),
        change: ref('motion_changePos'),
        transform: ref('motion_changePos'),
        setX: ref('motion_setX'),
        X: ref('motion_setX'),
        setY: ref('motion_setY'),
        Y: ref('motion_setY'),
        changeX: ref('motion_changeX'),
        changeY: ref('motion_changeY'),
        pointInDir: ref('motion_pointInDir'),
        point: ref('motion_pointInDir'),
        setRotationStyle: ref('motion_setRotationStyle'),
        RotStyle: ref('motion_setRotationStyle'),
        RotationStyle: ref('motion_setRotationStyle'),
        ifOnEdgeBounce: ref('motion_ifOnEdgeBounce'),
      });

      python.set('looks', {
        say: ref('looks_say'),
        sayForSecs: ref('looks_sayForSecs'),
        think: ref('looks_think'),
        thinkForSecs: ref('looks_thinkForSecs'),
        show: ref('looks_show'),
        hide: ref('looks_hide'),
      });

      python.set('events', {
        broadcast: ref('events_broadcast'),
      });

      python.set('control', {
        wait: ref('control_wait'),
      });

      python.set('data', {
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

      python.set('Cast', Cast);

      python.set('JS', {
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

      python.set('scratch', {
        fetch(url, opts, ...args) {
          opts = opts || {};
          return Scratch.fetch(Cast.toString(url), opts, ...args);
        },
        preserveUtil: function () {
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
            {}
          );
          if (this.DEBUG) console.trace(`runBlock_PY | Ran ${EXT}_${OPCODE} and got:\n`, res);
          return res;
        },
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
        async _loadHack(url) {
          const gsm = vm.extensionManager.securityManager.getSandboxMode;
          vm.extensionManager.securityManager.getSandboxMode = () => Promise.resolve('unsandboxed');
          try {
            await vm.extensionManager.loadExtensionURL(Cast.toString(url));
          } finally {
            vm.extensionManager.securityManager.getSandboxMode = gsm;
            delete window._pythonExtensionLoader;
          }
        },
        _loadObject(object) {
          window._pythonExtensionLoader = object;
          return this._loadHack(this._scratchLoader);
        },
      });
    }

    async secret_load({ url }) {
      return await vm.extensionManager.loadExtensionURL(Cast.toString(url));
    }
    secret_injectFunction({ namespace, args, js }) {
      python.set(Cast.toString(namespace), (new Function('python', ...args.split(' '), js).bind(window, python)));
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new extension());
})(Scratch);
