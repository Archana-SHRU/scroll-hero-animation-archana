"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Car Movement
      tl.to(
        carRef.current,
        {
          x: "80vw",
          ease: "power1.out",
        },
        0
      );

      // Text Reveal
      tl.to(
        revealRef.current,
        {
          width: "80vw",
          ease: "none",
        },
        0
      );

      // Watermark subtle zoom
      tl.to(
        ".watermark",
        {
          scale: 1.05,
          ease: "none",
        },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at center, #111 0%, #000 70%)",
        }}
      >
        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <Image
            src="/public car.png"
            alt="car watermark"
            width={800}
            height={400}
            className="watermark opacity-10 blur-sm"
          />
        </div>

        {/* TEXT REVEAL */}
        <div className="absolute flex justify-center w-full z-20">
          <div
            ref={revealRef}
            className="overflow-hidden"
            style={{ width: 0 }}
          >
            <h1 className="text-white text-7xl font-bold tracking-[1rem] whitespace-nowrap">
              WELCOME ITZFIZZ
            </h1>
          </div>
        </div>

        {/* ROAD */}
        <div className="absolute bottom-1/3 w-full h-28 bg-neutral-900 z-10 shadow-[0_0_40px_rgba(255,255,255,0.05)]" />

        {/* CAR */}
        <div
          ref={carRef}
          className="absolute left-0 bottom-1/3 -translate-y-1/2 z-30"
        >
          <Image
            src="/public car.png"
            alt="car"
            width={300}
            height={150}
            priority
          />
        </div>

        {/* STATS */}
        <div className="absolute bottom-16 w-full flex justify-around text-white z-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold">98%</h2>
            <p className="text-sm text-gray-400">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">120K+</h2>
            <p className="text-sm text-gray-400">Active Users</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">4.9</h2>
            <p className="text-sm text-gray-400">App Rating</p>
          </div>
        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="h-screen bg-white flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-6xl font-extrabold text-black mb-6">
          Driving Innovation Forward
        </h2>

        <p className="max-w-2xl text-lg text-gray-600 leading-relaxed">
          Experience premium motion design powered by scroll-based animation.
          This section represents the continuation of the journey after the
          cinematic hero animation completes.
        </p>

        <div className="mt-10 px-8 py-4 bg-black text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
          Explore More
        </div>
      </section>
    </>
  );
}