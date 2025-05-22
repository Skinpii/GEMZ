import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show && !hovered) return null;

  const handleMouseEnter = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHovered(true);
  };
  const handleMouseLeave = () => setHovered(false);

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 9999,
        background: '#fff',
        color: '#212121',
        border: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        boxShadow: '0 4px 16px 0 rgba(60,60,60,0.15)',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      aria-label="Scroll to top"
    >
      <span style={{ display: 'inline-block', transform: 'rotate(-90deg)' }}>{'>'}</span>
    </button>
  );
};

export default ScrollToTopButton;
