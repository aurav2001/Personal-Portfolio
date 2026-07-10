import project7_img from '../assets/project_7.png'
import project8_img from '../assets/project_8.png'
import project3_img from '../assets/project_3.svg'
import project9_img from '../assets/project_9.png'
import project10_img from '../assets/project_10.png'
import project11_img from '../assets/project_11.png'

// Icons as SVG components for better performance & flexibility
export const DesignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
);

export const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);

export const MobileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
);

export const GrowthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);

export const services = [
    {
        id: "01",
        title: "UI/UX Design",
        desc: "Creating intuitive and visually stunning interfaces that users love to interact with.",
        icon: <DesignIcon />,
        details: {
            headline: "Crafting Digital Experiences That Matter",
            content: "Great design is not just about how it looks, but how it works. My UI/UX design process focuses on understanding user needs and translating them into seamless, intuitive interfaces. From wireframing to high-fidelity prototyping, I ensure that every interaction is meaningful and every pixel is perfect.",
            features: [
                "User Research & Personas",
                "Wireframing & Prototyping",
                "Visual Design & Branding",
                "Interaction Design",
                "Usability Testing"
            ],
            relatedProjects: [
                { name: "Movie Dashboard", img: project3_img, url: "#", desc: "Movie Dashboard" },
                { name: "E-Commerce Website", img: project7_img, url: "#", desc: "Online Shopping Website" }
            ]
        }
    },
    {
        id: "02",
        title: "Web Development",
        desc: "Building fast, responsive, and scalable websites using modern technologies like React and Next.js.",
        icon: <CodeIcon />,
        details: {
            headline: "Building the Web of Tomorrow",
            content: "I specialize in building high-performance web applications using the latest technologies. Whether it's a simple landing page or a complex SaaS platform, I write clean, maintainable code that scales. Performance, accessibility, and SEO are at the core of my development philosophy.",
            features: [
                "React & Next.js Development",
                "Responsive & Mobile-First Design",
                "API Integration & Backend Logic",
                "Performance Optimization",
                "SEO Best Practices"
            ],
            relatedProjects: [
                { name: "E-Commerce Website", img: project7_img, url: "https://github.com/aurav2001/MechnoTechno", desc: "E-Commerce website" },
                { name: "Banking Website", img: project8_img, url: "https://github.com/aurav2001/AMC_client", desc: "Banking Management System" },
                { name: "Ecosteps Energy System", img: project11_img, url: "https://github.com/aurav2001/Machine-site", desc: "Website for Machine project" },
                { name: "Hospital Website", img: project9_img, url: "https://github.com/aurav2001/restAPIcountries", desc: "Hospital Management System" },
                { name: "Bus-Bokking Site", img: project9_img, url: "https://github.com/aurav2001/Bus_bokking", desc: "Online Bus Booking site" }
            ]
        }
    },
    {
        id: "03",
        title: "App Design",
        desc: "Designing mobile-first experiences that look great on any device or platform.",
        icon: <MobileIcon />,
        details: {
            headline: "Mobile-First Design for a Mobile-First World",
            content: "Ensure your application looks and feels amazing on every device. I design mobile apps that are not only visually appealing but also easy to navigate. By focusing on touch interactions and small-screen usability, I create experiences that keep users engaged on the go.",
            features: [
                "iOS & Android Design Guidelines",
                "Mobile App UI/UX",
                "Responsive Web Design",
                "Touch Interaction Design",
                "Cross-Platform Consistency"
            ],
            relatedProjects: [
                { name: "ATM Simulation", img: project9_img, url: "https://github.com/aurav2001/Dewi-1.0.0", desc: "App interface for ATM system" },
                { name: "Flappy Bird", img: project10_img, url: "https://github.com/aurav2001/jspractice", desc: "Mobile-friendly game UI" }
            ]
        }
    },
    {
        id: "04",
        title: "Digital Marketing",
        desc: "Helping brands grow with strategic digital presence and SEO optimization.",
        icon: <GrowthIcon />,
        details: {
            headline: "Growing Your Brand in the Digital Space",
            content: "A great product needs a great audience. I help businesses reach their target market through strategic digital marketing and SEO. By analyzing data and optimizing content, I ensure your brand gets the visibility it deserves.",
            features: [
                "Search Engine Optimization (SEO)",
                "Social Media Strategy",
                "Content Marketing",
                "Analytics & Reporting",
                "Brand Positioning"
            ],
            relatedProjects: [
                { name: "SEO Campaign", img: project11_img, url: "#", desc: "Increasing organic traffic by 150%" },
                { name: "Brand Strategy", img: project7_img, url: "#", desc: "Complete digital identity overhaul" }
            ]
        }
    },
];
