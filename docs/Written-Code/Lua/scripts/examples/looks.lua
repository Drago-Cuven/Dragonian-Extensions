-- Wipe and load util. (this is good practice)
scratch.wipeUtil()
scratch.preserveUtil()

-- Example looks script

looks.show()
looks.say("hello, world!")
looks.say('Hello, world!', 2):await()
looks.show()
looks.hide()
control.wait(1):await()
looks.think('Thinking...')

--looks.setEffect(string:[...effects], number)
--looks.clearEffect(string:[...effects]) if effect is "all" then it just sets all to 0
--looks.setSize(number<0..-LIMIT>)
--looks.setScale(number<[0..-LIMIT] / 100>)
--looks.changeSize(number)
--looks.changeScale(number)
--looks.setCostume(number|string)
--looks.changeCostume(number)
--looks.getCostume(string:'number'|'name')
--looks.nextCostume()
--looks.lastCostume()

