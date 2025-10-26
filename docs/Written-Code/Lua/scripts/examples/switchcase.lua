local mood = "happy"

local emoji = Switch(mood, {
    happy   = "😄",
    sad     = "😢",
    angry   = "😡",
    tired   = "😴",
    excited = "🤩"
}, "😐")

looks.say(emoji, 3):await()

local nextMood = "angry"
local nextEmoji = ""

Switch(nextMood, {
    happy = function() nextEmoji = "😄" end,
    sad   = function() nextEmoji = "😢" end,
    angry = function() nextEmoji = "😡" end,
    tired = function() nextEmoji = "😴" end
}, function() nextEmoji = "😐" end)

looks.say(nextEmoji, 3):await()
