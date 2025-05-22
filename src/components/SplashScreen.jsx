import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import { delay, animateElements } from '../utils/animationHelper.js';

const SplashScreen = ({ onComplete }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  // Sequence of animations
  useEffect(() => {
    const runAnimations = async () => {
      // Step 1: Show logo with delay
      await delay(100);
      setLogoVisible(true);
      
      // Step 2: Show loader
      await delay(600);
      setLoaderVisible(true);
      
      // Step 3: Show tagline
      await delay(400);
      setTaglineVisible(true);
      
      // Step 4: Complete animation after some content display time
      await delay(1500);
      setAnimationCompleted(true);
      
      // Step 5: Notify parent after fade out animation completes
      await delay(500);
      if (onComplete) onComplete();
    };
    
    runAnimations();
  }, [onComplete]);

  return (
    <div className={`splash-screen ${animationCompleted ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <h1 className={`splash-logo ${logoVisible ? 'show' : ''}`}>GEMZ</h1>
        <div className={`splash-loader ${loaderVisible ? 'show' : ''}`}>
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
        </div>
        <p className={`splash-tagline ${taglineVisible ? 'show' : ''}`}>
          The Ultimate Freebeee
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;