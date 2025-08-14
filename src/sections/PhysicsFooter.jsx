import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedResumeButton from './Resume';
gsap.registerPlugin(ScrollTrigger);

const PhysicsFooter = () => {
  const footerRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;
    const footer = footerRef.current;
    const container = containerRef.current;
    const objects = [...container.querySelectorAll('.object')];

    const config = {
      gravity: 1,
      bounce: 1,
      frictionAir: 0.01,
      wallThickness: 67,
      dragStiffness: 0.1,
    };

    function createWalls(bounds, engine) {
      const wallOptions = { isStatic: true, restitution: config.bounce };
      const walls = [
        Bodies.rectangle(bounds.width / 2, bounds.height + config.wallThickness / 2, bounds.width, config.wallThickness, wallOptions),
        Bodies.rectangle(-config.wallThickness / 2, bounds.height / 2, config.wallThickness, bounds.height, wallOptions),
        Bodies.rectangle(bounds.width + config.wallThickness / 2, bounds.height / 2, config.wallThickness, bounds.height, wallOptions),
        Bodies.rectangle(bounds.width / 2, -config.wallThickness / 2, bounds.width, config.wallThickness, wallOptions),
      ];
      World.add(engine.world, walls);
    }

    function initPhysics() {
      const engine = Engine.create();
      engine.gravity.y = config.gravity;
      engineRef.current = engine;

      const runner = Runner.create();
      runnerRef.current = runner;

      World.clear(engine.world);
      Engine.clear(engine);

      const bounds = container.getBoundingClientRect();
      createWalls(bounds, engine);

      const bodies = objects.map(obj => {
        const rect = obj.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = Math.random() * bounds.width;
        const y = -Math.random() * 200 - height;
        const body = Bodies.rectangle(x, y, width, height, {
          restitution: config.bounce,
          frictionAir: config.frictionAir,
          density: 0.001,
          friction: 0.1,
        });
        World.add(engine.world, body);
        return { body, element: obj, width, height };
      });

      bodiesRef.current = bodies;

      const mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: config.dragStiffness },
        collisionFilter: { mask: 0x0001 },
      });
      World.add(engine.world, mouseConstraint);

      bodies.forEach(({ body, element }) => {
        element.addEventListener('mouseenter', () => {
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.067,
            y: -0.12 - Math.random() * 0.067,
          });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.167);
        });
      });

      Runner.run(runner, engine);

      function update() {
        bodiesRef.current.forEach(({ body, element, width, height }) => {
          const paddingBuffer = 5;

          const minX = width / 2 + paddingBuffer;
          const maxX = container.clientWidth - width / 2 - paddingBuffer;
          if (body.position.x < minX) {
            Matter.Body.setPosition(body, { x: minX, y: body.position.y });
            Matter.Body.setVelocity(body, { x: 0, y: body.velocity.y });
          } else if (body.position.x > maxX) {
            Matter.Body.setPosition(body, { x: maxX, y: body.position.y });
            Matter.Body.setVelocity(body, { x: 0, y: body.velocity.y });
          }

          const minY = height / 2 + paddingBuffer;
          const maxY = container.clientHeight - height / 2 - paddingBuffer;
          if (body.position.y < minY) {
            Matter.Body.setPosition(body, { x: body.position.x, y: minY });
            Matter.Body.setVelocity(body, { x: body.velocity.x, y: 0 });
          } else if (body.position.y > maxY) {
            Matter.Body.setPosition(body, { x: body.position.x, y: maxY });
            Matter.Body.setVelocity(body, { x: body.velocity.x, y: 0 });
          }

          element.style.transform = `translate(${body.position.x - width / 2}px, ${body.position.y - height / 2}px) rotate(${body.angle}rad)`;
        });
        requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom',
      onEnter: () => {
        if (!engineRef.current) {
          initPhysics();
        }
      },
    });

    return () => {
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
        Matter.World.clear(engineRef.current.world);
        Matter.Engine.clear(engineRef.current);
        runnerRef.current = null;
        engineRef.current = null;
        bodiesRef.current = [];
      }
    };
  }, []);

  const techs = ['HTML', 'CSS', 'Tailwind CSS', 'Javascript', 'React JS', 'Three JS','Java', 'Python', 'GitHub'];

  // Function to open resume in a new tab
  const openResume = () => {
    window.open('/my-resume.pdf', '_blank'); // Replace with your actual file path or a Google Drive link
  };

  return (
    <div
      ref={footerRef}
      style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        height: '283px',
        width: '1450px',
        marginRight: '1rem',
        maxWidth: '100%',
        backgroundColor: 'black',
        color: 'white',
        borderTopLeftRadius: '160px',
        borderRadius: 11,
        boxShadow: '0 0 13px #0008',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '0.1em',
      }}>
        Tech Stack
      </div>

      <div style={{
        fontSize: '1.1rem',
        color: 'rgba(240, 240, 240, 0.3)',
        marginBottom: '0.35rem',
        marginRight: '2.5rem',
        userSelect: 'none',
        pointerEvents: 'none',
        fontWeight: '300',
        textAlign: 'right',
        width: '100%',
        letterSpacing: '0.05em',
      }}>
        Why list, When you can play..!
      </div>
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          flex: 1,
          right: 0,                // stick to right edge
          top: 0,                  // align to the top
          // bottom: 0,
          width: '700px',
          // backgroundColor: 'blue',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          pointerEvents: 'auto',
        }}
      >
        {techs.map((text, idx) => (
          <div
            key={text}
            className="object"
            style={{
              position: 'absolute',
              background: 'white',
              color: '#222',
              height: '3.34rem',
              width: '5.36rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              border: '1.34px solid #222',
              borderRadius: 13,
              cursor: 'grab',
              userSelect: 'none',
              fontWeight: '550',
              fontSize: '0.74rem',
              boxShadow:
                hoveredIndex === idx
                  ? '0 0 11px 3px rgba(86, 135, 245, 0.88)'
                  : '0 1px 4px rgba(0,0,0,0.3)',
              backgroundColor:
                hoveredIndex === idx
                  ? '#e6f0ff'
                  : 'white',
              willChange: 'transform',
              transition: 'box-shadow 0.3s, background-color 0.3s',
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            {text}
          </div>
        ))}
      </div>
      <AnimatedResumeButton />
 </div>
  );
};

export default PhysicsFooter;
