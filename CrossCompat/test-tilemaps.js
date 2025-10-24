// Quick smoke test to require Tile Maps.js without full Scratch runtime
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const file = path.join(__dirname, 'Tile Maps.js');
const src = fs.readFileSync(file, 'utf8');

// minimal Scratch stub
const Scratch = {
  extensions: { register: (ext) => { /* ignore */ } },
  BlockType: { COMMAND: 'command', REPORTER: 'reporter', BOOLEAN: 'boolean' },
  ArgumentType: { STRING: 'string', NUMBER: 'number' }
};

const script = new vm.Script(src, { filename: file });
const context = vm.createContext({ Scratch, console, require, module, exports });
try {
  script.runInContext(context);
  console.log('Tile Maps parsed and executed with stub Scratch.');
} catch (e) {
  console.error('Error executing Tile Maps:', e);
  process.exit(1);
}
