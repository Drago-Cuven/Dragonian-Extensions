function closureObject(callback)
  local object = {}
  object = callback(object)
  return object
end
function closureArray(callback)
  local array = JS.Array.new()
  array = callback(array)
  return array
end
function createExtension(Scratch)
  local extension = {}
  function extension.getInfo()
    return closureObject(function(info)
      info.id = '0znzwLuaExtensionTest'
      info.name = 'Written in lua'
      info.color1 = '#0b0080'
      info.color2 = '#00006b'
      info.blocks = closureArray(function(blocks)
        blocks.push(closureObject(function(block)
          block.opcode = 'sum'
          block.blockType = Scratch.BlockType.REPORTER
          block.text = '[a] + [b]'
          block.arguments = closureObject(function(arguments)
            arguments.a = closureObject(function(argument)
              argument.type = Scratch.ArgumentType.NUMBER
              argument.defaultValue = 5
              return argument
            end)
            arguments.b = closureObject(function(argument)
              argument.type = Scratch.ArgumentType.NUMBER
              argument.defaultValue = 5
              return argument
            end)
            return arguments
          end)
          return block
        end))
        return blocks
      end)
      return info
    end)
  end
  function extension.sum(args)
    return tonumber(args.a) + tonumber(args.b)
  end
  Scratch.extensions.register(extension)
end

-- Use the extension loader
scratch._loadObject(createExtension):await()