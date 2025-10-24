/**!
 * DragoTileMaps
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * @comment Main development by Drago Cuven
 * Do not remove this comment.
 */

(async function (Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('"Dragonian Lua" must be ran unsandboxed.');
    }

    let maps = {};
    const extID = 'DragoTileMaps';
    const extName = 'Tile Maps';
    class Extension {
        constructor() {
            // current map context for `within map` block
            this._currentMap = null;
        }
        getInfo() {
            return {
                id: extID,
                name: extName,
                color1: '#4b2b00ff',
                blocks: [
    // --- Map Management ---
    {
        opcode: 'addMap',
        blockType: Scratch.BlockType.COMMAND,
        text: 'add map named [MAP] using height: [H] width: [W] layers: [L]',
        arguments: {
            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'myMap' },
            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            L: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
        }
    },
    {
        opcode: 'removeMap',
        blockType: Scratch.BlockType.COMMAND,
        text: 'remove map named [MAP]',
        arguments: {
            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'myMap' }
        }
    },
    {
        opcode: 'loadedMaps',
        blockType: Scratch.BlockType.REPORTER,
        text: 'loaded maps'
    },

    // --- Map Assets ---
    {
        opcode: 'mapAsset',
        blockType: Scratch.BlockType.REPORTER,
        text: 'map [MAP]\'s [ASSET]',
        arguments: {
            MAP: { type: Scratch.ArgumentType.STRING, menu: 'mapsMenu' },
            ASSET: { type: Scratch.ArgumentType.STRING, menu: 'assetMenu' }
        }
    },

    // --- Tile Access ---
    {
        opcode: 'idOfTile',
        blockType: Scratch.BlockType.REPORTER,
        text: 'id of tile at x:[X] y:[Y] on layer [L]',
        arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            L: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
        }
    },
    {
        opcode: 'tileAt',
        blockType: Scratch.BlockType.REPORTER,
        text: 'tile at [ID]',
        arguments: {
            ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
        }
    },

    // run a substack with a map context (C-shaped block)
    {
        opcode: 'withinMap',
        blockType: Scratch.BlockType.CONDITIONAL,
        text: 'within map [MAP] do',
        arguments: {
            MAP: { type: Scratch.ArgumentType.STRING, menu: 'mapsMenu' }
        },
        branchCount: 1
    },

    // --- Tile Variables ---
    {
        opcode: 'setTileVar',
        blockType: Scratch.BlockType.COMMAND,
        text: 'set [VAR] of tile [ID] to [VAL]',
        arguments: {
            VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
            ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            VAL: { type: Scratch.ArgumentType.STRING, defaultValue: 'air' }
        }
    },
    {
        opcode: 'getTileVar',
        blockType: Scratch.BlockType.REPORTER,
        text: 'variable [VAR] of tile [TILE]',
        arguments: {
            VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
            TILE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
        }
    }
],

                        menus: {
            mapsMenu: {
                acceptReporters: true,
                items: 'getLoadedMaps'
            },
            assetMenu: {
                acceptReporters: true,
                items: ['width', 'height', 'layers', 'tile count', 'layered tile count']
            }
        }
            };
        }

        // --- Block implementations ---

        addMap(args) {
            const name = String(args.MAP || 'myMap');
            const h = Math.max(0, Math.floor(Number(args.H) || 0));
            const w = Math.max(0, Math.floor(Number(args.W) || 0));
            const layers = Math.max(1, Math.floor(Number(args.L) || 1));
            if (!name) return;
            // create a map object with layers, each layer is a 2D array of tile ids (0 = empty)
            const map = {
                name,
                width: w,
                height: h,
                layers: layers,
                tiles: [], // flat array of tile objects by id (1-based)
                data: [] // array of layers, each layer is height x width array of ids
            };
            // initialize layers
            for (let l = 0; l < layers; l++) {
                const layer = [];
                for (let y = 0; y < h; y++) {
                    const row = [];
                    for (let x = 0; x < w; x++) row.push(0);
                    layer.push(row);
                }
                map.data.push(layer);
            }
            // default tile 1 is 'air'
            map.tiles.push({ id: 1, name: 'air', vars: {} });
            maps[name] = map;
            return;
        }

        removeMap(args) {
            const name = String(args.MAP || '');
            if (!name) return;
            if (maps[name]) delete maps[name];
        }

        loadedMaps() {
            const keys = Object.keys(maps);
            if (keys.length === 0) return 'none';
            return keys.join(', ');
        }

        mapAsset(args) {
            const name = String(args.MAP || '');
            const asset = String(args.ASSET || '').toLowerCase();
            const map = (this._currentMap && maps[this._currentMap]) || maps[name] || null;
            if (!map) return '';
            switch (asset) {
                case 'width': return map.width;
                case 'height': return map.height;
                case 'layers': return map.layers;
                case 'tile count': return map.tiles.length;
                case 'layered tile count': return map.tiles.length * map.layers;
                default: return '';
            }
        }

        idOfTile(args) {
            const x = Math.floor(Number(args.X) || 0);
            const y = Math.floor(Number(args.Y) || 0);
            const layer = Math.max(1, Math.floor(Number(args.L) || 1));
            // prefer current map context, otherwise default to first map
            const mapNames = Object.keys(maps);
            if (mapNames.length === 0) return 0;
            const map = (this._currentMap && maps[this._currentMap]) || maps[mapNames[0]];
            if (!map) return 0;
            // x,y are assumed 1-based in block UI
            const xi = x - 1;
            const yi = y - 1;
            const li = layer - 1;
            if (li < 0 || li >= map.layers) return 0;
            if (xi < 0 || xi >= map.width || yi < 0 || yi >= map.height) return 0;
            return map.data[li][yi][xi] || 0;
        }

        tileAt(args) {
            const id = Math.floor(Number(args.ID) || 0);
            const mapNames = Object.keys(maps);
            if (mapNames.length === 0) return '';
            const map = (this._currentMap && maps[this._currentMap]) || maps[mapNames[0]];
            if (!map) return '';
            const tile = map.tiles.find(t => t.id === id);
            if (!tile) return '';
            // return a simple JSON string describing the tile (Scratch reporters expect strings/numbers)
            try {
                return JSON.stringify({ id: tile.id, name: tile.name });
            } catch (e) {
                return '';
            }
        }

        setTileVar(args) {
            const v = String(args.VAR || '');
            const id = Math.floor(Number(args.ID) || 0);
            const val = args.VAL;
            const mapNames = Object.keys(maps);
            if (mapNames.length === 0) return;
            const map = (this._currentMap && maps[this._currentMap]) || maps[mapNames[0]];
            if (!map) return;
            const tile = map.tiles.find(t => t.id === id);
            if (!tile) return;
            tile.vars = tile.vars || {};
            tile.vars[v] = val;
        }

        getTileVar(args) {
            const v = String(args.VAR || '');
            const id = Math.floor(Number(args.TILE) || 0);
            const mapNames = Object.keys(maps);
            if (mapNames.length === 0) return '';
            const map = (this._currentMap && maps[this._currentMap]) || maps[mapNames[0]];
            if (!map) return '';
            const tile = map.tiles.find(t => t.id === id);
            if (!tile) return '';
            return (tile.vars && Object.prototype.hasOwnProperty.call(tile.vars, v)) ? tile.vars[v] : '';
        }

        // run blocks inside a map context
        withinMap(args, util) {
            const mapName = String(args.MAP || '');
            if (!mapName || !maps[mapName]) return;
            // If we're resuming after the branch, restore the previous map and clean up.
            if (util.stackFrame && util.stackFrame._previousMapResolved) {
                // already restored once, nothing to do
                return;
            }

            if (util.stackFrame && util.stackFrame._previousMap !== undefined) {
                // We're resuming after the substack finished. Restore and mark resolved.
                this._currentMap = util.stackFrame._previousMap;
                util.stackFrame._previousMapResolved = true;
                delete util.stackFrame._previousMap;
                return;
            }

            // First invocation: set previous map and start branch
            if (util.stackFrame) {
                util.stackFrame._previousMap = this._currentMap;
            }
            this._currentMap = mapName;
            // start the single branch (index 1). The second argument true tells the VM to
            // resume this block after the branch completes so we can restore the context.
            util.startBranch(1, true);
        }

        // menus
        getLoadedMaps() {
            // return array of map names (strings) for Scratch menus; return ['none'] if empty
            const keys = Object.keys(maps);
            if (keys.length === 0) return ['none'];
            return keys;
        }

    }

    Scratch.extensions.register(new Extension());
})(Scratch);