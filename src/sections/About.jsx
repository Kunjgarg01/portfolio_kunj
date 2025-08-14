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

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col gap-4 pt-4 px-10 pb-11 text-sm font-light tracking-wide text-white/60">
        {/* Left section, with Tech Stack heading in the right corner */}
        <div className="w-[100%] flex justify-between items-end">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Hi, I'm Kunj Garg
            </h2>
                <div className="w-full max-w-6xl h-90 overflow-auto">
                <p className="text-base whitespace-normal break-words">
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
};

export default About;