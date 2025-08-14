import React, { useState, useEffect } from 'react';

const AnimatedResumeButton = () => {
  const [falling, setFalling] = useState(false);

  const handleClick = () => {
    // Start falling animation
    setFalling(true);

    // Trigger file download while falling
    const link = document.createElement('a');
    link.href = "/resume/Kunj_resume.pdf";
    link.download = "Kunj_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Bring button back on scroll
      setFalling(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`
        absolute bottom-[35px] left-[25px]
        px-5 py-2
        bg-black text-white border-2 border-white
        rounded-full cursor-pointer font-medium text-[0.95rem] tracking-wide
        shadow-md overflow-hidden z-[1100]
        transition-all duration-[3000ms] ease-in-out transform
        hover:bg-white hover:text-black hover:shadow-lg
        ${
          falling
            ? 'translate-y-[150vh] rotate-90 opacity-0'
            : 'translate-y-0 rotate-0 opacity-100'
        }
      `}
    >
      Resume
    </button>
  );
};

export default AnimatedResumeButton;
