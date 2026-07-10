import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Stars, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaGithub, FaDocker, FaAws } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiMysql, SiSpringboot, SiExpress } from 'react-icons/si';
import { FaCode } from "react-icons/fa6";

const iconMap = {
  "Code": FaCode,
  "React": FaReact,
  "Next.js": SiNextdotjs,
  "Tailwind": SiTailwindcss,
  "Node.js": FaNodeJs,
  "Express": SiExpress,
  "Java": FaJava,
  "Spring Boot": SiSpringboot,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "Git": FaGitAlt,
  "GitHub": FaGithub,
  "Docker": FaDocker,
  "AWS": FaAws
};

const skillsData = [
  // Center
  { name: "Code", category: "core", radius: 0, color: "#ffffff", size: 2 },
  
  // Ring 1: Core Stack
  { name: "Java", category: "backend", radius: 6, angle: 0, color: "#f89820", size: 1 },
  { name: "Spring Boot", category: "backend", radius: 6, angle: 1.25, color: "#6db33f", size: 1 },
  { name: "React", category: "frontend", radius: 6, angle: 2.5, color: "#61dafb", size: 1 },
  { name: "Next.js", category: "frontend", radius: 6, angle: 3.75, color: "#ffffff", size: 1 },
  { name: "Tailwind", category: "frontend", radius: 6, angle: 5.0, color: "#06b6d4", size: 1 },

  // Ring 2: Data & Backend
  { name: "Node.js", category: "backend", radius: 10, angle: 0.8, color: "#339933", size: 0.9 },
  { name: "Express", category: "backend", radius: 10, angle: 2.4, color: "#ffffff", size: 0.9 },
  { name: "MongoDB", category: "backend", radius: 10, angle: 4.0, color: "#47a248", size: 0.9 },
  { name: "MySQL", category: "backend", radius: 10, angle: 5.6, color: "#4479a1", size: 0.9 },

  // Ring 3: Tools
  { name: "Git", category: "tools", radius: 14, angle: 0.5, color: "#f05032", size: 0.8 },
  { name: "GitHub", category: "tools", radius: 14, angle: 2.0, color: "#ffffff", size: 0.8 },
  { name: "Docker", category: "tools", radius: 14, angle: 3.5, color: "#2496ed", size: 0.8 },
  { name: "AWS", category: "tools", radius: 14, angle: 5.0, color: "#ff9900", size: 0.8 },
];

const SkillNode = ({ skill }) => {
  const meshRef = useRef();
  
  const x = skill.radius * Math.cos(skill.angle || 0);
  const z = skill.radius * Math.sin(skill.angle || 0);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.lookAt(state.camera.position);
    }
  });

  const IconComponent = iconMap[skill.name] || FaCode;

  return (
    <group position={[x, 0, z]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef}>
            {/* Simple HTML Icon - No interactions */}
            <Html transform distanceFactor={15} position={[0, 0.5, 0]} style={{ pointerEvents: 'none' }}>
                <div className="text-4xl opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" style={{ color: skill.color }}>
                    <IconComponent />
                </div>
            </Html>

            {/* Text Label */}
            <Text
                position={[0, -0.8, 0]}
                fontSize={skill.size * 0.5}
                color="#cccccc"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {skill.name}
            </Text>
        </mesh>
      </Float>
    </group>
  );
};

const GalaxySystem = () => {
  const groupRef = useRef();
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 8; 

  useFrame((state, delta) => {
     if (groupRef.current) {
         groupRef.current.rotation.y += delta * 0.05; 
     }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.65 : 1}>
      {skillsData.map((skill, index) => (
        <SkillNode key={index} skill={skill} />
      ))}
      
      {/* Visual Rings */}
      {[6, 10, 14].map((radius, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
             <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
             <meshBasicMaterial color="#ffffff" opacity={0.12} transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
          </mesh>
      ))}
    </group>
  );
};

// Responsive Camera Adjuster
const CameraAdjuster = () => {
    const { camera, size } = useThree();
    useEffect(() => {
        const isMobile = size.width < 768;
        if (isMobile) {
            camera.position.set(0, 18, 28); 
            camera.fov = 65;
        } else {
            camera.position.set(0, 15, 20); 
            camera.fov = 50;
        }
        camera.updateProjectionMatrix();
    }, [size.width, camera]);
    return null;
}

const GalaxySkills = () => {
  return (
    <div className="w-full h-[500px] md:h-[700px] relative bg-transparent overflow-hidden">
      <div className="absolute top-4 md:top-10 left-0 right-0 text-center pointer-events-none z-10 px-4">
         <h4 className="text-accent text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">My Universe</h4>
         <h2 className="text-3xl md:text-4xl font-bold text-white">Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Galaxy</span></h2>
      </div>

      <Canvas>
        <CameraAdjuster />
        <fog attach="fog" args={['#020617', 10, 80]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        
        {/* GalaxyParticles Removed as requested */}
        <GalaxySystem />
        
        <OrbitControls 
            enableZoom={false} 
            autoRotate={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 6} 
        />
      </Canvas>
    </div>
  );
};

export default GalaxySkills;
