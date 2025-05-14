-- Wipe and load util. (this is good practice)
scratch.wipeUtil()
scratch.preserveUtil()

-- We do it like this because you should put in some effort
-- for dangerous features --i agree.
scratch.runBlock(
    'secret_dragonianlua',
    'secret_load',
    '{"url": "https://extensions.turbowarp.org/utilities.js"}'
):await();

-- Writing and using a custom js function
scratch.runBlock(
    'secret_dragonianlua',
    'secret_injectFunction',
    '{"namespace": "alert", "args": "text", "js": "alert(text);"}'
):await();
alert('Hello onee-chan!')

local res = scratch.fetch('https://extensions.turbowarp.org/hello.txt'):await()
alert(res.text():await())