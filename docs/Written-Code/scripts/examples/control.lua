-- Wipe and load util. (this is good practice)
scratch.wipeUtil()
scratch.preserveUtil()

-- Example control script

print('Waiting 1 second!')
control.wait(1):await()
print('Wait over!')

-- repeat 10
--for i = from, to, skip by (optional)
for i = 1, 10 do
    print('For loop iter' + Cast.toString(i))
end

-- while <<w < 10> or <w = 10>> (scratch terms)
local w = 1
while w <= 10 do
    print('While loop iter' + Cast.toString(w))
    w = w + 1 --which would prevent infinite loop (try doing this with bools) 
    -- this should run when w is 5 making "print" run 5 times
    if w == 5 then
        break
end
end

--control.forever()
--[[
while true do
    print("THIS WILL WORK")
end
]]--
