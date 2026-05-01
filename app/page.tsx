import React from 'react';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'center', paddingTop: '100px' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>TECHARTMEDIA</h1>
      <h2 style={{ color: '#9333ea', fontSize: '2rem' }}>INNOVATION 2026</h2>
      <p style={{ color: '#888', fontSize: '1.2rem' }}>Electronics • Robotics • Digital Media</p>
      <div style={{ marginTop: '50px', padding: '20px', border: '1px solid #333', display: 'inline-block', borderRadius: '10px' }}>
        Site is currently being updated. Check back soon!
      </div>
    </main>
  );
}