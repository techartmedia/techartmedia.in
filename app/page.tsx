```tsx
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
          <a href="#about" className="hover:text-purple-400 transition">About</a>
          <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
          <a href="#schedule" className="hover:text-purple-400 transition">Schedule</a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition">Register</button>
        </div>
      </nav>

      
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-4 overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent -z-10" />
        
        <p className="text-purple-500 font-mono text-sm mb-4 tracking-[0.3em] uppercase">Media & Tech Innovation</p>
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
          TECHARTMEDIA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            FEST 2026
          </span>
        </h1>
        <p className="max-w-xl text-gray-400 text-lg mb-8">
          Where curiosity meets code, gears meet genius — a media and electronics showcase that runs on caffeine and ambition.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>
      </section>

      
      <div className="bg-purple-600 py-4 overflow-hidden whitespace-nowrap border-y border-white/20">
        <div className="inline-block animate-marquee text-2xl font-black uppercase tracking-widest italic">
          ROBOTICS • DIGITAL MEDIA • EMBEDDED SYSTEMS • IOT • WEB DESIGN • HACKATHON • ROBOTICS • DIGITAL MEDIA • EMBEDDED SYSTEMS • IOT • WEB DESIGN • HACKATHON •
        </div>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-zinc-950">
        {[
          { label: 'Innovations', val: '15+' },
          { label: 'Collaborators', val: '50+' },
          { label: 'Active Projects', val: '12' },
          { label: 'Experience', val: '5 Yrs' },
        ].map((stat, i) => (
          <div key={i} className="p-10 border-r border-white/10 text-center">
            <h2 className="text-4xl font-black text-purple-500">{stat.val}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      
      <section id="projects" className="py-24 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
          <span className="h-px w-12 bg-purple-600" /> Current Initiatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Robo-Race Development', 'Influencer Marketing', 'Smart Home IoT'].map((item, i) => (
            <div key={i} className="group bg-zinc-900 border border-white/10 p-1 rounded-xl hover:border-purple-600/50 transition">
              <div className="h-48 bg-zinc-800 rounded-t-lg mb-4 flex items-center justify-center text-zinc-700 font-bold">IMAGE_PLACEHOLDER</div>
              <div className="p-5">
                <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full uppercase font-bold">Department {i+1}</span>
                <h3 className="text-xl font-bold mt-3 mb-2">{item}</h3>
                <p className="text-gray-500 text-sm">Deep-dive into technical specifications and modern integration techniques.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <footer className="p-10 border-t border-white/10 text-center text-gray-600 text-sm">
        Made with ❤️ by Techartmedia Team
      </footer>

      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </main>
  );
}