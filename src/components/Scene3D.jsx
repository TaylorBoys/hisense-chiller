import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { COLORS } from '../utils/colors';

/* ─── Pipe component ─── */
function Pipe({ points, color, radius = 0.06, flowSpeed = 1 }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const tubeRef = useRef();

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 80, radius, 12, false), [curve, radius]);

  return (
    <group>
      {/* Outer glow tube */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Inner solid tube */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

/* ─── Flow Arrow ─── */
function FlowArrow({ position, color, direction = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh rotation={direction}>
        <coneGeometry args={[0.12, 0.3, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Evaporator ─── */
function Evaporator() {
  return (
    <group position={[-1.5, 0.5, 0]}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.2, 1.2]} />
        <meshStandardMaterial color="#1565c0" transparent opacity={0.35} />
      </mesh>
      {/* Inner tank */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.1, 16]} />
        <meshStandardMaterial color={COLORS.pipeCyan} transparent opacity={0.2} emissive={COLORS.pipeCyan} emissiveIntensity={0.3} />
      </mesh>
      {/* Outer shell highlight */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 1.2, 1.2)]} />
        <lineBasicMaterial color={COLORS.pipeCyan} transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

/* ─── Compressor Unit ─── */
function CompressorUnit() {
  return (
    <group position={[2.2, 0.5, 0]}>
      <mesh>
        <boxGeometry args={[1.2, 1.0, 1.0]} />
        <meshStandardMaterial color="#37474f" transparent opacity={0.5} />
      </mesh>
      {/* Compressor cylinder */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.9, 16]} />
        <meshStandardMaterial color="#78909c" transparent opacity={0.6} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.2, 1.0, 1.0)]} />
        <lineBasicMaterial color="#90a4ae" transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

/* ─── Control Cabinet ─── */
function ControlCabinet({ position, showLogo = false }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.8, 1.4, 0.6]} />
        <meshStandardMaterial color={COLORS.cabinetWhite} transparent opacity={0.45} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.8, 1.4, 0.6)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </lineSegments>
      {/* Status LEDs */}
      <mesh position={[-0.15, 0.45, 0.31]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#4caf50" />
      </mesh>
      <mesh position={[0, 0.45, 0.31]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffeb3b" />
      </mesh>
      <mesh position={[0.15, 0.45, 0.31]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#f44336" />
      </mesh>
      {showLogo && (
        <Html position={[0, -0.1, 0.31]} center transform sprite>
          <div style={{ color: '#fff', fontSize: '10px', fontWeight: 'bold', textAlign: 'center', letterSpacing: '1px' }}>
            Hisense
          </div>
        </Html>
      )}
    </group>
  );
}

/* ─── 3D Label ─── */
function Label3D({ position, chinese, english, temp = null, color = COLORS.labelBorder }) {
  return (
    <Html position={position} center transform sprite>
      <div style={{
        background: COLORS.labelBg,
        border: `1px solid ${color}`,
        borderRadius: '4px',
        padding: '6px 10px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(4px)',
      }}>
        <div style={{ color: color, fontSize: '11px', fontWeight: 'bold' }}>{chinese}</div>
        <div style={{ color: '#aaa', fontSize: '9px', marginTop: '2px' }}>{english}</div>
        {temp !== null && (
          <div style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold', marginTop: '3px' }}>
            {temp}°C
          </div>
        )}
      </div>
    </Html>
  );
}

/* ─── Main Scene ─── */
export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [5, 4, 8], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#e0e0ff" />
      <pointLight position={[-5, 3, -3]} intensity={0.3} color={COLORS.pipeCyan} />
      <pointLight position={[5, 2, -2]} intensity={0.3} color={COLORS.pipeOrange} />

      {/* Controls */}
      <OrbitControls enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2.2} />

      {/* Grid floor */}
      <Grid
        position={[0, -0.3, 0]}
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1a2a40"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#0d47a1"
        fadeDistance={25}
        fadeStrength={1}
        infiniteGrid
      />

      {/* ─── Components ─── */}
      <Evaporator />
      <CompressorUnit />
      <ControlCabinet position={[0.3, 0.5, 0.8]} showLogo={true} />
      <ControlCabinet position={[0.3, 0.5, -0.8]} />

      {/* ─── Pipes ─── */}
      {/* Heat medium inlet (orange) — from far left top to evaporator */}
      <Pipe
        points={[
          new THREE.Vector3(-6, 2.0, 0),
          new THREE.Vector3(-4.5, 2.0, 0),
          new THREE.Vector3(-3, 2.0, 0),
          new THREE.Vector3(-1.5, 1.5, 0),
          new THREE.Vector3(-1.5, 0.5, 0),
        ]}
        color={COLORS.pipeOrange}
        radius={0.08}
      />

      {/* Heat medium outlet (orange) — from evaporator upward left */}
      <Pipe
        points={[
          new THREE.Vector3(-1.5, 0.5, 0),
          new THREE.Vector3(-1.5, 1.5, -0.3),
          new THREE.Vector3(-3, 1.8, -0.3),
          new THREE.Vector3(-4.5, 1.8, -0.3),
          new THREE.Vector3(-6, 1.8, -0.3),
        ]}
        color={COLORS.pipeOrange}
        radius={0.07}
      />

      {/* High pressure vapor (cyan) — compressor to top right */}
      <Pipe
        points={[
          new THREE.Vector3(2.2, 1.0, 0),
          new THREE.Vector3(2.2, 2.2, 0),
          new THREE.Vector3(4, 2.5, 0),
          new THREE.Vector3(6, 2.5, 0),
        ]}
        color={COLORS.pipeCyan}
        radius={0.07}
      />

      {/* Low pressure vapor (blue) — evaporator to compressor */}
      <Pipe
        points={[
          new THREE.Vector3(-0.5, 0.5, 0),
          new THREE.Vector3(0.3, 0.5, 0),
          new THREE.Vector3(1.5, 0.5, 0),
          new THREE.Vector3(2.2, 0.5, 0),
        ]}
        color={COLORS.pipeBlue}
        radius={0.06}
      />

      {/* Chilled water outlet (cyan) — evaporator to far right */}
      <Pipe
        points={[
          new THREE.Vector3(-1.5, 0.5, 0.6),
          new THREE.Vector3(0, 0.5, 0.6),
          new THREE.Vector3(1, 0.5, 0.6),
          new THREE.Vector3(3, 0.5, 0.6),
          new THREE.Vector3(5, 0.2, 0.6),
          new THREE.Vector3(6.5, 0.2, 0.6),
        ]}
        color={COLORS.pipeCyan}
        radius={0.08}
      />

      {/* Chilled water inlet (cyan) — far right to evaporator */}
      <Pipe
        points={[
          new THREE.Vector3(6.5, -0.2, -0.6),
          new THREE.Vector3(5, -0.2, -0.6),
          new THREE.Vector3(3, -0.2, -0.6),
          new THREE.Vector3(1, -0.2, -0.6),
          new THREE.Vector3(0, -0.2, -0.6),
          new THREE.Vector3(-1.5, 0.1, -0.6),
        ]}
        color={COLORS.pipeCyan}
        radius={0.08}
      />

      {/* ─── Flow Arrows ─── */}
      <FlowArrow position={[-4, 2.0, 0]} color={COLORS.pipeOrange} direction={[0, Math.PI / 2, 0]} />
      <FlowArrow position={[-4, 1.8, -0.3]} color={COLORS.pipeOrange} direction={[0, -Math.PI / 2, 0]} />
      <FlowArrow position={[3.5, 2.5, 0]} color={COLORS.pipeCyan} direction={[0, Math.PI, 0]} />
      <FlowArrow position={[4, 0.5, 0.6]} color={COLORS.pipeCyan} direction={[0, Math.PI, 0]} />
      <FlowArrow position={[3, -0.2, -0.6]} color={COLORS.pipeCyan} direction={[0, 0, 0]} />

      {/* ─── 3D Labels ─── */}
      <Label3D
        position={[-6.5, 2.2, 0]}
        chinese="热媒入口"
        english="Heat Medium Inlet"
        temp={90}
        color={COLORS.pipeOrange}
      />
      <Label3D
        position={[-6.5, 2.0, -0.3]}
        chinese="热媒出口"
        english="Heat Medium Outlet"
        temp={89}
        color={COLORS.pipeOrange}
      />
      <Label3D
        position={[-1.5, -0.6, 0]}
        chinese="蒸发器"
        english="Evaporator"
        color={COLORS.pipeCyan}
      />
      <Label3D
        position={[0.3, -0.3, 0.8]}
        chinese="控制柜"
        english="Control Cabinet"
      />
      <Label3D
        position={[0.3, -0.3, -0.8]}
        chinese="控制柜"
        english="Control Cabinet"
      />
      <Label3D
        position={[2.2, -0.3, 0]}
        chinese="压缩机组"
        english="Compressor Unit"
      />
      <Label3D
        position={[6.5, 2.7, 0]}
        chinese="高压冷媒蒸"
        english="High Pressure Vapor"
        color={COLORS.pipeCyan}
      />
      <Label3D
        position={[2, 0.0, -0.4]}
        chinese="低压冷媒蒸"
        english="Low Pressure Vapor"
        color={COLORS.pipeBlue}
      />
      <Label3D
        position={[6.8, 0.4, 0.6]}
        chinese="冷冻水出口"
        english="Chilled Water Outlet"
        temp={7}
        color={COLORS.pipeCyan}
      />
      <Label3D
        position={[6.8, -0.4, -0.6]}
        chinese="冷冻水入口"
        english="Chilled Water Inlet"
        temp={7}
        color={COLORS.pipeCyan}
      />

      {/* Post-processing bloom */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}