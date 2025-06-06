// @ts-no-check

/**!
 * Drago0znzwLua
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
    throw new Error('"Dragonian Lua" must be ran unsandboxed.');
  }

  const menuIconURI =
    'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9Ijk0NyIgaGVpZ2h0PSI5NDciIHZpZXdCb3g9IjAgMCA5NDcgOTQ3IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSJuYXZ5IiBkPSJNODM1LjUgNDczLjZjMC0xOTkuOC0xNjIuMi0zNjItMzYyLTM2MnMtMzYyIDE2Mi4yLTM2MiAzNjIgMTYyLjIgMzYyIDM2MiAzNjIgMzYyLTE2Mi4yIDM2Mi0zNjIiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzI5LjUgMzIzLjZjMC01OC41LTQ3LjUtMTA2LTEwNi0xMDZzLTEwNiA0Ny41LTEwNiAxMDYgNDcuNSAxMDYgMTA2IDEwNiAxMDYtNDcuNSAxMDYtMTA2Ii8+PHBhdGggZmlsbD0ibmF2eSIgZD0iTTk0MS41IDExMS41YzAtNTguNS00Ny41LTEwNi0xMDYtMTA2cy0xMDYgNDcuNS0xMDYgMTA2IDQ3LjUgMTA2IDEwNiAxMDYgMTA2LTQ3LjQgMTA2LTEwNiIvPjxwYXRoIGQ9Ik0yNTguMSA2MjcuOGgxMTcuM3YyNi43SDIyNy44VjQxN2gzMC4zem0yNTcuNCAyNi43di0yMy44Yy0xNiAyMi41LTMxLjkgMzEuMy01NyAzMS4zLTMzLjIgMC01NC40LTE4LjItNTQuNC00Ni42VjQ4My44aDI3djEyMC45YzAgMjAuNSAxMy43IDMzLjYgMzUuMiAzMy42IDI4LjMgMCA0Ni42LTIyLjggNDYuNi01Ny43di05Ni44aDI3djE3MC43em0yMjIuOSA0LjZjLTguOCAyLjMtMTMgMi45LTE4LjYgMi45LTE3LjYgMC0yNi4xLTcuOC0yOC0yNS4xLTE5LjIgMTcuNi0zNi41IDI1LjEtNTggMjUuMS0zNC41IDAtNTYtMTkuNS01Ni01MC41IDAtMjIuMiAxMC4xLTM3LjUgMzAtNDUuNiAxMC40LTQuMiAxNi4zLTUuNSA1NC43LTEwLjQgMjEuNS0yLjYgMjguMy03LjUgMjguMy0xOC45di03LjJjMC0xNi4zLTEzLjctMjUuNC0zOC4xLTI1LjQtMjUuNCAwLTM3LjggOS40LTQwLjEgMzAuM2gtMjcuNGMuNy0xNi45IDMuOS0yNi43IDExLjctMzUuNSAxMS40LTEyLjcgMzEuOS0xOS45IDU2LjctMTkuOSA0MiAwIDY0LjIgMTYuMyA2NC4yIDQ2LjZ2MTAwLjRjMCA4LjUgNS4yIDEzLjQgMTQuNyAxMy40IDEuNiAwIDIuOSAwIDUuOS0uN3ptLTQ3LjYtODljLTkuMSA0LjItMTUgNS41LTQzLjcgOS40LTI5IDQuMi00MS4xIDEzLjQtNDEuMSAzMS4zIDAgMTcuMyAxMi40IDI3LjQgMzMuNiAyNy40IDE2IDAgMjkuMy01LjIgNDAuNC0xNS4zIDguMS03LjUgMTAuOC0xMyAxMC44LTIyLjJ6IiBmaWxsPSIjRkZGIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSJncmF5IiBzdHJva2Utd2lkdGg9IjEwLjg2MSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSI0MC44NDciIGQ9Ik04OTAuNiAyNjFjMzMuNSA2NS44IDUxIDEzOC42IDUxIDIxMi41IDAgMjU4LjQtMjA5LjcgNDY4LjEtNDY4LjEgNDY4LjFTNS40IDczMS45IDUuNCA0NzMuNSAyMTUuMSA1LjQgNDczLjUgNS40YzgzLjEgMCAxNjQuNiAyMi4xIDIzNi4yIDYzLjkiLz48L3N2Zz4=';

  const extId = 'Drago0znzwLua';
  const {Cast, BlockType, ArgumentType, vm} = Scratch;
  const {runtime} = vm;
  const Thread = (
    // PenguinMod
    vm.exports.Thread ??
    // TurboWarp and forks
    vm.exports.i_will_not_ask_for_help_when_these_break().Thread
  );

  // @todo Find a way to embed this so it works offline
  //       and prevent global leakage
  function waitFinish(script) {
    // @ts-ignore
    return new Promise((resolve) => {
      script.addEventListener('load', resolve);
    });
  }
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/ace-builds@1.36.2/src-min/ace.js';
  document.head.appendChild(script);
  await waitFinish(script);

  // Currently this can be used on TurboWarp via staging.
  // https://staging.turbowarp.org/
  if (!Scratch.BlockShape) throw new Error(`VM is outdated! please see TurboWarp/scratch-vm#210`);

  // @todo Find a way to embed this so it works offline
  //       and prevent global leakage
  // just use the dataurl when the extension is finished
  // @ts-ignore I know it exists so shut it TS
  const {LuaFactory} = await import('https://cdn.jsdelivr.net/npm/wasmoon/+esm');
  const factory = new LuaFactory();
  let canRunLUA = true; // <- this should probably be false initially // but then people will complain about it not working
  let lua = await factory.createEngine();


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

  // Resetting the lua runtime
  // @ts-ignore
  let reloadOnStart = true; // <- this is a variable to make sure the lua engine is reset on flag click
  async function resetLua() {
    const threads = runtime.threads;
    const oldStatus = [];
    for (var i = 0; i < threads.length; i++) {
      const thisThread = threads[i];
      oldStatus.push(thisThread.status);
      thisThread.status = 5;
    }
    lua.global.close();
    lua = await factory.createEngine();
    for (var i = 0; i < threads.length; i++) {
      threads[i].status = oldStatus[i];
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

  // Actual extension code
  class extension {
    get lua() {
      return lua;
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

      // Some things may require util
      this.preservedUtil = null;
      this.setupClasses();
    }
    getInfo() {
      const MoreFields = extension.MoreFields;
      return {
        id: extId,
        name: 'Lua',
        color1: '#000080',
        color2: '#808080',
        color3: '#ffffff',
        menuIconURI,
        blocks: [
          {opcode: 'VMState', func: 'isLUAenabled', blockType: BlockType.BOOLEAN, text: 'is lua on?'},
          {opcode: 'toggleInit', func: 'setScratchCommandsEnabled', blockType: BlockType.COMMAND, text: 'enable scratch commands for lua? [INIT]', arguments: {INIT: {type: ArgumentType.BOOLEAN}}},
          {opcode: 'luaVMdo', blockType: BlockType.COMMAND, text: '[ACTION] lua vm', arguments: {ACTION: {type: ArgumentType.STRING, menu: `luaVMdo`, defaultValue: `stop`}}, func: 'luaVMdo'},
          {opcode: 'no_op_0', blockType: BlockType.COMMAND, text: 'run lua [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `--data.set("variable", "value", is a list?) \ndata.set("my variable", "It works!", false) \nprint(data.get("my variable"))`}}, func: 'runLua'},
          {opcode: 'no_op_1', blockType: BlockType.REPORTER, text: 'run lua [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `--data.set("variable", "value", is a list?) \ndata.set("my variable", "Success!", false) \nreturn(data.get("my variable"))`}}, func: 'runLua', outputShape: 3},
          '---',
          {opcode: 'no_op_4', blockType: Scratch.BlockType.REPORTER, text: 'variable [VAR]', outputShape: Scratch.extensions.isPenguinmod ? 5 : 3, blockShape: Scratch.extensions.isPenguinmod ? 5 : 3, arguments: {VAR: {type: ArgumentType.STRING}}, allowDropAnywhere: true, func: 'getVar'},
          '---',
          {opcode: 'linkedFunctionCallback', blockType: BlockType.EVENT, text: 'on sbfunc()', isEdgeActivated: false, shouldRestartExistingThreads: true},
          {opcode: 'linkedFunctionCallbackReturn', blockType: BlockType.COMMAND, text: 'return [DATA]', arguments: {DATA: {type: ArgumentType.STRING}}, isTerminal: true},
          {opcode: 'no_op_5', blockType: Scratch.BlockType.REPORTER, text: '[TYPE] arguments', arguments: {TYPE: {type: ArgumentType.STRING, defaultValue: 'pure', menu: 'argreptypes'}}, allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgs'},
          {opcode: 'no_op_6', blockType: Scratch.BlockType.REPORTER, text: 'argument [NUM]', arguments: {NUM: {type: ArgumentType.NUMBER, defaultValue: 1}}, allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgsnum'},
          {opcode: 'no_op_7', blockType: Scratch.BlockType.REPORTER, text: 'argument count', allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgscnt'},
          '---',
          {opcode: 'onError', blockType: BlockType.EVENT, text: 'on error', isEdgeActivated: false, shouldRestartExistingThreads: true},
          {opcode: 'curError', blockType: Scratch.BlockType.REPORTER, text: 'current error', allowDropAnywhere: true},
          {opcode: 'lastError', blockType: Scratch.BlockType.REPORTER, text: 'last error', allowDropAnywhere: true},
          {opcode: 'clearLastErrorMsg', blockType: Scratch.BlockType.COMMAND, text: 'clear last error message'},
        ],
        menus: {luaVMdo: {acceptReporters: true, items: ['stop', 'start', 'reset']}, argreptypes: {acceptReporters: true, items: ['pure', 'stringified']}},
        customFieldTypes: extension.customFieldTypes,
      };
    }

    // no-op functions ignore these and leave them blank
    isLUAenabled() {
      return canRunLUA;
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
    lastError() {
      return this._lastErrorMsg || '';
    }
    curError() {
      return this._curErrorMsg || '';
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
      const v = lua.global.get(Cast.toString(args.VAR));
      return (v === null) ? '' : v;
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

    async luaVMdo(args) {
      switch (args.ACTION) {
        case 'stop':
          lua.global.close();
          canRunLUA = false;
          break;
        case 'start':
          if (!canRunLUA) {
            await resetLua();
            canRunLUA = true;
          }
          break;
        default:
          canRunLUA = false;
          await resetLua();
          canRunLUA = true;
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

    initLuaCommands(util) {
      // Register all the commands for lua.
      util = this._constructFakeUtil(util);
      const ref =
        (fn, fnn) =>
        (...args) =>
          // @ts-ignore I know it "could" be undefined but it wont be
          this.Functions[fn || fnn](util, ...args);
      const bindHere = (fn) => fn.bind(this);

      // Setting  sbfunc
      lua.global.set('sbfunc', async (...args) => {
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
      lua.global.set('sprite', {switch: (name) => runtime.setEditingTarget(runtime.getSpriteTargetByName(Cast.toString(name)) || runtime.getTargetForStage()), x: () => util.target.x, y: () => util.target.y, direction: () => util.target.direction, size: () => Math.round(util.target.size), trueSize: () => util.target.size, rotationStyle: () => util.target.rotationStyle, costume: (type) => (Cast.toString(type) === 'name' ? util.target.getCostumes()[util.target.currentCostume].name : util.target.currentCostume + 1)});

      // Custom category: MathUtil
      lua.global.set('MathUtil', this.MathUtil);

      // Category: motion
      lua.global.set('motion', {move: ref('motion_moveSteps'), moveSteps: ref('motion_moveSteps'), turn: ref('motion_turn'), rotate: ref('motion_turn'), goTo: ref('motion_goTo'), setPos: ref('motion_goTo'), set: ref('motion_goTo'), XY: ref('motion_goTo'), changePos: ref('motion_changePos'), change: ref('motion_changePos'), transform: ref('motion_changePos'), setX: ref('motion_setX'), X: ref('motion_setX'), setY: ref('motion_setY'), Y: ref('motion_setY'), changeX: ref('motion_changeX'), changeY: ref('motion_changeY'), pointInDir: ref('motion_pointInDir'), point: ref('motion_pointInDir'), setRotationStyle: ref('motion_setRotationStyle'), RotStyle: ref('motion_setRotationStyle'), RotationStyle: ref('motion_setRotationStyle'), ifOnEdgeBounce: ref('motion_ifOnEdgeBounce')});
      // These require async support:
      //   motion_glideTo
      //   motion_glideSecsToXY
      // Category: looks
      lua.global.set('looks', {say: ref('looks_say'), sayForSecs: ref('looks_sayForSecs'), think: ref('looks_think'), thinkForSecs: ref('looks_thinkForSecs'), show: ref('looks_show'), hide: ref('looks_hide')});
      // Category: events
      lua.global.set('events', {broadcast: ref('events_broadcast')});
      // Category: control
      lua.global.set('control', {wait: ref('control_wait')});
      // Category: data
      lua.global.set('data', {
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
      lua.global.set('Cast', Cast);

      // Custom category: JS
      lua.global.set('JS', {
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
      lua.global.set('scratch', {
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
          if (this.DEBUG) console.trace(`runBlock_LUA | Ran ${EXT}_${OPCODE} and got:\n`, formatRes(res));
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
                await window._luaExtensionLoader(Scratch);
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
            delete window._luaExtensionLoader;
          }
        },
        _loadObject(object) {
          // @ts-ignore
          window._luaExtensionLoader = object;
          // A extension to load the LUA extension
          return this._loadHack(this._scratchLoader);
        },
      });
    }

    // Some "secret" stuff for lua to use :3
    async secret_load({url}) {
      return await vm.extensionManager.loadExtensionURL(Cast.toString(url));
    }
    secret_injectFunction({namespace, args, js}) {
      lua.global.set(Cast.toString(namespace), new Function('lua', ...args.split(' '), js).bind(window, lua));
    }

    // Running, etc...
    setScratchCommandsEnabled({INIT}) {
      this.DO_INIT = Cast.toBoolean(INIT);
    }

    async runLua({ CODE }, util) {
      if (!canRunLUA) return '';

      if (this.DO_INIT) this.initLuaCommands(util);

      try {
          const result = await lua.doString(Cast.toString(CODE));
          try {
              lua.global.pop();
          } catch (popError) {
              console.warn('Lua stack pop error:', popError);
          } // pop the return value from the Lua stack
            this._curErrorMsg = '';
          return result ?? '';
      } catch (error) {
          const message = typeof error?.message === 'string' ? error.message : Cast.toString(error);
          this._lastErrorMsg = message;
          this._curErrorMsg = message;
          util.startHats('Drago0znzwLua_onError');
          return '';
      }
}

  }
  // need to find out how to get this to work without screwing up the vm.

  runtime.on('PROJECT_START', () => reloadOnStart && resetLua());
  runtime.on('PROJECT_STOP_ALL', () => reloadOnStart && resetLua());

  Scratch.extensions.register((runtime.ext_secret_dragonianlua = new extension()));
})(Scratch);