import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -14,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 1,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -1,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-7 uppercase bg-black text-white/80 py-19 gap-y-7 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-4xl gap-y-1 md:text-5xl lg:text-6xl">
            {["home", "about", "work", "achievements", "contact"].map((section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-gray-400"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </div>
            ))}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-5 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50 text-sm">E-mail</p>
            <p className="text-sm tracking-widest lowercase text-pretty">
              Kunjgarg0134@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50 text-sm">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-1">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-xs leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 bg-black rounded-full cursor-pointer w-12 h-12 md:w-14 md:h-14 top-3 right-7"
        onClick={toggleMenu}
      >
        <span
          ref={topLineRef}
          className="block w-6 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-6 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;