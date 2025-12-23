import React, { useState, useEffect } from 'react';

const SocialAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after 1 minute (60000ms)
    const showTimer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 10000);

    return () => clearTimeout(showTimer);
  }, [isDismissed]);

  useEffect(() => {
    // Auto-hide after 5 seconds of appearing
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className={`fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
      
      {/* Speech Bubble */}
      <div className="relative mr-4 mb-2 bg-white text-black px-6 py-4 rounded-2xl rounded-tr-none shadow-2xl animate-float max-w-xs">
         <p className="text-sm font-medium leading-relaxed">
            Hey there! 👋 <br/>
            I'm also on social media. Follow my journey!
         </p>
         
         {/* Social Links */}
         <div className="flex gap-3 mt-3">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform">
               In
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:scale-110 transition-transform">
               Gi
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
               Tw
            </a>
         </div>

         {/* Close Button */}
         <button 
           onClick={handleDismiss}
           className="absolute -top-3 -left-3 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow-md hover:scale-110 transition-transform"
           aria-label="Close"
         >
           ✕
         </button>

         {/* Pointer Triangle */}
         <div className="absolute top-0 -right-2 w-0 h-0 border-t-[10px] border-t-white border-r-[10px] border-r-transparent rotate-0"></div>
      </div>

      {/* Animated Dude Avatar */}
      <div className="w-20 h-20 rounded-full bg-transparent drop-shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer group" onClick={() => setIsVisible(!isVisible)}>
         <img 
            src="https://api.dicebear.com/9.x/notionists/svg?seed=Gaurav" 
            alt="Assistant" 
            className="w-full h-full"
         />
      </div>

    </div>
  );
};

export default SocialAssistant;
