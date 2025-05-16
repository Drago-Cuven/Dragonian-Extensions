// Name: Ruby
// ID: dragonianruby
// Description: acts as a template for people to make their own extensions.
// By: Drago Cuven <https://github.com/Drago-Cuven>
// By: 0znzw <>
// License: MIT

// Version 0.0.1

(async function (Scratch) {
    'use strict'
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error("the 'Ruby' extension must run unsandboxed!")
    }

    const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTk4LjEzIiBoZWlnaHQ9IjE5Ny41OCIgdmlld0JveD0iMCAwIDE5OC4xMyAxOTcuNTgiIG92ZXJmbG93PSJ2aXNpYmxlIiB4bWw6c3BhY2U9InByZXNlcnZlIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTc0LjA3NCIgeTE9IjIxNS41NDkiIHgyPSIxMzIuMjc2IiB5Mj0iMTQxLjc1MyI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmI3NjU1Ii8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmI3NjU1Ii8+PHN0b3Agb2Zmc2V0PSIuNDEiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNDJiMWUiLz48c3RvcCBvZmZzZXQ9Ii45OSIgc3R5bGU9InN0b3AtY29sb3I6IzkwMCIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzkwMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE5NC44OTUiIHkxPSIxNTMuNTU4IiB4Mj0iMTQxLjAyOCIgeTI9IjExNy40MDkiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6Izg3MTEwMSIvPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6Izg3MTEwMSIvPjxzdG9wIG9mZnNldD0iLjk5IiBzdHlsZT0ic3RvcC1jb2xvcjojOTExMjA5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojOTExMjA5Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTUxLjc5NSIgeTE9IjIxNy43ODUiIHgyPSI5Ny45MyIgeTI9IjE4MS42MzgiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6Izg3MTEwMSIvPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6Izg3MTEwMSIvPjxzdG9wIG9mZnNldD0iLjk5IiBzdHlsZT0ic3RvcC1jb2xvcjojOTExMjA5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojOTExMjA5Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMzguNjk2IiB5MT0iMTI3LjM5MSIgeDI9IjQ3LjA0NyIgeTI9IjE4MS42NjEiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZiIvPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZiIvPjxzdG9wIG9mZnNldD0iLjIzIiBzdHlsZT0ic3RvcC1jb2xvcjojZTU3MjUyIi8+PHN0b3Agb2Zmc2V0PSIuNDYiIHN0eWxlPSJzdG9wLWNvbG9yOiNkZTNiMjAiLz48c3RvcCBvZmZzZXQ9Ii45OSIgc3R5bGU9InN0b3AtY29sb3I6I2E2MDAwMyIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I2E2MDAwMyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJmIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ijk2LjEzMyIgeTE9Ijc2LjcxNSIgeDI9Ijk5LjIxIiB5Mj0iMTMyLjEwMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmIi8+PHN0b3Agb2Zmc2V0PSIuMjMiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNDcxNGUiLz48c3RvcCBvZmZzZXQ9Ii41NiIgc3R5bGU9InN0b3AtY29sb3I6I2JlMWEwZCIvPjxzdG9wIG9mZnNldD0iLjk5IiBzdHlsZT0ic3RvcC1jb2xvcjojYTgwZDAwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojYTgwZDAwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTQ3LjEwMyIgeTE9IjI1LjUyMSIgeDI9IjE1Ni4zMTQiIHkyPSI2NS4yMTYiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZiIvPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZiIvPjxzdG9wIG9mZnNldD0iLjE4IiBzdHlsZT0ic3RvcC1jb2xvcjojZTQ2MzQyIi8+PHN0b3Agb2Zmc2V0PSIuNCIgc3R5bGU9InN0b3AtY29sb3I6I2M4MjQxMCIvPjxzdG9wIG9mZnNldD0iLjk5IiBzdHlsZT0ic3RvcC1jb2xvcjojYTgwZDAwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojYTgwZDAwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTE4Ljk3NiIgeTE9IjExLjU0MSIgeDI9IjE1OC42NjkiIHkyPSItOC4zMDUiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZiIvPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZiIvPjxzdG9wIG9mZnNldD0iLjU0IiBzdHlsZT0ic3RvcC1jb2xvcjojYzgxZjExIi8+PHN0b3Agb2Zmc2V0PSIuOTkiIHN0eWxlPSJzdG9wLWNvbG9yOiNiZjA5MDUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNiZjA5MDUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iaSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzLjkwMyIgeTE9IjExMy41NTUiIHgyPSI3LjE3IiB5Mj0iMTQ2LjI2MyI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmIi8+PHN0b3Agb2Zmc2V0PSIuMzEiIHN0eWxlPSJzdG9wLWNvbG9yOiNkZTQwMjQiLz48c3RvcCBvZmZzZXQ9Ii45OSIgc3R5bGU9InN0b3AtY29sb3I6I2JmMTkwYiIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I2JmMTkwYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJqIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii0xOC41NTYiIHkxPSIxNTUuMTA1IiB4Mj0iMTM1LjAxNSIgeTI9Ii0yLjgwOSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojYmQwMDEyIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojYmQwMDEyIi8+PHN0b3Agb2Zmc2V0PSIuMDciIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmYiLz48c3RvcCBvZmZzZXQ9Ii4xNyIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZiIvPjxzdG9wIG9mZnNldD0iLjI3IiBzdHlsZT0ic3RvcC1jb2xvcjojYzgyZjFjIi8+PHN0b3Agb2Zmc2V0PSIuMzMiIHN0eWxlPSJzdG9wLWNvbG9yOiM4MjBjMDEiLz48c3RvcCBvZmZzZXQ9Ii40NiIgc3R5bGU9InN0b3AtY29sb3I6I2EzMTYwMSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdHlsZT0ic3RvcC1jb2xvcjojYjMxMzAxIi8+PHN0b3Agb2Zmc2V0PSIuOTkiIHN0eWxlPSJzdG9wLWNvbG9yOiNlODI2MDkiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNlODI2MDkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iayIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI5OS4wNzUiIHkxPSIxNzEuMDMzIiB4Mj0iNTIuODE4IiB5Mj0iMTU5LjYxNyI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojOGMwYzAxIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojOGMwYzAxIi8+PHN0b3Agb2Zmc2V0PSIuNTQiIHN0eWxlPSJzdG9wLWNvbG9yOiM5OTBjMDAiLz48c3RvcCBvZmZzZXQ9Ii45OSIgc3R5bGU9InN0b3AtY29sb3I6I2E4MGQwZSIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I2E4MGQwZSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE3OC41MjYiIHkxPSIxMTUuNTE1IiB4Mj0iMTM3LjQzMyIgeTI9Ijc4LjY4NCI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojN2UxMTBiIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojN2UxMTBiIi8+PHN0b3Agb2Zmc2V0PSIuOTkiIHN0eWxlPSJzdG9wLWNvbG9yOiM5ZTBjMDAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM5ZTBjMDAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxOTMuNjI0IiB5MT0iNDcuOTM3IiB4Mj0iMTczLjE1NCIgeTI9IjI2LjA1NCI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojNzkxMzBkIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojNzkxMzBkIi8+PHN0b3Agb2Zmc2V0PSIuOTkiIHN0eWxlPSJzdG9wLWNvbG9yOiM5ZTEyMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM5ZTEyMGIiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNi42NyIgeTE9IjE5Ny4zMzYiIHgyPSI5Ljk4OSIgeTI9IjE0MC43NDIiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzhiMjExNCIvPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzhiMjExNCIvPjxzdG9wIG9mZnNldD0iLjQzIiBzdHlsZT0ic3RvcC1jb2xvcjojOWUxMDBhIi8+PHN0b3Agb2Zmc2V0PSIuOTkiIHN0eWxlPSJzdG9wLWNvbG9yOiNiMzEwMGMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNiMzEwMGMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNTQuNjQxIiB5MT0iOS43OTgiIHgyPSIxOTIuMDM5IiB5Mj0iMjYuMzA2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNiMzEwMDAiLz48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNiMzEwMDAiLz48c3RvcCBvZmZzZXQ9Ii40NCIgc3R5bGU9InN0b3AtY29sb3I6IzkxMGYwOCIvPjxzdG9wIG9mZnNldD0iLjk5IiBzdHlsZT0ic3RvcC1jb2xvcjojNzkxYzEyIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojNzkxYzEyIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeTI9IjE0MS43NTMiIHgyPSIxMzIuMjc2IiB5MT0iMjE1LjU0OSIgeDE9IjE3NC4wNzQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iYiIgeGxpbms6aHJlZj0iI2EiLz48cmFkaWFsR3JhZGllbnQgaWQ9Im4iIGN4PSIxNDMuODMyIiBjeT0iNzkuMzg4IiByPSI1MC4zNTgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNhODBkMDAiLz48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNhODBkMDAiLz48c3RvcCBvZmZzZXQ9Ii45OSIgc3R5bGU9InN0b3AtY29sb3I6IzdlMGUwOCIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzdlMGUwOCIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJvIiBjeD0iNzQuMDkyIiBjeT0iMTQ1Ljc1MSIgcj0iNjYuOTQ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojYTMwYzAwIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojYTMwYzAwIi8+PHN0b3Agb2Zmc2V0PSIuOTkiIHN0eWxlPSJzdG9wLWNvbG9yOiM4MDBlMDgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM4MDBlMDgiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cGF0aCBzdHlsZT0iZmlsbDp1cmwoI2IpO2ZpbGwtcnVsZTpldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNTMuNSAxMzAuNDEgNDAuMzggMTk3LjU4bDE0Ni40NjktOS45MzlMMTk4LjEzIDM5Ljk1eiIvPjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjYyk7ZmlsbC1ydWxlOmV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4Ny4wODkgMTg3LjU0IDE3NC41IDEwMC42NWwtMzQuMjkxIDQ1LjI4eiIvPjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjZCk7ZmlsbC1ydWxlOmV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4Ny4yNTkgMTg3LjU0IDk1LjAzIDE4MC4zbC01NC4xNiAxNy4wOTF6Ii8+PHBhdGggc3R5bGU9ImZpbGw6dXJsKCNlKTtmaWxsLXJ1bGU6ZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtNDEgMTk3LjQxIDIzLjA0LTc1LjQ4LTUwLjcgMTAuODQxeiIvPjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjZik7ZmlsbC1ydWxlOmV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0MC4yIDE0Ni4xOCAxMTkgNjMuMTRsLTYwLjY3IDU2Ljg3eiIvPjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjZyk7ZmlsbC1ydWxlOmV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0ibTE5My4zMiA2NC4zMS01Ny4zNS00Ni44NEwxMjAgNjkuMXoiLz48cGF0aCBzdHlsZT0iZmlsbDp1cmwoI2gpO2ZpbGwtcnVsZTpldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xNjYuNS43Ny0zMy43MyAxOC42NEwxMTEuNDkuNTJ6Ii8+PHBhdGggc3R5bGU9ImZpbGw6dXJsKCNpKTtmaWxsLXJ1bGU6ZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtMCAxNTguMDkgMTQuMTMtMjUuNzctMTEuNDMtMzAuN3oiLz48cGF0aCBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xLjk0IDEwMC42NSAxMS41IDMyLjYyIDQ5Ljk3LTExLjIxMSA1Ny4wNS01My4wMiAxNi4xLTUxLjEzOUwxMTEuMjA5IDBsLTQzLjEgMTYuMTNDNTQuNTMgMjguNzYgMjguMTggNTMuNzUgMjcuMjMgNTQuMjJjLS45NC40OC0xNy40IDMxLjU5LTI1LjI5IDQ2LjQzIi8+PHBhdGggc3R5bGU9ImZpbGw6dXJsKCNqKTtmaWxsLXJ1bGU6ZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDIuMzIgNDIuMDVjMjkuNDMtMjkuMTggNjcuMzctNDYuNDIgODEuOTMtMzEuNzMgMTQuNTUxIDE0LjY5LS44OCA1MC4zOS0zMC4zMSA3OS41NnMtNjYuOSA0Ny4zNi04MS40NSAzMi42N2MtMTQuNTYtMTQuNjguNC01MS4zMyAyOS44My04MC41Ii8+PHBhdGggc3R5bGU9ImZpbGw6dXJsKCNrKTtmaWxsLXJ1bGU6ZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtNDEgMTk3LjM4IDIyLjg2LTc1LjcyIDc1LjkyIDI0LjM5Yy0yNy40NSAyNS43NC01Ny45OCA0Ny41LTk4Ljc4IDUxLjMzIi8+PHBhdGggc3R5bGU9ImZpbGw6dXJsKCNsKTtmaWxsLXJ1bGU6ZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtMTIwLjU2IDY4Ljg5IDE5LjQ5IDc3LjJjMjIuOTMtMjQuMTEgNDMuNTEtNTAuMDMgNTMuNTg5LTgyLjA5eiIvPjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjbSk7ZmlsbC1ydWxlOmV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE5My40NCA2NC4zOWM3LjgtMjMuNTQgOS42LTU3LjMxLTI3LjE4MS02My41OGwtMzAuMTggMTYuNjd6Ii8+PHBhdGggc3R5bGU9ImZpbGw6IzllMTIwOTtmaWxsLXJ1bGU6ZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAxNTcuNzVjMS4wOCAzOC44NTEgMjkuMTEgMzkuNDMgNDEuMDUgMzkuNzcxTDEzLjQ3IDEzMy4xMXoiLz48cGF0aCBzdHlsZT0iZmlsbDp1cmwoI24pO2ZpbGwtcnVsZTpldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMjAuNjY5IDY5LjAxYzE3LjYyIDEwLjgzIDUzLjEzMSAzMi41OCA1My44NTEgMzIuOTggMS4xMTkuNjMgMTUuMzEtMjMuOTMgMTguNTMtMzcuODF6Ii8+PHBhdGggc3R5bGU9ImZpbGw6dXJsKCNvKTtmaWxsLXJ1bGU6ZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtNjMuODMgMTIxLjY2IDMwLjU2IDU4Ljk2YzE4LjA3LTkuOCAzMi4yMi0yMS43NCA0NS4xOC0zNC41M3oiLz48cGF0aCBzdHlsZT0iZmlsbDp1cmwoI3ApO2ZpbGwtcnVsZTpldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xMy4zNSAxMzMuMTktNC4zMyA1MS41NmM4LjE3IDExLjE2IDE5LjQxIDEyLjEzIDMxLjIgMTEuMjYtOC41My0yMS4yMy0yNS41Ny02My42OC0yNi44Ny02Mi44MiIvPjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjcSk7ZmlsbC1ydWxlOmV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0ibTEzNS45IDE3LjYxIDYwLjcxIDguNTJDMTkzLjM3IDEyLjQgMTgzLjQyIDMuNTQgMTY2LjQ2Ljc3eiIvPjwvc3ZnPg==";
    
    let rubyOn = false;
    const {DefaultRubyVM} = await import('https://cdn.jsdelivr.net/npm/@ruby/wasm-wasi@2.7.1/dist/browser/+esm');
    const response = await fetch("https://cdn.jsdelivr.net/npm/@ruby/3.4-wasm-wasi@2.7.1/dist/ruby+stdlib.wasm");
    const module = await WebAssembly.compileStreaming(response);
    let ruby = (await DefaultRubyVM(module)).vm;

    ruby.eval(`
        puts "ruby VM ready."
    `);
    rubyOn = true;
    
    /*async function resetRuby() {
        const threads = runtime.threads;
        const oldStatus = [];
        for (var i = 0; i < threads.length; i++) {
          const thisThread = threads[i];
          oldStatus.push(thisThread.status);
          thisThread.status = 5;
        }
        let ruby = (await DefaultRubyVM(module)).vm;
        for (var i = 0; i < threads.length; i++) {
          threads[i].status = oldStatus[i];
        }
      }*/

      let curEngine = "Turbowarp";
      
      if (Scratch.extensions.isPenguinMod) {
          curEngine = "PenguinMod";
      } else if (Scratch.extensions.isUSB) {
          curEngine = "Unsandboxed";
      } else if (Scratch.extensions.isNitroBolt) {
          curEngine = "NitroBolt";
      }

    const {Cast, BlockType, ArgumentType, vm} = Scratch,
      {runtime} = vm;

    class extension {
        getInfo() {
          const MoreFields = extension.MoreFields;
          return {
            id: 'DragoRuby',
            name: "Ruby",
            color1: '#920e04',
            color2: '#b41407',
            menuIconURI,
            blocks: [
                {
                  opcode: 'VMState',
                  blockType: BlockType.BOOLEAN,
                  text: 'is ruby on?',
                },
                {
                  opcode: 'disableEnableInit',
                  blockType: BlockType.COMMAND,
                  text: 'enable scratch commands for ruby? [INIT]',
                  arguments: {
                    INIT: {
                      type: ArgumentType.BOOLEAN,
                    },
                  },
                },
                {
                  opcode: 'rubyVMdo',
                  blockType: BlockType.COMMAND,
                  text: '[ACTION] ruby vm',
                  arguments: {
                    ACTION: {
                      type: ArgumentType.STRING,
                      menu: `rubyVMdo`,
                      defaultValue: `stop`,
                    },
                  },
                  func: 'rubyVMdo',
                },
                {
                  opcode: 'no_op_0',
                  blockType: BlockType.COMMAND,
                  text: 'run ruby [CODE]',
                  arguments: {
                    CODE: {
                      type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING,
                      defaultValue: `--data.set("variable", "value", is a list?) \ndata.set("my variable", "It works!", false) \nprint(data.get("my variable"))`,
                    },
                  },
                  func: 'runRuby',
                },
            {
              opcode: 'no_op_1',
              blockType: BlockType.REPORTER,
              text: 'run ruby [CODE]',
              arguments: {
                CODE: {
                  type: MoreFields ? 'TextareaInputInline' : ArgumentType.STRING,
                  defaultValue: `--data.set("variable", "value", is a list?) \ndata.set("my variable", "Success!", false) \nreturn(data.get("my variable"))`,
                },
              },
              func: 'runRuby',
              outputShape: 3,
            },
            '---',
              {
                opcode: 'no_op_4',
                blockType: Scratch.BlockType.REPORTER,
                text: 'variable [VAR]',
                outputShape: Scratch.extensions.isPenguinmod ? 5 : 3,
                blockShape: Scratch.extensions.isPenguinmod ? 5 : 3,
                arguments: {
                  VAR: {
                    type: ArgumentType.STRING,
                  },
                },
                allowDropAnywhere: true,
                func: 'getRubyVar',
              },
              '---',
              //here
              {
                opcode: 'linkedFunctionCallback',
                blockType: BlockType.EVENT,
                text: 'on pfunc()',
                isEdgeActivated: false,
                shouldRestartExistingThreads: true
              },
              {
                opcode: 'linkedFunctionCallbackReturn',
                blockType: BlockType.COMMAND,
                text: 'return [DATA]',
                isTerminal: true,
              },
              {
                opcode: 'no_op_5',
                blockType: Scratch.BlockType.REPORTER,
                text: '[TYPE] arguments',
                arguments: {
                  TYPE: {
                    type: ArgumentType.STRING,
                    defaultValue: "pure",
                    menu: "argreptypes",
                  },
                },
                allowDropAnywhere: true,
                disableMonitor: true,
                func: 'getpfuncArgs',
              },
              {
                opcode: 'no_op_6',
                blockType: Scratch.BlockType.REPORTER,
                text: 'argument [NUM]',
                arguments: {
                  NUM: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 1,
                  },
                },
                allowDropAnywhere: true,
                disableMonitor: true,
                func: 'getpfuncArgsnum',
              },
              '---',
              {
                opcode: 'onError',
                blockType: BlockType.EVENT,
                text: 'on error',
                isEdgeActivated: false,
                shouldRestartExistingThreads: true
              },
              {
                opcode: 'lastError',
                blockType: Scratch.BlockType.REPORTER,
                text: 'last error message',
                allowDropAnywhere: true,
              },
          ],
          menus: {
            rubyVMdo: { acceptReporters: true, items: ["stop", "start", "reset"] },
            argreptypes: { acceptReporters: true, items: ["pure", "stringified"] }
            },
          customFieldTypes: extension.customFieldTypes,
        }
    }

    //block functions here
    async runRuby({CODE}, util) {
      if (!rubyOn) {
        return "";
      } else {
        //if (this.DO_INIT) this.initRubyCommands(util);
        return await ruby.eval(Cast.toString(CODE));
      }
    }

    VMState() {
        return rubyOn;
    }
    
    async reboot(args){
        let ruby = (await DefaultRubyVM(module)).vm;
    }

    disableEnableInit(args, util) {}

    async rubyVMdo(args, util) {}

    getRubyVar(args, util) {}

    async linkedFunctionCallback(args, util) {}

    async linkedFunctionCallbackReturn(args, util) {}

    getpfuncArgs(args, util) {}

    getpfuncArgsnum(args, util) {}

    onError(args, util) {}

    lastError(args, util) {}

    getpfuncArgs(args, util) {
        if (!Object.prototype.hasOwnProperty.call(util.thread, pfuncargs)) {
          return "";
        } else {
          let setargs = util.thread[pfuncargs];

          const CAI = arr => arr.map(item => 
            typeof item === 'number' ? item.toString() : item
          );

          if (args.TYPE = "stringified") {
            return CAI(setargs);
          } else {
            return setargs;
          }
        }
     }

    getpfuncArgsnum(args, util) {
      if (!Object.prototype.hasOwnProperty.call(util.thread, pfuncargs)) {
        return "";
      } else {
        let setargs = util.thread[pfuncargs];
        if (args.NUM < 1 || args.NUM > setargs.length) {
          return "";
        } else {
          return setargs[args.NUM - 1];
        }
      }
   }
}

    Scratch.extensions.register(new extension())
})(Scratch);