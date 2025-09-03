a = "a"
Switch(a)
  :case("a", function() data.setVar("my variable", "first value") end)
  :case("b", function() data.setVar("my variable", "second value") end)
  :case("c", function() data.setVar("my variable", "third value") end)
  :default(function() data.setVar("my variable", "fallback value") end)
  :run()
