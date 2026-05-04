"use client";
/**
 * Utility functions for using AVIF images in CSS backgrounds with fallbacks
 */

// Function to get the best available image format for background images
export function getBestImageFormat(baseImagePath) {
  // Extract the path without extension
  const pathWithoutExt = baseImagePath.replace(/\.(png|jpe?g|gif|webp)$/i, '');
  const extension = baseImagePath.match(/\.(png|jpe?g|gif|webp)$/i)?.[0];
  
  if (!extension) {
    // If no supported extension found, return original
    return { avif: baseImagePath, webp: baseImagePath, original: baseImagePath };
  }
  
  return {
    avif: pathWithoutExt + '.avif',
    webp: pathWithoutExt + '.webp',
    original: baseImagePath
  };
}

// Function to detect browser support for AVIF
export function supportsAVIF() {
  // Create a canvas and try to create an AVIF data URL
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Draw a simple rectangle to ensure there's content
  if (ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 1, 1);
  }
  
  // Check if the canvas can produce an AVIF data URL
  try {
    // This is a simple test - in practice, browser support detection for AVIF
    // is often done by trying to create an image with AVIF source
    const avifSupport = canvas.toDataURL('image/avif').startsWith('data:image/avif');
    return avifSupport;
  } catch (e) {
    return false;
  }
}

// Function to detect browser support for WebP
export function supportsWebP() {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
}

// CSS utility for inline styles (useful in React components)
export function avifBackgroundStyle(imagePath) {
  const formats = getBestImageFormat(imagePath);
  
  // Detect browser support and return the best format
  if (supportsAVIF()) {
    return { backgroundImage: `url(${formats.avif})` };
  } else if (supportsWebP()) {
    return { backgroundImage: `url(${formats.webp})` };
  } else {
    return { backgroundImage: `url(${formats.original})` };
  }
}

// For use in CSS files, you can create a mixin-like function that generates CSS
export function generateAvifBackgroundCSS(className, imagePath, extraStyles = {}) {
  const formats = getBestImageFormat(imagePath);
  
  // This would typically be used in a CSS-in-JS solution or to generate CSS
  const css = `
/* ${className} with AVIF background support */
.${className} {
  background-image: url('${formats.avif}');
}
/* Fallback for browsers that don't support AVIF */
@supports not (background-image: image-set(url("${formats.avif}") 1x)) {
  .${className} {
    background-image: url('${formats.original}');
  }
}
  `;
  
  return css;
}