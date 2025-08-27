-- Basic object examples:
function createObject(name, value)
    local obj = {}

    obj.name = name
    obj.value = value

    function obj.addValue(val)
        obj.value = obj.value + val
        print("New value: " .. obj.value)
    end

    return obj
end

--[[
local object1 = createObject("Object1", 10)
local object2 = createObject("Object2", 20)

object1.addValue(5)
object2.addValue(10)
]]