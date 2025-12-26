import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Stars, Float, PointMaterial, Points, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiMongodb, SiPostgresql, SiExpress, SiThreedotjs } from 'react-icons/si';
import { BsLayersHalf } from "react-icons/bs";
import { RiBrainLine } from "react-icons/ri";

const iconMap = {
  "Full Stack": BsLayersHalf,
  "React": FaReact,
  "HTML5": FaHtml5,
  "CSS3": FaCss3Alt,
  "Tailwind": SiTailwindcss,
  "JavaScript": SiJavascript,
  "Node.js": FaNodeJs,
  "Express": SiExpress,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "Git": FaGitAlt,
  "Docker": FaDocker,
  "AWS": FaAws,
  "Three.js": SiThreedotjs,
  "AI/ML": RiBrainLine
};

const skillsData = [
  // Center
  { name: "Full Stack", category: "core", radius: 0, color: "#ffffff", size: 1.5, desc: "Architecting complete solutions" },
  
  // Ring 1: Frontend
  { name: "React", category: "frontend", radius: 6, angle: 0, color: "#61dafb", size: 0.8, desc: "Modern UI Library" },
  { name: "HTML5", category: "frontend", radius: 6, angle: 1.2, color: "#e34f26", size: 0.8, desc: "Structural Semantics" },
  { name: "CSS3", category: "frontend", radius: 6, angle: 2.4, color: "#2965f1", size: 0.8, desc: "Styling & Animations" },
  { name: "Tailwind", category: "frontend", radius: 6, angle: 3.6, color: "#06b6d4", size: 0.8, desc: "Utility-First CSS" },
  { name: "JavaScript", category: "frontend", radius: 6, angle: 4.8, color: "#f7df1e", size: 0.8, desc: "Dynamic Logic" },

  // Ring 2: Backend
  { name: "Node.js", category: "backend", radius: 10, angle: 0.5, color: "#339933", size: 0.9, desc: "Server-side Runtime" },
  { name: "Express", category: "backend", radius: 10, angle: 2.0, color: "#ffffff", size: 0.9, desc: "Web Framework" },
  { name: "MongoDB", category: "backend", radius: 10, angle: 3.5, color: "#47a248", size: 0.9, desc: "NoSQL Database" },
  { name: "PostgreSQL", category: "backend", radius: 10, angle: 5.0, color: "#336791", size: 0.9, desc: "Relational Database" },

  // Ring 3: Tools & Advanced
  { name: "Git", category: "tools", radius: 14, angle: 1, color: "#f05032", size: 0.7, desc: "Version Control" },
  { name: "Docker", category: "tools", radius: 14, angle: 2.5, color: "#2496ed", size: 0.7, desc: "Containerization" },
  { name: "AWS", category: "tools", radius: 14, angle: 4, color: "#ff9900", size: 0.7, desc: "Cloud Services" },
  { name: "Three.js", category: "tools", radius: 14, angle: 5.5, color: "#ffffff", size: 0.7, desc: "3D Graphics" },
  { name: "AI/ML", category: "tools", radius: 14, angle: 0, color: "#ec4899", size: 0.7, desc: "Artificial Intelligence" },
];

const SkillNode = ({ skill }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  const x = skill.radius * Math.cos(skill.angle || 0);
  const z = skill.radius * Math.sin(skill.angle || 0);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.lookAt(state.camera.position);
        // Subtle floating animation variance based on position
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime + x) * 0.2; 
    }
  });

  const IconComponent = iconMap[skill.name] || BsLayersHalf;

  return (
    <group position={[x, 0, z]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
            ref={meshRef}
            scale={active ? 1.4 : hovered ? 1.25 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
        >
            {/* HTML Tooltip & Icon */}
            <Html transform distanceFactor={12} position={[0, 1.2, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
                <div className={`
                    relative flex flex-col items-center justify-center transition-all duration-300
                    ${hovered || active ? 'opacity-100 scale-110' : 'opacity-80 scale-100'}
                `}>
                    {/* Icon Container with Glow */}
                    <div className={`
                        text-5xl mb-2 transition-all duration-300
                        ${hovered || active ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] text-white' : ''}
                    `} style={{ color: hovered || active ? '#fff' : skill.color }}>
                        <IconComponent />
                    </div>

                    {/* Glassmorphism Tooltip - Only show on hover/active */}
                    <div className={`
                        pointer-events-none whitespace-nowrap px-4 py-2 rounded-xl
                        bg-black/40 backdrop-blur-md border border-white/10 shadow-xl
                        flex flex-col items-center gap-0.5
                        transition-all duration-300 origin-bottom transform
                        ${hovered || active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'}
                    `}>
                        <span className="font-bold text-base text-white">{skill.name}</span>
                        <span className="text-[10px] text-gray-300 uppercase tracking-wider font-medium">{skill.desc}</span>
                        {/* Tooltip Arrow */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/40 border-r border-b border-white/10 rotate-45 backdrop-blur-md"></div>
                    </div>
                </div>
            </Html>

            {/* Hitbox mesh (invisible but interactable) */}
            <mesh visible={false}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {active && (
                <mesh position={[0, 0, -0.5]}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.8} transparent opacity={0.15} />
                </mesh>
            )}
        </mesh>
      </Float>
    </group>
  );
};

// Particle Background
const GalaxyParticles = () => {
    const points = useMemo(() => {
        const p = new Float32Array(3000 * 3);
        const colors = new Float32Array(3000 * 3);
        
        for(let i=0; i<3000; i++) {
            // Spiral Galaxy Shape
            const r = Math.random() * 40; 
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            
            p[i*3] = r * Math.sin(phi) * Math.cos(theta);
            p[i*3+1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.15; // flatten
            p[i*3+2] = r * Math.cos(phi);

            // Color gradient
            const colorType = Math.random();
            if (colorType > 0.6) { // Pink/Purple
                colors[i*3] = 0.92; colors[i*3+1] = 0.28; colors[i*3+2] = 0.6;
            } else if (colorType > 0.3) { // Blue/Cyan
                colors[i*3] = 0.23; colors[i*3+1] = 0.51; colors[i*3+2] = 0.96;
            } else { // White/Star
                colors[i*3] = 1; colors[i*3+1] = 1; colors[i*3+2] = 1;
            }
        }
        return { p, colors };
    }, []);

    return (
        <Points positions={points.p} colors={points.colors} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.06}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

const GalaxySystem = () => {
  const groupRef = useRef();
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 8; // Approx threshold for mobile in Three.js units

  useFrame((state, delta) => {
     if (groupRef.current) {
         groupRef.current.rotation.y += delta * 0.03; 
     }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.65 : 1}>
      {skillsData.map((skill, index) => (
        <SkillNode key={index} skill={skill} />
      ))}
      
      {/* Visual Rings - More visible */}
      {[6, 10, 14].map((radius, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
             <ringGeometry args={[radius - 0.08, radius + 0.08, 128]} />
             <meshBasicMaterial color="#ffffff" opacity={0.15} transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
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
            // Lower Y to look more "into" the galaxy, closer Z for impact
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
    <div className="w-full h-[500px] md:h-[700px] relative bg-transparent overflow-hidden touch-none">
      <div className="absolute top-4 md:top-10 left-0 right-0 text-center pointer-events-none z-10 px-4">
         <h4 className="text-accent text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">My Universe</h4>
         <h2 className="text-3xl md:text-4xl font-bold text-white">Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Galaxy</span></h2>
         <p className="text-gray-400 text-[10px] md:text-xs mt-2">Drag to explore • Hover icon for details</p>
      </div>

      <Canvas>
        <CameraAdjuster />
        <fog attach="fog" args={['#020617', 10, 80]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        
        <GalaxyParticles />
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
