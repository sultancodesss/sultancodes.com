import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({ position, color, speed, distort, scale }) {
    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
        ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    });
    return (
        <Float speed={speed} rotationIntensity={1.5} floatIntensity={2.5}>
            <mesh ref={ref} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.35}
                    distort={distort}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

function FloatingTorus({ position, color }) {
    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.x = state.clock.elapsedTime * 0.4;
        ref.current.rotation.y = state.clock.elapsedTime * 0.6;
    });
    return (
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
            <mesh ref={ref} position={position}>
                <torusGeometry args={[1, 0.3, 16, 50]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                    wireframe
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
}

function ParticleField() {
    const count = 200;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.y = state.clock.elapsedTime * 0.02;
        ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#8a2be2"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

function Scene3D() {
    return (
        <div className="scene3d-container">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 60 }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} color="#8a2be2" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff1493" />
                <pointLight position={[3, 3, 3]} intensity={0.4} color="#00bfff" />

                <FloatingSphere position={[-3, 1.5, -2]} color="#8a2be2" speed={1.2} distort={0.4} scale={1.5} />
                <FloatingSphere position={[3.5, -1, -3]} color="#ff1493" speed={0.8} distort={0.3} scale={1} />
                <FloatingSphere position={[0, 2.5, -4]} color="#00bfff" speed={1} distort={0.5} scale={0.8} />
                <FloatingSphere position={[-2, -2, -1]} color="#9400d3" speed={1.4} distort={0.35} scale={0.6} />

                <FloatingTorus position={[4, 2, -5]} color="#8a2be2" />
                <FloatingTorus position={[-4, -1.5, -4]} color="#ff1493" />

                <ParticleField />
                <Sparkles count={80} scale={12} size={1.5} speed={0.4} color="#8a2be2" />
            </Canvas>
        </div>
    );
}

export default Scene3D;
