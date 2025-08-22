import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import PhysicsFooter from './PhysicsFooter';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;
  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

// ...existing code...
  return (
    <section id="about" className="min-h-[calc(100vh+20px)] bg-black rounded-b-4xl">">
      <AnimatedHeaderSection
        subTitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col gap-4 pt-4 px-4 sm:px-8 md:px-10 pb-11 text-sm font-light tracking-wide text-white/60">
        {/* Responsive layout for About section */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end">
          <div className="w-full">
            <h2 className="mb-3 text-2xl md:text-3xl font-bold text-white">
              Hi, I'm Kunj Garg
            </h2>
            <div className="w-full max-w-6xl h-auto overflow-auto">
              <p className="text-base md:text-lg whitespace-normal break-words leading-relaxed">
                Passionate front-end developer with a keen eye for design, detail, and user experience.<br />
                Skilled in creating responsive, accessible, and visually engaging web interfaces using modern technologies such as HTML, CSS, JavaScript, and React.<br />
                Dedicated to transforming ideas into seamless, scalable, and high-performance digital solutions that deliver exceptional user satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
      <PhysicsFooter />
    </section>
  );
// ...existing code...
};

export default About;