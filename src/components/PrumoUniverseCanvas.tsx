import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface PrumoUniverseCanvasProps {
  className?: string;
}

const _targetMouse = new THREE.Vector2(0, 0);
const _currentMouse = new THREE.Vector2(0, 0);
const _dummy = new THREE.Object3D();
const _tempColor = new THREE.Color();

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function PrumoUniverseCanvas({ className = '' }: PrumoUniverseCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSoftwareGl = detectSoftwareWebGL();
    const isMobile = window.innerWidth < 768;

    let frameId = 0;
    let disposed = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070709);
    scene.fog = new THREE.FogExp2(0x070709, 0.042);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.25, isMobile ? 9.5 : 7.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Studio reflection environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Warm/cool architectural lighting rig
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0b0b0f, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe7ba, 2.4);
    keyLight.position.set(5.5, 6.5, 4.5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 20;
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4a853, 1.8);
    rimLight.position.set(-5, -2.5, -4);
    scene.add(rimLight);

    // Composite 9-part procedural sculpture ("Prumo Axis")
    const sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(isMobile ? 0 : 1.75, isMobile ? 0.35 : 0.05, 0);
    scene.add(sculptureGroup);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // Materials with >= 0.25 roughness differentiation
    const champagneGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4a853,
      metalness: 0.96,
      roughness: 0.16,
      anisotropy: 0.8,
      clearcoat: 0.35,
    });
    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1e2028,
      metalness: 0.72,
      roughness: 0.44,
    });
    const matteObsidianMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c10,
      metalness: 0.2,
      roughness: 0.78,
    });
    const smokedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f4f0,
      metalness: 0.05,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.86,
      transparent: true,
      opacity: isSoftwareGl ? 0.34 : 1,
      ior: 1.58,
      thickness: 1.4,
      attenuationColor: new THREE.Color(0xd4a853),
      attenuationDistance: 2.2,
      clearcoat: 1.0,
      depthWrite: isSoftwareGl ? false : true,
    });
    materialsToDispose.push(champagneGoldMat, darkTitaniumMat, matteObsidianMat, smokedGlassMat);

    // Part 1: Outer plumb-bob smoked glass silhouette (LatheGeometry)
    const outerProfile = [
      new THREE.Vector2(0.001, -2.05),
      new THREE.Vector2(0.32, -1.15),
      new THREE.Vector2(0.76, -0.15),
      new THREE.Vector2(0.84, 0.42),
      new THREE.Vector2(0.56, 1.08),
      new THREE.Vector2(0.18, 1.62),
      new THREE.Vector2(0.001, 1.85),
    ];
    const outerGlassGeo = new THREE.LatheGeometry(outerProfile, 48);
    geometriesToDispose.push(outerGlassGeo);
    const outerGlassMesh = new THREE.Mesh(outerGlassGeo, smokedGlassMat);
    outerGlassMesh.renderOrder = 2;
    sculptureGroup.add(outerGlassMesh);

    // Part 2: Inner stepped champagne-gold plumb core (LatheGeometry)
    const innerProfile = [
      new THREE.Vector2(0.001, -1.65),
      new THREE.Vector2(0.18, -0.82),
      new THREE.Vector2(0.42, -0.05),
      new THREE.Vector2(0.48, 0.35),
      new THREE.Vector2(0.28, 0.88),
      new THREE.Vector2(0.06, 1.35),
      new THREE.Vector2(0.001, 1.5),
    ];
    const innerCoreGeo = new THREE.LatheGeometry(innerProfile, 8);
    geometriesToDispose.push(innerCoreGeo);
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, champagneGoldMat);
    innerCoreMesh.castShadow = !isSoftwareGl;
    sculptureGroup.add(innerCoreMesh);

    // Part 3: Vertical tension needle & machined obsidian collars
    const axisGeo = new THREE.CylinderGeometry(0.018, 0.018, 5.2, 16);
    geometriesToDispose.push(axisGeo);
    const axisMesh = new THREE.Mesh(axisGeo, champagneGoldMat);
    sculptureGroup.add(axisMesh);

    const collarGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.14, 24);
    geometriesToDispose.push(collarGeo);
    const topCollar = new THREE.Mesh(collarGeo, darkTitaniumMat);
    topCollar.position.y = 1.64;
    sculptureGroup.add(topCollar);

    const baseCollar = new THREE.Mesh(collarGeo, matteObsidianMat);
    baseCollar.position.y = -1.75;
    baseCollar.scale.set(0.7, 1.2, 0.7);
    sculptureGroup.add(baseCollar);

    // Parts 4, 5, 6: Three counter-tilted precision gimbal rings
    const ringOuterGeo = new THREE.TorusGeometry(2.15, 0.022, 16, 110);
    const ringMidGeo = new THREE.TorusGeometry(1.62, 0.032, 16, 96);
    const ringInnerGeo = new THREE.TorusGeometry(1.22, 0.016, 16, 84);
    geometriesToDispose.push(ringOuterGeo, ringMidGeo, ringInnerGeo);

    const ringOuter = new THREE.Mesh(ringOuterGeo, darkTitaniumMat);
    ringOuter.rotation.set(Math.PI * 0.34, Math.PI * 0.18, 0);
    sculptureGroup.add(ringOuter);

    const ringMid = new THREE.Mesh(ringMidGeo, champagneGoldMat);
    ringMid.rotation.set(-Math.PI * 0.25, Math.PI * 0.42, 0);
    sculptureGroup.add(ringMid);

    const ringInner = new THREE.Mesh(ringInnerGeo, matteObsidianMat);
    ringInner.rotation.set(Math.PI * 0.48, -Math.PI * 0.15, 0);
    sculptureGroup.add(ringInner);

    // Parts 7, 8, 9: Three beveled architectural prism satellites (ExtrudeGeometry)
    const hexShape = new THREE.Shape();
    const sides = 6;
    const hexR = 0.18;
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      const px = Math.cos(a) * hexR;
      const py = Math.sin(a) * hexR;
      if (i === 0) hexShape.moveTo(px, py);
      else hexShape.lineTo(px, py);
    }
    hexShape.closePath();

    const prismGeo = new THREE.ExtrudeGeometry(hexShape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.025,
      bevelSegments: 2,
    });
    prismGeo.center();
    geometriesToDispose.push(prismGeo);

    const orbitSatellites: { mesh: THREE.Mesh; radius: number; speed: number; offset: number; yAmp: number }[] = [];
    const satelliteConfigs = [
      { radius: 2.15, speed: 0.28, offset: 0.4, yAmp: 0.55, mat: champagneGoldMat, scale: 0.85 },
      { radius: 1.65, speed: -0.36, offset: 2.5, yAmp: 0.72, mat: darkTitaniumMat, scale: 1.05 },
      { radius: 2.45, speed: 0.22, offset: 4.3, yAmp: 0.45, mat: champagneGoldMat, scale: 0.68 },
    ];

    for (const cfg of satelliteConfigs) {
      const sat = new THREE.Mesh(prismGeo, cfg.mat);
      sat.scale.setScalar(cfg.scale);
      sculptureGroup.add(sat);
      orbitSatellites.push({
        mesh: sat,
        radius: cfg.radius,
        speed: cfg.speed,
        offset: cfg.offset,
        yAmp: cfg.yAmp,
      });
    }

    // Instanced constellation particles
    const particleCount = isMobile ? 95 : 165;
    const particleGeo = new THREE.OctahedronGeometry(0.024, 0);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0xd4a853,
      emissiveIntensity: 0.22,
    });
    geometriesToDispose.push(particleGeo);
    materialsToDispose.push(particleMat);

    const particles = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    particles.frustumCulled = false;

    const particleData: {
      baseX: number;
      baseY: number;
      baseZ: number;
      scale: number;
      phase: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2.4 + Math.random() * 6.5;
      const y = (Math.random() - 0.5) * 7.5;
      const x = Math.cos(theta) * r + (isMobile ? 0 : 1.0);
      const z = Math.sin(theta) * r - 1.5;
      const s = 0.5 + Math.random() * 1.4;

      particleData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        scale: s,
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.35,
      });

      _dummy.position.set(x, y, z);
      _dummy.scale.setScalar(s);
      _dummy.updateMatrix();
      particles.setMatrixAt(i, _dummy.matrix);

      _tempColor.setHex(i % 3 === 0 ? 0xd4a853 : 0xe4e4e7);
      particles.setColorAt(i, _tempColor);
    }
    particles.instanceMatrix.needsUpdate = true;
    if (particles.instanceColor) particles.instanceColor.needsUpdate = true;
    particles.computeBoundingSphere();
    scene.add(particles);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer and scroll listeners
    let scrollFactor = 0;
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      _targetMouse.set(nx, ny);
    };

    const onScroll = () => {
      const maxScroll = Math.max(window.innerHeight, 1);
      scrollFactor = Math.min(window.scrollY / maxScroll, 1.5);
    };

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const mobileNow = w < 768;
      camera.aspect = w / h;
      camera.position.z = mobileNow ? 9.5 : 7.6;
      camera.updateProjectionMatrix();
      sculptureGroup.position.x = mobileNow ? 0 : 1.75;
      sculptureGroup.position.y = mobileNow ? 0.35 : 0.05;
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    function updateScene(elapsed: number, delta: number) {
      _currentMouse.x = THREE.MathUtils.damp(_currentMouse.x, _targetMouse.x, 3.2, delta);
      _currentMouse.y = THREE.MathUtils.damp(_currentMouse.y, _targetMouse.y, 3.2, delta);

      sculptureGroup.rotation.y = elapsed * 0.14 + _currentMouse.x * 0.32;
      sculptureGroup.rotation.x = THREE.MathUtils.damp(
        sculptureGroup.rotation.x,
        _currentMouse.y * 0.18 + scrollFactor * 0.25,
        3.5,
        delta,
      );

      innerCoreMesh.rotation.y = -elapsed * 0.22;
      ringOuter.rotation.z = elapsed * 0.18;
      ringMid.rotation.x = -Math.PI * 0.25 + elapsed * 0.24;
      ringInner.rotation.y = -Math.PI * 0.15 - elapsed * 0.31;

      for (const sat of orbitSatellites) {
        const angle = elapsed * sat.speed + sat.offset;
        sat.mesh.position.set(
          Math.cos(angle) * sat.radius,
          Math.sin(angle * 1.3) * sat.yAmp,
          Math.sin(angle) * sat.radius,
        );
        sat.mesh.rotation.x = elapsed * 0.45 + sat.offset;
        sat.mesh.rotation.y = elapsed * 0.32;
      }

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        const driftY = Math.sin(elapsed * p.speed + p.phase) * 0.25;
        _dummy.position.set(p.baseX, p.baseY + driftY + scrollFactor * 0.6, p.baseZ);
        _dummy.rotation.set(elapsed * 0.3 + p.phase, elapsed * 0.2, 0);
        _dummy.scale.setScalar(p.scale);
        _dummy.updateMatrix();
        particles.setMatrixAt(i, _dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;
    }

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      updateScene(elapsed, delta);
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (prefersReducedMotion) {
      updateScene(0.5, 0.016);
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
