"use client";

import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import Matter from "matter-js";
import { onSplashDone, isSplashPending } from "@/lib/splashSignal";

const MatterLib = (Matter as any).default || Matter;
const MatterModule = MatterLib;

// ─── 8 Design Companion Tools Data ───────────────────────────────────────────
export const toolsData = [
  {
    name: "Figma",
    role: "Design Companion",
    image: "/assets/image-8.png",
  },
  {
    name: "Claude",
    role: "Vibe Coding",
    image: "/assets/image-9.png",
  },
  {
    name: "OpenAI",
    role: "Exploration",
    image: "/assets/image-10.png",
  },
  {
    name: "Gemini",
    role: "Image Generation",
    image: "/assets/image-11.png",
  },
  {
    name: "Framer",
    role: "Framer",
    image: "/assets/image-12.png",
  },
  {
    name: "Rive",
    role: "Motion Design",
    image: "/assets/image-13.png",
  },
  {
    name: "Miro",
    role: "Design Companion",
    image: "/assets/image-14.png",
  },
  {
    name: "Spotify",
    role: "Creative Fuel",
    image: "/assets/image-15.png",
  },
];

// ─── Tunable Physics & Geometry Parameters ────────────────────────────────────
const WALL_PADDING = 12;
const FLOOR_PADDING = 24;
const DESIGNED_ICON_SIZE = 82.2;
const DESIGNED_CORNER_RADIUS = 15;
const WALL_THICKNESS = 200;

export function CompanionsPhysicsContainer({
  isDesktop = false,
}: {
  isDesktop?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check prefers-reduced-motion on client before paint
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (reducedMotion || !isReady) return;

    let isDestroyed = false;
    let engine: any = null;
    let bodies: any[] = [];
    let walls: any[] = [];
    let ceilingBody: any = null;
    let dragAnchor: any = null;
    let dragConstraint: any = null;
    let isDragging = false;
    let activePointerId: number | null = null;
    let draggedIndex: number | null = null;
    let allSpawned = false;
    let rafId: number | null = null;
    let isLoopRunning = false;
    let hasTriggered = false;
    let currentIconSize = DESIGNED_ICON_SIZE;
    let currentRadius = DESIGNED_CORNER_RADIUS;
    let spawnTimers: NodeJS.Timeout[] = [];
    let cachedWidth = 1334;
    let cachedHeight = 367;

    // Direct synchronous physics setup using MatterLib
    let intersectionObserver: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;

    function setupPhysics() {
      const container = containerRef.current;
      if (!container || !MatterLib || isDestroyed) return;

      const { Engine } = MatterLib;

      // 1. Create Engine with tuned parameters
      if (!engine) {
        engine = Engine.create({
          enableSleeping: true,
          positionIterations: 8,
          velocityIterations: 6,
        });
        engine.gravity.y = 1.2;
      }

      // 2. Compute Container & Icon Dimensions
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // If container has not laid out yet, ResizeObserver will call setupPhysics
      if (width <= 0 || height <= 0) return;

      if (width < 1200) {
        currentIconSize = Math.max(56, Math.min(82.2, Math.round(DESIGNED_ICON_SIZE * (width / 1200))));
        currentRadius = Math.round(DESIGNED_CORNER_RADIUS * (currentIconSize / DESIGNED_ICON_SIZE));
      } else {
        currentIconSize = DESIGNED_ICON_SIZE;
        currentRadius = DESIGNED_CORNER_RADIUS;
      }

      // 3. Build Static Walls and Floor
      rebuildWalls(width, height);

      // 4. Initially position icon elements if not yet spawned
      if (!hasTriggered) {
        iconRefs.current.forEach((el) => {
          if (el) {
            el.style.opacity = "0";
            el.style.width = `${currentIconSize}px`;
            el.style.height = `${currentIconSize}px`;
            el.style.borderRadius = `${currentRadius}px`;
            el.style.transform = `translate3d(0, -200px, 0)`;
          }
        });
      }

      // 5. Trigger drop when container is near viewport (only after splash screen completes)
      const windowH = typeof window !== "undefined" ? (window.innerHeight || document.documentElement.clientHeight) : 900;
      const inView = rect.top < windowH * 0.9 && rect.bottom > 0;

      if (inView && !isSplashPending()) {
        startDropSequence();
      } else if (!hasTriggered) {
        if (isSplashPending()) {
          onSplashDone().then(() => {
            if (!hasTriggered && !isDestroyed && containerRef.current) {
              const r = containerRef.current.getBoundingClientRect();
              if (r.top < windowH * 0.9 && r.bottom > 0) {
                startDropSequence();
              }
            }
          });
        }
        if (!intersectionObserver) {
          intersectionObserver = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  if (intersectionObserver) {
                    intersectionObserver.disconnect();
                    intersectionObserver = null;
                  }
                  startDropSequence();
                  break;
                }
              }
            },
            { rootMargin: "150px 0px" }
          );
          intersectionObserver.observe(container);
        }
      }
    }

    // Call setupPhysics immediately
    setupPhysics();

    function rebuildWalls(width: number, height: number) {
      if (!engine || !MatterModule) return;
      cachedWidth = width;
      cachedHeight = height;
      const { Bodies, Composite } = MatterModule;

      // Remove previous walls
      if (walls.length > 0) {
        Composite.remove(engine.world, walls);
        walls = [];
      }
      if (ceilingBody) {
        Composite.remove(engine.world, ceilingBody);
        ceilingBody = null;
      }

      // Left Wall
      const leftWall = Bodies.rectangle(
        WALL_PADDING - WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
        height * 4,
        { isStatic: true, restitution: 0.3, friction: 0.2 }
      );

      // Right Wall
      const rightWall = Bodies.rectangle(
        width - WALL_PADDING + WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
        height * 4,
        { isStatic: true, restitution: 0.3, friction: 0.2 }
      );

      // Floor
      const floor = Bodies.rectangle(
        width / 2,
        height - FLOOR_PADDING + WALL_THICKNESS / 2,
        width * 4,
        WALL_THICKNESS,
        { isStatic: true, restitution: 0.35, friction: 0.3 }
      );

      walls = [leftWall, rightWall, floor];
      Composite.add(engine.world, walls);

      // Add ceiling if all icons have already spawned
      if (allSpawned) {
        ceilingBody = Bodies.rectangle(
          width / 2,
          -WALL_THICKNESS / 2,
          width * 4,
          WALL_THICKNESS,
          { isStatic: true }
        );
        Composite.add(engine.world, ceilingBody);
      }
    }

    function startDropSequence() {
      if (isSplashPending() || hasTriggered || isDestroyed || !engine || !MatterModule) return;
      hasTriggered = true;

      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;

      const { Bodies, Composite } = MatterModule;

      // Divide horizontal space into 8 slots and shuffle them
      const slots = [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5);
      const margin = WALL_PADDING + currentIconSize / 2 + 10;
      const availableSpan = Math.max(100, width - margin * 2);
      const slotWidth = availableSpan / 8;

      toolsData.forEach((_, index) => {
        const timer = setTimeout(() => {
          if (isDestroyed || !engine) return;

          const slot = slots[index];
          const startX = margin + slot * slotWidth + slotWidth / 2 + (Math.random() - 0.5) * (slotWidth * 0.4);
          const startY = -currentIconSize;

          const body = Bodies.rectangle(startX, startY, currentIconSize, currentIconSize, {
            chamfer: { radius: currentRadius },
            restitution: 0.45,
            friction: 0.2,
            frictionStatic: 0.5,
            frictionAir: 0.012,
            density: 0.002,
            angle: (Math.random() - 0.5) * 0.4,
            angularVelocity: (Math.random() - 0.5) * 0.06,
          });

          MatterModule.Sleeping.set(body, false);
          MatterModule.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 1.5,
            y: 2.5,
          });

          bodies[index] = body;
          Composite.add(engine.world, body);

          const el = iconRefs.current[index];
          if (el) {
            el.style.opacity = "1";
            el.style.display = "block";
          }

          if (hasTriggered) {
            startLoop();
          }

          // After the last icon spawns, add the ceiling so thrown icons cannot exit
          if (index === toolsData.length - 1) {
            const ceilingTimer = setTimeout(() => {
              if (isDestroyed || !engine) return;
              allSpawned = true;
              const h = container.getBoundingClientRect().height;
              const w = container.getBoundingClientRect().width;
              rebuildWalls(w, h);
            }, 500);
            spawnTimers.push(ceilingTimer);
          }
        }, index * 150); // 150ms apart stream

        spawnTimers.push(timer);
      });
    }

    // ─── Main Animation Loop (RAF) ──────────────────────────────────────────
    let lastTime = performance.now();

    function startLoop() {
      if (rafId) return;
      isLoopRunning = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    }

    function stopLoop() {
      isLoopRunning = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function loop(currentTime: number) {
      rafId = null;
      if (isDestroyed || !engine || !MatterModule) {
        isLoopRunning = false;
        return;
      }

      try {
        const rawDelta = currentTime - lastTime;
        lastTime = currentTime;
        const delta = Math.min(rawDelta, 16.667);

        MatterModule.Engine.update(engine, delta);

        const width = cachedWidth;
        const height = cachedHeight;

        const half = currentIconSize / 2;
        const minX = WALL_PADDING + half;
        const maxX = width - WALL_PADDING - half;
        const minY = allSpawned ? half : -currentIconSize * 2;
        const maxY = height - FLOOR_PADDING - half;

        for (let i = 0; i < bodies.length; i++) {
          const body = bodies[i];
          const el = iconRefs.current[i];
          if (!body || !el) continue;

          let clampedX = body.position.x;
          let clampedY = body.position.y;
          let clamped = false;

          if (clampedX < minX) { clampedX = minX; clamped = true; }
          else if (clampedX > maxX) { clampedX = maxX; clamped = true; }
          if (allSpawned && body.position.y >= half && clampedY < minY) { clampedY = minY; clamped = true; }
          else if (clampedY > maxY) { clampedY = maxY; clamped = true; }

          if (clamped) {
            MatterModule.Body.setPosition(body, { x: clampedX, y: clampedY });
            MatterModule.Body.setVelocity(body, {
              x: body.velocity.x * 0.4,
              y: body.velocity.y * 0.4,
            });
          }

          const maxV = 28;
          const vx = Math.max(-maxV, Math.min(maxV, body.velocity.x));
          const vy = Math.max(-maxV, Math.min(maxV, body.velocity.y));
          if (vx !== body.velocity.x || vy !== body.velocity.y) {
            MatterModule.Body.setVelocity(body, { x: vx, y: vy });
          }

          el.style.transform = `translate3d(${body.position.x - half}px, ${body.position.y - half}px, 0) rotate(${body.angle}rad)`;
        }

        if (typeof window !== "undefined" && (window as any).__checkCursorUnderPoint) {
          (window as any).__checkCursorUnderPoint();
        }

        const allSleeping = bodies.length === toolsData.length && bodies.every((b) => b && b.isSleeping);
        if (allSleeping && !isDragging && allSpawned) {
          stopLoop();
        } else {
          isLoopRunning = true;
          rafId = requestAnimationFrame(loop);
        }
      } catch (err) {
        console.error("LOOP CRASH:", err);
        stopLoop();
      }
    }

    // ─── Drag & Throw Handlers (Pointer Events) ─────────────────────────────
    const onPointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest("[data-icon-index]") as HTMLElement | null;
      if (!target || !engine || !MatterModule) return;

      const index = parseInt(target.getAttribute("data-icon-index") || "-1", 10);
      const body = bodies[index];
      if (!body) return;

      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      e.preventDefault();
      target.setPointerCapture(e.pointerId);

      activePointerId = e.pointerId;
      draggedIndex = index;
      isDragging = true;
      document.documentElement.setAttribute("data-physics-dragging", "true");
      target.style.cursor = "grabbing";

      // Wake body
      MatterModule.Sleeping.set(body, false);

      const ptrX = e.clientX - cRect.left;
      const ptrY = e.clientY - cRect.top;

      // Create static anchor & constraint
      dragAnchor = MatterModule.Bodies.circle(ptrX, ptrY, 5, {
        isStatic: true,
        collisionFilter: { mask: 0 },
      });
      dragConstraint = MatterModule.Constraint.create({
        bodyA: body,
        bodyB: dragAnchor,
        pointA: { x: ptrX - body.position.x, y: ptrY - body.position.y },
        stiffness: 0.22,
        damping: 0.08,
      });

      MatterModule.Composite.add(engine.world, [dragAnchor, dragConstraint]);
      startLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || e.pointerId !== activePointerId || !dragAnchor || !MatterModule) return;

      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const half = currentIconSize / 2;
      const clampedX = Math.max(WALL_PADDING + half, Math.min(cRect.width - WALL_PADDING - half, e.clientX - cRect.left));
      const clampedY = Math.max(half, Math.min(cRect.height - FLOOR_PADDING - half, e.clientY - cRect.top));

      MatterModule.Body.setPosition(dragAnchor, { x: clampedX, y: clampedY });

      // Wake dragged body and keep simulation running
      if (draggedIndex !== null && bodies[draggedIndex]) {
        MatterModule.Sleeping.set(bodies[draggedIndex], false);
      }
      startLoop();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointerId) return;

      if (draggedIndex !== null) {
        const el = iconRefs.current[draggedIndex];
        if (el) el.style.cursor = "grab";
      }

      if (dragConstraint && dragAnchor && engine && MatterModule) {
        MatterModule.Composite.remove(engine.world, [dragConstraint, dragAnchor]);
        dragConstraint = null;
        dragAnchor = null;
      }

      isDragging = false;
      activePointerId = null;
      draggedIndex = null;
      document.documentElement.removeAttribute("data-physics-dragging");
      startLoop();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    }

    // ─── Resize Observer ───────────────────────────────────────────────────
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          if (!engine || !hasTriggered) {
            setupPhysics();
          } else {
            rebuildWalls(w, h);
          }
          if (w < 1200) {
            currentIconSize = Math.max(56, Math.min(82.2, Math.round(DESIGNED_ICON_SIZE * (w / 1200))));
            currentRadius = Math.round(DESIGNED_CORNER_RADIUS * (currentIconSize / DESIGNED_ICON_SIZE));
          } else {
            currentIconSize = DESIGNED_ICON_SIZE;
            currentRadius = DESIGNED_CORNER_RADIUS;
          }
          iconRefs.current.forEach((el) => {
            if (el) {
              el.style.width = `${currentIconSize}px`;
              el.style.height = `${currentIconSize}px`;
              el.style.borderRadius = `${currentRadius}px`;
            }
          });
          if (hasTriggered) {
            startLoop();
          }
        }
      }
    });

    if (container) {
      resizeObserver.observe(container);
    }

    // Pause when tab is hidden or section is offscreen
    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (hasTriggered) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isDestroyed = true;
      spawnTimers.forEach(clearTimeout);
      stopLoop();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (container) {
        container.removeEventListener("pointerdown", onPointerDown);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (engine && MatterModule) {
        MatterModule.World.clear(engine.world, false);
        MatterModule.Engine.clear(engine);
        engine = null;
      }
    };
  }, [reducedMotion, isReady]);

  // Reduced motion static fallback (exact original Figma row layout)
  if (reducedMotion) {
    return (
      <div
        className={
          isDesktop
            ? "absolute left-[57px] top-[184px] w-[1220px] h-[135px]"
            : "grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 md:gap-5 justify-items-center mt-6 sm:mt-8"
        }
      >
        {toolsData.map((tool, idx) => (
          <div
            key={idx}
            className={
              isDesktop
                ? `absolute left-[${idx * 160}px] top-[2px] w-[100px] h-[141px] flex flex-col items-center`
                : "w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] md:w-[82px] md:h-[82px] rounded-[15px] overflow-hidden shadow-sm"
            }
            style={isDesktop ? { left: `${idx * 160}px` } : undefined}
          >
            <div className="w-[82.2px] h-[82.2px] relative rounded-[15px] overflow-hidden">
              <img
                src={tool.image}
                alt={tool.name}
                draggable={false}
                className="w-full h-full object-cover block select-none pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Fallback for SSR / No-JS (Full visible static layout before hydration) */}
      <noscript>
        <div className="absolute left-[57px] top-[184px] w-[1220px] h-[135px] flex items-center justify-between">
          {toolsData.map((tool, idx) => (
            <div key={idx} className="w-[82.2px] h-[82.2px] rounded-[15px] overflow-hidden">
              <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </noscript>

      {/* Physics Container for 8 Real DOM Icons */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto [touch-action:pan-y] z-20 rounded-[20px] sm:rounded-[30px]"
        aria-label="Interactive design companions physics playground"
      >
        {toolsData.map((tool, idx) => (
          <div
            key={idx}
            ref={(el) => {
              iconRefs.current[idx] = el;
            }}
            data-icon-index={idx}
            data-cursor-key={`tool-${tool.name.toLowerCase()}`}
            role="button"
            aria-label={tool.name}
            tabIndex={0}
            className="absolute left-0 top-0 cursor-grab select-none [touch-action:none] will-change-transform shadow-[0px_4px_12px_rgba(0,0,0,0.18)] border border-black/10 overflow-hidden"
            style={{
              width: `${DESIGNED_ICON_SIZE}px`,
              height: `${DESIGNED_ICON_SIZE}px`,
              borderRadius: `${DESIGNED_CORNER_RADIUS}px`,
              opacity: 0, // Hidden until spawned
              userSelect: "none",
              WebkitTouchCallout: "none",
            }}
          >
            <img
              src={tool.image}
              alt={tool.name}
              draggable={false}
              className="w-full h-full object-cover block pointer-events-none select-none"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function DesktopTools() {
  return (
    <section
      className="relative w-[1440px] h-[629px] border-b border-black border-solid flex items-center justify-center overflow-visible bg-transparent"
      data-node-id="649:1236"
    >
      <div
        className="w-[1334px] h-[367px] bg-[#dad1ff] border border-white rounded-[30px] shadow-[0px_4px_10px_rgba(0,0,0,0.25)] relative px-[74px] pt-[62px]"
        data-node-id="649:1237"
      >
        {/* Exact Figma node 662:1520 - Peeking Girl on top-right border */}
        <div
          className="absolute left-[924px] top-[-145px] w-[387px] h-[160px] pointer-events-none z-30 select-none"
          data-node-id="662:1520"
          data-name="image 79"
        >
          <img
            src="/assets/image-79.png"
            alt="Kanak peeking"
            draggable={false}
            className="w-full h-full object-cover pointer-events-none select-none block"
          />
        </div>

        {/* Title */}
        <h2
          className="font-['Architects_Daughter'] text-[40px] leading-[55px] text-black relative z-10 select-text"
          data-node-id="649:1249"
          data-cursor-key="tool-heading"
        >
          My Design Companions
        </h2>

        {/* Subtitle */}
        <p
          className="font-['Almarena_Neue',sans-serif] font-normal text-[15px] leading-[30px] text-black mt-[5px] relative z-10 select-text max-w-[548px]"
          data-node-id="649:1248"
        >
          The softwares I rely on to research, design, prototype, and collaborate.
        </p>

        {/* Physics-Enabled Grabbable 8 Icons Playground */}
        <CompanionsPhysicsContainer isDesktop={true} />
      </div>
    </section>
  );
}

export function MobileTools() {
  return (
    <section className="relative w-full bg-transparent border-b border-black pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center overflow-visible">
      <div className="w-full max-w-[1240px] min-h-[380px] sm:min-h-[400px] bg-[#dad1ff] border border-white rounded-[20px] sm:rounded-[30px] shadow-[0px_4px_10px_rgba(0,0,0,0.25)] p-6 sm:p-8 md:p-10 relative flex flex-col justify-start">
        {/* Peeking Girl on top-right border (Responsive) */}
        <div
          className="absolute right-[10px] sm:right-[30px] md:right-[50px] -top-[65px] sm:-top-[90px] md:-top-[125px] w-[160px] sm:w-[220px] md:w-[300px] pointer-events-none z-30 select-none"
          data-node-id="662:1520"
          data-name="image 79"
        >
          <img
            src="/assets/image-79.png"
            alt="Kanak peeking"
            draggable={false}
            className="w-full h-auto object-cover pointer-events-none select-none block"
          />
        </div>

        {/* Title */}
        <h2 className="font-['Architects_Daughter'] text-[24px] sm:text-[30px] md:text-[36px] text-black relative z-10 select-text">
          My Design Companions
        </h2>

        {/* Subtitle */}
        <p className="font-['Almarena_Neue',sans-serif] font-normal text-[14px] sm:text-[15px] text-black mt-2 relative z-10 select-text max-w-[500px]">
          The softwares I rely on to research, design, prototype, and collaborate.
        </p>

        {/* Physics-Enabled Grabbable 8 Icons Playground */}
        <CompanionsPhysicsContainer isDesktop={false} />
      </div>
    </section>
  );
}

export default function Tools() {
  return (
    <>
      <div className="hidden xl:block">
        <DesktopTools />
      </div>
      <div className="xl:hidden">
        <MobileTools />
      </div>
    </>
  );
}
