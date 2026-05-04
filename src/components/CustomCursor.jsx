"use client";
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Start as true, will be set to false if not touch device

  useEffect(() => {
    // Check if device is touch-enabled
    const checkTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    const touchDevice = checkTouchDevice();
    setIsTouchDevice(touchDevice);

    // Don't initialize custom cursor on touch devices
    if (touchDevice) {
      return;
    }

    // Set initial visibility
    setIsVisible(true);

    // Show cursor when mouse moves
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    // Hide cursor when mouse leaves window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Check for hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    // Initialize cursor position on mount
    const handleInitialMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousemove', handleInitialMouseMove, { once: true });

    // Hide default cursor on html and body
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    
    // Also add CSS class to ensure cursor is hidden
    document.documentElement.classList.add('custom-cursor-active');
    document.body.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Don't render on touch devices or if not visible
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? 'w-6 h-6 border-[#15a36e] bg-[#15a36e]/20'
              : 'w-4 h-4 border-[#15a36e] bg-transparent'
          }`}
        />
      </div>

      {/* Outer Ring */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-500 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border transition-all duration-500 ${
            isHovering
              ? 'w-12 h-12 border-[#15a36e]/30'
              : 'w-8 h-8 border-[#15a36e]/20'
          }`}
        />
      </div>

      {/* Corner Brackets - Top Left */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: `${position.x - 20}px`,
          top: `${position.y - 20}px`,
          opacity: isHovering ? 0.5 : 0.3,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M0 0L0 4L4 4" stroke="#15a36e" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Corner Brackets - Top Right */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: `${position.x + 8}px`,
          top: `${position.y - 20}px`,
          opacity: isHovering ? 0.5 : 0.3,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M12 0L12 4L8 4" stroke="#15a36e" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Corner Brackets - Bottom Left */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: `${position.x - 20}px`,
          top: `${position.y + 8}px`,
          opacity: isHovering ? 0.5 : 0.3,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M0 12L0 8L4 8" stroke="#15a36e" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Corner Brackets - Bottom Right */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: `${position.x + 8}px`,
          top: `${position.y + 8}px`,
          opacity: isHovering ? 0.5 : 0.3,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M12 12L12 8L8 8" stroke="#15a36e" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;

