import * as THREE from 'three/webgpu'
import {
  Fn,
  If,
  Loop,
  Continue,
  float,
  uint,
  vec3,
  uniform,
  instancedArray,
  instanceIndex,
  cos,
  normalize,
  length,
  dot,
  select,
  attribute,
  positionLocal,
} from 'three/tsl'

export class Boids {
  // Private uniforms
  #separationU
  #alignmentU
  #cohesionU
  #dtU
  #rayOriginU
  #rayDirectionU
  #obstacleCenterU
  #obstacleRadiusU
  #colliderAttractionU
  #fishScaleU
  #tailSpeedU
  #fishColorU
  #speedMultiplierU

  // Private
  #renderer
  #count
  #speedLimit
  #positionStorage
  #velocityStorage
  #phaseStorage
  #computeVelocity
  #computePosition
  #colliderMesh

  // Public
  mesh
  material

  constructor(renderer, settings = {}) {
    this.#renderer = renderer
    this.#count = settings.count ?? 4096
    this.#speedLimit = settings.speedLimit ?? 9.0
    this.#colliderMesh = settings.colliderMesh ?? null

    // Determine spawn bounds from box mesh or fallback
    let spawnMin = new THREE.Vector3(-400, -400, -400)
    let spawnMax = new THREE.Vector3(400, 400, 400)

    if (settings.spawnBox) {
      const box = new THREE.Box3().setFromObject(settings.spawnBox)
      spawnMin = box.min
      spawnMax = box.max
    }

    const spawnSize = new THREE.Vector3().subVectors(spawnMax, spawnMin)

    // Storage buffers
    const positionArray = new Float32Array(this.#count * 3)
    const velocityArray = new Float32Array(this.#count * 3)
    const phaseArray = new Float32Array(this.#count)

    for (let i = 0; i < this.#count; i++) {
      positionArray[i * 3 + 0] = Math.random() * spawnSize.x + spawnMin.x
      positionArray[i * 3 + 1] = Math.random() * spawnSize.y + spawnMin.y
      positionArray[i * 3 + 2] = Math.random() * spawnSize.z + spawnMin.z

      velocityArray[i * 3 + 0] = (Math.random() - 0.5) * 10
      velocityArray[i * 3 + 1] = (Math.random() - 0.5) * 10
      velocityArray[i * 3 + 2] = (Math.random() - 0.5) * 10

      phaseArray[i] = 1
    }

    this.#positionStorage = instancedArray(positionArray, 'vec3')
    this.#velocityStorage = instancedArray(velocityArray, 'vec3')
    this.#phaseStorage = instancedArray(phaseArray, 'float')

    // Uniforms
    this.#separationU = uniform(settings.separation ?? 15.0)
    this.#alignmentU = uniform(settings.alignment ?? 20.0)
    this.#cohesionU = uniform(settings.cohesion ?? 20.0)
    this.#dtU = uniform(0.0)
    this.#rayOriginU = uniform(new THREE.Vector3())
    this.#rayDirectionU = uniform(new THREE.Vector3())
    this.#obstacleCenterU = uniform(new THREE.Vector3())
    this.#obstacleRadiusU = uniform(settings.obstacleRadius ?? 60.0)
    this.#colliderAttractionU = uniform(settings.colliderAttraction ?? 3.0)
    this.#fishScaleU = uniform(settings.fishScale ?? 1.2)
    this.#tailSpeedU = uniform(settings.tailSpeed ?? 7)
    this.#fishColorU = uniform(new THREE.Color(settings.fishColor ?? '#1a0f0a'))
    this.#speedMultiplierU = uniform(settings.speedMultiplier ?? 9.0)
  }

  // ─── Getters/Setters ────────────────────────────────────────────────────────

  get separation() {
    return this.#separationU.value
  }
  set separation(v) {
    this.#separationU.value = v
  }

  get alignment() {
    return this.#alignmentU.value
  }
  set alignment(v) {
    this.#alignmentU.value = v
  }

  get cohesion() {
    return this.#cohesionU.value
  }
  set cohesion(v) {
    this.#cohesionU.value = v
  }

  get colliderAttraction() {
    return this.#colliderAttractionU.value
  }
  set colliderAttraction(v) {
    this.#colliderAttractionU.value = v
  }

  get obstacleRadius() {
    return this.#obstacleRadiusU.value
  }
  set obstacleRadius(v) {
    this.#obstacleRadiusU.value = v
  }

  get fishScale() {
    return this.#fishScaleU.value
  }
  set fishScale(v) {
    this.#fishScaleU.value = v
  }

  get tailSpeed() {
    return this.#tailSpeedU.value
  }
  set tailSpeed(v) {
    this.#tailSpeedU.value = v
  }

  get fishColor() {
    return '#' + this.#fishColorU.value.getHexString()
  }
  set fishColor(v) {
    this.#fishColorU.value.set(v)
  }

  get speedMultiplier() {
    return this.#speedMultiplierU.value
  }
  set speedMultiplier(v) {
    this.#speedMultiplierU.value = v
  }

  get count() {
    return this.#count
  }

  get colliderMesh() {
    return this.#colliderMesh
  }
  set colliderMesh(v) {
    this.#colliderMesh = v
  }

  get rayOrigin() {
    return this.#rayOriginU.value
  }
  get rayDirection() {
    return this.#rayDirectionU.value
  }

  // ─── Initialization ─────────────────────────────────────────────────────────

  init() {
    this.#createComputeVelocity()
    this.#createComputePosition()
    this.#createMaterial()
    this.#createMesh()
    return this
  }

  // ─── Update ─────────────────────────────────────────────────────────────────

  update(delta) {
    if (delta > 1) delta = 1
    this.#dtU.value = delta

    // Sync collider mesh position/scale into uniforms
    if (this.#colliderMesh) {
      this.#colliderMesh.updateWorldMatrix(true, false)
      this.#obstacleCenterU.value.setFromMatrixPosition(this.#colliderMesh.matrixWorld)
      this.#obstacleRadiusU.value = this.#colliderMesh.matrixWorld.getMaxScaleOnAxis()
    }

    this.#renderer.compute(this.#computeVelocity)
    this.#renderer.compute(this.#computePosition)
  }

  // ─── Book Geometry (flapping open book) ──────────────────────────────────────

  #createFishGeometry() {
    const geo = new THREE.BufferGeometry()

    // Open book: two page halves connected at a spine along +Z axis
    // The book flies forward along +Z. Pages extend in +X and -X.
    // tailFlag controls flapping: 0 at spine, 1 at page edges.
    //
    // Each page is a subdivided quad so the flapping bends smoothly.

    const PAGE_SEGS_X = 6  // subdivisions across each page (spine to edge)
    const PAGE_SEGS_Z = 4  // subdivisions along the spine (front to back)
    const PAGE_WIDTH = 5   // half-width (one page)
    const PAGE_LENGTH = 8  // length along Z (flight direction)
    const PAGE_THICKNESS = 0.15 // slight Y offset for top/bottom faces
    const SPINE_HEIGHT = 0.6    // spine ridge height

    const verts = []
    const flags = []

    // Helper: add a subdivided page quad (one side of book)
    // side: 1 for right page (+X), -1 for left page (-X)
    // ySign: 1 for top face, -1 for bottom face
    const addPage = (side, ySign) => {
      for (let iz = 0; iz < PAGE_SEGS_Z; iz++) {
        for (let ix = 0; ix < PAGE_SEGS_X; ix++) {
          const x0 = (ix / PAGE_SEGS_X) * PAGE_WIDTH * side
          const x1 = ((ix + 1) / PAGE_SEGS_X) * PAGE_WIDTH * side
          const z0 = (iz / PAGE_SEGS_Z) * PAGE_LENGTH - PAGE_LENGTH * 0.5
          const z1 = ((iz + 1) / PAGE_SEGS_Z) * PAGE_LENGTH - PAGE_LENGTH * 0.5

          const y = PAGE_THICKNESS * ySign

          const f0 = ix / PAGE_SEGS_X       // flap factor at inner edge of this cell
          const f1 = (ix + 1) / PAGE_SEGS_X // flap factor at outer edge

          if (side * ySign > 0) {
            // Winding order for correct face normal
            verts.push(x0, y, z0, x1, y, z0, x1, y, z1)
            flags.push(f0, f1, f1)
            verts.push(x0, y, z0, x1, y, z1, x0, y, z1)
            flags.push(f0, f1, f0)
          } else {
            verts.push(x0, y, z0, x1, y, z1, x1, y, z0)
            flags.push(f0, f1, f1)
            verts.push(x0, y, z0, x0, y, z1, x1, y, z1)
            flags.push(f0, f0, f1)
          }
        }
      }
    }

    // Right page (top + bottom)
    addPage(1, 1)
    addPage(1, -1)
    // Left page (top + bottom)
    addPage(-1, 1)
    addPage(-1, -1)

    // Spine: a small ridge along the center (Z axis) for visual thickness
    const spZ0 = -PAGE_LENGTH * 0.5
    const spZ1 = PAGE_LENGTH * 0.5
    const spW = 0.3 // half-width of spine

    // Spine top face
    verts.push(-spW, SPINE_HEIGHT, spZ0, spW, SPINE_HEIGHT, spZ0, spW, SPINE_HEIGHT, spZ1)
    flags.push(0, 0, 0)
    verts.push(-spW, SPINE_HEIGHT, spZ0, spW, SPINE_HEIGHT, spZ1, -spW, SPINE_HEIGHT, spZ1)
    flags.push(0, 0, 0)

    // Spine left side
    verts.push(-spW, -PAGE_THICKNESS, spZ0, -spW, SPINE_HEIGHT, spZ0, -spW, SPINE_HEIGHT, spZ1)
    flags.push(0, 0, 0)
    verts.push(-spW, -PAGE_THICKNESS, spZ0, -spW, SPINE_HEIGHT, spZ1, -spW, -PAGE_THICKNESS, spZ1)
    flags.push(0, 0, 0)

    // Spine right side
    verts.push(spW, SPINE_HEIGHT, spZ0, spW, -PAGE_THICKNESS, spZ0, spW, -PAGE_THICKNESS, spZ1)
    flags.push(0, 0, 0)
    verts.push(spW, SPINE_HEIGHT, spZ0, spW, -PAGE_THICKNESS, spZ1, spW, SPINE_HEIGHT, spZ1)
    flags.push(0, 0, 0)

    // Page edge strips (thin rectangles at the outer edges of each page for thickness)
    const addEdgeStrip = (side) => {
      const ex = PAGE_WIDTH * side
      const z0 = -PAGE_LENGTH * 0.5
      const z1 = PAGE_LENGTH * 0.5
      const yt = PAGE_THICKNESS
      const yb = -PAGE_THICKNESS

      if (side > 0) {
        verts.push(ex, yt, z0, ex, yb, z0, ex, yb, z1)
        flags.push(1, 1, 1)
        verts.push(ex, yt, z0, ex, yb, z1, ex, yt, z1)
        flags.push(1, 1, 1)
      } else {
        verts.push(ex, yt, z0, ex, yb, z1, ex, yb, z0)
        flags.push(1, 1, 1)
        verts.push(ex, yt, z0, ex, yt, z1, ex, yb, z1)
        flags.push(1, 1, 1)
      }
    }

    addEdgeStrip(1)
    addEdgeStrip(-1)

    const vertices = new Float32Array(verts)
    // Scale down to match the fish size
    for (let i = 0; i < vertices.length; i++) {
      vertices[i] *= 0.25
    }

    const tailFlag = new Float32Array(flags)

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geo.setAttribute('tailFlag', new THREE.BufferAttribute(tailFlag, 1))

    return geo
  }

  // ─── Material ───────────────────────────────────────────────────────────────

  #createMaterial() {
    this.material = new THREE.MeshStandardNodeMaterial({
      side: THREE.DoubleSide,
    })

    const positionStorage = this.#positionStorage
    const velocityStorage = this.#velocityStorage
    const phaseStorage = this.#phaseStorage
    const fishScaleU = this.#fishScaleU
    const fishColorU = this.#fishColorU

    // Vertex shader: position + orient fish along velocity + wag tail
    this.material.positionNode = Fn(() => {
      const fishPos = positionStorage.element(instanceIndex)
      const fishVel = velocityStorage.element(instanceIndex)
      const phase = phaseStorage.element(instanceIndex)

      const pos = positionLocal.toVar()

      // Page flapping (rotate around Z axis — pages flap up/down)
      const tail = attribute('tailFlag', 'float')
      const flapAngle = phase.sin().mul(tail).mul(0.7)
      const cosA = cos(flapAngle)
      const sinA = flapAngle.sin()
      // Rotate X-Y around Z axis: pages hinge at spine
      const newX = pos.x.mul(cosA).sub(pos.y.mul(sinA))
      const newY = pos.x.mul(sinA).add(pos.y.mul(cosA))
      pos.x.assign(newX)
      pos.y.assign(newY)

      // Scale fish
      pos.mulAssign(fishScaleU)

      // Orient fish along velocity direction
      const dir = normalize(fishVel)
      const right = normalize(dir.cross(vec3(0, 1, 0)))
      const up = normalize(right.cross(dir))

      // Transform: local to world (Z = forward = dir)
      const worldPos = vec3(right.mul(pos.x).add(up.mul(pos.y)).add(dir.mul(pos.z)))

      return worldPos.add(fishPos)
    })()

    // Solid orange swarm color for the GUILD SA light brand system.
    this.material.colorNode = fishColorU
  }

  // ─── Mesh ───────────────────────────────────────────────────────────────────

  #createMesh() {
    const fishGeo = this.#createFishGeometry()
    this.mesh = new THREE.InstancedMesh(fishGeo, this.material, this.#count)
  }

  // ─── Compute Velocity ───────────────────────────────────────────────────────

  #createComputeVelocity() {
    const count = this.#count
    const speedLimit = this.#speedLimit
    const positionStorage = this.#positionStorage
    const velocityStorage = this.#velocityStorage
    const separationU = this.#separationU
    const alignmentU = this.#alignmentU
    const cohesionU = this.#cohesionU
    const dtU = this.#dtU
    const rayOriginU = this.#rayOriginU
    const rayDirectionU = this.#rayDirectionU
    const obstacleCenterU = this.#obstacleCenterU
    const obstacleRadiusU = this.#obstacleRadiusU
    const colliderAttractionU = this.#colliderAttractionU

    this.#computeVelocity = Fn(() => {
      const PI_2 = float(Math.PI * 2)
      const limit = float(speedLimit).toVar('limit')

      const zoneRadius = separationU.add(alignmentU).add(cohesionU).toConst()
      const separationThresh = separationU.div(zoneRadius).toConst()
      const alignmentThresh = separationU.add(alignmentU).div(zoneRadius).toConst()
      const zoneRadiusSq = zoneRadius.mul(zoneRadius).toConst()

      const birdIndex = instanceIndex.toConst('birdIndex')
      const position = positionStorage.element(birdIndex).toVar()
      const velocity = velocityStorage.element(birdIndex).toVar()

      // Mouse / ray influence
      const directionToRay = rayOriginU.sub(position).toConst()
      const projectionLength = dot(directionToRay, rayDirectionU).toConst()
      const closestPoint = rayOriginU.sub(rayDirectionU.mul(projectionLength)).toConst()
      const dirToClosest = closestPoint.sub(position).toConst()
      const distToClosestSq = dot(dirToClosest, dirToClosest).toConst()

      const rayRadius = float(150.0).toConst()
      const rayRadiusSq = rayRadius.mul(rayRadius).toConst()

      If(distToClosestSq.lessThan(rayRadiusSq), () => {
        const velocityAdjust = distToClosestSq.div(rayRadiusSq).sub(1.0).mul(dtU).mul(100.0)
        velocity.addAssign(normalize(dirToClosest).mul(velocityAdjust))
        limit.addAssign(5.0)
      })

      // Attract to center
      const dirToCenter = position.toVar()
      dirToCenter.y.mulAssign(2.5)
      velocity.subAssign(normalize(dirToCenter).mul(dtU).mul(5.0))

      // Attraction to obstacle
      const toObstacle = position.sub(obstacleCenterU)
      const distToObstacle = length(toObstacle)
      velocity.subAssign(normalize(toObstacle).mul(dtU).mul(colliderAttractionU))

      // Obstacle avoidance
      const avoidRadius = obstacleRadiusU.mul(1.8) // start avoiding before hitting
      If(distToObstacle.lessThan(avoidRadius), () => {
        const pushStrength = avoidRadius.div(distToObstacle.max(0.001)).sub(1.0).mul(dtU).mul(80.0)
        velocity.addAssign(normalize(toObstacle).mul(pushStrength))
      })

      // Boid rules: separation, alignment, cohesion
      Loop({ start: uint(0), end: uint(count), type: 'uint', condition: '<' }, ({ i }) => {
        If(i.equal(birdIndex), () => {
          Continue()
        })

        const birdPosition = positionStorage.element(i)
        const dirToBird = birdPosition.sub(position)
        const distToBird = length(dirToBird)

        If(distToBird.lessThan(0.0001), () => {
          Continue()
        })

        const distToBirdSq = distToBird.mul(distToBird)

        If(distToBirdSq.greaterThan(zoneRadiusSq), () => {
          Continue()
        })

        const percent = distToBirdSq.div(zoneRadiusSq)

        If(percent.lessThan(separationThresh), () => {
          // Separation: steer away from close neighbors
          const velocityAdjust = separationThresh.div(percent).sub(1.0).mul(dtU)
          velocity.subAssign(normalize(dirToBird).mul(velocityAdjust))
        })
          .ElseIf(percent.lessThan(alignmentThresh), () => {
            // Alignment: match velocity of nearby birds
            const threshDelta = alignmentThresh.sub(separationThresh)
            const adjustedPercent = percent.sub(separationThresh).div(threshDelta)
            const birdVelocity = velocityStorage.element(i)
            const cosRange = cos(adjustedPercent.mul(PI_2))
            const cosRangeAdjust = float(0.5).sub(cosRange.mul(0.5)).add(0.5)
            const velocityAdjust = cosRangeAdjust.mul(dtU)
            velocity.addAssign(normalize(birdVelocity).mul(velocityAdjust))
          })
          .Else(() => {
            // Cohesion: steer toward center of nearby flock
            const threshDelta = alignmentThresh.oneMinus()
            const adjustedPercent = select(
              threshDelta.equal(0.0),
              1.0,
              percent.sub(alignmentThresh).div(threshDelta),
            )
            const cosRange = cos(adjustedPercent.mul(PI_2))
            const velocityAdjust = float(0.5).sub(cosRange.mul(-0.5).add(0.5)).mul(dtU)
            velocity.addAssign(normalize(dirToBird).mul(velocityAdjust))
          })
      })

      // Speed limit
      If(length(velocity).greaterThan(limit), () => {
        velocity.assign(normalize(velocity).mul(limit))
      })

      velocityStorage.element(birdIndex).assign(velocity)
    })().compute(count)
  }

  // ─── Compute Position ───────────────────────────────────────────────────────

  #createComputePosition() {
    const count = this.#count
    const positionStorage = this.#positionStorage
    const velocityStorage = this.#velocityStorage
    const phaseStorage = this.#phaseStorage
    const dtU = this.#dtU
    const speedMultiplierU = this.#speedMultiplierU
    const tailSpeedU = this.#tailSpeedU

    this.#computePosition = Fn(() => {
      positionStorage
        .element(instanceIndex)
        .addAssign(velocityStorage.element(instanceIndex).mul(dtU).mul(speedMultiplierU))

      // Tail wag phase (based on speed)
      const velocity = velocityStorage.element(instanceIndex)
      const phase = phaseStorage.element(instanceIndex)

      const modValue = phase
        .add(dtU.mul(tailSpeedU))
        .add(length(velocity).mul(dtU).mul(tailSpeedU).mul(0.5))

      phaseStorage.element(instanceIndex).assign(modValue.mod(62.83))
    })().compute(count)
  }
}
