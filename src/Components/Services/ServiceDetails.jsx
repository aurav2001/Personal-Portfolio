
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../../constants/services';
import mywork_data from '../../assets/mywork_data';
import { motion } from 'framer-motion';

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
                    className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-primary bg-white/5 p-4 rounded-2xl inline-block border border-white/10">
                            {service.icon}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {service.title}
                        </h1>
                    </div>

                    <p className="text-xl text-gray-300 leading-relaxed mb-12 border-l-4 border-primary/50 pl-6">
                        {service.desc}
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-semibold text-white mb-4">
                                {service.details.headline}
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                {service.details.content}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <h3 className="text-xl font-bold text-primary mb-6">Key Features</h3>
                            <ul className="space-y-4">
                                {service.details.features && service.details.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-gray-300">
                                        <span className="text-primary mr-3 mt-1">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Featured Projects Section */}
                    {(service.details.relatedProjects || service.id === '02') && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-20"
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
                                <p className="text-gray-400">Recent work related to {service.title}</p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(() => {
                                    const manual = service.details.relatedProjects || [];
                                    const fromData = (service.id === '02')
                                        ? mywork_data
                                            .filter(p => p.w_category && p.w_category.toLowerCase().includes('web'))
                                            .map(p => ({ name: p.w_name, img: p.w_img, url: p.live_link || p.github_link || '#', desc: p.w_category }))
                                        : [];

                                    const names = new Set(manual.map(p => p.name));
                                    const merged = [...manual, ...fromData.filter(p => !names.has(p.name))];

                                    return merged.map((project, index) => (
                                        <div
                                            key={index}
                                            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={project.img}
                                                    alt={project.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                                            </div>

                                            <div className="p-6">
                                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                                    {project.name}
                                                </h4>
                                                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2">
                                                    {project.desc}
                                                </p>

                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white transition-colors"
                                                >
                                                    View Project
                                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                </a>
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetails;
