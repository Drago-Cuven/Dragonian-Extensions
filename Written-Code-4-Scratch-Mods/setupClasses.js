//general class setups

      setupClasses() {
        const MathUtil = {
          PI: Math.PI,
          E: Math.E,
          degToRad: (deg) => deg * (Math.PI / 180),
          radToDeg: (rad) => rad * (180 / Math.PI),
        };
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
          looks_sayForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.sayforsecs.call(runtime.ext_scratch3_looks, { MESSAGE: msg, SECS: secs }, util),
          looks_think: (util, msg) => runtime.emit(runtime.ext_scratch3_looks.SAY_OR_THINK, util.target, 'think', Cast.toString(msg)),
          looks_thinkForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.thinkforsecs.call(runtime.ext_scratch3_looks, { MESSAGE: msg, SECS: secs }, util),
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
          events_broadcast: (util, msg) => util.startHats("event_whenbroadcastreceived", { BROADCAST_OPTION: msg }),
          // @ts-ignore
          events_broadcastandwait: (util, msg) => 0,
  
  
          // Control
          // @ts-ignore
          control_wait: (_, seconds) => new Promise(resolve => setTimeout(resolve, Cast.toNumber(seconds) * 1000)),
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