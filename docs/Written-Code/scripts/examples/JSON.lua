-- Wipe and load util. (this is good practice)
scratch.wipeUtil()
scratch.preserveUtil()

-- Arrays :o
local res = JS.Array.new();
res.push(1)
print('js array.at', res.at(0))

-- JSON: Arrays
local res2 = JS.JSON.parse('[1,2,3]')
res2.pop() -- [1,2]
print('json parse and stringify arrays', JS.JSON.stringify(res2))

-- JSON: Objects
local res3 = JS.JSON.parse('{"test": 1}')
print('test value', res3.test)
print('stringify object', JS.JSON.stringify(res3))

-- Lua compat test: Arrays
local lres = {}
lres[0] = 5
-- Lua uses indexed objects to replicate arrays
-- so we need to convert from an indexed object to a javascript array
--print('stringified from indexed', JS.JSON.stringify(JS.Array.fromIndexed(lres))) -- <--- WIP!!!
local lres2 = JS.Array.toIndexed(res)
print('stringified to indexed', JS.JSON.stringify(lres2))

-- Lua compat test: Objects
local lres3 = {}
lres3.test = 5
print('stringified object', JS.JSON.stringify(lres3))