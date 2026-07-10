import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';
import { useScrollReveal } from '../../hooks/useAnimations';

const PlaygroundPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [ref, isVisible] = useScrollReveal();

    const labs = [
        { id: 1, title: "Liquid Button", tag: "SVG Filter", color: "bg-blue-500" },
        { id: 2, title: "3D Card Tilt", tag: "Mouse Event", color: "bg-purple-500" },
        { id: 3, title: "Text Reveal", tag: "GSAP", color: "bg-green-500" },
        { id: 4, title: "Infinite Scroll", tag: "CSS Keyframes", color: "bg-orange-500" },
        { id: 5, title: "Magnetic Cursor", tag: "Custom Hook", color: "bg-pink-500" },
        { id: 6, title: "Noise Texture", tag: "SVG Pattern", color: "bg-gray-500" },
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />
            
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase block mb-4">The Laboratory</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        UI/UX <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Experiments</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        A collection of micro-interactions, visual tests, and code snippets that needed a home.
                    </p>
                </div>

                <div 
                   className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                   ref={ref}
                >
                    {labs.map((lab) => (
                        <div key={lab.id} className="group relative aspect-video rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                            
                            {/* Visual Placeholder */}
                            <div className={`absolute inset-0 opacity-20 ${lab.color} group-hover:opacity-30 transition-opacity`}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">🧪</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-xs font-mono text-primary mb-2 block">{lab.tag}</span>
                                <h3 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">{lab.title}</h3>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-500 text-sm">More experiments coming soon...</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PlaygroundPage;
