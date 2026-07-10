import React from 'react';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';
import { useScrollReveal } from '../../hooks/useAnimations';

const Contact = () => {
  const [ref, isVisible] = useScrollReveal();
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "c9117094-a15d-4f32-8438-e4b787597148");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <div id='contact' className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      
      <div className="grid md:grid-cols-2 gap-16 items-start">
        
        {/* Left Side */}
        <div className={`space-y-8 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-1000`}>
           <div className="space-y-2">
              <h4 className="text-accent text-sm font-semibold tracking-widest uppercase">Get in touch</h4>
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Let's talk</h1>
           </div>
           <p className="text-gray-400 text-lg leading-relaxed max-w-md">
             I'm currently available to take on new projects. so feel free to send me a message about anything that you want me to work on. You can contact anytime.
           </p>

           <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 text-white hover:text-primary transition-colors cursor-pointer">
                 <img src={mail_icon} alt="" className="w-6 h-6 invert opacity-70" />
                 <p className="text-lg">pandeygaurav9801@gmail.com</p>
              </div>
              <div className="flex items-center gap-4 text-white hover:text-primary transition-colors cursor-pointer">
                 <img src={call_icon} alt="" className="w-6 h-6 invert opacity-70" />
                 <p className="text-lg">+91 9801033836</p>
              </div>
              <div className="flex items-center gap-4 text-white hover:text-primary transition-colors cursor-pointer">
                 <img src={location_icon} alt="" className="w-6 h-6 invert opacity-70" />
                 <p className="text-lg">Siwan, Bihar</p>
              </div>
           </div>
        </div>

        {/* Right Side - Clean Form */}
        <form onSubmit={onSubmit} className={`space-y-6 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000 delay-200`}>
           <div className="space-y-2">
              <label htmlFor="" className="text-sm font-medium text-gray-400">Your Name</label>
              <input type="text" placeholder="Enter your name" name='name' className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:bg-white/10 transition-all outline-none" />
           </div>
           
           <div className="space-y-2">
              <label htmlFor="" className="text-sm font-medium text-gray-400">Your Email</label>
              <input type="email" placeholder="Enter your email" name='email' className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:bg-white/10 transition-all outline-none" />
           </div>

           <div className="space-y-2">
              <label htmlFor="" className="text-sm font-medium text-gray-400">Write your message her</label>
              <textarea name="message" rows="6" placeholder="Enter your message" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:bg-white/10 transition-all outline-none resize-none"></textarea>
           </div>

           <button type='submit' className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 w-full md:w-auto">
             Submit now
           </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;
