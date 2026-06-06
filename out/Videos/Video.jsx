import React from 'react';

/**
 * AV1-compatible Video Component with fallback support
 * This component uses the video element to provide format fallbacks
 */
const Video = ({ 
  src,
  alt, // For accessibility, describes the video content
  className = '',
  style,
  onLoad,
  onError,
  ...props 
}) => {
  // Generate AV1/WebM version of the video path
  const getAv1Src = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    
    // Replace the file extension with .webm (AV1 codec)
    return originalSrc.replace(/\.(mp4|mov|avi|wmv|flv|mkv)$/i, '.webm');
  };

  // Generate H.265/HEVC version of the video path
  const getHevcSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    
    // Replace the file extension with .mp4 (HEVC codec)
    return originalSrc.replace(/\.(mp4|mov|avi|wmv|flv|mkv)$/i, '-hevc.mp4');
  };

  // Check if the video is a type that has modern format alternatives
  const hasAlternativeFormats = /\.(mp4|mov|avi|wmv|flv|mkv)$/i.test(src);

  if (hasAlternativeFormats) {
    const av1Src = getAv1Src(src);
    const hevcSrc = getHevcSrc(src);

    return (
      <video
        className={className}
        style={style}
        controls
        preload="metadata"
        {...props}
      >
        {/* AV1 format (WebM) - highest priority for modern browsers */}
        <source 
          src={av1Src} 
          type="video/webm; codecs=av01.0.05M.08" 
        />
        
        {/* HEVC format - fallback for broader compatibility */}
        <source 
          src={hevcSrc} 
          type="video/mp4; codecs=hvc1" 
        />
        
        {/* Original format - final fallback */}
        <source 
          src={src} 
          type={`video/${src.split('.').pop()}`} 
        />
        
        Your browser does not support the video tag.
      </video>
    );
  } else {
    // If it's not a video type that typically has modern alternatives, just return the video tag
    return (
      <video
        src={src}
        className={className}
        style={style}
        controls
        preload="metadata"
        {...props}
      >
        Your browser does not support the video tag.
      </video>
    );
  }
};

export default Video;