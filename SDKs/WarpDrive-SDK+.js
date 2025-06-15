// @ts-no-check

/**!
 * @Id WarpDriveAdvancedSDK
 * @name WarpDrive Advanced SDK
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * @author Drago Cuven
 * @description This is the advanced version of the WarpDrive SDK, which allows you to create games for the WarpDrive console.
 * Do not remove this comment
 */
// @ts-ignore
(async function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('The "WarpDrive SDK" must be ran unsandboxed.');
  }

  const menuIconURI =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABDCAMAAAD5/+g7AAACjlBMVEUAAAD/AP+AgICqVaq/QL+ZM5mqVaq2SbafQJ+qVaqzTbOiRqKqVaqdTp2kSaSqRKqfUJ+lS6WqR6qhUaGmTaaqSaqmTqaqSqqjR6OqTKqkSaSnT6eqTaqlSqWnUKeiTaKlS6WoSaijTqOoSqimTaaoS6ikT6SmTaaoS6ikSqSmTqaoTKilSqWnTqeoTailS6WnSqekTaSlTKWnSqekTaSmTKakTqSmTaanS6elSqWmTaanTKelS6WmTaanTKelS6WoTailS6WoTainS6ekTaSmTKanS6emTaanTKelS6WmTaanTKelS6WmTaalS6WmTaanTaelTKWmS6anTaelTaWmTKalTaWmTaalS6WmTaalS6WmTaanTKelTKWnTaelTKWmS6anTaemTKamS6anTaelS6WmTaamTaanTKelS6WmTaanTKelTKWmS6anTaelTKWmS6anTaemTKamTKanTaemTKamTKamTaamTKalS6WmTaamTKamTaalTKWmS6anTaelTKWmS6amTKamTKanS6emTKamTKamTKalTKWmTaamTKalTKWmTKalTKWmS6anTaemTKanTaemTKamTKanS6emTKamTKanTKemTaamTKalTKWmTaamTKamS6amTKalTKWmTKamTaamTKamTaamTKamTKamTKanTKemTaalTKWmS6amTKamTKamTKamTKamTKamTaamTKamTKamS6amTKamTKamTKanTKemTaanTKemS6amTKalTKWmTKamTKamTKamTaamTKamTKamTKamTKamTKamTKamTKamTKamTKamTaamTKamTKamTKalTKWmTKamTKamTKamTKamTaamTKamTKamTKamTKamTKb////F9taKAAAA2HRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFxgZGxwdHh8gISIjJCYoKSorLC0uLzAxMjM0NTY3ODk7PD0+P0BBQkNERkdJS0xNTlBRUlNUVVZYWVpbXF1gYWNkZmdpamtsbm9wcXJzdHd4e3x9fn+AgYKDhIWGh4iJioyNjo+QkpSVlpeYmpucnZ6hoqOkpaeoqaqrra6vsLGys7S1tre4uru8vb7AwcPFxsfIysvMzs/Q0dLT1NXW2Nnb3N7f4OHi4+Xm5+jp6uvs7e7v8PLz9PX29/j5+vv8/f6V5NycAAAAAWJLR0TZdwp3OAAABDpJREFUGBmtwYtDEwUABvBvw82IBoGWqSCIpkJq+EgFX2RIhSUmmVhaEeKj1FB7qGUa5QOMNE0STNIylUAU0iARzJTHCHHA2H1/Trvd3Xa33bZD/f3gVoxHYi6z8SiUsT0eD2+kg2wZBwPMsWNG2RBMAd3aZiKUcSs+/7Ghlx53z3/73hQEOkuRY30E9EXlHLpNf7dLZkHLNkBJzRwEMr94zEF9DW+YoZJBr4qFJmhEb2hhCPWL4VNAxy0qrq2LhteIbXaGJuyNhOIAy6bZqagdDZmlwM7wGuMhq+LrmN1JydHHIcu8TkPaJkNSNxgHJF2haKcJkugSgQa1J8PjRg3cova5yA2Qpd+kcdfjIGr+Bh7PfbcWEtN6J4eiAqJrhdCKOs4hWgm3upXQeKqGQ9URA6BqCdSSmjh0mwB8nQmVpFaG0d3lpL+OJ4DCLPjE32BQAxd3L0+Lg1tk6rJdtQJlbXWDzAPm58JrZBODuP/Dimi4JWbkrsnPz1s43pTw/qm7g33NR96tIFkJ2IqgsP5GfZfyYwBM23y2i4ru6sIpwxAxa89/dBuwAW9CcZB67uyaDCBhRyv9OW73UbYASIdsNQM5K16xAJh3cpAhbQDirPCYeI/+rhc9A7dFvzKcUigsl6nVc2AOREt+Z3jVUBRRozbfBtHiSzSiAbL4e/Rp/2wCROacyzTmb8iO0utC3mPwyKyjUX9BkuKixHF4GiRpv9C4RkhO0OPPdTGQJJcLHILz8EgRSPaXZ0D29N4B+lwtnJOaVS4whFJ4fEXe3DgKssiPeujTs8oE0VqGsA2iqK7T2RFQ5LRQxT4dshoGuOOiZAVEY8bD69lqarwExQ76Eao6KUuAlvXDPmpUwetjanVv7aCsDVqzG+lnObwqqdHwcgcVpVCz7HTR3yQoEp1UO5l6i15LoTLhDwaaAZn5NFWE7aOb6dVphc/ye9SxFRLzfqrcz7XV06cEXuZigXp60yFKrqbKP2kRp6gyE4rhxxnE4OG8rLdPOKnSmIAvqHIOiuEVNO7ck3iLapmQRZ6hcaVWzHVS1lVfXbkPMtP3NK7YhBGtFF3csiAWasU0zLUGMP1E0nVwEvwkCTRqIBfAByS75iJAHI1yLAWQ1k8yHYFMvTSmZxEAy1WS9dBziYbYX4DbRrpdhp59NOLOVLiNvU83YSJ0vEoD2lMgKqPH+QgEsvUxrM6pEKW6KNkOHUcZTncaPI5Q8Q4CLWAYffPhkeCkQliPQBcYkmsZJJvoswWBMhjSWsgaqRhYBT2HGMKXkI2lwp4JXbGtDOrMMMhyKKtJRBDTexlEUywUm+kh7LEiqOx+6up/Hl6fUNS0GKFk91FPAXw+JdlfHInQZt9ioJ9N8FlF4dhEhDXqJP31JkJlRuV0GPJaM7WK8GAs+Y1UabLggc3b20LFajyUCSt3V1z51842K4z6H3DnGJJr/OhzAAAAAElFTkSuQmCC';

  const extId = 'WarpDriveAdvancedSDK';
  const {Cast, BlockType, ArgumentType, vm} = Scratch;
  const {runtime} = vm;

  function reloadBlocks(){Scratch.vm.extensionManager.refreshBlocks()}

  const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = cbfsb(blockInfo, categoryInfo);
    if (blockInfo.outputShape) {
      res.json.outputShape = blockInfo.outputShape;
    }
    return res;
  };

  //console variables

  // Console state variables (simulate hardware/OS data)
  let warpDriveType = "any"; // "home", "handheld", "any"
  let connectedControllers = [true, false, false, false]; // 4 controllers: true if connected
  let controllerInputs = [
    {A: false, B: false, C: false, X: false, Y: false, Z: false, LB: false, RB: false, LT: false, RT: false, Start: false, Select: false, DPadUp: false, DPadDown: false, DPadLeft: false, DPadRight: false},
    {A: false, B: false, C: false, X: false, Y: false, Z: false, LB: false, RB: false, LT: false, RT: false, Start: false, Select: false, DPadUp: false, DPadDown: false, DPadLeft: false, DPadRight: false},
    {A: false, B: false, C: false, X: false, Y: false, Z: false, LB: false, RB: false, LT: false, RT: false, Start: false, Select: false, DPadUp: false, DPadDown: false, DPadLeft: false, DPadRight: false},
    {A: false, B: false, C: false, X: false, Y: false, Z: false, LB: false, RB: false, LT: false, RT: false, Start: false, Select: false, DPadUp: false, DPadDown: false, DPadLeft: false, DPadRight: false}
  ];
  let userProfiles = [
    {name: "Player1", gamerscore: 1000, friends: 5, connected: true},
    {name: "", gamerscore: 0, friends: 0, connected: false},
    {name: "", gamerscore: 0, friends: 0, connected: false},
    {name: "", gamerscore: 0, friends: 0, connected: false}
  ];
  let dbStorage = {}; // Simulated DBStorage

  class extension {
    constructor() {
      this.DEBUG = true;
    }
    getInfo() {
      return {
        id: extId,
        name: 'WarpDrive',
        color1: '#a64ca6',
        menuIconURI,
        blocks: [
            {blockType: BlockType.LABEL, text: 'Data'},
            "---",
            {blockType: BlockType.COMMAND, opcode: 'dbSet', text: 'save [DATA] as [KEY]', arguments: {
              DATA: {type: ArgumentType.STRING, defaultValue: "value"},
              KEY: {type: ArgumentType.STRING, defaultValue: "save1"}
            }},
            {blockType: BlockType.REPORTER, opcode: 'dbGet', text: 'load [KEY]', arguments: {
              KEY: {type: ArgumentType.STRING, defaultValue: "save1"}
            }},
            {blockType: BlockType.COMMAND, opcode: 'dbDelete', text: 'delete [KEY]', arguments: {
              KEY: {type: ArgumentType.STRING, defaultValue: "save1"}
            }},
            {blockType: BlockType.REPORTER, opcode: 'dbHas', text: '[KEY] exists?', arguments: {
              KEY: {type: ArgumentType.STRING, defaultValue: "save1"}
            }},
            "---",
            {blockType: BlockType.LABEL, text: 'Console'},
            "---",
            {blockType: BlockType.BOOLEAN, opcode: 'isWarpDriveType', text: 'WarpDrive [TYPE]?', arguments: {
              TYPE: {type: ArgumentType.STRING, menu: 'warpDriveTypes', defaultValue: "any"}
            }},
            {blockType: BlockType.REPORTER, opcode: 'getWarpDriveType', text: 'current WarpDrive type'},
            {blockType: BlockType.REPORTER, opcode: 'getFirmwareVersion', text: 'firmware version'},
            {blockType: BlockType.REPORTER, opcode: 'getSystemLanguage', text: 'system language'},
            "---",
            {blockType: BlockType.LABEL, text: 'Controllers'},
            "---",
            {blockType: BlockType.REPORTER, opcode: 'getControllersConnected', text: 'controllers connected'},
            {blockType: BlockType.BOOLEAN, opcode: 'isControllerConnected', text: 'controller [PORT] connected?', arguments: {
              PORT: {type: ArgumentType.NUMBER, defaultValue: 1}
            }},
            {blockType: BlockType.BOOLEAN, opcode: 'controllerButton', text: 'controller [PORT] button [BUTTON] pressed?', arguments: {
              PORT: {type: ArgumentType.NUMBER, defaultValue: 1},
              BUTTON: {type: ArgumentType.STRING, menu: 'controllerButtons', defaultValue: "A"}
            }},
            "---",
            {blockType: BlockType.LABEL, text: 'User'},
            "---",
            {blockType: BlockType.REPORTER, opcode: 'getUserName', text: 'player [NUM] name', arguments: {
              NUM: {type: ArgumentType.NUMBER, defaultValue: 1}
            }},
            {blockType: BlockType.REPORTER, opcode: 'getUserGamerscore', text: 'player [NUM] gamerscore', arguments: {
              NUM: {type: ArgumentType.NUMBER, defaultValue: 1}
            }},
            {blockType: BlockType.REPORTER, opcode: 'getUserFriends', text: 'player [NUM] friends', arguments: {
              NUM: {type: ArgumentType.NUMBER, defaultValue: 1}
            }},
            {blockType: BlockType.BOOLEAN, opcode: 'isUserConnected', text: 'player [NUM] connected?', arguments: {
              NUM: {type: ArgumentType.NUMBER, defaultValue: 1}
            }},
        ],
        menus: {
          warpDriveTypes: {
            acceptReporters: true,
            items: ['home', 'handheld', 'any']
          },
          controllerButtons: {
            acceptReporters: true,
            items: ['A', 'B', 'C', 'X', 'Y', 'Z', 'LB', 'RB', 'LT', 'RT', 'Start', 'Select', 'DPadUp', 'DPadDown', 'DPadLeft', 'DPadRight']
          }
        },
      };
    }

    // Data (DBStorage simulation)
    dbSet(args) { dbStorage[args.KEY] = args.DATA; }
    dbGet(args) { return dbStorage.hasOwnProperty(args.KEY) ? dbStorage[args.KEY] : ""; }
    dbDelete(args) { delete dbStorage[args.KEY]; }
    dbHas(args) { return dbStorage.hasOwnProperty(args.KEY); }

    // Console
    isWarpDriveType(args) {
      if (args.TYPE === "any") return true;
      return warpDriveType === args.TYPE;
    }
    getWarpDriveType() { return warpDriveType; }
    getFirmwareVersion() { return "1.0.0"; }
    getSystemLanguage() { return "en-US"; }

    // Controllers
    getControllersConnected() {
      return connectedControllers.filter(Boolean).length;
    }
    isControllerConnected(args) {
      const idx = (args.PORT|0) - 1;
      return connectedControllers[idx] || false;
    }
    controllerButton(args) {
      const idx = (args.PORT|0) - 1;
      if (!connectedControllers[idx]) return false;
      return !!controllerInputs[idx][args.BUTTON];
    }

    // User
    getUserName(args) {
      const idx = (args.NUM|0) - 1;
      if (!userProfiles[idx] || !userProfiles[idx].connected) return "";
      return userProfiles[idx].name;
    }
    getUserGamerscore(args) {
      const idx = (args.NUM|0) - 1;
      if (!userProfiles[idx] || !userProfiles[idx].connected) return 0;
      return userProfiles[idx].gamerscore;
    }
    getUserFriends(args) {
      const idx = (args.NUM|0) - 1;
      if (!userProfiles[idx] || !userProfiles[idx].connected) return 0;
      return userProfiles[idx].friends;
    }
    isUserConnected(args) {
      const idx = (args.NUM|0) - 1;
      return !!(userProfiles[idx] && userProfiles[idx].connected);
    }

    // no-op functions ignore these and leave them blank
    isWarpDrive() {
      return isWarpDrive;
    }

}
  Scratch.extensions.register((new extension()));
})(Scratch);
