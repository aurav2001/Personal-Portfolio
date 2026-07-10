import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';
import { useScrollReveal } from '../../hooks/useAnimations';

const CredentialsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [ref, isVisible] = useScrollReveal();

    const allCredentials = [
        {
           id: 1,
           category: "Cloud Computing",
           items: [
              { title: "AWS Solutions Architect Associate", issuer: "Amazon Web Services", date: "Jan 2024", id: "CONF-12345" },
              { title: "Google Cloud Digital Leader", issuer: "Google Cloud", date: "Nov 2023", id: "GCP-98765" }
           ]
        },
        {
           id: 2,
           category: "Development",
           items: [
              { title: "Meta Front-End Developer Professional", issuer: "Meta", date: "Aug 2023", id: "META-FRONT" },
              { title: "Full Stack Open 2023", issuer: "University of Helsinki", date: "May 2023", id: "FSO-2023" },
              { title: "React Advanced Patterns", issuer: "Udemy", date: "Feb 2023", id: "UDEMY-REACT" }
           ]
        },
        {
           id: 3,
           category: "Design & Product",
           items: [
              { title: "Google UX Design Certificate", issuer: "Google", date: "Dec 2022", id: "GOOG-UX" },
              { title: "Human-Computer Interaction", issuer: "Interaction Design Foundation", date: "Oct 2022", id: "IDF-HCI" }
           ]
        }
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />
            
            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase block mb-4">Hall of Fame</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Certifications</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        A continuous journey of learning and validating skills with industry-recognized standards.
                    </p>
                </div>

                <div 
                   className={`space-y-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                   ref={ref}
                >
                    {allCredentials.map((group) => (
                        <div key={group.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="w-2 h-8 bg-accent rounded-full"></span>
                                {group.category}
                            </h3>
                            
                            <div className="grid gap-6">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300">
                                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                                           <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">
                                              📜
                                           </div>
                                           <div>
                                              <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                              <p className="text-gray-400 text-sm">{item.issuer}</p>
                                           </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 text-sm text-gray-500">
                                            <span>Issued: {item.date}</span>
                                            <span className="hidden md:inline w-px h-4 bg-white/10"></span>
                                            <span className="font-mono">{item.id}</span>
                                            <a href="#" className="px-4 py-2 rounded-full bg-white/5 text-white hover:bg-primary hover:text-white transition-all">Verify</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CredentialsPage;
