import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';
import { useScrollReveal } from '../../hooks/useAnimations';

const SpotlightPage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [ref, isVisible] = useScrollReveal();

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />
            
            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase block mb-4">Deep Dive</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Spotlight</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        An in-depth look at my most ambitious project to date. Breaking down the architecture, challenges, and the solution.
                    </p>
                </div>

                {/* Main Featured Image */}
                <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 animate-scale-in">
                    <img 
                        src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop" 
                        alt="Project Dashboard" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Sections */}
                <div className="grid md:grid-cols-3 gap-12">
                    
                    {/* Sidebar: Details */}
                    <div className="md:col-span-1 space-y-8 animate-fade-in-left delay-200">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="text-xl font-bold text-white mb-6">Project Info</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Role</span>
                                    <span className="font-semibold">Full Stack Developer</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Timeline</span>
                                    <span className="font-semibold">4 Weeks</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stack</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {['React', 'Node.js', 'MongoDB', 'AI API'].map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs text-white">{tag}</span>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                            <button className="w-full mt-8 py-3 bg-primary rounded-xl font-bold text-white hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20">
                                Visit Live Site
                            </button>
                        </div>
                    </div>

                    {/* Main Content: The Story */}
                    <div className="md:col-span-2 space-y-12 animate-fade-in-right delay-300">
                        
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-4">The Challenge</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Finance tracking apps are often tedious. Users drop off because manual entry is boring. I wanted to build a solution that uses <strong>AI to automate categorization</strong> and provides predictive insights, making financial health fun and effortless.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-white mb-4">The Solution</h2>
                            <p className="text-gray-400 leading-relaxed text-lg mb-6">
                                I architected a system using **React** for a snappy UI and **Python (FastAPI)** for the backend processing. The core feature is a transaction parser that uses a fine-tuned LLM to understand bank statements and categorize them with 98% accuracy.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="text-accent font-bold text-2xl mb-1">98%</h4>
                                    <p className="text-sm text-gray-400">Categorization Accuracy</p>
                                </div>
                                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="text-primary font-bold text-2xl mb-1">200ms</h4>
                                    <p className="text-sm text-gray-400">API Response Time</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-white mb-4">Key Takeaways</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                This project taught me the importance of **optimizing heavy AI calls** to not block the main threat. Implementing a message queue (Redis) was game-changing for user experience.
                            </p>
                        </section>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default SpotlightPage;
