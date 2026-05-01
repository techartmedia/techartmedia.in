import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center p-5 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 text-white p-1 rounded font-black text-xl">TM</div>
          <span className="font-bold text-xl tracking-tight">TECHARTMEDIA</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-purple-400">Services</a>
          <a href="#" className="hover:text-purple-400">Projects</a>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md transition">Contact</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 flex flex-col items-center text-center px-4 overflow-hidden">
        <p className="text-purple-500 font-mono text-sm mb-4 tracking-[0.3em] uppercase">Innovation & Media</p>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          TECHARTMEDIA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            INNOVATION 2026
          </span>
        </h1>
        <p className="max-w-xl text-gray-400 text-lg mb-10">
          Specializing in electronics development, robotics, and high-impact digital media production.
        </p>
      </section>

      {/* Marquee (Simplified Version) */}
      <div className="bg-purple-600 py-6 border-y border-white/20">
        <div className="text-center text-2xl font-black uppercase tracking-widest italic overflow-hidden">
          ROBOTICS • DIGITAL MEDIA • ARDUINO • EMBEDDED SYSTEMS • 
        </div>
      </div>

      {/* Simple Services Grid */}
      <section className="py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-white/10 rounded-2xl bg-zinc-950">
          <h3 className="text-xl font-bold text-purple-500 mb-2">Robotics</h3>
          <p className="text-gray-400 text-sm">Custom hardware and motor control solutions.</p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl bg-zinc-950">
          <h3 className="text-xl font-bold text-purple-500 mb-2">Media</h3>
          <p className="text-gray-400 text-sm">Professional video content and marketing.</p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl bg-zinc-950">
          <h3 className="text-xl font-bold text-purple-500 mb-2">Web</h3>
          <p className="text-gray-400 text-sm">Modern business sites built with Next.js.</p>
        </div>
      </section>

    </main>
  );
}