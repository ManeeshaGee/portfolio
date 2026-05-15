import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { SKILLS } from '../lib/skills';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Zap, Activity } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export const PhysicsPool: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<{ [key: string]: Matter.Body }>({});
  const animationRef = useRef<number>(0);
  const [balls, setBalls] = useState<{ id: string; x: number; y: number; angle: number }[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdCounter = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, Runner, Bodies, Composite, MouseConstraint, Mouse, Events } = Matter;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const engine = Engine.create({
      gravity: { x: 0, y: 0 },
    });
    engineRef.current = engine;

    const world = engine.world;

    const thickness = 100;
    const walls = [
      Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
      Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
      Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
      Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
    ];
    Composite.add(world, walls);

    const skillBodies: Matter.Body[] = SKILLS.map((skill) => {
      const isMobile = width < 768;
      const radius = isMobile ? (35 + Math.random() * 10) : (50 + Math.random() * 20);
      const x = Math.random() * (width - 2 * radius) + radius;
      const y = Math.random() * (height - 2 * radius) + radius;
      
      const body = Bodies.circle(x, y, radius, {
        label: `skill-${skill.id}`,
        restitution: 0.8,
        frictionAir: 0.05,
      });

      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
      });

      bodiesRef.current[skill.id] = body;
      return body;
    });
    Composite.add(world, skillBodies);

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
      },
    });
    Composite.add(world, mouseConstraint);

    // Patch mouse events to allow scrolling
    if (mouse.element) {
      const wheelHandler = (mouse as any).mousewheel;
      if (wheelHandler) {
        mouse.element.removeEventListener('wheel', wheelHandler);
        mouse.element.removeEventListener('mousewheel', wheelHandler);
        mouse.element.removeEventListener('DOMMouseScroll', wheelHandler);
      }
      const originalTouchmove = (mouse as any).mousemove;
      if (originalTouchmove) {
        mouse.element.removeEventListener('touchmove', originalTouchmove);
        mouse.element.addEventListener('touchmove', (e: Event) => {
          const touchEvent = e as TouchEvent;
          if (touchEvent.changedTouches) {
            (mouse as any).position = {
              x: touchEvent.changedTouches[0].pageX - containerRef.current!.getBoundingClientRect().left,
              y: touchEvent.changedTouches[0].pageY - containerRef.current!.getBoundingClientRect().top,
            };
          }
        }, { passive: true });
      }
    }

    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        const collisionPoint = {
          x: (bodyA.position.x + bodyB.position.x) / 2,
          y: (bodyA.position.y + bodyB.position.y) / 2,
        };

        const newParticles: Particle[] = Array.from({ length: 3 }).map(() => ({
          id: particleIdCounter.current++,
          x: collisionPoint.x,
          y: collisionPoint.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          color: '#00FF5F',
        }));

        setParticles(prev => [...prev.slice(-30), ...newParticles]);
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    const updateState = () => {
      const updatedBalls = SKILLS.map(skill => {
        const body = bodiesRef.current[skill.id];
        return {
          id: skill.id,
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
        };
      });
      setBalls(updatedBalls);

      skillBodies.forEach(body => {
        if (Math.random() > 0.99) {
           Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
          });
        }
      });

      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.03,
          }))
          .filter(p => p.life > 0)
      );

      animationRef.current = requestAnimationFrame(updateState);
    };

    animationRef.current = requestAnimationFrame(updateState);

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: -thickness / 2 });
      Matter.Body.setPosition(walls[1], { x: newWidth / 2, y: newHeight + thickness / 2 });
      Matter.Body.setPosition(walls[2], { x: -thickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(walls[3], { x: newWidth + thickness / 2, y: newHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      Runner.stop(runner);
      Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-bento-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
          {/* Sidebar Controls */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-80 rounded-[32px] bg-bento-card border border-bento-border p-8 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-bento-accent/10 rounded-lg">
                    <Zap size={18} className="text-bento-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter">SKILLS_ENGINE</h3>
                </div>
                <p className="text-bento-muted text-xs leading-relaxed uppercase tracking-widest font-bold">Simulation active. Energy conserved through elastic impacts.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-bento-muted uppercase tracking-widest">
                    <span>VISCOSITY</span>
                    <span className="text-bento-accent">0.42</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-bento-accent" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-bento-muted uppercase tracking-widest">
                    <span>ENTROPY</span>
                    <span className="text-blue-500">0.85</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-blue-500" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-bento-accent uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-bento-accent shadow-[0_0_8px_rgba(0,255,95,0.5)] animate-pulse" />
                SYSTEM_STABLE
              </div>
              <p className="text-[10px] text-bento-muted font-mono leading-tight">
                DRAG NODES TO INTERACT. VELOCITY IS CONSERVED THROUGH ELASTIC IMPACTS. COLLISION SCALE SET TO NOMINAL.
              </p>
            </div>
          </motion.aside>

          {/* Main Pool Area */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             className="flex-1 relative rounded-[32px] bg-bento-card border border-bento-border overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div 
              ref={containerRef} 
              className="absolute inset-0 z-10"
            >
              {/* Particles */}
              {particles.map(p => (
                <div 
                  key={p.id}
                  className="absolute w-1 h-1 rounded-full pointer-events-none blur-[1px]"
                  style={{
                    left: p.x,
                    top: p.y,
                    backgroundColor: p.color,
                    opacity: p.life,
                    transform: `scale(${p.life * 2})`,
                  }}
                />
              ))}

              {/* Physics Balls */}
              {balls.map(ball => {
                const skill = SKILLS.find(s => s.id === ball.id)!;
                const body = bodiesRef.current[ball.id];
                if (!body) return null;
                const radius = body.circleRadius!;

                return (
                  <div
                    key={ball.id}
                    className="absolute rounded-full flex items-center justify-center text-center p-2 select-none"
                    style={{
                      width: radius * 2,
                      height: radius * 2,
                      left: ball.x - radius,
                      top: ball.y - radius,
                      transform: `rotate(${ball.angle}rad)`,
                      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(255,255,255,0.05) 60%, ${skill.color}10 100%)`,
                      border: `1px solid ${skill.color}40`,
                      boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 16px 0 ${skill.color}10`,
                    }}
                  >
                    {/* Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="48"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                      <motion.circle
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: skill.proficiency / 100 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                        cx="50" cy="50" r="48"
                        fill="none"
                        stroke={skill.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ opacity: 0.6 }}
                      />
                    </svg>
                    
                    <div className="flex flex-col items-center justify-center relative z-10 pointer-events-none">
                      <span className="text-[10px] md:text-sm font-black text-white leading-tight uppercase tracking-tight">
                        {skill.name}
                      </span>
                      <span className="text-[8px] md:text-[10px] font-mono font-bold text-bento-muted">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Background Decor */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="text-[12vw] font-black text-white/[0.02] tracking-tighter select-none">KINETIC_STACK</h2>
            </div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#2D2D35_1px,transparent_1px),linear-gradient(to_bottom,#2D2D35_1px,transparent_1px)] bg-[size:40px_40px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
