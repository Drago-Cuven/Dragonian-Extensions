-- Wipe and load util. (this is good practice)
wipeScratchUtil();
preserveScratchUtil();

-- Run exponent.
-- this is a block that returns,
-- and takes arguments so...
-- its a good example :3
local res = tonumber(runBlock(
    "utilities",
    "exponent",
    "{\"A\":5, \"B\":2}"
));

-- Get "my variable"
-- Act like its starting at 25
local myv = tonumber(getScratchVar(
    "my variable"
));

-- Return the added values.
-- If A is 5 and B is 2 exponent will return 25,
-- And say "my variable" is also 25.
-- It should return 50 under thoes cases.
-- With no errors!!
return(
    res + myv
);