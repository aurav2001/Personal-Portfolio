import project_1_img from '../assets/project_1.svg'
import project_2_img from '../assets/project_2.svg'
import project_3_img from '../assets/project_3.svg'
import project_4_img from '../assets/project_4.svg'
import project_5_img from '../assets/project_5.svg'
import project_6_img from '../assets/project_6.svg'
import project_7_img from '../assets/project_7.png'
import project_8_img from '../assets/project_8.png'
import project_9_img from '../assets/project_9.png'
import project_10_img from '../assets/project_10.png'
import project_11_img from '../assets/project_11.png'
import unio_ecom_img from '../assets/Unio-Ecom.png'
import unio_remote_img from '../assets/UnioRemote.png'
import uniotechit_img from '../assets/uniotechit.png'
import shubh_img from '../assets/ShubhMuhurat.png'
import match_img from '../assets/Matchmaker.png'
import uspl_img from '../assets/USPL.png'
import dms_img from '../assets/DMS.png'
import warehouse_img from '../assets/WHMS.png'
import jobhai_cyan_img from '../assets/Job hai.png'
import mechno_techno_img from '../assets/MC.png'
import hospital_img from '../assets/Hospital.png'
import mr_img from '../assets/MRB.png'
import arrow_gaurav_puzel_img from '../assets/Arrow.png'
import amc_img from '../assets/AMC.png'
import bus_img from '../assets/bus-booking (1).png'

const mywork_data = [
  // ===== BEST PROJECTS - Live URLs (Top Priority) =====
  {
    w_no: 1,
    w_name: 'E-Commerce Website',
    w_category: 'Full Stack Development',
    w_img: unio_ecom_img,
    badge_img: unio_ecom_img,
    badge_name: 'E-Commerce',
    github_link: 'https://e-commerce-six-ecru-66.vercel.app',
    tech_stack: ['React', 'Node.js', 'MongoDB'],
    featured: true,
  },
  {
    w_no: 2,
    w_name: 'Mechno Techno',
    w_category: 'Web Development',
    w_img: mechno_techno_img,
    github_link: 'https://mechno-techno.com',
    tech_stack: ['React', 'CSS', 'JavaScript'],
    featured: true,
  },
  {
    w_no: 3,
    w_name: 'Hospital Management',
    w_category: 'Web Development',
    w_img: hospital_img,
    github_link: 'https://romashkahealthcare.com/',
    tech_stack: ['React', 'Node.js', 'Express'],
    featured: true,
  },
  {
    w_no: 4,
    w_name: 'Uniotech IT Solutions',
    w_category: 'Web Development',
    w_img: uniotechit_img,
    github_link: 'https://uniotechit.com',
    tech_stack: ['React', 'Tailwind CSS'],
    featured: true,
  },
  {
    w_no: 5,
    w_name: 'Metri Resume Builder',
    w_category: 'Web Development',
    w_img: mr_img,
    github_link: 'https://metri-resume-builder.vercel.app',
    tech_stack: ['React', 'PDF Generation'],
    featured: true,
  },
  {
    w_no: 6,
    w_name: 'IT Remote Solutions',
    w_category: 'Web Development',
    w_img: unio_remote_img,
    github_link: 'https://uniotechitsolutions.com/',
    tech_stack: ['React', 'JavaScript'],
    featured: true,
  },
  // ===== LIVE VERCEL PROJECTS =====
  {
    w_no: 7,
    w_name: 'Job Hai - Job Portal',
    w_category: 'Full Stack Development',
    w_img: jobhai_cyan_img,
    github_link: 'https://jobhai-cyan.vercel.app',
    tech_stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    w_no: 8,
    w_name: 'Bus Booking System',
    w_category: 'Full Stack Development',
    w_img: bus_img,
    github_link: 'https://bus-booking-lake.vercel.app/',
    tech_stack: ['React', 'Express', 'MongoDB'],
  },
  {
    w_no: 9,
    w_name: 'Annual Maintenance Contract',
    w_category: 'Web Development',
    w_img: amc_img,
    github_link: 'https://amc-iota.vercel.app/',
    tech_stack: ['React', 'Tailwind CSS'],
  },
  {
    w_no: 10,
    w_name: 'Warehouse ERP Project',
    w_category: 'Enterprise Software',
    w_img: warehouse_img,
    github_link: 'https://whearhouse-proj.vercel.app',
    tech_stack: ['React', 'Node.js', 'MySQL'],
  },
  {
    w_no: 11,
    w_name: 'Document Management System',
    w_category: 'Enterprise Software',
    w_img: dms_img,
    github_link: 'https://dms-frontend-sandy.vercel.app',
    tech_stack: ['React', 'REST API'],
  },
  {
    w_no: 12,
    w_name: 'Arrow Gaurav Puzzle',
    w_category: 'Web Development',
    w_img: arrow_gaurav_puzel_img,
    github_link: 'https://arrow-gaurav-puzel.vercel.app',
    tech_stack: ['JavaScript', 'CSS'],
  },
  // ===== LIVE DOMAIN PROJECTS =====
  {
    w_no: 13,
    w_name: 'USPL Corporate Site',
    w_category: 'Web Development',
    w_img: uspl_img,
    github_link: 'https://uniresources.in',
    tech_stack: ['React', 'CSS'],
  },
  {
    w_no: 14,
    w_name: 'Matrimony Platform',
    w_category: 'Full Stack Development',
    w_img: shubh_img,
    github_link: 'https://shubhmuhurat.biz/',
    tech_stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    w_no: 15,
    w_name: 'Matchmaker Portal',
    w_category: 'Full Stack Development',
    w_img: match_img,
    github_link: 'https://matchmaker.shubhmuhurat.biz/',
    tech_stack: ['React', 'Node.js'],
  },
  // ===== OTHER PROJECTS =====
  {
    w_no: 16,
    w_name: 'Banking Website',
    w_category: 'Web Development (JSP)',
    w_img: project_8_img,
    badge_img: uniotechit_img,
    badge_name: 'Banking',
    github_link: '/',
    tech_stack: ['JSP', 'Java', 'MySQL'],
  },
  {
    w_no: 17,
    w_name: 'Movie Dashboard',
    w_category: 'Web Development',
    w_img: project_3_img,
    badge_img: shubh_img,
    badge_name: 'Dashboard',
    github_link: '/',
    tech_stack: ['React', 'API Integration'],
  },
  {
    w_no: 18,
    w_name: 'ATM Simulation System',
    w_category: 'App Development',
    w_img: project_9_img,
    badge_img: uspl_img,
    badge_name: 'ATM',
    github_link: '/',
    tech_stack: ['Java', 'Swing'],
  },
  {
    w_no: 19,
    w_name: 'Flappy Bird Game',
    w_category: 'Game Development',
    w_img: project_10_img,
    badge_img: unio_remote_img,
    badge_name: 'Flappy Bird',
    github_link: '/',
    tech_stack: ['JavaScript', 'Canvas'],
  },
  {
    w_no: 20,
    w_name: 'Ecosteps Energy System',
    w_category: 'Web Development',
    w_img: project_11_img,
    badge_img: uniotechit_img,
    badge_name: 'ENERGY',
    github_link: '/',
    tech_stack: ['React', 'Charts'],
  },
]

export default mywork_data;
