-- Wipe and load util. (this is good practice)
scratch.wipeUtil()
scratch.preserveUtil()

-- These functions may or may not exists
-- DO NOT rely on this it is a test.
data.test_PassToMe(data.test_Array(1, 2, 3))

-- test: passed, arrays work