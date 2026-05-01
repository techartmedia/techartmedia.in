import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500">
      
      
      <nav className="flex justify-between items-center p-5 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 text-white p-1 rounded font-black text-xl">TM</div>
          <span className="font-bold text-xl tracking-tight">TECHARTMEDIA</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#services" className="hover:text-purple-400 transition">Services</a>
          <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition">Contact Us</button>
        </div>
      </nav>

      
      <section className="relative pt-24 pb-32 flex flex-col items-center text-center px-4 overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent -z-10" />
        
        <p className="text-purple-500 font-mono text-sm mb-4 tracking-[0.3em] uppercase">Media & Tech Innovation</p>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          TECHARTMEDIA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            INNOVATION 2026
          </span>
        </h1>
        <p className="max-w-xl text-gray-400 text-lg mb-10">
          Specializing in electronics development, robotics, and high-impact digital media production.
        </p>
        <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
          Explore Our Work
        </button>
      </section>

      
      <div className="bg-purple-600 py-4 overflow-hidden whitespace-nowrap border-y border-white/20">
        <div className="inline-block animate-marquee text-2xl font-black uppercase tracking-widest italic">
          ROBOTICS • DIGITAL MEDIA • EMBEDDED SYSTEMS • ARDUINO • MOTOR CONTROL • INSTAGRAM MARKETING • ROBOTICS • DIGITAL MEDIA • EMBEDDED SYSTEMS • ARDUINO • MOTOR CONTROL •
        </div>
      </div>

      
      <section id="services" className="py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-zinc-950 border border-white/5 rounded-3xl hover:border-purple-600/50 transition">
          <h3 className="text-2xl font-bold mb-4 text-purple-500">Robotics</h3>
          <p className="text-gray-400">Custom embedded systems and Arduino-powered hardware solutions.</p>
        </div>
        <div className="p-10 bg-zinc-950 border border-white/5 rounded-3xl hover:border-purple-600/50 transition">
          <h3 className="text-2xl font-bold mb-4 text-purple-500">Digital Media</h3>
          <p className="text-gray-400">Professional promotional reels and social media strategy for businesses.</p>
        </div>
        <div className="p-10 bg-zinc-950 border border-white/5 rounded-3xl hover:border-purple-600/50 transition">
          <h3 className="text-2xl font-bold mb-4 text-purple-500">Web Design</h3>
          <p className="text-gray-400">High-performance Next.js applications tailored for your business needs.</p>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-600 border-t border-white/5">
        © 2026 Techartmedia. All rights reserved.
      </footer>

      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </main>
  );
}