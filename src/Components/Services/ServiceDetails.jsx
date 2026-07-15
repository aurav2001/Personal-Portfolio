import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../../constants/services';
import mywork_data from '../../assets/mywork_data';
import { motion } from 'framer-motion';
import ProtectedLink from '../Auth/ProtectedLink';

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
);

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = services.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
                <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary/80 transition-all shadow-lg shadow-primary/20"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    // Helper to identify if a project has a live website link
    const hasLiveUrl = (url) => {
        return url && url !== '/' && !url.includes('github.com');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-10 transition-all hover:-translate-x-1 font-medium group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                        <div className="text-primary bg-primary/10 p-5 rounded-2xl inline-block border border-primary/20 w-fit shadow-lg shadow-primary/5">
                            {service.icon}
                        </div>
                        <div>
                            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-1 block">Service Details</span>
                            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400">
                                {service.title}
                            </h1>
                        </div>
                    </div>

                    <p className="text-xl text-gray-300 leading-relaxed mb-16 border-l-4 border-primary pl-6 py-1 max-w-4xl">
                        {service.desc}
                    </p>

                    {/* Features and Description Grid */}
                    <div className="grid lg:grid-cols-5 gap-12 items-start mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="lg:col-span-3 space-y-6"
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">
                                {service.details.headline}
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                                {service.details.content}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="lg:col-span-2 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-8 hover:border-primary/20 transition-all duration-300 shadow-xl"
                        >
                            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                Key Offerings
                            </h3>
                            <ul className="space-y-4">
                                {service.details.features && service.details.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-gray-300">
                                        <span className="text-primary mr-3 mt-1 font-bold">✓</span>
                                        <span className="text-sm md:text-base font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Dynamic Related Projects Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="border-t border-white/5 pt-16"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Related Projects</h2>
                            <p className="text-gray-400 max-w-lg mx-auto">Discover work completed under the {service.title} domain.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(() => {
                                // Match projects dynamically based on the service type
                                let matchedProjects = [];
                                
                                if (service.id === '01') { // UI/UX Design
                                    matchedProjects = mywork_data.filter(p => 
                                        p.w_category.toLowerCase().includes('design') || 
                                        p.w_name.toLowerCase().includes('dashboard') ||
                                        p.w_name.toLowerCase().includes('matrimony')
                                    );
                                } else if (service.id === '02') { // Web Development
                                    matchedProjects = mywork_data.filter(p => 
                                        p.w_category.toLowerCase().includes('web') || 
                                        p.w_category.toLowerCase().includes('full stack') ||
                                        p.w_category.toLowerCase().includes('enterprise')
                                    );
                                } else if (service.id === '03') { // App Design / App Dev
                                    matchedProjects = mywork_data.filter(p => 
                                        p.w_category.toLowerCase().includes('app') || 
                                        p.w_category.toLowerCase().includes('game')
                                    );
                                } else if (service.id === '04') { // Digital Marketing
                                    matchedProjects = mywork_data.filter(p => 
                                        p.w_category.toLowerCase().includes('marketing') ||
                                        p.w_category.toLowerCase().includes('energy')
                                    );
                                }

                                // Fallback to predefined related projects if nothing found dynamically
                                if (matchedProjects.length === 0 && service.details.relatedProjects) {
                                    matchedProjects = service.details.relatedProjects.map((p, idx) => ({
                                        w_no: idx + 1,
                                        w_name: p.name,
                                        w_img: p.img,
                                        w_category: p.desc || service.title,
                                        github_link: p.url,
                                        tech_stack: ['HTML', 'CSS', 'JS']
                                    }));
                                }

                                return matchedProjects.map((project) => (
                                    <div
                                        key={project.w_no}
                                        className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/60 to-black border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-primary/5 flex flex-col"
                                    >
                                        {/* Image Box */}
                                        <div className="h-52 overflow-hidden bg-black/40 flex items-center justify-center relative p-4">
                                            <img
                                                src={project.w_img}
                                                alt={project.w_name}
                                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-108"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
                                        </div>

                                        {/* Content Box */}
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-accent text-[11px] font-bold tracking-widest uppercase block mb-1">
                                                    {project.w_category}
                                                </span>
                                                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                                    {project.w_name}
                                                </h4>

                                                {/* Tech Tags */}
                                                {project.tech_stack && (
                                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                                        {project.tech_stack.map((tech, idx) => (
                                                            <span key={idx} className="px-2 py-0.5 text-[11px] rounded bg-white/5 text-gray-300 border border-white/10 font-medium">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Link */}
                                            <div className="pt-3 border-t border-white/5">
                                                {hasLiveUrl(project.github_link) ? (
                                                    <ProtectedLink
                                                        href={project.github_link}
                                                        className="flex items-center justify-center gap-2 w-full py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-xs font-semibold transition-all duration-300"
                                                    >
                                                        <>
                                                            <ExternalLinkIcon /> Live Demo
                                                        </>
                                                    </ProtectedLink>
                                                ) : (
                                                    <span className="flex items-center justify-center w-full py-2 bg-white/5 rounded-lg text-gray-500 text-xs font-medium border border-white/5">
                                                        Coming Soon
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetails;
