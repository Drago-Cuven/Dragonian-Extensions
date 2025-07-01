// @ts-no-check

/**!
 * DragoPython
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * @comment Main development by Drago Cuven
 * @comment With help from.. alot of people (check the code)
 * Do not remove this comment
 */
// @ts-ignore
(async function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('"Dragonian Python" must be ran unsandboxed.');
  }

  const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTEuMTYxMzUiIGhlaWdodD0iMTEyLjM4OSIgdmlld0JveD0iMCwwLDExMS4xNjEzNSwxMTIuMzg5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjE4NC40MTkzMiIgeTE9IjEyMy44MDU1IiB4Mj0iMjQ1Ljc0NTQ3IiB5Mj0iMTc3LjA3NzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWE5ZmQ0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzA2OTk4Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjI1NC4zNTAwMiIgeTE9IjIyMS4zNTM1NCIgeDI9IjIzMi40NTA0OCIgeTI9IjE5MC4wNzAzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0yIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmQ0M2IiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmU4NzMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg0LjQxOTMyLC0xMjMuODA1NSkiPjxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjUzLjMwNjg2LDEyNC45MDAxN2M3LjI3NjI3LDEuMjEyNzIgMTMuNDA2MjUsNi42NzExNiAxMy40MDYyNSwxMy45Mzc1djI1LjUzMTI1YzAsNy40ODY4NCAtNS45NTEzLDEzLjYyNSAtMTMuNDA2MjUsMTMuNjI1aC0yNi43ODEyNWMtOS4wOTI4NiwwIC0xNi43NSw3LjgwNjM1IC0xNi43NSwxNi42NTYyNXYxMi4yNWgtOS4yMTg3NWMtNy43OTI0NiwwIC0xMi4zNDQwNywtNS42NTU5IC0xNC4yNSwtMTMuNTkzNzVjLTIuNTcxMDIsLTEwLjY2Mzk4IC0yLjQ2MTgyLC0xNy4wMzcwMyAwLC0yNy4yNWMyLjEzNDI0LC04LjkxMDAzIDguOTU3NTQsLTEzLjU5Mzc1IDE2Ljc1LC0xMy41OTM3NWgxMC4wNjI1aDI2LjgxMjV2LTMuNDA2MjVoLTI2LjgxMjV2LTEwLjIxODc1YzAsLTcuNzM3NCAyLjA2MDAzLC0xMS45MzMgMTMuNDA2MjUsLTEzLjkzNzVjMy44NTE1NiwtMC42ODE1MyA4LjIyODg1LC0xLjA3MjQ1IDEyLjgxMjUsLTEuMDkzNzVjNC41ODM2NSwtMC4wMjEzIDkuMzYyNzYsMC4zMjcwMiAxMy45Njg3NSwxLjA5Mzc1ek0yMTkuODA2ODYsMTM3LjE1MDE3YzAsMi44MTYzMyAyLjI1MTc3LDUuMDkzNzUgNS4wMzEyNSw1LjA5Mzc1YzIuNzY5NTUsMCA1LjAzMTI1LC0yLjI3NzQxIDUuMDMxMjUsLTUuMDkzNzVjMCwtMi44MjYzNSAtMi4yNjE3LC01LjEyNSAtNS4wMzEyNSwtNS4xMjVjLTIuNzc5NDgsMCAtNS4wMzEyNSwyLjI5ODY1IC01LjAzMTI1LDUuMTI1eiIgZmlsbD0idXJsKCNjb2xvci0xKSIvPjxwYXRoIGQ9Ik0yODAuMTE5MzYsMTUyLjQ2MjY3YzcuODAyMzcsMCAxMS40ODA0Niw1LjgzNjMxIDEzLjQwNjI0LDEzLjU5Mzc1YzIuNjgwMjIsMTAuNzc0MjIgMi43OTkzMywxOC44NTExMSAwLDI3LjI1Yy0yLjcwOTk5LDguMTU4MzQgLTUuNjEzNzgsMTMuNTkzNzUgLTEzLjQwNjI0LDEzLjU5Mzc1aC0xMy40MDYyNWgtMjYuNzgxMjV2My40MDYyNWgyNi43ODEyNXYxMC4yMTg3NWMwLDcuNzM3MzkgLTYuNjU2MDksMTEuNjcwNjEgLTEzLjQwNjI1LDEzLjYyNWMtMTAuMTU1MDEsMi45NDY2MyAtMTguMjkzOTIsMi40OTU2MSAtMjYuNzgxMjUsMGMtNy4wODc2NiwtMi4wODQ2OCAtMTMuNDA2MjUsLTYuMzU4NjYgLTEzLjQwNjI1LC0xMy42MjV2LTI1LjUzMTI1YzAsLTcuMzQ2NTIgNi4wNzA0MiwtMTMuNjI1IDEzLjQwNjI1LC0xMy42MjVoMjYuNzgxMjVjOC45MjQxMSwwIDE2Ljc1LC03Ljc2OTI1IDE2Ljc1LC0xN3YtMTEuOTA2MjV6TTI0OS45NjMxMSwyMjIuMjEyNjZjMCwyLjgyNjM1IDIuMjYxNyw1LjEyNSA1LjAzMTI1LDUuMTI1YzIuNzc5NDgsMCA1LjAzMTI1LC0yLjI5ODY1IDUuMDMxMjUsLTUuMTI1YzAsLTIuODE2MzMgLTIuMjUxNzcsLTUuMDkzNzQgLTUuMDMxMjUsLTUuMDkzNzVjLTIuNzY5NTUsMCAtNS4wMzEyNSwyLjI3NzQyIC01LjAzMTI1LDUuMDkzNzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NTUuNTgwNjc2OTYyOTY2Mzg6NTYuMTk0NTAxMTE0NTE3MjEtLT4=";

  const extId = 'DragoPython';
  const {Cast, BlockType, ArgumentType, vm} = Scratch;
  const {runtime} = vm;
  const Thread = (
    // PenguinMod
    vm.exports.Thread ??
    // TurboWarp and forks
    vm.exports.i_will_not_ask_for_help_when_these_break().Thread
  );
  const soundCategory = runtime.ext_scratch3_sound;

  function reloadBlocks(){Scratch.vm.extensionManager.refreshBlocks()}

  // Currently this can be used on TurboWarp via staging.
  // https://staging.turbowarp.org/
  if (!Scratch.BlockShape) throw new Error(`VM is outdated! please see TurboWarp/scratch-vm#210`);

  // @todo Find a way to embed this so it works offline
  //       and prevent global leakage
  // just use the dataurl when the extension is finished
  // @ts-ignore I know it exists so shut it TS
  
  await import('data:application/javascript;charset=utf-8;base64,InVzZSBzdHJpY3QiO3ZhciBsb2FkUHlvZGlkZT0oKCk9Pnt2YXIgY2U9T2JqZWN0LmNyZWF0ZTt2YXIgXz1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIGxlPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7dmFyIGRlPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO3ZhciBmZT1PYmplY3QuZ2V0UHJvdG90eXBlT2YsdWU9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTt2YXIgZj0odCxlKT0+Xyh0LCJuYW1lIix7dmFsdWU6ZSxjb25maWd1cmFibGU6ITB9KSxnPSh0PT50eXBlb2YgcmVxdWlyZTwidSI/cmVxdWlyZTp0eXBlb2YgUHJveHk8InUiP25ldyBQcm94eSh0LHtnZXQ6KGUsYyk9Pih0eXBlb2YgcmVxdWlyZTwidSI/cmVxdWlyZTplKVtjXX0pOnQpKGZ1bmN0aW9uKHQpe2lmKHR5cGVvZiByZXF1aXJlPCJ1IilyZXR1cm4gcmVxdWlyZS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7dGhyb3cgbmV3IEVycm9yKCdEeW5hbWljIHJlcXVpcmUgb2YgIicrdCsnIiBpcyBub3Qgc3VwcG9ydGVkJyl9KTt2YXIgJD0odCxlKT0+KCk9PihlfHx0KChlPXtleHBvcnRzOnt9fSkuZXhwb3J0cyxlKSxlLmV4cG9ydHMpLHBlPSh0LGUpPT57Zm9yKHZhciBjIGluIGUpXyh0LGMse2dldDplW2NdLGVudW1lcmFibGU6ITB9KX0sTT0odCxlLGMsbyk9PntpZihlJiZ0eXBlb2YgZT09Im9iamVjdCJ8fHR5cGVvZiBlPT0iZnVuY3Rpb24iKWZvcihsZXQgYSBvZiBkZShlKSkhdWUuY2FsbCh0LGEpJiZhIT09YyYmXyh0LGEse2dldDooKT0+ZVthXSxlbnVtZXJhYmxlOiEobz1sZShlLGEpKXx8by5lbnVtZXJhYmxlfSk7cmV0dXJuIHR9O3ZhciBoPSh0LGUsYyk9PihjPXQhPW51bGw/Y2UoZmUodCkpOnt9LE0oZXx8IXR8fCF0Ll9fZXNNb2R1bGU/XyhjLCJkZWZhdWx0Iix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSk6Yyx0KSksbWU9dD0+TShfKHt9LCJfX2VzTW9kdWxlIix7dmFsdWU6ITB9KSx0KTt2YXIgaj0kKChQLEMpPT57KGZ1bmN0aW9uKHQsZSl7InVzZSBzdHJpY3QiO3R5cGVvZiBkZWZpbmU9PSJmdW5jdGlvbiImJmRlZmluZS5hbWQ/ZGVmaW5lKCJzdGFja2ZyYW1lIixbXSxlKTp0eXBlb2YgUD09Im9iamVjdCI/Qy5leHBvcnRzPWUoKTp0LlN0YWNrRnJhbWU9ZSgpfSkoUCxmdW5jdGlvbigpeyJ1c2Ugc3RyaWN0IjtmdW5jdGlvbiB0KGQpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGQpKSYmaXNGaW5pdGUoZCl9Zih0LCJfaXNOdW1iZXIiKTtmdW5jdGlvbiBlKGQpe3JldHVybiBkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Quc3Vic3RyaW5nKDEpfWYoZSwiX2NhcGl0YWxpemUiKTtmdW5jdGlvbiBjKGQpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0aGlzW2RdfX1mKGMsIl9nZXR0ZXIiKTt2YXIgbz1bImlzQ29uc3RydWN0b3IiLCJpc0V2YWwiLCJpc05hdGl2ZSIsImlzVG9wbGV2ZWwiXSxhPVsiY29sdW1uTnVtYmVyIiwibGluZU51bWJlciJdLHI9WyJmaWxlTmFtZSIsImZ1bmN0aW9uTmFtZSIsInNvdXJjZSJdLG49WyJhcmdzIl0sdT1bImV2YWxPcmlnaW4iXSxpPW8uY29uY2F0KGEscixuLHUpO2Z1bmN0aW9uIHMoZCl7aWYoZClmb3IodmFyIHk9MDt5PGkubGVuZ3RoO3krKylkW2lbeV1dIT09dm9pZCAwJiZ0aGlzWyJzZXQiK2UoaVt5XSldKGRbaVt5XV0pfWYocywiU3RhY2tGcmFtZSIpLHMucHJvdG90eXBlPXtnZXRBcmdzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYXJnc30sc2V0QXJnczpmdW5jdGlvbihkKXtpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZCkhPT0iW29iamVjdCBBcnJheV0iKXRocm93IG5ldyBUeXBlRXJyb3IoIkFyZ3MgbXVzdCBiZSBhbiBBcnJheSIpO3RoaXMuYXJncz1kfSxnZXRFdmFsT3JpZ2luOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZXZhbE9yaWdpbn0sc2V0RXZhbE9yaWdpbjpmdW5jdGlvbihkKXtpZihkIGluc3RhbmNlb2Ygcyl0aGlzLmV2YWxPcmlnaW49ZDtlbHNlIGlmKGQgaW5zdGFuY2VvZiBPYmplY3QpdGhpcy5ldmFsT3JpZ2luPW5ldyBzKGQpO2Vsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcigiRXZhbCBPcmlnaW4gbXVzdCBiZSBhbiBPYmplY3Qgb3IgU3RhY2tGcmFtZSIpfSx0b1N0cmluZzpmdW5jdGlvbigpe3ZhciBkPXRoaXMuZ2V0RmlsZU5hbWUoKXx8IiIseT10aGlzLmdldExpbmVOdW1iZXIoKXx8IiIsdz10aGlzLmdldENvbHVtbk51bWJlcigpfHwiIixFPXRoaXMuZ2V0RnVuY3Rpb25OYW1lKCl8fCIiO3JldHVybiB0aGlzLmdldElzRXZhbCgpP2Q/IltldmFsXSAoIitkKyI6Iit5KyI6Iit3KyIpIjoiW2V2YWxdOiIreSsiOiIrdzpFP0UrIiAoIitkKyI6Iit5KyI6Iit3KyIpIjpkKyI6Iit5KyI6Iit3fX0scy5mcm9tU3RyaW5nPWYoZnVuY3Rpb24oeSl7dmFyIHc9eS5pbmRleE9mKCIoIiksRT15Lmxhc3RJbmRleE9mKCIpIiksbmU9eS5zdWJzdHJpbmcoMCx3KSxpZT15LnN1YnN0cmluZyh3KzEsRSkuc3BsaXQoIiwiKSxVPXkuc3Vic3RyaW5nKEUrMSk7aWYoVS5pbmRleE9mKCJAIik9PT0wKXZhciBSPS9AKC4rPykoPzo6KFxkKykpPyg/OjooXGQrKSk/JC8uZXhlYyhVLCIiKSxvZT1SWzFdLGFlPVJbMl0sc2U9UlszXTtyZXR1cm4gbmV3IHMoe2Z1bmN0aW9uTmFtZTpuZSxhcmdzOmllfHx2b2lkIDAsZmlsZU5hbWU6b2UsbGluZU51bWJlcjphZXx8dm9pZCAwLGNvbHVtbk51bWJlcjpzZXx8dm9pZCAwfSl9LCJTdGFja0ZyYW1lJCRmcm9tU3RyaW5nIik7Zm9yKHZhciBsPTA7bDxvLmxlbmd0aDtsKyspcy5wcm90b3R5cGVbImdldCIrZShvW2xdKV09YyhvW2xdKSxzLnByb3RvdHlwZVsic2V0IitlKG9bbF0pXT1mdW5jdGlvbihkKXtyZXR1cm4gZnVuY3Rpb24oeSl7dGhpc1tkXT0hIXl9fShvW2xdKTtmb3IodmFyIG09MDttPGEubGVuZ3RoO20rKylzLnByb3RvdHlwZVsiZ2V0IitlKGFbbV0pXT1jKGFbbV0pLHMucHJvdG90eXBlWyJzZXQiK2UoYVttXSldPWZ1bmN0aW9uKGQpe3JldHVybiBmdW5jdGlvbih5KXtpZighdCh5KSl0aHJvdyBuZXcgVHlwZUVycm9yKGQrIiBtdXN0IGJlIGEgTnVtYmVyIik7dGhpc1tkXT1OdW1iZXIoeSl9fShhW21dKTtmb3IodmFyIHA9MDtwPHIubGVuZ3RoO3ArKylzLnByb3RvdHlwZVsiZ2V0IitlKHJbcF0pXT1jKHJbcF0pLHMucHJvdG90eXBlWyJzZXQiK2UocltwXSldPWZ1bmN0aW9uKGQpe3JldHVybiBmdW5jdGlvbih5KXt0aGlzW2RdPVN0cmluZyh5KX19KHJbcF0pO3JldHVybiBzfSl9KTt2YXIgVz0kKCh4LEIpPT57KGZ1bmN0aW9uKHQsZSl7InVzZSBzdHJpY3QiO3R5cGVvZiBkZWZpbmU9PSJmdW5jdGlvbiImJmRlZmluZS5hbWQ/ZGVmaW5lKCJlcnJvci1zdGFjay1wYXJzZXIiLFsic3RhY2tmcmFtZSJdLGUpOnR5cGVvZiB4PT0ib2JqZWN0Ij9CLmV4cG9ydHM9ZShqKCkpOnQuRXJyb3JTdGFja1BhcnNlcj1lKHQuU3RhY2tGcmFtZSl9KSh4LGYoZnVuY3Rpb24oZSl7InVzZSBzdHJpY3QiO3ZhciBjPS8oXnxAKVxTKzpcZCsvLG89L15ccyphdCAuKihcUys6XGQrfFwobmF0aXZlXCkpL20sYT0vXihldmFsQCk/KFxbbmF0aXZlIGNvZGVdKT8kLztyZXR1cm57cGFyc2U6ZihmdW5jdGlvbihuKXtpZih0eXBlb2Ygbi5zdGFja3RyYWNlPCJ1Inx8dHlwZW9mIG5bIm9wZXJhI3NvdXJjZWxvYyJdPCJ1IilyZXR1cm4gdGhpcy5wYXJzZU9wZXJhKG4pO2lmKG4uc3RhY2smJm4uc3RhY2subWF0Y2gobykpcmV0dXJuIHRoaXMucGFyc2VWOE9ySUUobik7aWYobi5zdGFjaylyZXR1cm4gdGhpcy5wYXJzZUZGT3JTYWZhcmkobik7dGhyb3cgbmV3IEVycm9yKCJDYW5ub3QgcGFyc2UgZ2l2ZW4gRXJyb3Igb2JqZWN0Iil9LCJFcnJvclN0YWNrUGFyc2VyJCRwYXJzZSIpLGV4dHJhY3RMb2NhdGlvbjpmKGZ1bmN0aW9uKG4pe2lmKG4uaW5kZXhPZigiOiIpPT09LTEpcmV0dXJuW25dO3ZhciB1PS8oLis/KSg/OjooXGQrKSk/KD86OihcZCspKT8kLyxpPXUuZXhlYyhuLnJlcGxhY2UoL1soKV0vZywiIikpO3JldHVybltpWzFdLGlbMl18fHZvaWQgMCxpWzNdfHx2b2lkIDBdfSwiRXJyb3JTdGFja1BhcnNlciQkZXh0cmFjdExvY2F0aW9uIikscGFyc2VWOE9ySUU6ZihmdW5jdGlvbihuKXt2YXIgdT1uLnN0YWNrLnNwbGl0KGAKYCkuZmlsdGVyKGZ1bmN0aW9uKGkpe3JldHVybiEhaS5tYXRjaChvKX0sdGhpcyk7cmV0dXJuIHUubWFwKGZ1bmN0aW9uKGkpe2kuaW5kZXhPZigiKGV2YWwgIik+LTEmJihpPWkucmVwbGFjZSgvZXZhbCBjb2RlL2csImV2YWwiKS5yZXBsYWNlKC8oXChldmFsIGF0IFteKCldKil8KCwuKiQpL2csIiIpKTt2YXIgcz1pLnJlcGxhY2UoL15ccysvLCIiKS5yZXBsYWNlKC9cKGV2YWwgY29kZS9nLCIoIikucmVwbGFjZSgvXi4qP1xzKy8sIiIpLGw9cy5tYXRjaCgvIChcKC4rXCkkKS8pO3M9bD9zLnJlcGxhY2UobFswXSwiIik6czt2YXIgbT10aGlzLmV4dHJhY3RMb2NhdGlvbihsP2xbMV06cykscD1sJiZzfHx2b2lkIDAsZD1bImV2YWwiLCI8YW5vbnltb3VzPiJdLmluZGV4T2YobVswXSk+LTE/dm9pZCAwOm1bMF07cmV0dXJuIG5ldyBlKHtmdW5jdGlvbk5hbWU6cCxmaWxlTmFtZTpkLGxpbmVOdW1iZXI6bVsxXSxjb2x1bW5OdW1iZXI6bVsyXSxzb3VyY2U6aX0pfSx0aGlzKX0sIkVycm9yU3RhY2tQYXJzZXIkJHBhcnNlVjhPcklFIikscGFyc2VGRk9yU2FmYXJpOmYoZnVuY3Rpb24obil7dmFyIHU9bi5zdGFjay5zcGxpdChgCmApLmZpbHRlcihmdW5jdGlvbihpKXtyZXR1cm4haS5tYXRjaChhKX0sdGhpcyk7cmV0dXJuIHUubWFwKGZ1bmN0aW9uKGkpe2lmKGkuaW5kZXhPZigiID4gZXZhbCIpPi0xJiYoaT1pLnJlcGxhY2UoLyBsaW5lIChcZCspKD86ID4gZXZhbCBsaW5lIFxkKykqID4gZXZhbDpcZCs6XGQrL2csIjokMSIpKSxpLmluZGV4T2YoIkAiKT09PS0xJiZpLmluZGV4T2YoIjoiKT09PS0xKXJldHVybiBuZXcgZSh7ZnVuY3Rpb25OYW1lOml9KTt2YXIgcz0vKCguKiIuKyJbXkBdKik/W15AXSopKD86QCkvLGw9aS5tYXRjaChzKSxtPWwmJmxbMV0/bFsxXTp2b2lkIDAscD10aGlzLmV4dHJhY3RMb2NhdGlvbihpLnJlcGxhY2UocywiIikpO3JldHVybiBuZXcgZSh7ZnVuY3Rpb25OYW1lOm0sZmlsZU5hbWU6cFswXSxsaW5lTnVtYmVyOnBbMV0sY29sdW1uTnVtYmVyOnBbMl0sc291cmNlOml9KX0sdGhpcyl9LCJFcnJvclN0YWNrUGFyc2VyJCRwYXJzZUZGT3JTYWZhcmkiKSxwYXJzZU9wZXJhOmYoZnVuY3Rpb24obil7cmV0dXJuIW4uc3RhY2t0cmFjZXx8bi5tZXNzYWdlLmluZGV4T2YoYApgKT4tMSYmbi5tZXNzYWdlLnNwbGl0KGAKYCkubGVuZ3RoPm4uc3RhY2t0cmFjZS5zcGxpdChgCmApLmxlbmd0aD90aGlzLnBhcnNlT3BlcmE5KG4pOm4uc3RhY2s/dGhpcy5wYXJzZU9wZXJhMTEobik6dGhpcy5wYXJzZU9wZXJhMTAobil9LCJFcnJvclN0YWNrUGFyc2VyJCRwYXJzZU9wZXJhIikscGFyc2VPcGVyYTk6ZihmdW5jdGlvbihuKXtmb3IodmFyIHU9L0xpbmUgKFxkKykuKnNjcmlwdCAoPzppbiApPyhcUyspL2ksaT1uLm1lc3NhZ2Uuc3BsaXQoYApgKSxzPVtdLGw9MixtPWkubGVuZ3RoO2w8bTtsKz0yKXt2YXIgcD11LmV4ZWMoaVtsXSk7cCYmcy5wdXNoKG5ldyBlKHtmaWxlTmFtZTpwWzJdLGxpbmVOdW1iZXI6cFsxXSxzb3VyY2U6aVtsXX0pKX1yZXR1cm4gc30sIkVycm9yU3RhY2tQYXJzZXIkJHBhcnNlT3BlcmE5IikscGFyc2VPcGVyYTEwOmYoZnVuY3Rpb24obil7Zm9yKHZhciB1PS9MaW5lIChcZCspLipzY3JpcHQgKD86aW4gKT8oXFMrKSg/OjogSW4gZnVuY3Rpb24gKFxTKykpPyQvaSxpPW4uc3RhY2t0cmFjZS5zcGxpdChgCmApLHM9W10sbD0wLG09aS5sZW5ndGg7bDxtO2wrPTIpe3ZhciBwPXUuZXhlYyhpW2xdKTtwJiZzLnB1c2gobmV3IGUoe2Z1bmN0aW9uTmFtZTpwWzNdfHx2b2lkIDAsZmlsZU5hbWU6cFsyXSxsaW5lTnVtYmVyOnBbMV0sc291cmNlOmlbbF19KSl9cmV0dXJuIHN9LCJFcnJvclN0YWNrUGFyc2VyJCRwYXJzZU9wZXJhMTAiKSxwYXJzZU9wZXJhMTE6ZihmdW5jdGlvbihuKXt2YXIgdT1uLnN0YWNrLnNwbGl0KGAKYCkuZmlsdGVyKGZ1bmN0aW9uKGkpe3JldHVybiEhaS5tYXRjaChjKSYmIWkubWF0Y2goL15FcnJvciBjcmVhdGVkIGF0Lyl9LHRoaXMpO3JldHVybiB1Lm1hcChmdW5jdGlvbihpKXt2YXIgcz1pLnNwbGl0KCJAIiksbD10aGlzLmV4dHJhY3RMb2NhdGlvbihzLnBvcCgpKSxtPXMuc2hpZnQoKXx8IiIscD1tLnJlcGxhY2UoLzxhbm9ueW1vdXMgZnVuY3Rpb24oOiAoXHcrKSk/Pi8sIiQyIikucmVwbGFjZSgvXChbXildKlwpL2csIiIpfHx2b2lkIDAsZDttLm1hdGNoKC9cKChbXildKilcKS8pJiYoZD1tLnJlcGxhY2UoL15bXihdK1woKFteKV0qKVwpJC8sIiQxIikpO3ZhciB5PWQ9PT12b2lkIDB8fGQ9PT0iW2FyZ3VtZW50cyBub3QgYXZhaWxhYmxlXSI/dm9pZCAwOmQuc3BsaXQoIiwiKTtyZXR1cm4gbmV3IGUoe2Z1bmN0aW9uTmFtZTpwLGFyZ3M6eSxmaWxlTmFtZTpsWzBdLGxpbmVOdW1iZXI6bFsxXSxjb2x1bW5OdW1iZXI6bFsyXSxzb3VyY2U6aX0pfSx0aGlzKX0sIkVycm9yU3RhY2tQYXJzZXIkJHBhcnNlT3BlcmExMSIpfX0sIkVycm9yU3RhY2tQYXJzZXIiKSl9KTt2YXIgUmU9e307cGUoUmUse2xvYWRQeW9kaWRlOigpPT5ULHZlcnNpb246KCk9PmJ9KTt2YXIgRz1oKFcoKSk7dmFyIHY9dHlwZW9mIHByb2Nlc3M9PSJvYmplY3QiJiZ0eXBlb2YgcHJvY2Vzcy52ZXJzaW9ucz09Im9iamVjdCImJnR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGU9PSJzdHJpbmciJiZ0eXBlb2YgcHJvY2Vzcy5icm93c2VyPiJ1IixGPXYmJnR5cGVvZiBtb2R1bGU8InUiJiZ0eXBlb2YgbW9kdWxlLmV4cG9ydHM8InUiJiZ0eXBlb2YgZzwidSImJnR5cGVvZiBfX2Rpcm5hbWU8InUiLEg9diYmIUYseWU9dHlwZW9mIERlbm88InUiLHo9IXYmJiF5ZSxxPXomJnR5cGVvZiB3aW5kb3c8InUiJiZ0eXBlb2YgZG9jdW1lbnQ8InUiJiZ0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudDwidSImJnR5cGVvZiBzZXNzaW9uU3RvcmFnZTwidSIsVj16JiZ0eXBlb2YgaW1wb3J0U2NyaXB0czwidSImJnR5cGVvZiBzZWxmPCJ1Ijt2YXIgSyxrLEwsWCxELGdlPWAiZmV0Y2giIGlzIG5vdCBkZWZpbmVkLCBtYXliZSB5b3UncmUgdXNpbmcgbm9kZSA8IDE4PyBGcm9tIFB5b2RpZGUgPj0gMC4yNS4wLCBub2RlID49IDE4IGlzIHJlcXVpcmVkLiBPbGRlciB2ZXJzaW9ucyBvZiBOb2RlLmpzIG1heSB3b3JrLCBidXQgaXQgaXMgbm90IGd1YXJhbnRlZWQgb3Igc3VwcG9ydGVkLiBGYWxsaW5nIGJhY2sgdG8gIm5vZGUtZmV0Y2giLmA7YXN5bmMgZnVuY3Rpb24gQSgpe2lmKCF2fHwoSz0oYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmUgKi8idXJsIikpLmRlZmF1bHQsRD1hd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZSAqLyJmcy9wcm9taXNlcyIpLGdsb2JhbFRoaXMuZmV0Y2g/az1mZXRjaDooY29uc29sZS53YXJuKGdlKSxrPShhd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZSAqLyJub2RlLWZldGNoIikpLmRlZmF1bHQpLFg9KGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlICovInZtIikpLmRlZmF1bHQsTD1hd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZSAqLyJwYXRoIiksST1MLnNlcCx0eXBlb2YgZzwidSIpKXJldHVybjtsZXQgdD1hd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZSAqLyJmcyIpLGU9YXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmUgKi8iY3J5cHRvIiksYz1hd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZSAqLyJ3cyIpLG89YXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmUgKi8iY2hpbGRfcHJvY2VzcyIpLGE9e2ZzOnQsY3J5cHRvOmUsd3M6YyxjaGlsZF9wcm9jZXNzOm99O2dsb2JhbFRoaXMucmVxdWlyZT1mdW5jdGlvbihyKXtyZXR1cm4gYVtyXX19ZihBLCJpbml0Tm9kZU1vZHVsZXMiKTtmdW5jdGlvbiBoZSh0LGUpe3JldHVybiBMLnJlc29sdmUoZXx8Ii4iLHQpfWYoaGUsIm5vZGVfcmVzb2x2ZVBhdGgiKTtmdW5jdGlvbiB2ZSh0LGUpe3JldHVybiBlPT09dm9pZCAwJiYoZT1sb2NhdGlvbiksbmV3IFVSTCh0LGUpLnRvU3RyaW5nKCl9Zih2ZSwiYnJvd3Nlcl9yZXNvbHZlUGF0aCIpO3ZhciBOO3Y/Tj1oZTpOPXZlO3ZhciBJO3Z8fChJPSIvIik7ZnVuY3Rpb24gd2UodCxlKXtyZXR1cm4gdC5zdGFydHNXaXRoKCJmaWxlOi8vIikmJih0PXQuc2xpY2UoNykpLHQuaW5jbHVkZXMoIjovLyIpP3tyZXNwb25zZTprKHQpfTp7YmluYXJ5OkQucmVhZEZpbGUodCkudGhlbihjPT5uZXcgVWludDhBcnJheShjLmJ1ZmZlcixjLmJ5dGVPZmZzZXQsYy5ieXRlTGVuZ3RoKSl9fWYod2UsIm5vZGVfZ2V0QmluYXJ5UmVzcG9uc2UiKTtmdW5jdGlvbiBiZSh0LGUpe2xldCBjPW5ldyBVUkwodCxsb2NhdGlvbik7cmV0dXJue3Jlc3BvbnNlOmZldGNoKGMsZT97aW50ZWdyaXR5OmV9Ont9KX19ZihiZSwiYnJvd3Nlcl9nZXRCaW5hcnlSZXNwb25zZSIpO3ZhciBPO3Y/Tz13ZTpPPWJlO2FzeW5jIGZ1bmN0aW9uIEoodCxlKXtsZXR7cmVzcG9uc2U6YyxiaW5hcnk6b309Tyh0LGUpO2lmKG8pcmV0dXJuIG87bGV0IGE9YXdhaXQgYztpZighYS5vayl0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkICcke3R9JzogcmVxdWVzdCBmYWlsZWQuYCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGEuYXJyYXlCdWZmZXIoKSl9ZihKLCJsb2FkQmluYXJ5RmlsZSIpO3ZhciBTO2lmKHEpUz1mKGFzeW5jIHQ9PmF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlICovdCksImxvYWRTY3JpcHQiKTtlbHNlIGlmKFYpUz1mKGFzeW5jIHQ9Pnt0cnl7Z2xvYmFsVGhpcy5pbXBvcnRTY3JpcHRzKHQpfWNhdGNoKGUpe2lmKGUgaW5zdGFuY2VvZiBUeXBlRXJyb3IpYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmUgKi90KTtlbHNlIHRocm93IGV9fSwibG9hZFNjcmlwdCIpO2Vsc2UgaWYodilTPUVlO2Vsc2UgdGhyb3cgbmV3IEVycm9yKCJDYW5ub3QgZGV0ZXJtaW5lIHJ1bnRpbWUgZW52aXJvbm1lbnQiKTthc3luYyBmdW5jdGlvbiBFZSh0KXt0LnN0YXJ0c1dpdGgoImZpbGU6Ly8iKSYmKHQ9dC5zbGljZSg3KSksdC5pbmNsdWRlcygiOi8vIik/WC5ydW5JblRoaXNDb250ZXh0KGF3YWl0KGF3YWl0IGsodCkpLnRleHQoKSk6YXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmUgKi9LLnBhdGhUb0ZpbGVVUkwodCkuaHJlZil9ZihFZSwibm9kZUxvYWRTY3JpcHQiKTthc3luYyBmdW5jdGlvbiBZKHQpe2lmKHYpe2F3YWl0IEEoKTtsZXQgZT1hd2FpdCBELnJlYWRGaWxlKHQpO3JldHVybiBKU09OLnBhcnNlKGUpfWVsc2UgcmV0dXJuIGF3YWl0KGF3YWl0IGZldGNoKHQpKS5qc29uKCl9ZihZLCJsb2FkTG9ja0ZpbGUiKTthc3luYyBmdW5jdGlvbiBRKCl7aWYoRilyZXR1cm4gX19kaXJuYW1lO2xldCB0O3RyeXt0aHJvdyBuZXcgRXJyb3J9Y2F0Y2gobyl7dD1vfWxldCBlPUcuZGVmYXVsdC5wYXJzZSh0KVswXS5maWxlTmFtZTtpZihIKXtsZXQgbz1hd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZSAqLyJwYXRoIik7cmV0dXJuKGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlICovInVybCIpKS5maWxlVVJMVG9QYXRoKG8uZGlybmFtZShlKSl9bGV0IGM9ZS5sYXN0SW5kZXhPZihJKTtpZihjPT09LTEpdGhyb3cgbmV3IEVycm9yKCJDb3VsZCBub3QgZXh0cmFjdCBpbmRleFVSTCBwYXRoIGZyb20gcHlvZGlkZSBtb2R1bGUgbG9jYXRpb24iKTtyZXR1cm4gZS5zbGljZSgwLGMpfWYoUSwiY2FsY3VsYXRlRGlybmFtZSIpO2Z1bmN0aW9uIFoodCl7bGV0IGU9dC5GUyxjPXQuRlMuZmlsZXN5c3RlbXMuTUVNRlMsbz10LlBBVEgsYT17RElSX01PREU6MTY4OTUsRklMRV9NT0RFOjMzMjc5LG1vdW50OmZ1bmN0aW9uKHIpe2lmKCFyLm9wdHMuZmlsZVN5c3RlbUhhbmRsZSl0aHJvdyBuZXcgRXJyb3IoIm9wdHMuZmlsZVN5c3RlbUhhbmRsZSBpcyByZXF1aXJlZCIpO3JldHVybiBjLm1vdW50LmFwcGx5KG51bGwsYXJndW1lbnRzKX0sc3luY2ZzOmFzeW5jKHIsbix1KT0+e3RyeXtsZXQgaT1hLmdldExvY2FsU2V0KHIpLHM9YXdhaXQgYS5nZXRSZW1vdGVTZXQociksbD1uP3M6aSxtPW4/aTpzO2F3YWl0IGEucmVjb25jaWxlKHIsbCxtKSx1KG51bGwpfWNhdGNoKGkpe3UoaSl9fSxnZXRMb2NhbFNldDpyPT57bGV0IG49T2JqZWN0LmNyZWF0ZShudWxsKTtmdW5jdGlvbiB1KGwpe3JldHVybiBsIT09Ii4iJiZsIT09Ii4uIn1mKHUsImlzUmVhbERpciIpO2Z1bmN0aW9uIGkobCl7cmV0dXJuIG09Pm8uam9pbjIobCxtKX1mKGksInRvQWJzb2x1dGUiKTtsZXQgcz1lLnJlYWRkaXIoci5tb3VudHBvaW50KS5maWx0ZXIodSkubWFwKGkoci5tb3VudHBvaW50KSk7Zm9yKDtzLmxlbmd0aDspe2xldCBsPXMucG9wKCksbT1lLnN0YXQobCk7ZS5pc0RpcihtLm1vZGUpJiZzLnB1c2guYXBwbHkocyxlLnJlYWRkaXIobCkuZmlsdGVyKHUpLm1hcChpKGwpKSksbltsXT17dGltZXN0YW1wOm0ubXRpbWUsbW9kZTptLm1vZGV9fXJldHVybnt0eXBlOiJsb2NhbCIsZW50cmllczpufX0sZ2V0UmVtb3RlU2V0OmFzeW5jIHI9PntsZXQgbj1PYmplY3QuY3JlYXRlKG51bGwpLHU9YXdhaXQgX2Uoci5vcHRzLmZpbGVTeXN0ZW1IYW5kbGUpO2ZvcihsZXRbaSxzXW9mIHUpaSE9PSIuIiYmKG5bby5qb2luMihyLm1vdW50cG9pbnQsaSldPXt0aW1lc3RhbXA6cy5raW5kPT09ImZpbGUiPyhhd2FpdCBzLmdldEZpbGUoKSkubGFzdE1vZGlmaWVkRGF0ZTpuZXcgRGF0ZSxtb2RlOnMua2luZD09PSJmaWxlIj9hLkZJTEVfTU9ERTphLkRJUl9NT0RFfSk7cmV0dXJue3R5cGU6InJlbW90ZSIsZW50cmllczpuLGhhbmRsZXM6dX19LGxvYWRMb2NhbEVudHJ5OnI9PntsZXQgdT1lLmxvb2t1cFBhdGgocikubm9kZSxpPWUuc3RhdChyKTtpZihlLmlzRGlyKGkubW9kZSkpcmV0dXJue3RpbWVzdGFtcDppLm10aW1lLG1vZGU6aS5tb2RlfTtpZihlLmlzRmlsZShpLm1vZGUpKXJldHVybiB1LmNvbnRlbnRzPWMuZ2V0RmlsZURhdGFBc1R5cGVkQXJyYXkodSkse3RpbWVzdGFtcDppLm10aW1lLG1vZGU6aS5tb2RlLGNvbnRlbnRzOnUuY29udGVudHN9O3Rocm93IG5ldyBFcnJvcigibm9kZSB0eXBlIG5vdCBzdXBwb3J0ZWQiKX0sc3RvcmVMb2NhbEVudHJ5OihyLG4pPT57aWYoZS5pc0RpcihuLm1vZGUpKWUubWtkaXJUcmVlKHIsbi5tb2RlKTtlbHNlIGlmKGUuaXNGaWxlKG4ubW9kZSkpZS53cml0ZUZpbGUocixuLmNvbnRlbnRzLHtjYW5Pd246ITB9KTtlbHNlIHRocm93IG5ldyBFcnJvcigibm9kZSB0eXBlIG5vdCBzdXBwb3J0ZWQiKTtlLmNobW9kKHIsbi5tb2RlKSxlLnV0aW1lKHIsbi50aW1lc3RhbXAsbi50aW1lc3RhbXApfSxyZW1vdmVMb2NhbEVudHJ5OnI9Pnt2YXIgbj1lLnN0YXQocik7ZS5pc0RpcihuLm1vZGUpP2Uucm1kaXIocik6ZS5pc0ZpbGUobi5tb2RlKSYmZS51bmxpbmsocil9LGxvYWRSZW1vdGVFbnRyeTphc3luYyByPT57aWYoci5raW5kPT09ImZpbGUiKXtsZXQgbj1hd2FpdCByLmdldEZpbGUoKTtyZXR1cm57Y29udGVudHM6bmV3IFVpbnQ4QXJyYXkoYXdhaXQgbi5hcnJheUJ1ZmZlcigpKSxtb2RlOmEuRklMRV9NT0RFLHRpbWVzdGFtcDpuLmxhc3RNb2RpZmllZERhdGV9fWVsc2V7aWYoci5raW5kPT09ImRpcmVjdG9yeSIpcmV0dXJue21vZGU6YS5ESVJfTU9ERSx0aW1lc3RhbXA6bmV3IERhdGV9O3Rocm93IG5ldyBFcnJvcigidW5rbm93biBraW5kOiAiK3Iua2luZCl9fSxzdG9yZVJlbW90ZUVudHJ5OmFzeW5jKHIsbix1KT0+e2xldCBpPXIuZ2V0KG8uZGlybmFtZShuKSkscz1lLmlzRmlsZSh1Lm1vZGUpP2F3YWl0IGkuZ2V0RmlsZUhhbmRsZShvLmJhc2VuYW1lKG4pLHtjcmVhdGU6ITB9KTphd2FpdCBpLmdldERpcmVjdG9yeUhhbmRsZShvLmJhc2VuYW1lKG4pLHtjcmVhdGU6ITB9KTtpZihzLmtpbmQ9PT0iZmlsZSIpe2xldCBsPWF3YWl0IHMuY3JlYXRlV3JpdGFibGUoKTthd2FpdCBsLndyaXRlKHUuY29udGVudHMpLGF3YWl0IGwuY2xvc2UoKX1yLnNldChuLHMpfSxyZW1vdmVSZW1vdGVFbnRyeTphc3luYyhyLG4pPT57YXdhaXQgci5nZXQoby5kaXJuYW1lKG4pKS5yZW1vdmVFbnRyeShvLmJhc2VuYW1lKG4pKSxyLmRlbGV0ZShuKX0scmVjb25jaWxlOmFzeW5jKHIsbix1KT0+e2xldCBpPTAscz1bXTtPYmplY3Qua2V5cyhuLmVudHJpZXMpLmZvckVhY2goZnVuY3Rpb24ocCl7bGV0IGQ9bi5lbnRyaWVzW3BdLHk9dS5lbnRyaWVzW3BdOygheXx8ZS5pc0ZpbGUoZC5tb2RlKSYmZC50aW1lc3RhbXAuZ2V0VGltZSgpPnkudGltZXN0YW1wLmdldFRpbWUoKSkmJihzLnB1c2gocCksaSsrKX0pLHMuc29ydCgpO2xldCBsPVtdO2lmKE9iamVjdC5rZXlzKHUuZW50cmllcykuZm9yRWFjaChmdW5jdGlvbihwKXtuLmVudHJpZXNbcF18fChsLnB1c2gocCksaSsrKX0pLGwuc29ydCgpLnJldmVyc2UoKSwhaSlyZXR1cm47bGV0IG09bi50eXBlPT09InJlbW90ZSI/bi5oYW5kbGVzOnUuaGFuZGxlcztmb3IobGV0IHAgb2Ygcyl7bGV0IGQ9by5ub3JtYWxpemUocC5yZXBsYWNlKHIubW91bnRwb2ludCwiLyIpKS5zdWJzdHJpbmcoMSk7aWYodS50eXBlPT09ImxvY2FsIil7bGV0IHk9bS5nZXQoZCksdz1hd2FpdCBhLmxvYWRSZW1vdGVFbnRyeSh5KTthLnN0b3JlTG9jYWxFbnRyeShwLHcpfWVsc2V7bGV0IHk9YS5sb2FkTG9jYWxFbnRyeShwKTthd2FpdCBhLnN0b3JlUmVtb3RlRW50cnkobSxkLHkpfX1mb3IobGV0IHAgb2YgbClpZih1LnR5cGU9PT0ibG9jYWwiKWEucmVtb3ZlTG9jYWxFbnRyeShwKTtlbHNle2xldCBkPW8ubm9ybWFsaXplKHAucmVwbGFjZShyLm1vdW50cG9pbnQsIi8iKSkuc3Vic3RyaW5nKDEpO2F3YWl0IGEucmVtb3ZlUmVtb3RlRW50cnkobSxkKX19fTt0LkZTLmZpbGVzeXN0ZW1zLk5BVElWRUZTX0FTWU5DPWF9ZihaLCJpbml0aWFsaXplTmF0aXZlRlMiKTt2YXIgX2U9Zihhc3luYyB0PT57bGV0IGU9W107YXN5bmMgZnVuY3Rpb24gYyhhKXtmb3IgYXdhaXQobGV0IHIgb2YgYS52YWx1ZXMoKSllLnB1c2gociksci5raW5kPT09ImRpcmVjdG9yeSImJmF3YWl0IGMocil9ZihjLCJjb2xsZWN0IiksYXdhaXQgYyh0KTtsZXQgbz1uZXcgTWFwO28uc2V0KCIuIix0KTtmb3IobGV0IGEgb2YgZSl7bGV0IHI9KGF3YWl0IHQucmVzb2x2ZShhKSkuam9pbigiLyIpO28uc2V0KHIsYSl9cmV0dXJuIG99LCJnZXRGc0hhbmRsZXMiKTtmdW5jdGlvbiBlZSgpe2xldCB0PXt9O3JldHVybiB0Lm5vSW1hZ2VEZWNvZGluZz0hMCx0Lm5vQXVkaW9EZWNvZGluZz0hMCx0Lm5vV2FzbURlY29kaW5nPSExLHQucHJlUnVuPVtdLHQucXVpdD0oZSxjKT0+e3Rocm93IHQuZXhpdGVkPXtzdGF0dXM6ZSx0b1Rocm93OmN9LGN9LHR9ZihlZSwiY3JlYXRlTW9kdWxlIik7ZnVuY3Rpb24gU2UodCxlKXt0LnByZVJ1bi5wdXNoKGZ1bmN0aW9uKCl7bGV0IGM9Ii8iO3RyeXt0LkZTLm1rZGlyVHJlZShlKX1jYXRjaChvKXtjb25zb2xlLmVycm9yKGBFcnJvciBvY2N1cnJlZCB3aGlsZSBtYWtpbmcgYSBob21lIGRpcmVjdG9yeSAnJHtlfSc6YCksY29uc29sZS5lcnJvcihvKSxjb25zb2xlLmVycm9yKGBVc2luZyAnJHtjfScgZm9yIGEgaG9tZSBkaXJlY3RvcnkgaW5zdGVhZGApLGU9Y310LkZTLmNoZGlyKGUpfSl9ZihTZSwiY3JlYXRlSG9tZURpcmVjdG9yeSIpO2Z1bmN0aW9uIE9lKHQsZSl7dC5wcmVSdW4ucHVzaChmdW5jdGlvbigpe09iamVjdC5hc3NpZ24odC5FTlYsZSl9KX1mKE9lLCJzZXRFbnZpcm9ubWVudCIpO2Z1bmN0aW9uIGtlKHQsZSl7dC5wcmVSdW4ucHVzaCgoKT0+e2ZvcihsZXQgYyBvZiBlKXQuRlMubWtkaXJUcmVlKGMpLHQuRlMubW91bnQodC5GUy5maWxlc3lzdGVtcy5OT0RFRlMse3Jvb3Q6Y30sYyl9KX1mKGtlLCJtb3VudExvY2FsRGlyZWN0b3JpZXMiKTtmdW5jdGlvbiBOZSh0LGUpe2xldCBjPUooZSk7dC5wcmVSdW4ucHVzaCgoKT0+e2xldCBvPXQuX3B5X3ZlcnNpb25fbWFqb3IoKSxhPXQuX3B5X3ZlcnNpb25fbWlub3IoKTt0LkZTLm1rZGlyVHJlZSgiL2xpYiIpLHQuRlMubWtkaXJUcmVlKGAvbGliL3B5dGhvbiR7b30uJHthfS9zaXRlLXBhY2thZ2VzYCksdC5hZGRSdW5EZXBlbmRlbmN5KCJpbnN0YWxsLXN0ZGxpYiIpLGMudGhlbihyPT57dC5GUy53cml0ZUZpbGUoYC9saWIvcHl0aG9uJHtvfSR7YX0uemlwYCxyKX0pLmNhdGNoKHI9Pntjb25zb2xlLmVycm9yKCJFcnJvciBvY2N1cnJlZCB3aGlsZSBpbnN0YWxsaW5nIHRoZSBzdGFuZGFyZCBsaWJyYXJ5OiIpLGNvbnNvbGUuZXJyb3Iocil9KS5maW5hbGx5KCgpPT57dC5yZW1vdmVSdW5EZXBlbmRlbmN5KCJpbnN0YWxsLXN0ZGxpYiIpfSl9KX1mKE5lLCJpbnN0YWxsU3RkbGliIik7ZnVuY3Rpb24gdGUodCxlKXtsZXQgYztlLnN0ZExpYlVSTCE9bnVsbD9jPWUuc3RkTGliVVJMOmM9ZS5pbmRleFVSTCsicHl0aG9uX3N0ZGxpYi56aXAiLE5lKHQsYyksU2UodCxlLmVudi5IT01FKSxPZSh0LGUuZW52KSxrZSh0LGUuX25vZGVfbW91bnRzKSx0LnByZVJ1bi5wdXNoKCgpPT5aKHQpKX1mKHRlLCJpbml0aWFsaXplRmlsZVN5c3RlbSIpO2Z1bmN0aW9uIHJlKHQsZSl7bGV0e2JpbmFyeTpjLHJlc3BvbnNlOm99PU8oZSsicHlvZGlkZS5hc20ud2FzbSIpO3QuaW5zdGFudGlhdGVXYXNtPWZ1bmN0aW9uKGEscil7cmV0dXJuIGFzeW5jIGZ1bmN0aW9uKCl7dHJ5e2xldCBuO28/bj1hd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhvLGEpOm49YXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYXdhaXQgYyxhKTtsZXR7aW5zdGFuY2U6dSxtb2R1bGU6aX09bjt0eXBlb2YgV2FzbU9mZnNldENvbnZlcnRlcjwidSImJih3YXNtT2Zmc2V0Q29udmVydGVyPW5ldyBXYXNtT2Zmc2V0Q29udmVydGVyKHdhc21CaW5hcnksaSkpLHIodSxpKX1jYXRjaChuKXtjb25zb2xlLndhcm4oIndhc20gaW5zdGFudGlhdGlvbiBmYWlsZWQhIiksY29uc29sZS53YXJuKG4pfX0oKSx7fX19ZihyZSwicHJlbG9hZFdhc20iKTt2YXIgYj0iMC4yNS4xIjthc3luYyBmdW5jdGlvbiBUKHQ9e30pe2F3YWl0IEEoKTtsZXQgZT10LmluZGV4VVJMfHxhd2FpdCBRKCk7ZT1OKGUpLGUuZW5kc1dpdGgoIi8iKXx8KGUrPSIvIiksdC5pbmRleFVSTD1lO2xldCBjPXtmdWxsU3RkTGliOiExLGpzZ2xvYmFsczpnbG9iYWxUaGlzLHN0ZGluOmdsb2JhbFRoaXMucHJvbXB0P2dsb2JhbFRoaXMucHJvbXB0OnZvaWQgMCxsb2NrRmlsZVVSTDplKyJweW9kaWRlLWxvY2suanNvbiIsYXJnczpbXSxfbm9kZV9tb3VudHM6W10sZW52Ont9LHBhY2thZ2VDYWNoZURpcjplLHBhY2thZ2VzOltdfSxvPU9iamVjdC5hc3NpZ24oYyx0KTtvLmVudi5IT01FfHwoby5lbnYuSE9NRT0iL2hvbWUvcHlvZGlkZSIpO2xldCBhPWVlKCk7YS5wcmludD1vLnN0ZG91dCxhLnByaW50RXJyPW8uc3RkZXJyLGEuYXJndW1lbnRzPW8uYXJncztsZXQgcj17Y29uZmlnOm99O2EuQVBJPXIsci5sb2NrRmlsZVByb21pc2U9WShvLmxvY2tGaWxlVVJMKSxyZShhLGUpLHRlKGEsbyk7bGV0IG49bmV3IFByb21pc2Uocz0+YS5wb3N0UnVuPXMpO2lmKGEubG9jYXRlRmlsZT1zPT5vLmluZGV4VVJMK3MsdHlwZW9mIF9jcmVhdGVQeW9kaWRlTW9kdWxlIT0iZnVuY3Rpb24iKXtsZXQgcz1gJHtvLmluZGV4VVJMfXB5b2RpZGUuYXNtLmpzYDthd2FpdCBTKHMpfWlmKGF3YWl0IF9jcmVhdGVQeW9kaWRlTW9kdWxlKGEpLGF3YWl0IG4sYS5leGl0ZWQpdGhyb3cgYS5leGl0ZWQudG9UaHJvdztpZih0LnB5cHJveHlUb1N0cmluZ1JlcHImJnIuc2V0UHlQcm94eVRvU3RyaW5nTWV0aG9kKCEwKSxyLnZlcnNpb24hPT1iKXRocm93IG5ldyBFcnJvcihgUHlvZGlkZSB2ZXJzaW9uIGRvZXMgbm90IG1hdGNoOiAnJHtifScgPD09PiAnJHtyLnZlcnNpb259Jy4gSWYgeW91IHVwZGF0ZWQgdGhlIFB5b2RpZGUgdmVyc2lvbiwgbWFrZSBzdXJlIHlvdSBhbHNvIHVwZGF0ZWQgdGhlICdpbmRleFVSTCcgcGFyYW1ldGVyIHBhc3NlZCB0byBsb2FkUHlvZGlkZS5gKTthLmxvY2F0ZUZpbGU9cz0+e3Rocm93IG5ldyBFcnJvcigiRGlkbid0IGV4cGVjdCB0byBsb2FkIGFueSBtb3JlIGZpbGVfcGFja2FnZXIgZmlsZXMhIil9O2xldCB1PXIuZmluYWxpemVCb290c3RyYXAoKTtpZih1LnZlcnNpb24uaW5jbHVkZXMoImRldiIpfHxyLnNldENkblVybChgaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L3B5b2RpZGUvdiR7dS52ZXJzaW9ufS9mdWxsL2ApLGF3YWl0IHIucGFja2FnZUluZGV4UmVhZHksci5fcHlvZGlkZS5faW1wb3J0aG9vay5yZWdpc3Rlcl9tb2R1bGVfbm90X2ZvdW5kX2hvb2soci5faW1wb3J0X25hbWVfdG9fcGFja2FnZV9uYW1lLHIubG9ja2ZpbGVfdW52ZW5kb3JlZF9zdGRsaWJzX2FuZF90ZXN0KSxyLmxvY2tmaWxlX2luZm8udmVyc2lvbiE9PWIpdGhyb3cgbmV3IEVycm9yKCJMb2NrIGZpbGUgdmVyc2lvbiBkb2Vzbid0IG1hdGNoIFB5b2RpZGUgdmVyc2lvbiIpO3JldHVybiByLnBhY2thZ2VfbG9hZGVyLmluaXRfbG9hZGVkX3BhY2thZ2VzKCksby5mdWxsU3RkTGliJiZhd2FpdCB1LmxvYWRQYWNrYWdlKHIubG9ja2ZpbGVfdW52ZW5kb3JlZF9zdGRsaWJzKSxyLmluaXRpYWxpemVTdHJlYW1zKG8uc3RkaW4sby5zdGRvdXQsby5zdGRlcnIpLHV9ZihULCJsb2FkUHlvZGlkZSIpO2dsb2JhbFRoaXMubG9hZFB5b2RpZGU9VDtyZXR1cm4gbWUoUmUpO30pKCk7CnRyeXtPYmplY3QuYXNzaWduKGV4cG9ydHMsbG9hZFB5b2RpZGUpfWNhdGNoKF8pe30KZ2xvYmFsVGhpcy5sb2FkUHlvZGlkZT1sb2FkUHlvZGlkZS5sb2FkUHlvZGlkZTsKLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHlvZGlkZS5qcy5tYXAK');
  let python = await loadPyodide();
  let canRunPY = true; // <- this should probably be false initially, but then people will complain about it not working
  let allowMainScript = ((runtime.extensionStorage[extId] ??= {}).allowMainScript ??= false);
  let pythonMainScript = ((runtime.extensionStorage[extId] ??= {}).pythonMainScript ||= '');
  let runMainScriptWhen = ((runtime.extensionStorage[extId] ??= {}).runMainScriptWhen ||= 'never');
  let initWCSCMDS = true; // initialize scratch commands for the written programming language. (stands for Written Code Scratch Commands)
  const pythonError = {
  cur:  { msg: '', line: 0, linemsg: '' },
  last: { msg: '', line: 0, linemsg: '' }
};

const pythonMainError = {
  cur:  { msg: '', line: 0, linemsg: '' },
  last: { msg: '', line: 0, linemsg: '' }
};

  // @ts-ignore
  const sbfuncArgs = Symbol('sbfuncArgs');
  const sbfuncwatcher = Symbol('sbfuncwatcher');
  const sbfuncstatus = Symbol('sbfuncstatus');

  // Utility functions
  const formatRes = (res) => {
    if (res === '') return '[empty String]';
    if (res === true) return '[boolean True]';
    if (res === false) return '[boolean False]';
    if (res === null) return '[empty Null]';
    if (res === undefined) return '[empty Undefined]';
    if (typeof res === 'object') {
      if (Array.isArray(res)) return '[object Array]';
      return '[object Object]';
    }
    if (typeof res === 'function') return '[object Function]';
    if (typeof res === 'number') return `[number ${res}]`;
    return `[string|empty <\n${res}\n>]`;
  };
  const _getVarObjectFromName = (name, util, type) => {
    const stageTarget = runtime.getTargetForStage();
    const target = util.target;
    let listObject = Object.create(null);

    listObject = stageTarget.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
    listObject = target.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
  };

  function _parseJSON(obj) {
    if (Array.isArray(obj)) return {};
    if (typeof obj === 'object') return obj;
    try {
      obj = JSON.parse(obj);
      if (Array.isArray(obj)) return {};
      if (typeof obj === 'object') return obj;
      return {};
    } catch {
      return {};
    }
  }

  // Resetting the python runtime
  // @ts-ignore
  let reloadOnStart = true; // <- this is a variable to make sure the python engine is reset on flag click
  async function resetPython() {
    python = await loadPyodide();
    initWCSCMDS = true;
  }



  const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = cbfsb(blockInfo, categoryInfo);
    if (blockInfo.outputShape) {
      res.json.outputShape = blockInfo.outputShape;
    }
    return res;
  };

  // Actual extension code
  class extension {
    get python() {
      return python;
    }
    static get MoreFields() {
      if (!runtime.ext_0znzwMoreFields) return false;
      if (!ArgumentType.INLINETEXTAREA) return false;
      if (!runtime.ext_0znzwMoreFields.constructor.customFieldTypes) return false;
      return true;
    }
    static get customFieldTypes() {
      return extension.MoreFields ? runtime.ext_0znzwMoreFields.constructor.customFieldTypes : {};
    }
    constructor() {
      this.DEBUG = true;
      this._curErrorMsg = '';
      this._lastErrorMsg = '';
      this._curErrorLine = 0;
      this._lastErrorLine = 0;
      this._curMainErrorMsg = '';
      this._lastMainErrorMsg = '';
      this._curMainErrorLine = 0;
      this._lastMainErrorLine = 0;
      //Some things may require util
      this.preservedUtil = null;
      this.setupClasses();
    }
    getInfo() {
      const MoreFields = extension.MoreFields;
      return {
        id: extId,
        name: 'Python',
        color1: '#4584b6',
        color2: '#ffde57',
        color3: '#646464', 
        menuIconURI,
        blocks: [
          "---",
          {opcode: 'VMState', func: 'isPYenabled', blockType: BlockType.BOOLEAN, text: 'is python on?'},
          {opcode: 'toggleInit', func: 'setScratchCommandsEnabled', blockType: BlockType.COMMAND, text: 'enable scratch commands for python? [INIT]', arguments: {INIT: {type: ArgumentType.STRING, menu: 'boolean', defaultValue: 'true'}}},
          {opcode: 'pythonVMdo', blockType: BlockType.COMMAND, text: '[ACTION] python vm', arguments: {ACTION: {type: ArgumentType.STRING, menu: `pythonVMdo`, defaultValue: `stop`}}, func: 'pythonVMdo'},
          '---',
          {blockType: BlockType.LABEL, text: 'Python Code'},
          "---",
          {blockType: BlockType.BUTTON, func: 'mainScriptToggle', text: allowMainScript ? "Disable Main Script": 'Enable Main Script', hideFromPalette: false},
          {opcode: 'runMainScriptOn', blockType: BlockType.COMMAND, text: 'run main script [RMSW]', arguments: {RMSW: {type: ArgumentType.STRING, defaultValue: 'never', menu: 'RMSW'}}, func: 'runMainScriptOn', hideFromPalette: !allowMainScript},
          {opcode: 'setMainScript', blockType: BlockType.COMMAND, text: 'set main script to [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: 'print "hello world"'}}, func: 'setMainScript', hideFromPalette: !allowMainScript},
          {opcode: 'getMainScript', blockType: BlockType.REPORTER, text: 'main script', func: 'getMainScript', outputShape: 3, hideFromPalette: !allowMainScript},
          {opcode: 'no_op_0', blockType: BlockType.COMMAND, text: 'run python [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `data.setVar("my variable", "Running in Python")`}}, func: 'runPython', filter: [Scratch.TargetType.SPRITE]},
          {opcode: 'no_op_1', blockType: BlockType.REPORTER, text: 'run python [CODE]', arguments: {CODE: {type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING, defaultValue: `data.setVar("my variable", "Running in Python")`}}, func: 'runPython', outputShape: 3, filter: [Scratch.TargetType.SPRITE]},
          "---",
          {opcode: 'no_op_4', blockType: Scratch.BlockType.REPORTER, text: 'variable [VAR]', outputShape: Scratch.extensions.isPenguinmod ? 5 : 3, blockShape: Scratch.extensions.isPenguinmod ? 5 : 3, arguments: {VAR: {type: ArgumentType.STRING}}, allowDropAnywhere: true, func: 'getVar'},
          '---',
          {blockType: BlockType.LABEL, text: 'Bridging'},
          "---",
          {opcode: 'linkedFunctionCallback', blockType: BlockType.EVENT, text: 'when sbfunc() is called', isEdgeActivated: false, shouldRestartExistingThreads: true},
          {opcode: 'linkedFunctionCallbackReturn', blockType: BlockType.COMMAND, text: 'return [DATA]', arguments: {DATA: {type: ArgumentType.STRING}}, isTerminal: true},
          {opcode: 'no_op_5', blockType: Scratch.BlockType.REPORTER, text: '[TYPE] arguments', arguments: {TYPE: {type: ArgumentType.STRING, defaultValue: 'clean', menu: 'argreptypes'}}, allowDropAnywhere: true, disableMonitor: true, outputShape: 3, func: 'getsbfuncArgs'},
          {opcode: 'no_op_6', blockType: Scratch.BlockType.REPORTER, text: 'argument [NUM]', arguments: {NUM: {type: ArgumentType.NUMBER, defaultValue: 1}}, allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgsnum'},
          {opcode: 'no_op_7', blockType: Scratch.BlockType.REPORTER, text: 'argument count', allowDropAnywhere: true, disableMonitor: true, func: 'getsbfuncArgscnt'},
           '---',
          {blockType: BlockType.LABEL, text: 'Python Errors'},
          "---",
          {opcode: 'onError', blockType: BlockType.EVENT, text: 'when catching an error', isEdgeActivated: false, shouldRestartExistingThreads: true,},
          {opcode: 'curError', blockType: Scratch.BlockType.REPORTER, text: 'current error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true},
          {opcode: 'lastError', blockType: Scratch.BlockType.REPORTER, text: 'last error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true},
          {opcode: 'clearLastErrorMsg', blockType: Scratch.BlockType.COMMAND, text: 'clear last error message'},
          {opcode: 'onMainError', blockType: BlockType.EVENT, text: 'when main script errors', isEdgeActivated: false, shouldRestartExistingThreads: true, hideFromPalette: !allowMainScript},
          {opcode: 'curMainError', blockType: Scratch.BlockType.REPORTER, text: 'current main script error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true, hideFromPalette: !allowMainScript},
          {opcode: 'lastMainError', blockType: Scratch.BlockType.REPORTER, text: 'last main script error [TYPE]', arguments: {TYPE: {type: ArgumentType.STRING, menu: "errtypes", defaultValue: "message"}}, allowDropAnywhere: true, hideFromPalette: !allowMainScript},
          {opcode: 'clearLastMainErrorMsg', blockType: Scratch.BlockType.COMMAND, text: 'clear last main script error message', hideFromPalette: !allowMainScript}
        ],
        menus: {pythonVMdo: {acceptReporters: true, items: ['stop', 'start', 'reset']}, argreptypes: {acceptReporters: true, items: ['clean', 'joined', 'raw']}, RMSW: {acceptReporters: true, items: ['never', 'on start', 'always']}, boolean: {acceptReporters: true, items: ['true', 'false']}, errtypes: {acceptReporters: true, items: ['message', 'line', 'codeline']}},
        customFieldTypes: extension.customFieldTypes,
      };
    }

    // no-op functions ignore these and leave them blank
    isPYenabled() {
      return canRunPY;
    }
    no_op_0() {}
    no_op_1() {}
    no_op_2() {}
    no_op_3() {}
    no_op_4() {}
    no_op_5() {}
    no_op_6() {}
    no_op_7() {}
    onError() {}
    onMainError() {}

    lastError     = (args) => { switch(args?.TYPE){ case 'line':     return pythonError.last.line; case 'codeline': return pythonError.last.linemsg; } return pythonError.last.msg; };
    
    curError      = (args) => { switch(args?.TYPE){ case 'line':     return pythonError.cur.line;  case 'codeline': return pythonError.cur.linemsg; } return pythonError.cur.msg; };

    lastMainError = (args) => { switch(args?.TYPE){ case 'line':     return pythonMainError.last.line; case 'codeline': return pythonMainError.last.linemsg; } return pythonMainError.last.msg; };
    
    curMainError  = (args) => { switch(args?.TYPE){ case 'line':     return pythonMainError.cur.line;  case 'codeline': return pythonMainError.cur.linemsg; } return pythonMainError.cur.msg; };




    _extensions() {
      // @ts-ignore
      const arr = Array.from(vm.extensionManager._loadedExtensions.keys());
      if (typeof arr[0] !== 'string') arr.push('');
      return arr;
    }
    runBlock({EXT, OPCODE, ARGS}, util, blockJSON) {
      /* @author https://github.com/TheShovel/ */
      /* @author https://scratch.mit.edu/users/0znzw/ */
      /* @link https://github.com/PenguinMod/PenguinMod-ExtensionsGallery/blob/main/static/extensions/TheShovel/extexp.js */
      // (and the subsequent custom functions ^)
      if (((EXT = Cast.toString(EXT)), (!this._extensions().includes(EXT) || EXT === '') && !runtime[`ext_${EXT}`])) return '';
      const fn = runtime._primitives[`${EXT}_${Cast.toString(OPCODE)}`] || runtime[`ext_${EXT}`]?.[Cast.toString(OPCODE)];
      if (!fn) return '';
      // blockJSON is not "as" important as util
      // util is usually required for a block to even run
      // expect a lot of errors if it is missing
      const res = fn(_parseJSON(ARGS), this._util(util), blockJSON || {});
      if (this.DEBUG) console.trace(`runBlock_JS | Ran ${EXT}_${OPCODE} and got:\n`, formatRes(res));
      return res;
    }

    getVar(args) {
      const v = python.globals.get(Cast.toString(args.VAR));
      return (v === null) ? '' : v;
    }

    mainScriptToggle() { (allowMainScript = !(allowMainScript), runtime.extensionStorage[extId].allowMainScript = allowMainScript, Scratch.vm.extensionManager.refreshBlocks()); }
    setMainScript({ CODE }) { (runtime.extensionStorage[extId] ??= {}).pythonMainScript = pythonMainScript = Cast.toString(CODE); }
    getMainScript(){return Cast.toString(pythonMainScript);}
    runMainScriptOn(args){(runMainScriptWhen = args.RMSW, runtime.extensionStorage[extId].runMainScriptWhen = runMainScriptWhen)}

    linkedFunctionCallback(){}
    
    linkedFunctionCallbackReturn(args, { thread }) {
      // Make sure to do this first otherwise the default return value may be returned.
      // this fixes an edge case where there is only 1 thread.      
      // Don't cast the return value as we don't know what it can be :3
      if (thread[sbfuncwatcher]) thread[sbfuncwatcher](args.DATA);
      thread.stopThisScript(); //never defined. is this a natural scratch api function or something?
      thread.status = Thread.STATUS_DONE; // likely has something to do with this. u sure this is right?
    }

    _util(util) {
      return this.preservedUtil || util;
    }
    _constructFakeUtil(realUtil) {
      return this._util(realUtil) || {target: vm.editingTarget, thread: runtime.threads[0], stackFrame: {}};
    }

    async pythonVMdo(args) {
      switch (args.ACTION) {
        case 'stop':
          python = null;
          canRunPY = false;
          break;
        case 'start':
          if (!canRunPY) {
            await resetPython();
            canRunPY = true;
          }
          break;
        default:
          canRunPY = false;
          await resetPython();
          canRunPY = true;
          break;
      }
    }

getsbfuncArgs(args, { thread }) {
  if (!thread[sbfuncArgs]) return '[]';

  const argArray = thread[sbfuncArgs];
  const type = Cast.toString(args.TYPE);

  if (type === 'raw') {
    return JSON.stringify(argArray);
  }

  if (type === 'joined') {
    return argArray.map(item => Cast.toString(item)).join(', ');
  }

    const stringifiedItems = argArray.map(item => Cast.toString(item));
    return JSON.stringify(stringifiedItems);
}



    getsbfuncArgsnum(args, { thread }) {
      if (!thread[sbfuncArgs]) return '';
      return thread[sbfuncArgs][Cast.toNumber(args.NUM) - 1] ?? ''; //first is 1 not 0
    }
    getsbfuncArgscnt(args, { thread }) {
      const argsList = thread[sbfuncArgs];
      if (!Array.isArray(argsList)) return 0;
      return argsList.length;
    }
    clearLastErrorMsg() {
      pythonError.last.msg     = '';
      pythonError.last.line    = 0;
      pythonError.last.linemsg = '';
    }

    clearLastMainErrorMsg() {
      pythonMainError.last.msg     = '';
      pythonMainError.last.line    = 0;
      pythonMainError.last.linemsg = '';
    }




    setupClasses() {
      const MathUtil = {PI: Math.PI, E: Math.E, degToRad: (deg) => deg * (Math.PI / 180), radToDeg: (rad) => rad * (180 / Math.PI)};
      this.MathUtil = MathUtil;
      this.Functions = {
        // Motion functions
        motion_moveSteps: (util, steps) => runtime.ext_scratch3_motion._moveSteps.call(runtime.ext_scratch3_motion, Cast.toNumber(steps), util.target),
        motion_turn: (util, deg) => util.target.setDirection(util.target.direction + Cast.toNumber(deg)),
        motion_goTo: (util, x, y) => util.target.setXY(Cast.toNumber(x), Cast.toNumber(y)),
        motion_changePos: (util, dx, dy) => util.target.setXY(util.target.x + Cast.toNumber(dx), util.target.y + Cast.toNumber(dy)),
        motion_setX: (util, x) => util.target.setXY(Cast.toNumber(x), util.target.y),
        motion_setY: (util, y) => util.target.setXY(util.target.x, Cast.toNumber(y)),
        motion_changeX: (util, dx) => util.target.setXY(util.target.x + Cast.toNumber(dx), util.target.y),
        motion_changeY: (util, dy) => util.target.setXY(util.target.x, util.target.y + Cast.toNumber(dy)),
        motion_pointInDir: (util, deg) => (util.target.direction = Cast.toNumber(deg)),
        motion_setRotationStyle: (util, style) => util.target.setRotationStyle(Cast.toString(style)),
        motion_ifOnEdgeBounce: (util) => runtime.ext_scratch3_motion._ifOnEdgeBounce.call(runtime.ext_scratch3_motion, util.target),

        // Looks
        looks_say: (util, msg, secs) => secs != null ? runtime.ext_scratch3_looks.sayforsecs.call(runtime.ext_scratch3_looks, { MESSAGE: Cast.toString(msg), SECS: Cast.toNumber(secs) }, util) : runtime.ext_scratch3_looks._say.call(runtime.ext_scratch3_looks, Cast.toString(msg), util.target),
        looks_sayForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.sayforsecs.call(runtime.ext_scratch3_looks, {MESSAGE: msg, SECS: secs}, util),
        looks_think: (util, msg, secs) => secs != null ? runtime.ext_scratch3_looks.thinkforsecs.call(runtime.ext_scratch3_looks, { MESSAGE: Cast.toString(msg), SECS: Cast.toNumber(secs) }, util) : runtime.emit(runtime.ext_scratch3_looks.SAY_OR_THINK, util.target, 'think', Cast.toString(msg)),
        looks_thinkForSecs: (util, msg, secs) => runtime.ext_scratch3_looks.thinkforsecs.call(runtime.ext_scratch3_looks, {MESSAGE: msg, SECS: secs}, util),
        looks_show: (util) => runtime.ext_scratch3_looks.show.call(runtime.ext_scratch3_looks, null, util),
        looks_hide: (util) => runtime.ext_scratch3_looks.hide.call(runtime.ext_scratch3_looks, null, util),
        looks_getCostume: (util) => util.target.getCostume().name,
        looks_setCostume: (util, costume) => util.target.setCostume(costume),
        looks_nextCostume: (util) => util.target.setCostume(util.target.currentCostume + 1),
        looks_lastCostume: (util) => util.target.setCostume(util.target.currentCostume - 1),
        looks_getSize: (util) => util.target.size,
        looks_setSize: (util, size) => util.target.setSize(Cast.toNumber(size)),
        looks_changeSize: (util, size) => util.target.setSize(util.target.size + Cast.toNumber(size)),
        looks_setEffect: (util, effect, value) => util.target.effects.set(Cast.toString(effect), Cast.toNumber(value)),
        looks_changeEffect: (util, effect, value) => {
          const current = util.target.effects.get(Cast.toString(effect)) || 0;
          util.target.effects.set(Cast.toString(effect), current + Cast.toNumber(value));
        },
        looks_effectClear: (util) => util.target.effects.clear(),

        //Events
        events_broadcast: (util, msg) => util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: msg}),
        events_broadcastandwait: (util, msg) => runtime.ext_scratch3_events.broadcastAndWait({BROADCAST_OPTION: msg}, util),

        // Control
        // @ts-ignore
        control_wait: (_, seconds) => new Promise((resolve) => setTimeout(resolve, Cast.toNumber(seconds) * 1000)),
        control_clone: (util) => runtime.ext_scratch3_control.createClone(util),
        control_deleteClone: (util) => util.target.removeClone(),

        //Sensing
        // @ts-ignore
        sensing_loudness: () => runtime.ioDevices.audio.getLoudness(),
        sensing_loud: () => runtime.ioDevices.audio.getLoudness() > 10,
        sensing_mouseX: () => runtime.ioDevices.mouse._scratchX,
        sensing_mouseY: () => runtime.ioDevices.mouse._scratchY,
        // @ts-ignore
        sensing_mouseDown: (util) => runtime.ioDevices.mouse,
        // @ts-ignore

        sensing_timer: () => runtime.ioDevices.clock.projectTimer(),
        sensing_resettimer: () => runtime.ioDevices.clock.resetProjectTimer(),
        sensing_username: () => runtime.ioDevices.userData.getUsername() || '',
        sensing_current: (util, type) => runtime.ext_scratch3_sensing._getCurrent(Cast.toString(type)),
        sensing_dayssince2000: () => {
          const msPerDay = 1000 * 60 * 60 * 24;
          return (Date.now() - new Date('2000-01-01').getTime()) / msPerDay;
        },
        sensing_distanceto: (util, spriteName) => {
          const target = runtime.getTargetForName(spriteName);
          if (!target) return 0;
          const dx = target.x - util.target.x;
          const dy = target.y - util.target.y;
          return Math.sqrt(dx * dx + dy * dy);
        },
        sensing_colorIsTouchingColor: (util, color1, color2) =>
          runtime.renderer.colorTouchingColor(util.target.drawableID, color1, color2),
        sensing_touchingcolor: (util, color) =>
          runtime.renderer.touchingColor(util.target.drawableID, color),
        sensing_touchingobject: (util, sprite) =>
          runtime.ext_scratch3_sensing._isTouchingObject({TOUCHINGOBJECTMENU: sprite}, util),
        sensing_keypressed: (util, key) =>
          runtime.ioDevices.keyboard.isKeyPressed(key),
        sensing_ask: (util, msg) => runtime.ext_scratch3_sensing.askAndWait({QUESTION: msg}, util),
        sensing_answer: () => runtime.ioDevices.promptProvider.getLastAnswer(),

    // Data – variable support
    /*
    data_setvar: (util, name, val) => {
      const key = Cast.toString(name);
      if (util.target.variables[key]) {
        util.target.variables[key].value = val;
      }
    },
    data_getvar: (util, name) => {
      const key = Cast.toString(name);
      return util.target.variables[key]?.value;
    },
    */

    data_setvar: (util, name, val) => (_getVarObjectFromName(Cast.toString(name), util, false).value = val),
    data_getvar: (util, name) => _getVarObjectFromName(Cast.toString(name), false).value,
    data_changevar: (util, name, val) => (_getVarObjectFromName(Cast.toString(name), util, false).value = Cast.toNumber(_getVarObjectFromName(Cast.toString(name), util, false).value + Cast.toNumber(val))),
    data_makevar: (util, name) => runtime.emit('VARIABLE_CREATE', Cast.toString(name), 'global', false),
    data_deletevar: (util, name) => runtime.emit('VARIABLE_DELETE', Cast.toString(name), 'global'),
    data_showvar: (util, name) => runtime.emit('MONITORS_SHOW', { id: Cast.toString(name) }),
    data_hidevar: (util, name) => runtime.emit('MONITORS_HIDE', { id: Cast.toString(name) }),

    // Data – list support
    data_setlist: (util, name, list) => (_getVarObjectFromName(Cast.toString(name), util, true).value = list),
    data_getlist: (util, name) => _getVarObjectFromName(Cast.toString(name), true).value,
    data_addtolist: (util, name, value) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) list.value.push(value);
    },
    data_removefromlist: (util, name, pos) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) {
        const index = Cast.toNumber(pos) - 1;
        if (index >= 0 && index < list.value.length) list.value.splice(index, 1);
      }
    },
    data_clearlist: (util, name) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) list.value.length = 0;
    },
    data_replacelistitem: (util, name, val, pos) => {
      const list = util.target.lists[Cast.toString(name)];
      if (list) {
        const index = Cast.toNumber(pos) - 1;
        if (index >= 0 && index < list.value.length) list.value[index] = val;
      }
    },
    data_listitem: (util, name, pos) => {
      const list = util.target.lists[Cast.toString(name)];
      const index = Cast.toNumber(pos) - 1;
      return Cast.toString(list?.value[index]);
    },
    data_listitemnum: (util, name, item) => {
      const list = util.target.lists[Cast.toString(name)];
      return list ? list.value.indexOf(item) + 1 : 0;
    },
    data_makelist: (util, name) => runtime.emit('LIST_CREATE', Cast.toString(name), 'global', false),
    data_deletelist: (util, name) => runtime.emit('LIST_DELETE', Cast.toString(name), 'global'),
    data_getvars: (util) => Cast.toString(Object.values(util.target.variables)),
    data_getlists: (util) => Cast.toString(Object.values(util.target.lists)),
    data_listlength: (util, name) => {
      const list = util.target.lists[Cast.toString(name)];
      return list ? list.value.length : 0;
    }
  };
}


    initPythonCommands(util) {
      // Register all the commands for python.
      util = this._constructFakeUtil(util);
      const ref =
        (fn, fnn) =>
        (...args) =>
          // @ts-ignore I know it "could" be undefined but it wont be
          this.Functions[fn || fnn](util, ...args);
      const bindHere = (fn) => fn.bind(this);

      // Setting  sbfunc
      python.globals.set('sbfunc', async (...args) => {
        const returns = [];
        let alive = 0;
        const bindAlive = thread => {
          ++alive;
          const status_getter = thread.__lookupGetter__('status');
          const status_setter = thread.__lookupSetter__('status');
          thread.__defineGetter__('status', (...args) => {
            if (status_getter) status_getter(...args);
            return thread[sbfuncstatus];
          });
          thread.__defineSetter__('status', (...args) => {
            if (
              thread[sbfuncstatus] !== args[0] &&
              args[0] === Thread.STATUS_DONE &&
              !--alive
            ) {
              thread[sbfuncwatcher]('');
              for (const thread of threads) {
                if (thread.status == Thread.STATUS_DONE) continue;
                thread.stopThisScript();
                thread.status = Thread.STATUS_DONE;
              }
            }
            thread[sbfuncstatus] = args[0]
            if (status_setter) return status_setter(...args);
            return args[0];
          });
        };
        const threads = util.startHats(`${extId}_linkedFunctionCallback`);
        for (const thread of threads) {
          thread.status = Thread.STATUS_PROMISE_WAIT;
          bindAlive(thread);
          // Don't let the thread run till we can resolve.
          thread[sbfuncArgs] = args;
          returns.push(new Promise(resolve => {
            // Allow the thread to run.
            thread[sbfuncwatcher] = (value) => resolve(value);
            thread.status = Thread.STATUS_RUNNING;
          }));
        }
        // We only care about one return value,
        // the rest are useless. (for now)
        const res = await Promise.any(returns);
        // kill any extra threads
        for (const thread of threads) {
          if (thread.status == Thread.STATUS_DONE) continue;
          thread.stopThisScript();
          thread.status = Thread.STATUS_DONE;
        }
        return res;
      });
      // Setting up the target // idk lmao
      python.globals.set('sprite', {switch: (name) => runtime.setEditingTarget(runtime.getSpriteTargetByName(Cast.toString(name)) || runtime.getTargetForStage()), x: () => util.target.x, y: () => util.target.y, direction: () => util.target.direction, size: () => Math.round(util.target.size), trueSize: () => util.target.size, rotationStyle: () => util.target.rotationStyle, costume: (type) => (Cast.toString(type) === 'name' ? util.target.getCostumes()[util.target.currentCostume].name : util.target.currentCostume + 1)});

      // Custom category: MathUtil
      python.globals.set('MathUtil', this.MathUtil);

      // Category: sounds
      python.globals.set('sounds', {
        play: ref('sounds_play'),
        playSound: ref('sounds_play'),
        stopAll: ref('sounds_stopAll'),
        stop: ref('sounds_stopAll'),
        setVolume: ref('sounds_setVolume'),
        changeVolume: ref('sounds_changeVolume'),
        volume: ref('sounds_volume'),
        getVolume: ref('sounds_volume'),
        effect: ref('sounds_effects'),
        setEffect: ref('sounds_effects')
      });

      // Category: events
      python.globals.set('events', {
        broadcast: ref('events_broadcast'),
        broadcastAndWait: ref('events_broadcastandwait'),
        trigger: ref('events_broadcast'),
        emit: ref('events_broadcast')
      });

      // Category: control
      python.globals.set('control', {
        wait: ref('control_wait'),
        sleep: ref('control_wait'),
        delay: ref('control_wait'),
        clone: ref('control_clone'),
        createClone: ref('control_clone'),
        deleteClone: ref('control_deleteClone'),
        removeClone: ref('control_deleteClone')
      });

      // Category: sensing
      python.globals.set('sensing', {
        loudness: ref('sensing_loudness'),
        loud: ref('sensing_loud'),
        isLoud: ref('sensing_loud'),
        mouseX: ref('sensing_mouseX'),
        mouseY: ref('sensing_mouseY'),
        mouseDown: ref('sensing_mouseDown'),
        timer: ref('sensing_timer'),
        resetTimer: ref('sensing_resettimer'),
        username: ref('sensing_username'),
        current: ref('sensing_current'),
        daysSince2000: ref('sensing_dayssince2000'),
        distanceTo: ref('sensing_distanceto'),
        colorTouching: ref('sensing_colorIsTouchingColor'),
        touchingColor: ref('sensing_touchingcolor'),
        touchingObject: ref('sensing_touchingobject'),
        keyPressed: ref('sensing_keypressed'),
        key: ref('sensing_keypressed'),
        ask: ref('sensing_ask'),
        answer: ref('sensing_answer')
      });

      // Category: data
      python.globals.set('data', {
        setVar: ref('data_setvar'),
        getVar: ref('data_getvar'),
        changeVar: ref('data_changevar'),
        makeVar: ref('data_makevar'),
        createVar: ref('data_makevar'),
        deleteVar: ref('data_deletevar'),
        showVar: ref('data_showvar'),
        hideVar: ref('data_hidevar'),
        makeList: ref('data_makelist'),
        createList: ref('data_makelist'),
        deleteList: ref('data_deletelist'),
        getList: ref('data_getlist'),
        setList: ref('data_setlist'),
        addToList: ref('data_addtolist'),
        push: ref('data_addtolist'),
        append: ref('data_addtolist'),
        remove: ref('data_removefromlist'),
        removeFromList: ref('data_removefromlist'),
        pull: ref('data_removefromlist'),
        clear: ref('data_clearlist'),
        replace: ref('data_replacelistitem'),
        item: ref('data_listitem'),
        getFromList: ref('data_listitem'),
        itemNum: ref('data_listitemnum'),
        length: ref('data_listlength'),
        size: ref('data_listlength'),
        getVars: ref('data_getvars'),
        getLists: ref('data_getlists')
      });

      // Category: motion
      python.globals.set('motion', {move: ref('motion_moveSteps'), moveSteps: ref('motion_moveSteps'), turn: ref('motion_turn'), rotate: ref('motion_turn'), goTo: ref('motion_goTo'), setPos: ref('motion_goTo'), set: ref('motion_goTo'), XY: ref('motion_goTo'), changePos: ref('motion_changePos'), change: ref('motion_changePos'), transform: ref('motion_changePos'), setX: ref('motion_setX'), X: ref('motion_setX'), setY: ref('motion_setY'), Y: ref('motion_setY'), changeX: ref('motion_changeX'), changeY: ref('motion_changeY'), pointInDir: ref('motion_pointInDir'), point: ref('motion_pointInDir'), setRotationStyle: ref('motion_setRotationStyle'), RotStyle: ref('motion_setRotationStyle'), RotationStyle: ref('motion_setRotationStyle'), ifOnEdgeBounce: ref('motion_ifOnEdgeBounce')});

      //Category: Looks
      python.globals.set('looks', {say: ref('looks_say'), sayForSecs: ref('looks_sayForSecs'), speak: ref('looks_say'), think: ref('looks_think'), thinkForSecs: ref('looks_thinkForSecs'), show: ref('looks_show'), hide: ref('looks_hide'), getCostume: ref('looks_getCostume'), setCostume: ref('looks_setCostume'), costume: ref('looks_getCostume'), nextCostume: ref('looks_nextCostume'), lastCostume: ref('looks_lastCostume'), getSize: ref('looks_getSize'), size: ref('looks_getSize'), setSize: ref('looks_setSize'), changeSize: ref('looks_changeSize'), setEffect: ref('looks_setEffect'), changeEffect: ref('looks_changeEffect'), effectClear: ref('looks_effectClear'), clearEffects: ref('looks_effectClear')});

    // helper: strict‐arity, ignores extras, errors on too few/invalid
    function wrapMathFn(fn) {
      const arity = fn.length;
      return (...args) => {
        if (args.length < arity) {
          throw new Error(`Expected at least ${arity} arguments, got ${args.length}`);
        }
        const safe = args.slice(0, arity);
        safe.forEach((v, i) => {
          if (typeof v !== "number" || Number.isNaN(v)) {
            throw new Error(`Argument ${i+1} must be a valid number`);
          }
        });
        return fn(...safe);
      };
    }

      // Custom category: Cast
      python.globals.set('Cast', Cast);


      // Custom category: JS
      python.globals.set('JS', {
        JSON: {
          parse(...args) {
            // @ts-expect-error
            return JSON.parse(...args);
          },
          stringify(...args) {
            // @ts-expect-error
            return JSON.stringify(...args);
          },
        },
        Array: {
          new(length) {
            return new Array(Cast.toNumber(length) || 0);
          },
          from(value) {
            // @ts-ignore
            return Array.from(value);
          },
          fromIndexed(object) {
            if (Array.isArray(object)) return object;
            if (typeof object !== 'object') return [];
            return [];
          },
          toIndexed(array) {
            if (!Array.isArray(array)) return {};
            // @ts-ignore
            return Object.fromEntries(array.map((v, i) => [i, v]));
          },
          isArray(value) {
            return Array.isArray(value);
          },
        },
        Object: {
          create(prototype) {
            return Object.create(prototype || {});
          },
          assign(a, b) {
            // @ts-ignore
            return Object.assign(a, b);
          },
          new() {
            return Object.create(null);
          },
        },
      });
      // Custom functions
      python.globals.set('scratch', {
        fetch(url, opts, ...args) {
          opts = opts || {};
          return Scratch.fetch(Cast.toString(url), opts, ...args);
        },
        preserveUtil: function () {
          // Util may become outdated, use this with causion!
          this.extension.preservedUtil = this.util;
        }.bind({util, extension: this}),
        wipeUtil: bindHere(function () {
          this.preservedUtil = null;
        }),
        primitiveRunBlock: bindHere(this.runBlock),
        runBlock: async (EXT, OPCODE, ARGS) => {
          const res = await this.runBlock(
            {EXT: Cast.toString(EXT), OPCODE: Cast.toString(OPCODE), ARGS: Cast.toString(ARGS)},
            this.preservedUtil || util,
            // we dont have access to the REAL blockJSON
            {},
          );
          if (this.DEBUG) console.trace(`runBlock_PY | Ran ${EXT}_${OPCODE} and got:\n`, formatRes(res));
          return res;
        },
        // This is just a cool novelty to show its possible :D
        _scratchLoader: `data:application/javascript;base64,${btoa(`
              (async function(Scratch) {
                const SafeScratch = {
                  extensions: {
                    unsandboxed: true,
                    register(object) {
                      Scratch.extensions.register(object);
                    }
                  },
                  Cast: Object.assign({}, Object.fromEntries(Object.getOwnPropertyNames(Scratch.Cast).flatMap(v => [
                    'constructor', 'prototype', 'name', 'length'
                  ].includes(v) ? [] : [[
                    v, Scratch.Cast[v]
                  ]]))),
                  BlockType: Object.assign({}, Scratch.BlockType),
                  ArgumentType: Object.assign({}, Scratch.ArgumentType),
                };
                await window._pythonExtensionLoader(Scratch);
              })(Scratch);
          `)}`,
        // @ts-ignore
        async _loadHack(url) {
          const gsm = vm.extensionManager.securityManager.getSandboxMode;
          // @ts-ignore
          vm.extensionManager.securityManager.getSandboxMode = () => Promise.resolve('unsandboxed');
          try {
            await vm.extensionManager.loadExtensionURL(Cast.toString(url));
          } finally {
            vm.extensionManager.securityManager.getSandboxMode = gsm;
            // @ts-ignore
            delete window._pythonExtensionLoader;
          }
        },
        
        _loadObject(object) {
          // @ts-ignore
          window._pythonExtensionLoader = object;
          // A extension to load the PY extension
          return this._loadHack(this._scratchLoader);
        },
      });
    }

    // Some "secret" stuff for python to use :3
    async secret_load({url}) {
      return await vm.extensionManager.loadExtensionURL(Cast.toString(url));
    }
    secret_injectFunction({namespace, args, js}) {
      python.globals.set(Cast.toString(namespace), new Function('python', ...args.split(' '), js).bind(window, python));
    }

    // Running, etc...
    setScratchCommandsEnabled({INIT}) {
      initWCSCMDS = Cast.toBoolean(INIT);
    }

    async runMainScript({ CODE }, util) {
    if (!canRunPY || CODE === '') return '';

    if (initWCSCMDS) {
        this.initPythonCommands(util);
        initWCSCMDS = false;
    }

    let result;
    try {
        result = await python.runPythonAsync(Cast.toString(CODE));
    } catch (err) {
        const msg = err instanceof Error ? err.message : Cast.toString(err);

        // Updated to match Python-style errors
        const match = msg.match(/<string>, line (\d+)/);
        const line = match ? parseInt(match[1], 10) : -1;

        let linemsg = '';
        if (line > 0) {
        const lines = CODE.split(/\r?\n/);
        linemsg = lines[line - 1] || '';
        }

        pythonMainError.cur = { msg, line, linemsg };
        pythonMainError.last = { ...pythonMainError.cur };

        // Removed invalid python.globals.getTop()
        vm.runtime.startHats('DragoPython_onMainError');
        return '';
    }

    // Removed invalid python.globals.getTop()

    if (typeof result === 'function') {
        const msg = `Invalid return: received a function value instead of a result → ${Cast.toString(result)}`;
        pythonMainError.cur = { msg, line: -1, linemsg: '' };
        pythonMainError.last = { ...pythonMainError.cur };
        vm.runtime.startHats('DragoPython_onMainError');
        return '';
    }

    pythonMainError.cur = { msg: '', line: 0, linemsg: '' };
    return result ?? '';
    }

    async runPython({ CODE }, util) {
    if (!canRunPY) return '';
    if (initWCSCMDS) {
        this.initPythonCommands(util);
        initWCSCMDS = false;
    }

    let result;
    try {
        result = await python.runPythonAsync(Cast.toString(CODE));
    } catch (err) {
        const msg   = err instanceof Error ? err.message : Cast.toString(err);
        const match = msg.match(/<string>, line (\d+)/); // Python error format
        const line  = match ? parseInt(match[1], 10) : -1;
        let linemsg = '';
        if (line > 0) {
        const lines = CODE.split(/\r?\n/);
        linemsg = lines[line - 1] || '';
        }
        pythonError.cur  = { msg, line, linemsg };
        pythonError.last = { ...pythonError.cur };

        // No getTop/pop necessary
        util.startHats('DragoPython_onError');
        return '';
    }

    // No getTop/pop necessary
    if (typeof result === 'function') {
        const msg = `Invalid return: received a function value instead of a result → ${Cast.toString(result)}`;
        pythonError.cur  = { msg, line: -1, linemsg: '' };
        pythonError.last = { ...pythonError.cur };
        util.startHats('DragoPython_onError');
        return '';
    }

    pythonError.cur = { msg: '', line: 0, linemsg: '' };
    return result ?? '';
    }



}

Scratch.vm.runtime.on('EXTENSION_ADDED', d => d?.id === '0znzwMoreFields' && reloadBlocks());
runtime.on('PROJECT_START', () => { if (reloadOnStart) resetPython(); if (allowMainScript && canRunPY && runMainScriptWhen == 'on start') runtime.ext_secret_dragonianpython.runMainScript({CODE: Scratch.vm.runtime.extensionStorage["DragoPython"].pythonMainScript}); });
runtime.on('PROJECT_STOP_ALL', () => resetPython());
runtime.on('BEFORE_EXECUTE', () => {if (allowMainScript && canRunPY && runMainScriptWhen == 'always') runtime.ext_secret_dragonianpython.runMainScript({CODE: Scratch.vm.runtime.extensionStorage["DragoPython"].pythonMainScript})});

  Scratch.extensions.register((runtime.ext_secret_dragonianpython = new extension()));
})(Scratch);