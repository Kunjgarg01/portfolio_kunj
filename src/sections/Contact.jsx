import { useState } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[470px] flex flex-col gap-5 px-2 ml-2"
      style={{ marginRight: "auto", minWidth: 188 }}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="text-[20px] tracking-wide uppercase font-light text-black mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="bg-transparent border-b border-black/40 focus:border-black outline-none text-black placeholder:text-black/40 py-3 px-1 transition text-sm"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-[20px] tracking-wide uppercase font-light text-black mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@domain.com"
          value={form.email}
          onChange={handleChange}
          className="bg-transparent border-b border-black/40 focus:border-black outline-none text-black placeholder:text-black/40 py-3 px-1 transition text-sm"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="message"
          className="text-[20px] tracking-wide uppercase font-light text-black mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="bg-transparent border-b border-black/40 focus:border-black outline-none text-black placeholder:text-black/40 py-3 px-1 transition resize-none text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="self-start bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 text-white px-7 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all transform hover:scale-105 focus:scale-100 mt-7"
      >
        Submit
      </button>
    </form>
  );
};

const Contact = () => {
  const text = `GOT A QUESTION, HOW OR PROJECT IDEA?\nI'D LOVE TO HEAR FROM YOU AND DISCUSS FURTHER!`;
  const items = [
    "Contact Me ",
    "Contact Me ",
    "Contact Me ",
    "Contact Me ",
    "Contact Me ",
  ];

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 67,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.2,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col min-h-screen bg-white px-2 lg:px-7 pt-4 pb-0"
    >
      <div className="mb-3">
        <AnimatedHeaderSection
          subTitle={"YOU DREAM IT, I CODE IT"}
          title={"CONTACT"}
          text={text}
          textColor={"text-black"}
          withScrollTrigger={true}
        />
        {/* Negative margin top to shift row upwards and align form with heading's second line */}
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-3 xl:gap-16 -mt-11">
          {/* Left: Form */}
          <div className="w-full lg:w-1/2 flex justify-start items-start">
            <ContactForm />
          </div>
          {/* Right: Details */}
          <div
            className="flex flex-col w-full lg:w-5/12 lg:items-end items-start font-light
          text-black text-right uppercase lg:text-[19px] text-[15px] leading-snug gap-5 mt-40 ml-7.5"
          >
            <div className="social-link mb-3 lg:mb-5 w-full lg:w-auto">
              <h2 className="font-medium tracking-widest text-[20px] text-black mb-1 lg:text-right text-left">
                E-Mail
              </h2>
              <p className="normal-case text-[17px] font-light tracking-wide text-black/90 lg:text-right text-left select-all">
                kunjgarg0134@gmail.com
              </p>
            </div>
            <div className="social-link mb-3 lg:mb-5 w-full lg:w-auto">
              <h2 className="font-medium tracking-widest text-[20px] text-black mb-1 lg:text-right text-left">
                Phone
              </h2>
              <p className="normal-case text-[17px] font-light tracking-wide text-black/90 lg:text-right text-left select-all">
                +91 6397533706
              </p>
            </div>
            <div className="social-link w-full lg:w-auto">
              <h2 className="font-medium tracking-widest text-[20px] text-black mb-1 lg:text-right text-left">
                Social Media
              </h2>
              <div className="flex gap-3 mt-1 flex-wrap lg:justify-end justify-start">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase hover:opacity-70 transition text-black"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Marquee with minimal height */}
      {/* <div>
        <Marquee
          items={items}
          className="text-black bg-transparent h-[27px] min-h-[27px] flex items-center"
        />
      </div> */}
    </section>
  );
};

export default Contact;