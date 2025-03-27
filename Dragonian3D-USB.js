/**
 * DragonianUSB3D
 * Author: Drago Cuven <https://github.com/Drago-Cuven>
 * Version: 0.0.17
 * License: MIT & LGPLv3 License
 * Do not remove this comment
 **/

/*
Currently broken.
Errors:

TypeError: Failed to resolve module specifier "three". Relative references must start with either "/", "./", or "../".

*/


(async function (Scratch) {
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`"DragonianUSB3D" must be run unsandboxed.`)
  }

  // Import links stored in one place for easy access
const importlink = {
  threejs: "https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js",
  OBJLoader: "https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/OBJLoader.js",
  GLTFLoader: "https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/GLTFLoader.js",
}

const threejs = await import(importlink.threejs)
const OBJLoader = await import(importlink.OBJLoader)
const OBJLoaded = new OBJLoader.OBJLoader()
const GLTFLoader = await import(importlink.GLTFLoader)
const GLTFLoaded = new GLTFLoader.GLTFLoader()

// Global mutable arrays and variables
const models = []
let cameras = []
let currentCamera = null

// Global camera settings with default values
const cameraSettings = {
  FOV: 90,
  minrender: 0.1,
  maxrender: 1000,
}

  // Constants for sprite properties
  const IN_3D = "threejs.in3d"
  const OBJECT = "threejs.object"
  const THREEJS_DIRTY = "threejs.dirty"
  const SIDE_MODE = "threejs.sidemode"
  const TEX_FILTER = "threejs.texfilter"
  const Z_POS = "threejs.zpos"
  const Z_STRETCH = "threejs.zstretch"
  const YAW = "threejs.yaw"
  const PITCH = "threejs.pitch"
  const ROLL = "threejs.roll"
  const ATTACHED_TO = "threejs.attachedto"
  const MODE = "threejs.mode"

  let scene = null
  let renderer = null
  let camerasObj = {}
  let activeCamera = null
  let isInitialized = false
  const currentSprite = null
  const spriteObjects = {}
  const modelObjects = {}

  // Get Scratch VM and renderer
  const vm = Scratch.vm
  const runtime = vm.runtime
  const scratchRenderer = vm.runtime.renderer

  // Create a custom skin class for rendering the 3D scene to Scratch
  class ThreejsSkin extends scratchRenderer.exports.Skin {
    constructor(id, renderer) {
      super(id, renderer)
      const gl = renderer.gl
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      this._texture = texture
      this._rotationCenter = [240, 180]
      this._size = [480, 360]
    }

    dispose() {
      if (this._texture) {
        this._renderer.gl.deleteTexture(this._texture)
        this._texture = null
      }
      super.dispose()
    }

    set size(value) {
      this._size = value
      this._rotationCenter = [value[0] / 2, value[1] / 2]
    }

    get size() {
      return this._size
    }

    getTexture(scale) {
      return this._texture || super.getTexture(scale)
    }

    setContent(textureData) {
      const gl = this._renderer.gl
      gl.bindTexture(gl.TEXTURE_2D, this._texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData)
      this.emitWasAltered()
    }
  }

  // Patching system for Scratch objects
  const PATCHES_ID = "__patches_dragonian3d"
  const patch = (obj, functions) => {
    if (obj[PATCHES_ID]) return
    obj[PATCHES_ID] = {}
    for (const name in functions) {
      const original = obj[name]
      obj[PATCHES_ID][name] = obj[name]
      if (original) {
        obj[name] = function (...args) {
          const callOriginal = (...ogArgs) => original.call(this, ...ogArgs)
          return functions[name].call(this, callOriginal, ...args)
        }
      } else {
        obj[name] = function (...args) {
          return functions[name].call(this, () => {}, ...args)
        }
      }
    }
  }

  const unpatch = (obj) => {
    if (!obj[PATCHES_ID]) return
    for (const name in obj[PATCHES_ID]) {
      obj[name] = obj[PATCHES_ID][name]
    }
    delete obj[PATCHES_ID]
  }

  // This will be called when the initialize scene block is executed, not before
  function initialize3D() {
    if (isInitialized) {
      return // Don't initialize if already done
    } else {
      completeInitialization()
    }


  function completeInitialization() {
    // Initialize the scene and renderer
    scene = new threejs.Scene()
    renderer = new threejs.WebGLRenderer({ antialias: true })
    renderer.setSize(runtime.stageWidth || 480, runtime.stageHeight || 360)
    renderer.setClearColor(0x000000, 0) // Transparent background

    // Add ambient light to the scene
    const ambientLight = new threejs.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light to the scene
    const directionalLight = new threejs.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Manage multiple cameras with an object for easy access
    camerasObj = {}

    // Create the default camera
    camerasObj.default = new threejs.PerspectiveCamera(
      cameraSettings.FOV,
      (runtime.stageWidth || 480) / (runtime.stageHeight || 360),
      cameraSettings.minrender,
      cameraSettings.maxrender,
    )
    camerasObj.default.position.set(0, 0, 200)
    camerasObj.default.lookAt(0, 0, 0)

    // Create an additional top view camera
    camerasObj.topView = new threejs.OrthographicCamera(
      (runtime.stageWidth || 480) / -2,
      (runtime.stageWidth || 480) / 2,
      (runtime.stageHeight || 360) / 2,
      (runtime.stageHeight || 360) / -2,
      0.1,
      1000,
    )
    camerasObj.topView.position.set(0, 200, 0)
    camerasObj.topView.lookAt(0, 0, 0)

    // Set active camera
    activeCamera = camerasObj.default
    currentCamera = "default"

    // Add default cameras to the cameras array for tracking
    cameras.push("default")
    cameras.push("topView")

    // Create a skin and drawable for the 3D scene in Scratch
    createScratchDrawable()

    // Handle window resizing
    window.addEventListener("resize", () => {
      const width = runtime.stageWidth || 480
      const height = runtime.stageHeight || 360

      renderer.setSize(width, height)

      // Update perspective camera aspect ratios
      Object.values(camerasObj).forEach((camera) => {
        if (camera.isPerspectiveCamera) {
          camera.aspect = width / height
          camera.updateProjectionMatrix()
        } else if (camera.isOrthographicCamera) {
          // Update orthographic camera frustum
          camera.left = width / -2
          camera.right = width / 2
          camera.top = height / 2
          camera.bottom = height / -2
          camera.updateProjectionMatrix()
        }
      })
    })

    // Apply patches to Scratch objects
    applyPatches()

    isInitialized = true

    // Attach to Scratch VM's BEFORE_EXECUTE event if available
    if (runtime) {
      runtime.on("BEFORE_EXECUTE", refreshScene)
      console.log("Attached refreshScene to BEFORE_EXECUTE event")
    }
  }

  // Create a Scratch drawable for the 3D scene
  let threejsSkinId = null
  let threejsDrawableId = null
  let threejsSkin = null

  function createScratchDrawable() {
    // Create a skin for the 3D scene
    threejsSkinId = scratchRenderer._nextSkinId++
    threejsSkin = new ThreejsSkin(threejsSkinId, scratchRenderer)
    scratchRenderer._allSkins[threejsSkinId] = threejsSkin

    // Create a drawable for the 3D scene
    threejsDrawableId = scratchRenderer.createDrawable("pen")
    scratchRenderer.updateDrawableSkinId(threejsDrawableId, threejsSkinId)

    // Set the drawable to be always visible and on top
    scratchRenderer.updateDrawableVisible(threejsDrawableId, true)
    scratchRenderer.updateDrawableEffect(threejsDrawableId, "ghost", 0)

    // Position the drawable to cover the entire stage
    scratchRenderer.updateDrawablePosition(threejsDrawableId, [0, 0])
    scratchRenderer.updateDrawableScale(threejsDrawableId, [100, 100])

    // Make sure the 3D scene is rendered on top of everything
    runtime.on("BEFORE_DRAW", () => {
      if (isInitialized) {
        // Render the 3D scene
        renderer.render(scene, activeCamera)

        // Update the Scratch skin with the rendered 3D scene
        if (threejsSkin) {
          threejsSkin.setContent(renderer.domElement)
        }
      }
    })
  }

  // Function to refresh the scene - will be called before each execution cycle
  function refreshScene() {
    if (isInitialized && scene && renderer && activeCamera) {
      // Update any dynamic elements in the scene here
      updateSpritePositions()

      // Render the scene with the active camera
      renderer.render(scene, activeCamera)

      // Update the Scratch skin with the rendered 3D scene
      if (threejsSkin) {
        threejsSkin.setContent(renderer.domElement)
      }
    }
  }

  // Update 3D objects to match Scratch sprite positions
  function updateSpritePositions() {
    for (const target of runtime.targets) {
      if (target.isStage) continue

      const drawableID = target.drawableID
      const drawable = scratchRenderer._allDrawables[drawableID]

      if (drawable && drawable[IN_3D] && drawable[OBJECT]) {
        // Update position from Scratch sprite
        drawable[OBJECT].position.x = target.x
        drawable[OBJECT].position.y = target.y

        // Update rotation from Scratch sprite
        drawable[ROLL] = threejs.MathUtils.degToRad(90 - target.direction)
        updateSpriteAngle(drawable)

        // Update scale based on Scratch sprite size
        const { direction, scale } = target._getRenderedDirectionAndScale()
        drawable[OBJECT].scale.x = ((drawable[OBJECT]._sizeX || 100) / 100) * scale[0]
        drawable[OBJECT].scale.y = ((drawable[OBJECT]._sizeY || 100) / 100) * scale[1]
        drawable[OBJECT].scale.z = ((drawable[OBJECT]._sizeZ || 100) / 100) * (drawable[Z_STRETCH] || scale[0])

        // Update attachments
        updateAttachment(drawable)
      }
    }
  }

  // Function to switch between cameras
  function switchCamera(cameraName) {
    if (camerasObj[cameraName]) {
      activeCamera = camerasObj[cameraName]
      currentCamera = cameraName
    } else {
      console.warn(`Camera '${cameraName}' not found.`)
    }
  }

  // Load a 3D model from URL
  async function loadModel(modelName, modelURL, modelType) {
    if (!threejs) return null

    try {
      // For OBJ files
      if (modelType === "obj" || modelURL.toLowerCase().endsWith(".obj")) {
        return new Promise((resolve, reject) => {
          OBJLoaded.load(
            modelURL,
            (object) => {
              resolve(object)
            },
            (xhr) => {
              console.log(`${modelName} ${(xhr.loaded / xhr.total) * 100}% loaded`)
            },
            (error) => {
              console.error("Error loading model:", error)
              reject(error)
            },
          )
        })
      }
      // For GLTF/GLB files
      else if (
        modelType === "gltf" ||
        modelType === "glb" ||
        modelURL.toLowerCase().endsWith(".gltf") ||
        modelURL.toLowerCase().endsWith(".glb")
      ) {

        return new Promise((resolve, reject) => {
          GLTFLoaded.load(
            modelURL,
            (gltf) => {
              resolve(gltf.scene)
            },
            (xhr) => {
              console.log(`${modelName} ${(xhr.loaded / xhr.total) * 100}% loaded`)
            },
            (error) => {
              console.error("Error loading model:", error)
              reject(error)
            },
          )
        })
      } else {
        console.error("Unsupported model format. Please use .obj, .gltf, or .glb files.")
        return null
      }
    } catch (error) {
      console.error("Error loading model:", error)
      return null
    }
  }

  // Apply patches to Scratch objects
  function applyPatches() {
    const Drawable = scratchRenderer.exports.Drawable

    patch(Drawable.prototype, {
      getVisible(og) {
        if (this[IN_3D]) return false
        return og()
      },
      updateVisible(og, value) {
        if (this[IN_3D]) {
          const o = this[OBJECT]
          if (o && o.visible !== value) {
            o.visible = value
            renderer[THREEJS_DIRTY] = true
          }
        }
        return og(value)
      },
      updatePosition(og, position) {
        if (this[IN_3D]) {
          const o = this[OBJECT]
          if (o) {
            o.position.x = position[0]
            o.position.y = position[1]
            renderer[THREEJS_DIRTY] = true
          }
        }
        return og(position)
      },
      updateDirection(og, direction) {
        if (this[IN_3D]) {
          this[ROLL] = threejs.MathUtils.degToRad(90 - direction)
          updateSpriteAngle(this)
          renderer[THREEJS_DIRTY] = true
        }
        return og(direction)
      },
      updateScale(og, scale) {
        if (this[IN_3D]) {
          const obj = this[OBJECT]
          if (obj) {
            obj.scale.x = ((obj._sizeX || 100) / 100) * scale[0]
            obj.scale.y = ((obj._sizeY || 100) / 100) * scale[1]
            obj.scale.z = ((obj._sizeZ || 100) / 100) * (this[Z_STRETCH] || scale[0])
            renderer[THREEJS_DIRTY] = true
          }
        }
        return og(scale)
      },
      dispose(og) {
        if (this[OBJECT]) {
          this[OBJECT].removeFromParent()
          if (this[OBJECT].material) {
            if (Array.isArray(this[OBJECT].material)) {
              this[OBJECT].material.forEach((mat) => {
                if (mat.map) mat.map.dispose()
                mat.dispose()
              })
            } else {
              if (this[OBJECT].material.map) this[OBJECT].material.map.dispose()
              this[OBJECT].material.dispose()
            }
          }
          if (this[OBJECT].geometry) this[OBJECT].geometry.dispose()
          this[OBJECT] = null
          renderer[THREEJS_DIRTY] = true
        }
        return og()
      },
      _skinWasAltered(og) {
        og()
        if (this[IN_3D]) {
          updateDrawableSkin(this)
          renderer[THREEJS_DIRTY] = true
        }
      },
    })

    patch(scratchRenderer, {
      draw(og) {
        if (this[THREEJS_DIRTY]) {
          // Do a 3D redraw
          refreshScene()
          this[THREEJS_DIRTY] = false
        }
        return og()
      },
    })
  }

  // Update the sprite's angle in 3D space
  function updateSpriteAngle(drawable) {
    if (!drawable[IN_3D]) return
    const obj = drawable[OBJECT]
    if (!obj) return

    obj.rotation.x = 0
    obj.rotation.y = 0
    obj.rotation.z = 0

    const WRAP_MIN = threejs.MathUtils.degToRad(-180)
    const WRAP_MAX = threejs.MathUtils.degToRad(180)
    drawable[YAW] = wrapClamp(drawable[YAW] || 0, WRAP_MIN, WRAP_MAX)
    drawable[PITCH] = wrapClamp(drawable[PITCH] || 0, WRAP_MIN, WRAP_MAX)
    drawable[ROLL] = wrapClamp(drawable[ROLL] || 0, WRAP_MIN, WRAP_MAX)

    obj.rotation.y = drawable[YAW]
    obj.rotateOnAxis(new threejs.Vector3(1, 0, 0), drawable[PITCH])
    obj.rotateOnAxis(new threejs.Vector3(0, 0, 1), threejs.MathUtils.degToRad(90) - drawable[ROLL])
  }

  // Helper function for angle wrapping
  function wrapClamp(n, min, max) {
    const offset = n - min
    const range = max - min
    return min + mod(offset, range)
  }

  function mod(n, modulus) {
    let result = n % modulus
    if (result / modulus < 0) result += modulus
    return result
  }

  // Update the attachment of a sprite to another sprite
  function updateAttachment(drawable) {
    if (!scene) return
    if (drawable[IN_3D]) {
      const newParent = drawable[ATTACHED_TO]?.[OBJECT] || scene
      if (drawable[OBJECT] && drawable[OBJECT].parent !== newParent) {
        drawable[OBJECT].removeFromParent()
        newParent.add(drawable[OBJECT])
        renderer[THREEJS_DIRTY] = true
      }
    }
  }

  // Update the skin texture of a drawable
  function updateDrawableSkin(drawable) {
    if (drawable[OBJECT] && drawable[OBJECT].material) {
      const texture = getThreeTextureFromSkin(drawable.skin)

      if (Array.isArray(drawable[OBJECT].material)) {
        drawable[OBJECT].material.forEach((material) => {
          material.map = texture
          material.needsUpdate = true
        })
      } else {
        drawable[OBJECT].material.map = texture
        drawable[OBJECT].material.needsUpdate = true
      }

      updateMaterialForDrawable(drawable)
    }
  }

  // Update material properties for a drawable
  function updateMaterialForDrawable(drawable) {
    if (!drawable[IN_3D]) return
    const obj = drawable[OBJECT]
    if (!obj || !obj.material) return

    if (!(SIDE_MODE in drawable)) drawable[SIDE_MODE] = threejs.DoubleSide
    if (!(TEX_FILTER in drawable)) drawable[TEX_FILTER] = threejs.LinearMipmapLinearFilter

    const materials = Array.isArray(obj.material) ? obj.material : [obj.material]

    materials.forEach((material) => {
      material.side = drawable[SIDE_MODE]
      material.transparent = true

      if (material.map) {
        material.map.minFilter = drawable[TEX_FILTER]
        material.map.magFilter =
          drawable[TEX_FILTER] === threejs.NearestFilter ? threejs.NearestFilter : threejs.LinearFilter
        material.map.needsUpdate = true
      }
    })
  }

  // Get a Three.js texture from a Scratch skin
  function getThreeTextureFromSkin(skin) {
    if (skin._3dCachedTexture) return skin._3dCachedTexture

    const canvas = getCanvasFromSkin(skin)
    if (canvas instanceof Promise) {
      return canvas.then((resolvedCanvas) => {
        skin._3dCachedTexture = new threejs.CanvasTexture(resolvedCanvas)
        skin._3dCachedTexture.colorSpace = threejs.SRGBColorSpace
        return skin._3dCachedTexture
      })
    }

    skin._3dCachedTexture = new threejs.CanvasTexture(canvas)
    skin._3dCachedTexture.colorSpace = threejs.SRGBColorSpace

    return skin._3dCachedTexture
  }

  // Get a canvas from a Scratch skin
  function getCanvasFromSkin(skin) {
    const emptyCanvas = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 1
      canvas.height = 1
      return canvas
    }

    try {
      // For bitmap skins
      if (skin.constructor === scratchRenderer.exports.BitmapSkin) {
        if (skin._textureSize[0] < 1 || skin._textureSize[1] < 1) return emptyCanvas()

        const gl = scratchRenderer.gl
        const texture = skin.getTexture()
        const width = skin._textureSize[0]
        const height = skin._textureSize[1]

        // Create a framebuffer to read the texture
        const framebuffer = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

        // Read the pixels
        const data = new Uint8Array(width * height * 4)
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data)

        // Clean up
        gl.deleteFramebuffer(framebuffer)

        // Create a canvas with the texture data
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        const imageData = new ImageData(width, height)
        imageData.data.set(data)
        ctx.putImageData(imageData, 0, 0)

        return canvas
      }
      // For SVG skins
      else if (skin.constructor === scratchRenderer.exports.SVGSkin) {
        // Get the SVG element
        const svgElement = skin._svgTag
        if (!svgElement) return emptyCanvas()

        // Create a canvas
        const canvas = document.createElement("canvas")
        canvas.width = skin._size[0]
        canvas.height = skin._size[1]
        const ctx = canvas.getContext("2d")

        // Draw the SVG to the canvas
        const img = new Image()
        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        const url = URL.createObjectURL(svgBlob)

        return new Promise((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0)
            URL.revokeObjectURL(url)
            resolve(canvas)
          }
          img.src = url
        })
      }
    } catch (error) {
      console.error("Error getting canvas from skin:", error)
    }

    return emptyCanvas()
  }

  // Enable 3D for a drawable with the specified mode
  function enable3DForDrawable(drawableID, mode = "flat") {
    const drawable = scratchRenderer._allDrawables[drawableID]
    if (!drawable || drawable[IN_3D]) return

    drawable[IN_3D] = true
    drawable[MODE] = mode

    let obj
    if (mode === "sprite") {
      obj = new threejs.Sprite(new threejs.SpriteMaterial())
    } else {
      obj = new threejs.Mesh()
    }

    drawable[OBJECT] = obj
    updateMeshForDrawable(drawableID, mode)

    if (!(YAW in drawable)) drawable[YAW] = 0
    if (!(PITCH in drawable)) drawable[PITCH] = 0
    if (!(ROLL in drawable)) drawable[ROLL] = threejs.MathUtils.degToRad(90 - drawable.direction)
    if (!(Z_POS in drawable)) drawable[Z_POS] = 0

    // Set initial position from Scratch sprite
    const target = runtime.targets.find((t) => t.drawableID === drawableID)
    if (target) {
      obj.position.x = target.x
      obj.position.y = target.y
      obj.position.z = drawable[Z_POS]
    }

    scene.add(obj)
    updateAttachment(drawable)
    renderer[THREEJS_DIRTY] = true
  }

  // Update the mesh for a drawable based on the specified mode
  function updateMeshForDrawable(drawableID, mode) {
    const drawable = scratchRenderer._allDrawables[drawableID]
    if (!drawable[IN_3D]) return

    const obj = drawable[OBJECT]
    if (!obj) return

    // Get the skin size
    const skinSize = drawable.skin.size || [100, 100]
    const width = skinSize[0]
    const height = skinSize[1]
    const depth = Math.max(width, height) / 2

    // Dispose of existing geometry and material
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((mat) => mat.dispose())
      } else {
        obj.material.dispose()
      }
    }

    // Create new geometry and material based on mode
    if (obj.isSprite) {
      obj.material = new threejs.SpriteMaterial()
      obj._sizeX = 100
      obj._sizeY = 100
      obj._sizeZ = 100
    } else {
      switch (mode) {
        case "flat":
          obj.geometry = new threejs.PlaneGeometry(width, height)
          obj.material = new threejs.MeshBasicMaterial({ transparent: true })
          break
        case "flat triangle": {
          const geometry = new threejs.BufferGeometry()
          const w = width / 2
          const h = height / 2

          const vertices = new Float32Array([-w, -h, 0.0, w, -h, 0.0, -w, h, 0.0])
          const uvs = new Float32Array([0, 0, 1, 0, 0, 1])
          geometry.setIndex([0, 1, 2])
          geometry.setAttribute("position", new threejs.BufferAttribute(vertices, 3))
          geometry.setAttribute("uv", new threejs.BufferAttribute(uvs, 2))
          obj.geometry = geometry
          obj.material = new threejs.MeshBasicMaterial({ transparent: true })
          break
        }
        case "cube":
          obj.geometry = new threejs.BoxGeometry(width, height, depth)
          obj.material = new threejs.MeshBasicMaterial({ transparent: true })
          break
        case "sphere":
          obj.geometry = new threejs.SphereGeometry(depth, 24, 12)
          obj.material = new threejs.MeshBasicMaterial({ transparent: true })
          break
        case "low-poly sphere":
          obj.geometry = new threejs.SphereGeometry(depth, 8, 6)
          obj.material = new threejs.MeshBasicMaterial({ transparent: true })
          break
        default:
          obj.geometry = new threejs.PlaneGeometry(width, height)
          obj.material = new threejs.MeshBasicMaterial({ transparent: true })
          break
      }

      obj._sizeX = 100
      obj._sizeY = 100
      obj._sizeZ = 100
    }

    // Apply texture from skin
    const texture = getThreeTextureFromSkin(drawable.skin)

    if (texture instanceof Promise) {
      texture.then((resolvedTexture) => {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((material) => {
            material.map = resolvedTexture
            material.needsUpdate = true
          })
        } else {
          obj.material.map = resolvedTexture
          obj.material.needsUpdate = true
        }
        updateMaterialForDrawable(drawable)
      })
    } else {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((material) => {
          material.map = texture
          material.needsUpdate = true
        })
      } else {
        obj.material.map = texture
        obj.material.needsUpdate = true
      }
      updateMaterialForDrawable(drawable)
    }

    // Update scale based on sprite scale
    const target = runtime.targets.find((t) => t.drawableID === drawableID)
    if (target) {
      const { direction, scale } = target._getRenderedDirectionAndScale()
      obj.scale.x = ((obj._sizeX || 100) / 100) * scale[0]
      obj.scale.y = ((obj._sizeY || 100) / 100) * scale[1]
      obj.scale.z = ((obj._sizeZ || 100) / 100) * (drawable[Z_STRETCH] || scale[0])
    }
  }

  // Disable 3D for a drawable
  function disable3DForDrawable(drawableID) {
    const drawable = scratchRenderer._allDrawables[drawableID]
    if (!drawable || !drawable[IN_3D]) return

    drawable[IN_3D] = false

    if (drawable[OBJECT]) {
      drawable[Z_POS] = drawable[OBJECT].position.z

      drawable[OBJECT].removeFromParent()

      if (drawable[OBJECT].material) {
        if (Array.isArray(drawable[OBJECT].material)) {
          drawable[OBJECT].material.forEach((mat) => {
            if (mat.map) mat.map.dispose()
            mat.dispose()
          })
        } else {
          if (drawable[OBJECT].material.map) drawable[OBJECT].material.map.dispose()
          drawable[OBJECT].material.dispose()
        }
      }

      if (drawable[OBJECT].geometry) drawable[OBJECT].geometry.dispose()
      drawable[OBJECT] = null
    }

    renderer[THREEJS_DIRTY] = true
  }

  // Set skybox color for the scene
  function setSkyboxColor(color) {
    if (!isInitialized || !scene) return

    // Convert color from Scratch format (#RRGGBB) to threejs format (0xRRGGBB)
    let colorValue = color
    if (typeof color === "string" && color.startsWith("#")) {
      colorValue = Number.parseInt(color.substring(1), 16)
    }

    scene.background = new threejs.Color(colorValue)
    renderer[THREEJS_DIRTY] = true
  }

  // Global extension variables
  const ext = {
    colors: {
      threejs: "#0000FF",
      motion: "#396FAF",
      looks: "#734EBF",
      events: "#BF8F00",
      camera: "#BF3F26",
      control: "#BF8F00",
    },
    cameras: cameras,
    models: models,
    threejs: threejs,
    scene: scene,
    renderer: renderer,
    camerasObj: camerasObj,
    activeCamera: activeCamera,
    switchCamera: switchCamera,
    spriteObjects: spriteObjects,
    currentSprite: currentSprite,
  }

  /* =======================================================================
   * Three: Scene Management (Single Scene)
   * Blocks:
   *  - initialize scene
   *  - scene [ONOFF]   (menu onoff: on, off)
   *  - 3D on?         (boolean reporter)
   *  - scene skybox color [COLOR]
   * ======================================================================= */
  class Three {
    constructor() {
      this.scene = null // Single scene storage
    }
    getInfo() {
      return {
        id: "DragonianUSB3D",
        name: "3D",
        color1: ext.colors.threejs,
        blocks: [
          {
            opcode: "initializeScene",
            blockType: Scratch.BlockType.COMMAND,
            text: "initialize scene",
          },
          {
            opcode: "toggleScene",
            blockType: Scratch.BlockType.COMMAND,
            text: "scene [ONOFF]",
            arguments: {
              ONOFF: { type: Scratch.ArgumentType.STRING, menu: "onoff", defaultValue: "on" },
            },
          },
          {
            opcode: "is3DOn",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "3D on?",
          },
          {
            opcode: "setSkyboxColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "scene skybox color [COLOR]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#000000" },
            },
          },
          {
            opcode: "setMode",
            blockType: Scratch.BlockType.COMMAND,
            text: "set 3D mode to [MODE]",
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "MODE_MENU",
                defaultValue: "flat",
              },
            },
          },
        ],
        menus: {
          onoff: {
            acceptReporters: true,
            items: ["on", "off"],
          },
          MODE_MENU: {
            acceptReporters: true,
            items: ["disabled", "flat", "flat triangle", "sprite", "cube", "sphere", "low-poly sphere"],
          },
          spriteMenu: {
            acceptReporters: true,
            items: "getSprites",
          },
        },
      }
    }

    initializeScene() {
      if (!isInitialized) {
        initialize3D()
        return "Scene initialized"
      }
      return "Scene already initialized"
    }

    toggleScene(args) {
      if (isInitialized && renderer) {
        if (args.ONOFF === "on") {
          if (threejsDrawableId) {
            scratchRenderer.updateDrawableVisible(threejsDrawableId, true)
          }
          return "Scene turned on"
        } else {
          if (threejsDrawableId) {
            scratchRenderer.updateDrawableVisible(threejsDrawableId, false)
          }
          return "Scene turned off"
        }
      }
      return "Scene not initialized"
    }

    is3DOn() {
      return isInitialized && threejsDrawableId && scratchRenderer._allDrawables[threejsDrawableId].visible
    }

    setSkyboxColor(args) {
      if (!isInitialized) {
        return "Scene not initialized"
      }

      setSkyboxColor(args.COLOR)
      return "Skybox color set"
    }

    setMode({ MODE }, util) {
      if (util.target.isStage) return

      this.init()
      switch (MODE) {
        case "disabled":
          disable3DForDrawable(util.target.drawableID)
          break
        case "flat":
        case "flat triangle":
        case "sprite":
        case "cube":
        case "sphere":
        case "low-poly sphere":
          disable3DForDrawable(util.target.drawableID)
          enable3DForDrawable(util.target.drawableID, MODE)
          break
      }
    }

    init() {
      if (!isInitialized) {
        initialize3D()
      }
    }

    getSprites() {
      const spriteNames = []
      const targets = runtime.targets
      for (let index = 1; index < targets.length; index++) {
        const curTarget = targets[index].sprite
        if (targets[index].isOriginal) {
          const jsonOBJ = {
            text: curTarget.name,
            value: curTarget.name,
          }
          spriteNames.push(jsonOBJ)
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames
      } else {
        return [{ text: "", value: 0 }] // Fallback
      }
    }
  }

  /* =======================================================================
   * ThreeMotion: 3D Object Movement
   * (Blocks unchanged)
   * ======================================================================= */
  class ThreeMotion {
    getInfo() {
      return {
        id: "DragonianUSB3DMotion",
        name: "Motion 3D",
        color1: ext.colors.motion,
        blocks: [
          {
            opcode: "moveSteps",
            blockType: Scratch.BlockType.COMMAND,
            text: "move [STEPS] steps in 3D",
            arguments: {
              STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position to x:[X] y:[Y] z:[Z]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "changePosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "change position by x:[X] y:[Y] z:[Z]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setRotation",
            blockType: Scratch.BlockType.COMMAND,
            text: "set rotation to r:[R] p:[P] y:[Y]",
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "changeRotation",
            blockType: Scratch.BlockType.COMMAND,
            text: "change rotation by r:[R] p:[P] y:[Y]",
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setPosMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "set pos [POSTYPES] to [NUMBER]",
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setRotMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "set rot [ROTTYPES] to [NUMBER]",
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "directionAround",
            blockType: Scratch.BlockType.REPORTER,
            text: "direction around [ROTTYPES]",
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
            },
          },
          {
            opcode: "xPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "x position",
          },
          {
            opcode: "yPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "y position",
          },
          {
            opcode: "zPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "z position",
          },
          {
            opcode: "roll",
            blockType: Scratch.BlockType.REPORTER,
            text: "roll",
          },
          {
            opcode: "pitch",
            blockType: Scratch.BlockType.REPORTER,
            text: "pitch",
          },
          {
            opcode: "yaw",
            blockType: Scratch.BlockType.REPORTER,
            text: "yaw",
          },
          {
            opcode: "positionArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "position",
          },
          {
            opcode: "positionObject",
            blockType: Scratch.BlockType.OBJECT,
            text: "position",
          },
          {
            opcode: "rotationArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "rotation",
          },
          {
            opcode: "rotationObject",
            blockType: Scratch.BlockType.OBJECT,
            text: "rotation",
          },
          {
            opcode: "turnDegrees",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn [TURNDIRS] [NUM] degrees",
            arguments: {
              TURNDIRS: { type: Scratch.ArgumentType.STRING, menu: "turndirs", defaultValue: "up" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
        ],
        menus: {
          postypes: {
            acceptReporters: true,
            items: ["x", "y", "z"],
          },
          rottypes: {
            acceptReporters: true,
            items: ["r (roll)", "p (pitch)", "y (yaw)"],
          },
          turndirs: {
            acceptReporters: true,
            items: ["up", "down", "left", "right"],
          },
        },
      }
    }

    moveSteps(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const steps = Number(args.STEPS)
      const obj = drawable[OBJECT]

      // Get the direction the sprite is facing (assuming -Z is forward)
      const direction = new threejs.Vector3(0, 0, -1)
      direction.applyQuaternion(obj.quaternion)
      direction.multiplyScalar(steps / 10) // Scale steps for better control

      // Move the sprite in that direction
      target.setXY(target.x + direction.x, target.y + direction.y)
      obj.position.z += direction.z
      drawable[Z_POS] = obj.position.z

      renderer[THREEJS_DIRTY] = true
      return "Moved steps"
    }

    setPosition(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const x = Number(args.X)
      const y = Number(args.Y)
      const z = Number(args.Z)

      target.setXY(x, y)
      drawable[OBJECT].position.z = z
      drawable[Z_POS] = z

      renderer[THREEJS_DIRTY] = true
      return "Position set"
    }

    changePosition(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const x = Number(args.X)
      const y = Number(args.Y)
      const z = Number(args.Z)

      target.setXY(target.x + x, target.y + y)
      drawable[OBJECT].position.z += z
      drawable[Z_POS] = drawable[OBJECT].position.z

      renderer[THREEJS_DIRTY] = true
      return "Position changed"
    }

    setRotation(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const r = Number(args.R)
      const p = Number(args.P)
      const y = Number(args.Y)

      // Set roll (r) using Scratch direction
      target.setDirection(90 - r)

      // Set pitch and yaw directly
      drawable[PITCH] = threejs.MathUtils.degToRad(p)
      drawable[YAW] = threejs.MathUtils.degToRad(y)

      updateSpriteAngle(drawable)
      renderer[THREEJS_DIRTY] = true
      return "Rotation set"
    }

    changeRotation(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const r = Number(args.R)
      const p = Number(args.P)
      const y = Number(args.Y)

      // Change roll (r) using Scratch direction
      target.setDirection(target.direction - r)

      // Change pitch and yaw directly
      drawable[PITCH] = (drawable[PITCH] || 0) + threejs.MathUtils.degToRad(p)
      drawable[YAW] = (drawable[YAW] || 0) + threejs.MathUtils.degToRad(y)

      updateSpriteAngle(drawable)
      renderer[THREEJS_DIRTY] = true
      return "Rotation changed"
    }

    setPosMenu(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const posType = args.POSTYPES
      const value = Number(args.NUMBER)

      switch (posType) {
        case "x":
          target.setXY(value, target.y)
          break
        case "y":
          target.setXY(target.x, value)
          break
        case "z":
          drawable[OBJECT].position.z = value
          drawable[Z_POS] = value
          break
      }

      renderer[THREEJS_DIRTY] = true
      return "Position set"
    }

    setRotMenu(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const rotType = args.ROTTYPES
      const value = Number(args.NUMBER)

      switch (rotType) {
        case "r (roll)":
          target.setDirection(90 - value)
          break
        case "p (pitch)":
          drawable[PITCH] = threejs.MathUtils.degToRad(value)
          break
        case "y (yaw)":
          drawable[YAW] = threejs.MathUtils.degToRad(value)
          break
      }

      updateSpriteAngle(drawable)
      renderer[THREEJS_DIRTY] = true
      return "Rotation set"
    }

    directionAround(args, util) {
      if (!isInitialized) return 0

      const target = util.target
      if (!target || target.isStage) return 0

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return 0

      const rotType = args.ROTTYPES

      switch (rotType) {
        case "r (roll)":
          return (90 - target.direction).toFixed(2)
        case "p (pitch)":
          return threejs.MathUtils.radToDeg(drawable[PITCH] || 0).toFixed(2)
        case "y (yaw)":
          return threejs.MathUtils.radToDeg(drawable[YAW] || 0).toFixed(2)
      }

      return 0
    }

    xPosition(args, util) {
      const target = util.target
      if (!target || target.isStage) return 0
      return target.x.toFixed(2)
    }

    yPosition(args, util) {
      const target = util.target
      if (!target || target.isStage) return 0
      return target.y.toFixed(2)
    }

    zPosition(args, util) {
      if (!isInitialized) return 0

      const target = util.target
      if (!target || target.isStage) return 0

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return 0

      return drawable[OBJECT].position.z.toFixed(2)
    }

    roll(args, util) {
      const target = util.target
      if (!target || target.isStage) return 0
      return (90 - target.direction).toFixed(2)
    }

    pitch(args, util) {
      if (!isInitialized) return 0

      const target = util.target
      if (!target || target.isStage) return 0

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return 0

      return threejs.MathUtils.radToDeg(drawable[PITCH] || 0).toFixed(2)
    }

    yaw(args, util) {
      if (!isInitialized) return 0

      const target = util.target
      if (!target || target.isStage) return 0

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return 0

      return threejs.MathUtils.radToDeg(drawable[YAW] || 0).toFixed(2)
    }

    positionArray(args, util) {
      if (!isInitialized) return JSON.stringify([0, 0, 0])

      const target = util.target
      if (!target || target.isStage) return JSON.stringify([0, 0, 0])

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return JSON.stringify([target.x, target.y, 0])

      return JSON.stringify([target.x, target.y, drawable[OBJECT].position.z])
    }

    positionObject(args, util) {
      if (!isInitialized) return JSON.stringify({ x: 0, y: 0, z: 0 })

      const target = util.target
      if (!target || target.isStage) return JSON.stringify({ x: 0, y: 0, z: 0 })

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return JSON.stringify({ x: target.x, y: target.y, z: 0 })

      return JSON.stringify({
        x: target.x,
        y: target.y,
        z: drawable[OBJECT].position.z,
      })
    }

    rotationArray(args, util) {
      if (!isInitialized) return JSON.stringify([0, 0, 0])

      const target = util.target
      if (!target || target.isStage) return JSON.stringify([0, 0, 0])

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return JSON.stringify([90 - target.direction, 0, 0])

      return JSON.stringify([
        90 - target.direction, // roll
        threejs.MathUtils.radToDeg(drawable[PITCH] || 0), // pitch
        threejs.MathUtils.radToDeg(drawable[YAW] || 0), // yaw
      ])
    }

    rotationObject(args, util) {
      if (!isInitialized) return JSON.stringify({ roll: 0, pitch: 0, yaw: 0 })

      const target = util.target
      if (!target || target.isStage) return JSON.stringify({ roll: 0, pitch: 0, yaw: 0 })

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return JSON.stringify({ roll: 90 - target.direction, pitch: 0, yaw: 0 })

      return JSON.stringify({
        roll: 90 - target.direction,
        pitch: threejs.MathUtils.radToDeg(drawable[PITCH] || 0),
        yaw: threejs.MathUtils.radToDeg(drawable[YAW] || 0),
      })
    }

    turnDegrees(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const turnDirection = args.TURNDIRS
      const degrees = Number(args.NUM)

      switch (turnDirection) {
        case "up":
          drawable[PITCH] = (drawable[PITCH] || 0) - threejs.MathUtils.degToRad(degrees)
          break
        case "down":
          drawable[PITCH] = (drawable[PITCH] || 0) + threejs.MathUtils.degToRad(degrees)
          break
        case "left":
          drawable[YAW] = (drawable[YAW] || 0) + threejs.MathUtils.degToRad(degrees)
          break
        case "right":
          drawable[YAW] = (drawable[YAW] || 0) - threejs.MathUtils.degToRad(degrees)
          break
      }

      updateSpriteAngle(drawable)
      renderer[THREEJS_DIRTY] = true
      return "Turned"
    }
  }

  /* =======================================================================
   * ThreeLooks: Model & Appearance Management
   * Blocks:
   *  - set model to [MODEL] (menu from models array)
   *  - add model as [MODELNAME] from url [MODELURL]
   *  - existing models (array reporter)
   *  - set texture filter to [TEXTUREFILTER]   (menu: texturefilter: [nearest, linear])
   *  - show faces [SHOWFACES] of myself        (menu: showfaces: [both, front, back])
   *  - set sprite mode to [SPRITEMODE]          (menu: spritemode: [2D, 3D])
   *  - set stretch to x:[X] y:[Y] z:[Z]
   *  - change stretch by x:[X] y:[Y] z:[Z]
   *  - set stretch [POSTYPES] to [NUMBER]
   *  - change stretch [POSTYPES] by [NUMBER]
   *  - stretch x         (reporter)
   *  - stretch y         (reporter)
   *  - stretch z         (reporter)
   *  - stretches         (array reporter)
   *  - stretches         (object reporter)
   * ======================================================================= */
  class ThreeLooks {
    getInfo() {
      return {
        id: "DragonianUSB3DLooks",
        name: "Looks 3D",
        color1: ext.colors.looks,
        blocks: [
          {
            opcode: "setModel",
            blockType: Scratch.BlockType.COMMAND,
            text: "set model to [MODEL]",
            arguments: {
              MODEL: { type: Scratch.ArgumentType.STRING, menu: "models", defaultValue: "none" },
            },
          },
          {
            opcode: "addModel",
            blockType: Scratch.BlockType.COMMAND,
            text: "add model as [MODELNAME] from url [MODELURL]",
            arguments: {
              MODELNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "new model" },
              MODELURL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "https://raw.githubusercontent.com/alecjacobson/common-3d-test-models/refs/heads/master/data/teapot.obj",
              },
            },
          },
          {
            opcode: "existingModels",
            blockType: Scratch.BlockType.ARRAY,
            text: "existing models",
          },
          {
            opcode: "setTextureFilter",
            blockType: Scratch.BlockType.COMMAND,
            text: "set texture filter to [TEXTUREFILTER]",
            arguments: {
              TEXTUREFILTER: { type: Scratch.ArgumentType.STRING, menu: "texturefilter", defaultValue: "nearest" },
            },
          },
          {
            opcode: "showFaces",
            blockType: Scratch.BlockType.COMMAND,
            text: "show faces [SHOWFACES] of myself",
            arguments: {
              SHOWFACES: { type: Scratch.ArgumentType.STRING, menu: "showfaces", defaultValue: "both" },
            },
          },
          {
            opcode: "setSpriteMode",
            blockType: Scratch.BlockType.COMMAND,
            text: "set sprite mode to [SPRITEMODE]",
            arguments: {
              SPRITEMODE: { type: Scratch.ArgumentType.STRING, menu: "spritemode", defaultValue: "2D" },
            },
          },
          {
            opcode: "setStretch",
            blockType: Scratch.BlockType.COMMAND,
            text: "set stretch to x:[X] y:[Y] z:[Z]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "changeStretch",
            blockType: Scratch.BlockType.COMMAND,
            text: "change stretch by x:[X] y:[Y] z:[Z]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setStretchMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "set stretch [POSTYPES] to [NUMBER]",
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "changeStretchMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "change stretch [POSTYPES] by [NUMBER]",
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "stretchX",
            blockType: Scratch.BlockType.REPORTER,
            text: "stretch x",
          },
          {
            opcode: "stretchY",
            blockType: Scratch.BlockType.REPORTER,
            text: "stretch y",
          },
          {
            opcode: "stretchZ",
            blockType: Scratch.BlockType.REPORTER,
            text: "stretch z",
          },
          {
            opcode: "stretchesArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "stretches",
          },
          {
            opcode: "stretchesObject",
            blockType: Scratch.BlockType.OBJECT,
            text: "stretches",
          },
          {
            opcode: "attachSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "attach myself to [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "detachSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "detach myself",
          },
          {
            opcode: "attachedSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "sprite I'm attached to",
          },
        ],
        menus: {
          models: {
            acceptReporters: true,
            items: () => (models.length > 0 ? models.map((m) => m.name) : ["none"]),
          },
          texturefilter: {
            acceptReporters: true,
            items: ["nearest", "linear"],
          },
          showfaces: {
            acceptReporters: true,
            items: ["both", "front", "back"],
          },
          spritemode: {
            acceptReporters: true,
            items: ["2D", "3D"],
          },
          postypes: {
            acceptReporters: true,
            items: ["x", "y", "z"],
          },
          spriteMenu: {
            acceptReporters: true,
            items: "getSprites",
          },
        },
      }
    }

    async setModel(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const modelName = args.MODEL
      if (modelName === "none") {
        return "Model not found"
      }

      // Find the model in the models array
      const modelObj = models.find((m) => m.name === modelName)
      if (!modelObj || !modelObjects[modelName]) {
        return "Model not found"
      }

      // Remove current object
      if (drawable[OBJECT]) {
        scene.remove(drawable[OBJECT])
      }

      // Clone the model and add it to the scene
      const modelClone = modelObjects[modelName].clone()
      scene.add(modelClone)

      // Update drawable object
      drawable[OBJECT] = modelClone

      // Update position and rotation
      modelClone.position.x = target.x
      modelClone.position.y = target.y
      modelClone.position.z = drawable[Z_POS] || 0

      updateSpriteAngle(drawable)
      updateAttachment(drawable)

      renderer[THREEJS_DIRTY] = true
      return "Model set"
    }

    async addModel(args) {
      if (!isInitialized) return "Scene not initialized"

      const modelName = args.MODELNAME
      const modelURL = args.MODELURL

      // Determine model type from URL
      let modelType = "obj" // Default
      if (modelURL.toLowerCase().endsWith(".gltf")) {
        modelType = "gltf"
      } else if (modelURL.toLowerCase().endsWith(".glb")) {
        modelType = "glb"
      }

      try {
        const model = await loadModel(modelName, modelURL, modelType)

        if (model) {
          // Store the model
          modelObjects[modelName] = model

          // Add to models array as an object with name, type, and data properties
          const modelObj = {
            name: modelName,
            type: modelType,
            data: model,
          }

          // Check if model already exists and update it if it does
          const existingIndex = models.findIndex((m) => m.name === modelName)
          if (existingIndex >= 0) {
            models[existingIndex] = modelObj
          } else {
            models.push(modelObj)
          }

          return "Model added"
        } else {
          return "Failed to load model"
        }
      } catch (error) {
        console.error("Error adding model:", error)
        return "Error loading model"
      }
    }

    existingModels() {
      return JSON.stringify(models.map((m) => m.name))
    }

    setTextureFilter(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const filter = args.TEXTUREFILTER

      // Set the filter type
      drawable[TEX_FILTER] = filter === "nearest" ? threejs.NearestFilter : threejs.LinearMipmapLinearFilter

      // Apply the filter to the material
      updateMaterialForDrawable(drawable)

      renderer[THREEJS_DIRTY] = true
      return "Texture filter set"
    }

    showFaces(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const faces = args.SHOWFACES

      // Set the side mode
      switch (faces) {
        case "both":
          drawable[SIDE_MODE] = threejs.DoubleSide
          break
        case "front":
          drawable[SIDE_MODE] = threejs.FrontSide
          break
        case "back":
          drawable[SIDE_MODE] = threejs.BackSide
          break
      }

      // Apply the side mode to the material
      updateMaterialForDrawable(drawable)

      renderer[THREEJS_DIRTY] = true
      return "Face culling set"
    }

    setSpriteMode(args, util) {
      if (!isInitialized) {
        initialize3D()
      }

      const target = util.target
      if (!target || target.isStage) return "Cannot set mode for stage"

      const mode = args.SPRITEMODE
      const drawable = scratchRenderer._allDrawables[target.drawableID]

      if (mode === "3D") {
        if (!drawable[IN_3D]) {
          enable3DForDrawable(target.drawableID, drawable[MODE] || "flat")
        }
      } else {
        if (drawable[IN_3D]) {
          disable3DForDrawable(target.drawableID)
        }
      }

      return "Sprite mode set"
    }

    setStretch(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const x = Number(args.X)
      const y = Number(args.Y)
      const z = Number(args.Z)

      // Get the current scale from the sprite
      const { direction, scale } = target._getRenderedDirectionAndScale()

      // Set the stretch values (scale 100 to 1 for internal use)
      drawable[OBJECT].scale.x = ((drawable[OBJECT]._sizeX || 100) / 100) * (x / 100)
      drawable[OBJECT].scale.y = ((drawable[OBJECT]._sizeY || 100) / 100) * (y / 100)
      drawable[OBJECT].scale.z = ((drawable[OBJECT]._sizeZ || 100) / 100) * (z / 100)

      // Store the z stretch for future updates
      drawable[Z_STRETCH] = z / 100

      renderer[THREEJS_DIRTY] = true
      return "Stretch set"
    }

    changeStretch(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const x = Number(args.X)
      const y = Number(args.Y)
      const z = Number(args.Z)

      // Get the current scale
      const currentX = (drawable[OBJECT].scale.x / ((drawable[OBJECT]._sizeX || 100) / 100)) * 100
      const currentY = (drawable[OBJECT].scale.y / ((drawable[OBJECT]._sizeY || 100) / 100)) * 100
      const currentZ = (drawable[Z_STRETCH] || 1) * 100

      // Update the stretch values
      this.setStretch(
        {
          X: currentX + x,
          Y: currentY + y,
          Z: currentZ + z,
        },
        util,
      )

      return "Stretch changed"
    }

    setStretchMenu(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const posType = args.POSTYPES
      const value = Number(args.NUMBER)

      // Get the current scale
      const currentX = (drawable[OBJECT].scale.x / ((drawable[OBJECT]._sizeX || 100) / 100)) * 100
      const currentY = (drawable[OBJECT].scale.y / ((drawable[OBJECT]._sizeY || 100) / 100)) * 100
      const currentZ = (drawable[Z_STRETCH] || 1) * 100

      switch (posType) {
        case "x":
          this.setStretch({ X: value, Y: currentY, Z: currentZ }, util)
          break
        case "y":
          this.setStretch({ X: currentX, Y: value, Z: currentZ }, util)
          break
        case "z":
          this.setStretch({ X: currentX, Y: currentY, Z: value }, util)
          break
      }

      return "Stretch set"
    }

    changeStretchMenu(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const posType = args.POSTYPES
      const value = Number(args.NUMBER)

      // Get the current scale
      const currentX = (drawable[OBJECT].scale.x / ((drawable[OBJECT]._sizeX || 100) / 100)) * 100
      const currentY = (drawable[OBJECT].scale.y / ((drawable[OBJECT]._sizeY || 100) / 100)) * 100
      const currentZ = (drawable[Z_STRETCH] || 1) * 100

      switch (posType) {
        case "x":
          this.setStretch({ X: currentX + value, Y: currentY, Z: currentZ }, util)
          break
        case "y":
          this.setStretch({ X: currentX, Y: currentY + value, Z: currentZ }, util)
          break
        case "z":
          this.setStretch({ X: currentX, Y: currentY, Z: currentZ + value }, util)
          break
      }

      return "Stretch changed"
    }

    stretchX(args, util) {
      if (!isInitialized) return 100

      const target = util.target
      if (!target || target.isStage) return 100

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return 100

      return ((drawable[OBJECT].scale.x / ((drawable[OBJECT]._sizeX || 100) / 100)) * 100).toFixed(2)
    }

    stretchY(args, util) {
      if (!isInitialized) return 100

      const target = util.target
      if (!target || target.isStage) return 100

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return 100

      return ((drawable[OBJECT].scale.y / ((drawable[OBJECT]._sizeY || 100) / 100)) * 100).toFixed(2)
    }

    stretchZ(args, util) {
      if (!isInitialized) return 100

      const target = util.target
      if (!target || target.isStage) return 100

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return 100

      return ((drawable[Z_STRETCH] || 1) * 100).toFixed(2)
    }

    stretchesArray(args, util) {
      if (!isInitialized) return JSON.stringify([100, 100, 100])

      const target = util.target
      if (!target || target.isStage) return JSON.stringify([100, 100, 100])

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return JSON.stringify([100, 100, 100])

      const x = (drawable[OBJECT].scale.x / ((drawable[OBJECT]._sizeX || 100) / 100)) * 100
      const y = (drawable[OBJECT].scale.y / ((drawable[OBJECT]._sizeY || 100) / 100)) * 100
      const z = (drawable[Z_STRETCH] || 1) * 100

      return JSON.stringify([x, y, z])
    }

    stretchesObject(args, util) {
      if (!isInitialized) return JSON.stringify({ x: 100, y: 100, z: 100 })

      const target = util.target
      if (!target || target.isStage) return JSON.stringify({ x: 100, y: 100, z: 100 })

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return JSON.stringify({ x: 100, y: 100, z: 100 })

      const x = (drawable[OBJECT].scale.x / ((drawable[OBJECT]._sizeX || 100) / 100)) * 100
      const y = (drawable[OBJECT].scale.y / ((drawable[OBJECT]._sizeY || 100) / 100)) * 100
      const z = (drawable[Z_STRETCH] || 1) * 100

      return JSON.stringify({ x: x, y: y, z: z })
    }

    attachSprite(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      const targetName = args.TARGET
      const targetObj = runtime.getSpriteTargetByName(targetName)
      if (!targetObj) return "Target sprite not found"

      const targetDrawable = scratchRenderer._allDrawables[targetObj.drawableID]
      if (drawable === targetDrawable) return "Cannot attach to self"

      drawable[ATTACHED_TO] = targetDrawable
      updateAttachment(drawable)

      renderer[THREEJS_DIRTY] = true
      return "Sprite attached"
    }

    detachSprite(args, util) {
      if (!isInitialized) return "Scene not initialized"

      const target = util.target
      if (!target || target.isStage) return "No active sprite"

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D]) return "Sprite not in 3D mode"

      drawable[ATTACHED_TO] = null
      updateAttachment(drawable)

      renderer[THREEJS_DIRTY] = true
      return "Sprite detached"
    }

    attachedSprite(args, util) {
      if (!isInitialized) return ""

      const target = util.target
      if (!target || target.isStage) return ""

      const drawable = scratchRenderer._allDrawables[target.drawableID]
      if (!drawable[IN_3D] || !drawable[ATTACHED_TO]) return ""

      const attachedId = drawable[ATTACHED_TO].id
      const attachedSprite = runtime.targets.find((target) => target.drawableID === attachedId)
      if (!attachedSprite) return ""

      return attachedSprite.sprite.name
    }

    getSprites() {
      const spriteNames = []
      const targets = runtime.targets
      for (let index = 1; index < targets.length; index++) {
        const curTarget = targets[index].sprite
        if (targets[index].isOriginal) {
          const jsonOBJ = {
            text: curTarget.name,
            value: curTarget.name,
          }
          spriteNames.push(jsonOBJ)
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames
      } else {
        return [{ text: "", value: 0 }] // Fallback
      }
    }
  }

  /* =======================================================================
   * ThreeEvents: Event Handling
   * Block:
   *  - temp (reporter)
   * ======================================================================= */
  class ThreeEvents {
    getInfo() {
      return {
        id: "DragonianUSB3DEvents",
        name: "Events 3D",
        color1: ext.colors.events,
        blocks: [
          {
            opcode: "temp",
            blockType: Scratch.BlockType.REPORTER,
            text: "temp",
          },
        ],
      }
    }
    temp() {
      return "Events in development"
    }
  }

  /* =======================================================================
   * ThreeControl: Control (Replacing Clones)
   * Block:
   *  - temp (reporter)
   * ======================================================================= */
  class ThreeControl {
    getInfo() {
      return {
        id: "DragonianUSB3DControl",
        name: "Control 3D",
        color1: ext.colors.control,
        blocks: [
          {
            opcode: "temp",
            blockType: Scratch.BlockType.REPORTER,
            text: "temp",
          },
        ],
      }
    }
    temp() {
      return "Control in development"
    }
  }

  /* =======================================================================
   * ThreeCamera: Camera Management
   * I did too much didn't i?
   * Blocks:
   *  - create camera [CAMERA]
   *  - delete camera [CAMERA]          (from cameras menu)
   *  - existing cameras (array reporter) [moved below delete camera]
   *  - focus on camera [CAMERA]         (new block)
   *  - move camera [CAMERA] [STEPS] steps in 3D
   *  - set camera position of [CAMERA] to x:[X] y:[Y] z:[Z]
   *  - change camera position of [CAMERA] by x:[X] y:[Y] z:[Z]
   *  - set camera rotation of [CAMERA] to r:[R] p:[P] y:[Y]
   *  - change camera rotation of [CAMERA] by r:[R] p:[P] y:[Y]
   *  - set camera pos [POSTYPES] of [CAMERA] to [NUMBER]
   *  - set camera rot [ROTTYPES] of [CAMERA] to [NUMBER]
   *  - camera direction around [ROTTYPES] of [CAMERA] (reporter)
   *  - camera x position of [CAMERA] (reporter)
   *  - camera y position of [CAMERA] (reporter)
   *  - camera z position of [CAMERA] (reporter)
   *  - camera roll of [CAMERA] (reporter)
   *  - camera pitch of [CAMERA] (reporter)
   *  - camera yaw of [CAMERA] (reporter)
   *  - camera position of [CAMERA] (array reporter)
   *  - camera position of [CAMERA] (object reporter) --> OBJECT type
   *  - camera rotation of [CAMERA] (array reporter)
   *  - camera rotation of [CAMERA] (object reporter) --> OBJECT type
   *  - bind camera [CAMERA] to [SPRITE]
   *  - unbind camera [CAMERA]
   *  - binded sprite of camera [CAMERA] (reporter)
   *  - set camera [CAMVIS] to [NUMBER]   (new functional block)
   *  - camera [CAMVIS]                  (new reporter block)
   * ======================================================================= */
  class ThreeCamera {
    // Store camera-sprite bindings
    #cameraBoundSprites = {}

    getInfo() {
      return {
        id: "DragonianUSB3DCamera",
        name: "Camera 3D",
        color1: ext.colors.camera,
        blocks: [
          {
            opcode: "createCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "create camera [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, defaultValue: "current" },
            },
          },
          {
            opcode: "deleteCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete camera [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "existingCameras",
            blockType: Scratch.BlockType.ARRAY,
            text: "existing cameras",
          },
          {
            opcode: "focusCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "focus on camera [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "moveCameraSteps",
            blockType: Scratch.BlockType.COMMAND,
            text: "move camera [CAMERA] [STEPS] steps in 3D",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: "setCameraPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera position of [CAMERA] to x:[X] y:[Y] z:[Z]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "changeCameraPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "change camera position of [CAMERA] by x:[X] y:[Y] z:[Z]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setCameraRotation",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera rotation of [CAMERA] to r:[R] p:[P] y:[Y]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "changeCameraRotation",
            blockType: Scratch.BlockType.COMMAND,
            text: "change camera rotation of [CAMERA] by r:[R] p:[P] y:[Y]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setCameraPosMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera pos [POSTYPES] of [CAMERA] to [NUMBER]",
            arguments: {
              POSTYPES: { type: Scratch.ArgumentType.STRING, menu: "postypes", defaultValue: "x" },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setCameraRotMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera rot [ROTTYPES] of [CAMERA] to [NUMBER]",
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "cameraDirectionAround",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera direction around [ROTTYPES] of [CAMERA]",
            arguments: {
              ROTTYPES: { type: Scratch.ArgumentType.STRING, menu: "rottypes", defaultValue: "r (roll)" },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraXPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera x position of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraYPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera y position of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraZPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera z position of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraRoll",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera roll of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraPitch",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera pitch of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraYaw",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera yaw of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraPositionArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "camera position of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraPositionObject",
            blockType: Scratch.BlockType.OBJECT,
            text: "camera position of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraRotationArray",
            blockType: Scratch.BlockType.ARRAY,
            text: "camera rotation of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "cameraRotationObject",
            blockType: Scratch.BlockType.OBJECT,
            text: "camera rotation of [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "bindCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "attach camera [CAMERA] to [SPRITE]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "spriteMenu" },
            },
          },
          {
            opcode: "unbindCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "detach camera [CAMERA]",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "bindedSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "sprite camera [CAMERA] is attached to",
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "cameras", defaultValue: "current" },
            },
          },
          {
            opcode: "setCameraVis",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera [CAMVIS] to [NUMBER]",
            arguments: {
              CAMVIS: { type: Scratch.ArgumentType.STRING, menu: "camvis" },
              NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 },
            },
          },
          {
            opcode: "getCameraVis",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera [CAMVIS]",
            arguments: {
              CAMVIS: { type: Scratch.ArgumentType.STRING, menu: "camvis", defaultValue: "FOV" },
            },
          },
        ],
        menus: {
          cameras: {
            acceptReporters: true,
            items: () => {
              // Always have "current" as the first option.
              let camList = ["current"]
              camList = camList.concat(cameras.filter((c) => c !== "current"))
              return camList.length > 0 ? camList : ["none"]
            },
          },
          postypes: {
            acceptReporters: true,
            items: ["x", "y", "z"],
          },
          rottypes: {
            acceptReporters: true,
            items: ["r (roll)", "p (pitch)", "y (yaw)"],
          },
          camvis: {
            acceptReporters: true,
            items: ["FOV", "Minimum render distance", "Maximum render distance"],
          },
          turndirs: {
            acceptReporters: true,
            items: ["up", "down", "left", "right"],
          },
          spriteMenu: {
            acceptReporters: true,
            items: () => {
              let spriteList = ["myself"]
              spriteList = spriteList.concat(getSprites())
              return spriteList.length > 1 ? spriteList : ["myself"]
            },
          },
        },
      }
    }

    createCamera(args) {
      if (!isInitialized) {
        initialize3D()
      }

      if (!isInitialized) return "Scene initialization failed"

      // Create a new camera in the camerasObj
      const cameraName = args.CAMERA
      if (!camerasObj[cameraName]) {
        // Create a new perspective camera with default settings
        camerasObj[cameraName] = new threejs.PerspectiveCamera(
          cameraSettings.FOV,
          (runtime.stageWidth || 480) / (runtime.stageHeight || 360),
          cameraSettings.minrender,
          cameraSettings.maxrender,
        )
        camerasObj[cameraName].position.set(0, 0, 200)
        // Add to the cameras array for menu tracking
        cameras.push(cameraName)
      }
      return "Camera created"
    }

    deleteCamera(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      // Don't delete the current camera if it's active
      if (cameraName === "current" || activeCamera === camerasObj[cameraName]) {
        return "Cannot delete active camera"
      }

      if (camerasObj[cameraName]) {
        // Remove from camerasObj
        delete camerasObj[cameraName]
        // Remove from cameras array
        cameras = cameras.filter((c) => c !== cameraName)
      }
      return "Camera deleted"
    }

    focusCamera(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      if (cameraName === "current") {
        // Just refresh the scene with the current active camera
        refreshScene()
        return "Camera focused"
      }

      if (camerasObj[cameraName]) {
        // Switch to this camera
        switchCamera(cameraName)
        renderer[THREEJS_DIRTY] = true
        return "Camera focused"
      }
      return "Camera not found"
    }

    moveCameraSteps(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const steps = Number(args.STEPS)

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      // Move camera forward in its current direction
      const direction = new threejs.Vector3(0, 0, -1)
      direction.applyQuaternion(camera.quaternion)
      direction.multiplyScalar(steps / 10) // Scale steps for better control
      camera.position.add(direction)

      renderer[THREEJS_DIRTY] = true
      return "Camera moved"
    }

    setCameraPosition(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const x = Number(args.X)
      const y = Number(args.Y)
      const z = Number(args.Z)

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      camera.position.set(x, y, z)
      renderer[THREEJS_DIRTY] = true
      return "Camera position set"
    }

    changeCameraPosition(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const x = Number(args.X)
      const y = Number(args.Y)
      const z = Number(args.Z)

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      camera.position.x += x
      camera.position.y += y
      camera.position.z += z

      renderer[THREEJS_DIRTY] = true
      return "Camera position changed"
    }

    setCameraRotation(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const r = Number(args.R) * (Math.PI / 180) // Convert to radians
      const p = Number(args.P) * (Math.PI / 180)
      const y = Number(args.Y) * (Math.PI / 180)

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      // Set rotation using Euler angles with YXZ order (yaw, pitch, roll)
      camera.rotation.set(p, y, r, "YXZ")

      renderer[THREEJS_DIRTY] = true
      return "Camera rotation set"
    }

    changeCameraRotation(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const r = Number(args.R) * (Math.PI / 180) // Convert to radians
      const p = Number(args.P) * (Math.PI / 180)
      const y = Number(args.Y) * (Math.PI / 180)

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      // Change rotation using Euler angles
      camera.rotation.x += p
      camera.rotation.y += y
      camera.rotation.z += r

      renderer[THREEJS_DIRTY] = true
      return "Camera rotation changed"
    }

    setCameraPosMenu(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const posType = args.POSTYPES
      const value = Number(args.NUMBER)

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      switch (posType) {
        case "x":
          camera.position.x = value
          break
        case "y":
          camera.position.y = value
          break
        case "z":
          camera.position.z = value
          break
      }

      renderer[THREEJS_DIRTY] = true
      return "Camera position set"
    }

    setCameraRotMenu(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const rotType = args.ROTTYPES
      const value = Number(args.NUMBER) * (Math.PI / 180) // Convert to radians

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      switch (rotType) {
        case "r (roll)":
          camera.rotation.z = value
          break
        case "p (pitch)":
          camera.rotation.x = value
          break
        case "y (yaw)":
          camera.rotation.y = value
          break
      }

      renderer[THREEJS_DIRTY] = true
      return "Camera rotation set"
    }

    cameraDirectionAround(args) {
      if (!isInitialized) return 0

      const cameraName = args.CAMERA
      const rotType = args.ROTTYPES

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return 0
      }

      switch (rotType) {
        case "r (roll)":
          return ((camera.rotation.z * 180) / Math.PI).toFixed(2)
        case "p (pitch)":
          return ((camera.rotation.x * 180) / Math.PI).toFixed(2)
        case "y (yaw)":
          return ((camera.rotation.y * 180) / Math.PI).toFixed(2)
      }

      return 0
    }

    cameraXPosition(args) {
      if (!isInitialized) return 0

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return 0
      }

      return camera.position.x.toFixed(2)
    }

    cameraYPosition(args) {
      if (!isInitialized) return 0

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return 0
      }

      return camera.position.y.toFixed(2)
    }

    cameraZPosition(args) {
      if (!isInitialized) return 0

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return 0
      }

      return camera.position.z.toFixed(2)
    }

    cameraRoll(args) {
      if (!isInitialized) return 0

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return 0
      }

      return ((camera.rotation.z * 180) / Math.PI).toFixed(2)
    }

    cameraPitch(args) {
      if (!isInitialized) return 0

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return 0
      }

      return ((camera.rotation.x * 180) / Math.PI).toFixed(2)
    }

    cameraYaw(args) {
      if (!isInitialized) return 0

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return 0
      }

      return ((camera.rotation.y * 180) / Math.PI).toFixed(2)
    }

    cameraPositionArray(args) {
      if (!isInitialized) return JSON.stringify([0, 0, 0])

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return JSON.stringify([0, 0, 0])
      }

      const pos = camera.position
      return JSON.stringify([pos.x, pos.y, pos.z])
    }

    cameraPositionObject(args) {
      if (!isInitialized) return JSON.stringify({ x: 0, y: 0, z: 0 })

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return JSON.stringify({ x: 0, y: 0, z: 0 })
      }

      const pos = camera.position
      return JSON.stringify({ x: pos.x, y: pos.y, z: pos.z })
    }

    cameraRotationArray(args) {
      if (!isInitialized) return JSON.stringify([0, 0, 0])

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return JSON.stringify([0, 0, 0])
      }

      const rot = camera.rotation
      // Convert to degrees for easier understanding
      return JSON.stringify([
        (rot.z * 180) / Math.PI, // roll
        (rot.x * 180) / Math.PI, // pitch
        (rot.y * 180) / Math.PI, // yaw
      ])
    }

    cameraRotationObject(args) {
      if (!isInitialized) return JSON.stringify({ roll: 0, pitch: 0, yaw: 0 })

      const cameraName = args.CAMERA

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return JSON.stringify({ roll: 0, pitch: 0, yaw: 0 })
      }

      const rot = camera.rotation
      // Convert to degrees for easier understanding
      return JSON.stringify({
        roll: (rot.z * 180) / Math.PI,
        pitch: (rot.x * 180) / Math.PI,
        yaw: (rot.y * 180) / Math.PI,
      })
    }

    bindCamera(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const spriteName = args.SPRITE

      let camera
      if (cameraName === "current") {
        camera = activeCamera
      } else if (camerasObj[cameraName]) {
        camera = camerasObj[cameraName]
      } else {
        return "Camera not found"
      }

      const targetObj = runtime.getSpriteTargetByName(spriteName)
      if (!targetObj) {
        return "Sprite not found"
      }

      // Store the binding
      this.#cameraBoundSprites[cameraName === "current" ? currentCamera : cameraName] = spriteName

      // Position the camera behind and slightly above the sprite
      camera.position.set(targetObj.x, targetObj.y + 50, (targetObj.z || 0) + 200)

      // Look at the sprite
      camera.lookAt(new threejs.Vector3(targetObj.x, targetObj.y, targetObj.z || 0))

      renderer[THREEJS_DIRTY] = true
      return "Camera attached to sprite"
    }

    unbindCamera(args) {
      if (!isInitialized) return "Scene not initialized"

      const cameraName = args.CAMERA
      const camKey = cameraName === "current" ? currentCamera : cameraName

      if (this.#cameraBoundSprites[camKey]) {
        delete this.#cameraBoundSprites[camKey]
        renderer[THREEJS_DIRTY] = true
        return "Camera detached"
      }

      return "Camera not bound"
    }

    bindedSprite(args) {
      if (!isInitialized) return ""

      const cameraName = args.CAMERA
      const camKey = cameraName === "current" ? currentCamera : cameraName

      return this.#cameraBoundSprites[camKey] || ""
    }

    existingCameras() {
      return JSON.stringify(cameras)
    }

    setCameraVis(args) {
      if (!isInitialized) return "Scene not initialized"

      let visType = args.CAMVIS
      const value = Number(args.NUMBER)

      // Handle dropdown special characters
      if (visType === "Minimum render distance") {
        visType = "minrender"
      } else if (visType === "Maximum render distance") {
        visType = "maxrender"
      }

      switch (visType) {
        case "FOV":
          cameraSettings.FOV = value
          // Update all perspective cameras
          Object.values(camerasObj).forEach((camera) => {
            if (camera.isPerspectiveCamera) {
              camera.fov = value
              camera.updateProjectionMatrix()
            }
          })
          break
        case "minrender":
          cameraSettings.minrender = value
          // Update all cameras
          Object.values(camerasObj).forEach((camera) => {
            camera.near = value
            camera.updateProjectionMatrix()
          })
          break
        case "maxrender":
          cameraSettings.maxrender = value
          // Update all cameras
          Object.values(camerasObj).forEach((camera) => {
            camera.far = value
            camera.updateProjectionMatrix()
          })
          break
      }
      renderer[THREEJS_DIRTY] = true
      return "Camera settings updated"
    }

    getCameraVis(args) {
      if (!isInitialized) return 0

      let visType = args.CAMVIS

      // Handle dropdown special characters
      if (visType === "Minimum render distance") {
        visType = "minrender"
      } else if (visType === "Maximum render distance") {
        visType = "maxrender"
      }

      switch (visType) {
        case "FOV":
          return cameraSettings.FOV
        case "minrender":
          return cameraSettings.minrender
        case "maxrender":
          return cameraSettings.maxrender
        default:
          return cameraSettings.FOV
      }
    }

    getSprites() {
      const spriteNames = []
      const targets = runtime.targets
      for (let index = 1; index < targets.length; index++) {
        const curTarget = targets[index].sprite
        if (targets[index].isOriginal) {
          const jsonOBJ = {
            text: curTarget.name,
            value: curTarget.name,
          }
          spriteNames.push(jsonOBJ)
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames
      } else {
        return [{ text: "", value: 0 }] // Fallback
      }
    }
  }

  /* =======================================================================
   * Registering Extensions
   * Order: Three, ThreeMotion, ThreeLooks, ThreeEvents, ThreeControl, ThreeCamera
   * =======================================================================
   */
  Scratch.extensions.register(new Three())
  Scratch.extensions.register(new ThreeMotion())
  Scratch.extensions.register(new ThreeLooks())
  Scratch.extensions.register(new ThreeEvents())
  Scratch.extensions.register(new ThreeControl())
  Scratch.extensions.register(new ThreeCamera())

  // Attach to Scratch VM's BEFORE_EXECUTE event if available
  if (runtime) {
    runtime.on("BEFORE_EXECUTE", refreshScene)
    console.log("Attached refreshScene to BEFORE_EXECUTE event")
  } else {
    // If VM isn't available immediately, try again when the extension is first used
    const checkForVM = setInterval(() => {
      if (runtime) {
        runtime.on("BEFORE_EXECUTE", refreshScene)
        console.log("Attached refreshScene to BEFORE_EXECUTE event (delayed)")
        clearInterval(checkForVM)
      }
    }, 1000)
  }
  }
})(Scratch);

