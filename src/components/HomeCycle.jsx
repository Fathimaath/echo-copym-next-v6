"use client";
import React, { useState, useEffect } from 'react';
import HomeCycle1 from './SVG/homecyclen1.svg';
import HomeCycle2 from './SVG/homecyclen2.svg';
import HomeCycle3 from './SVG/homecyclen3.svg';
import HomeCycle4 from './SVG/homecyclen4.svg';
import Image from './Image';

export default function HomeCycleSection() {
    const [currentSVGIndex, setCurrentSVGIndex] = useState(0);

    // Array of all HomeCycle SVG files
    const homeCycleSVGs = [
        HomeCycle1,
        HomeCycle2,
        HomeCycle3,
        HomeCycle4
    ];

    // Preload all images for smoother transitions
    useEffect(() => {
        homeCycleSVGs.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // Auto-rotate through SVG files with slower speed for better visibility
    // Increased delay for smoother viewing experience
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSVGIndex((prevIndex) =>
                (prevIndex + 1) % homeCycleSVGs.length
            );
        }, 800); // Slowed down to 800ms per frame for better visibility

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full">
            {/* HomeCycle SVG Section with Rotating Animation */}
            <div className="flex justify-center items-center w-full">
                <div className="relative w-full max-w-4xl h-auto flex justify-center items-center">
                    {/* Single image that changes src rapidly */}
                    <Image
                        src={homeCycleSVGs[currentSVGIndex]}
                        alt="Innovation and Investment Cycle"
                        className="w-full h-auto mx-auto object-contain"
                        style={{
                            maxWidth: '100%',
                            display: 'block',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
